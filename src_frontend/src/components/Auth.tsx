import * as React from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useVista} from "../hooks/useVista";

interface IProps {
  callback: (auth: boolean) => void
}

export default function Auth(props: IProps) {

  const {callback} = props;

  const vista = useVista();

  const [key, setKey] = useState<string>("");

  const onSubmit = () => {
    vista.socketAuth(key).then((success) => {
      if(success) {
        localStorage.setItem("authkey", key);
      }
      callback(success);
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
