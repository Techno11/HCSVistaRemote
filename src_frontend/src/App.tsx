import * as React from 'react';
import Container from '@mui/material/Container';
import {useEffect, useState} from "react";
import Auth from "./components/Auth";
import AuthedComponent from "./components/AuthedComponent";
import VistaSocket from "./common/VistaSocket";
import {useVista} from "./hooks/useVista";

export default function App() {

  const [authed, setAuthed] = useState<boolean>(false);

  const vista = useVista();

  useEffect(() => {
    // Check if we're authed
    vista.socketAuthed().then(authed => {
      if(authed) { // We're ready
        setAuthed(true);
      } else { // No beans, we're not authed
        // Check local storage for key
        const oldKey = localStorage.getItem("authkey");
        if(oldKey) {
          // if we have a key from local storage, try authenticating it
          return vista.socketAuth(oldKey).then(success => {
            if(!success) { // if we fail, request a new key
              return vista.socketRequestAuth();
            } else {
              setAuthed(true);
            }
          })
        } else { // no key in local storage, just request a new key
          return vista.socketRequestAuth()
        }
      }
    }).catch((err) => {
      console.log("Error in initial auth flow: ", err)
    })
  }, [])

  return (
    <Container sx={{minHeight: '100vh', minWidth: '100vw', maxHeight: '100vh', maxWidth: '100vw', overflow: 'hidden'}}>
      {!authed &&
        <Auth callback={(auth: boolean) => setAuthed(auth)} />
      }

      {authed &&
        <AuthedComponent />
      }
    </Container>
  );
}
