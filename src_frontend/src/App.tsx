import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import * as api from "./common/socket";
import Auth from "./components/Auth";

export default function App() {

  const client = io(location.hostname + ":8008");

  const [authed, setAuthed] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're authed
    api.socketAuthed(client).then(authed => {
      if(authed) { // We're ready
        setAuthed(true);
      } else { // No beans, we're not authed
        // Check local storage for key
        const oldKey = localStorage.getItem("authkey");
        if(oldKey) {
          // if we have a key from local storage, try authenticating it
          return api.socketAuth(client, oldKey).then(success => {
            if(!success) { // if we fail, request a new key
              return api.socketRequestAuth(client);
            }
          })
        } else { // no key in local storage, just request a new key
          return api.socketRequestAuth(client)
        }
      }
    }).catch((err) => {
      console.log("Error in initial auth flow: ", err)
    })

    // Register listener listening for auth responses
    client.on("auth-response", (json: any) => {
      setAuthed(json.auth);
    });
  }, [])

  return (
    <Container maxWidth="sm">
      {!authed &&
        <Auth socket={client} />
      }
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App example with TypeScript
        </Typography>
        <ProTip />
      </Box>
    </Container>
  );
}
