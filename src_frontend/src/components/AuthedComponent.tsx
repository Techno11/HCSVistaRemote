import * as React from 'react';
import Queuer from "./Queuer";
import {useEffect, useState} from "react";
import {useVista} from "../hooks/useVista";
import {Box, CircularProgress, Typography} from "@mui/material";
import Setup from "./Setup";

export default function AuthedComponent() {

  const vista = useVista();
  const [status, setStatus] = useState({fetching: true, serial_status: false, board_status: false});

  useEffect(() => {
    vista.status().then(data => {
      setStatus({...data, fetching: false})
    })
  }, [])

  const setupFinished = () => {
    setStatus({...status, fetching: true})
    vista.status().then(data => {
      setStatus({...data, fetching: false})
    })
  }

  return (
    <>
      { status.fetching &&
        <>
          <Box sx={{width: "100%", height: "100vh", textAlign: "center", paddingTop: "20vh"}}>
            <CircularProgress />
            <Typography>Loading...</Typography>
          </Box>
        </>
      }
      { !status.fetching && (!status.serial_status || !status.board_status) &&
        <Setup status={status} finished={() => setupFinished()} />
      }
      { !status.fetching && status.serial_status && status.board_status &&
        <Queuer />
      }
    </>
  );
}
