import * as React from 'react';
import {useState} from 'react';
import {Box, Button, ButtonGroup, Grid, Typography} from "@mui/material";
import {useVista} from "../hooks/useVista";
import {CuestackTriggerMode} from "../models/CuestackTrigger";
import * as HHS from "../constants/ConsoleEnumsHHS"
import BOType from "../models/BO";

interface IProps {
  onBo: () => void
}


export default function AlwaysLiveRow({onBo}: IProps) {

  const vista = useVista();

  const [house, setHouse] = useState<number>(0);
  const [wash, setWash] = useState<boolean>(false);
  const [boCut, setBoCut] = useState<boolean>(false);
  const [bo2, setBo2] = useState<boolean>(false);
  const [bo5, setBo5] = useState<boolean>(false);
  const [bo10, setBo10] = useState<boolean>(false);

  const goHouse = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(house < 2) {
      vista.go([{intensity: 100, mode: CuestackTriggerMode.PLAY, cuestack: HHS.board.HOUSE}]).then(success => setHouse(success ? house + 1 : house))
    } else {
      vista.go([{intensity: 100, mode: CuestackTriggerMode.RELEASE, cuestack: HHS.board.HOUSE}]).then(success => setHouse(success ? 0 : house))
    }
  }

  const goWash = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!wash) {
      vista.go([{intensity: 100, mode: CuestackTriggerMode.PLAY, cuestack: HHS.board.WASH}]).then(success => setWash(success))
    } else {
      vista.go([{intensity: 100, mode: CuestackTriggerMode.RELEASE, cuestack: HHS.board.WASH}]).then(success => setWash(!success))
    }
  }

  const goBO = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, bo: BOType) => {
    event.preventDefault();
    const state = bo === BOType.Cut ? boCut : bo === BOType.Two ? bo2 : bo === BOType.Five ? bo5 : bo10;
    const setState = bo === BOType.Cut ? setBoCut : bo === BOType.Two ? setBo2 : bo === BOType.Five ? setBo5 : setBo10;
    const cuestack = bo === BOType.Cut ? HHS.board.BO_CUT : bo === BOType.Two ? HHS.board.BO_2 : bo === BOType.Five ? HHS.board.BO_5 : HHS.board.BO_10;
    if(!state) {
      vista.go([{intensity: 100, mode: CuestackTriggerMode.PLAY, cuestack: cuestack}]).then(success => setState(success))
      onBo();
    } else {
      vista.go([{intensity: 100, mode: CuestackTriggerMode.RELEASE, cuestack: cuestack}]).then(success => setState(!success))
    }
  }


  return (
    <Box sx={{textAlign: "center"}}>
      <Typography variant={"h4"}><u>Always Live</u></Typography>
      <Grid container direction={'row'} spacing={2} alignItems={"center"} justifyContent={"center"}>
        <Grid item>
          <ButtonGroup orientation={'horizontal'} sx={{width: "100%"}}>
            <Button size={'large'} variant={'contained'} onClick={(e) => goHouse(e)}>{house < 1 ? "House Full" : house < 2 ? "House Half" : "Release House"}</Button>
            <Button size={'large'} variant={'contained'} onClick={(e) => goWash(e)}>{!wash ? "Wash 100" : "Release Wash"}</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <ButtonGroup orientation={'horizontal'} sx={{width: "100%"}}>
            <Button size={'large'} variant={'contained'} sx={{background: "black", border: "3px solid white !important"}} onClick={(e) => goBO(e, BOType.Cut)}>{!boCut ? "Cut BO" : "Release Cut BO"}</Button>
            <Button size={'large'} variant={'contained'} sx={{background: "black", border: "3px solid white !important"}} onClick={(e) => goBO(e, BOType.Two)}>{!bo2 ? "2 BO" : "Release 2 BO"}</Button>
            <Button size={'large'} variant={'contained'} sx={{background: "black", border: "3px solid white !important"}} onClick={(e) => goBO(e, BOType.Five)}>{!bo5 ? "5 BO" : "Release 5 BO"}</Button>
            <Button size={'large'} variant={'contained'} sx={{background: "black", border: "3px solid white !important"}} onClick={(e) => goBO(e, BOType.Ten)}>{!bo10 ? "10 BO" : "Release 10 BO"}</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Box>

  );
}
