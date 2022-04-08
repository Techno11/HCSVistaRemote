import * as React from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {Socket} from "socket.io-client";
import {useState} from "react";
import * as api from "../common/socket";

interface IProps {
  socket: Socket
}

export default function Auth(props: IProps) {

  const {socket} = props;

  const [key, setKey] = useState<string>("");

  const onSubmit = () => {
    api.socketAuth(socket, key).then((success) => {
      if(success) {
        localStorage.setItem("authkey", key);
      }
    }).catch(() => {

    })
  }

  const updateKey = (input: string) => {
    if(input.length > 6) {
      input = input.substr(0, 6);
    }
    setKey(input.toUpperCase());
  }

  return (
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" component="h1" gutterBottom>
          Please Enter Auth Code:
        </Typography>
        <TextField
          sx={{width: "100%"}}
          value={key}
          onChange={(ce) => updateKey(ce.target.value)}
          label="Auth Code" variant="outlined"
        />
        <Button
          sx={{my: 2, width: "100%"}}
          variant={"contained"}
          onClick={() => onSubmit()}
        >
          Authenticate
        </Button>
      </Box>
  );
}
