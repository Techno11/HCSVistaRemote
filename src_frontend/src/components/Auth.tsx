import * as React from 'react';
import {Box, Button, LinearProgress, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useVista} from "../hooks/useVista";

interface IProps {
  callback: (auth: boolean) => void
}

export default function Auth(props: IProps) {

  const {callback} = props;

  const vista = useVista();

  const [key, setKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = () => {
    if(loading) return;
    if(key.length < 6){
      setError("Key must be 6 digits");
      return;
    }
    setLoading(true);
    setError(null)
    vista.socketAuth(key).then((success) => {
      if(success) {
        localStorage.setItem("authkey", key);
        callback(success);
      } else {
        setLoading(false);
        setError("Invalid key or key has expired")
      }
    }).catch(() => {
      setLoading(false);
      setError("Invalid key or key has expired")
    })
  }

  const updateKey = (input: string) => {
    if(input.length > 6) {
      input = input.substring(0, 6);
    }
    setKey(input);
  }

  const onKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key === 'Enter') {
      onSubmit();
    }
  }

  return (
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" component="h1" gutterBottom>
          Please Enter Auth Code:
        </Typography>
        <TextField
          sx={{width: "100%"}}
          type={'number'}
          value={key}
          onChange={(ce) => updateKey(ce.target.value)}
          onKeyPress={onKeypress}
          label="Auth Code"
          variant="outlined"
          disabled={loading}
        />
        <Button
          sx={{my: 2, width: "100%"}}
          variant={"contained"}
          onClick={() => onSubmit()}
          disabled={loading}
        >
          Authenticate
        </Button>
        {loading &&
          <LinearProgress />
        }
        {error &&
          <Typography color={"red"}>{error}</Typography>
        }
      </Box>
  );
}
