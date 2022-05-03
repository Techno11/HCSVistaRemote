import * as React from 'react';
import {useState} from 'react';
import {Box, Button, ButtonGroup, Grid, Typography} from "@mui/material";
import {useVista} from "../hooks/useVista";
import {CuestackTriggerMode} from "../models/CuestackTrigger";
import BOType from "../models/BO";
import Console from "../models/Console"

interface IProps {
  onBo: () => void
  buildingConsole: () => Console
}


export default function AlwaysLiveRow({onBo, buildingConsole}: IProps) {

  const vista = useVista();

  // States
  const [house, setHouse] = useState<number>(0);
  const [wash, setWash] = useState<boolean>(false);
  const [boCut, setBoCut] = useState<boolean>(false);
  const [bo2, setBo2] = useState<boolean>(false);
  const [bo5, setBo5] = useState<boolean>(false);
  const [bo10, setBo10] = useState<boolean>(false);

  /**
   * Go House
   * @param e Click event
   */
  const goHouse = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    // Prevent button from taking focus
    e.preventDefault();

    // Play the house if it isn't, otherwise release it
    if(house < 2) {
      vista.go([{intensity: 100, mode: CuestackTriggerMode.PLAY, cuestack: buildingConsole().board.HOUSE}]).then(success => setHouse(success ? house + 1 : house))
    } else {
      vista.go([{intensity: 100, mode: CuestackTriggerMode.RELEASE, cuestack: buildingConsole().board.HOUSE}]).then(success => setHouse(success ? 0 : house))
    }
  }

  /**
   * Go Wash
   * @param e Click event
   */
  const goWash = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the button from taking focus
    e.preventDefault();

    // Play the wash if it isn't, otherwise, release it
    if(!wash) {
      vista.go([{intensity: 100, mode: CuestackTriggerMode.PLAY, cuestack: buildingConsole().board.WASH}]).then(success => setWash(success))
    } else {
      vista.go([{intensity: 100, mode: CuestackTriggerMode.RELEASE, cuestack: buildingConsole().board.WASH}]).then(success => setWash(!success))
    }
  }

  /**
   * Go BO
   * This function allows the 5 BO types to all use the same function to run
   * @param event Click event
   * @param bo BO type
   */
  const goBO = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, bo: BOType) => {
    // Prevent the button from taking focus
    event.preventDefault();

    // Get the current state of the BO type requested (true = "Played", false = "Released")
    const state = bo === BOType.Cut ? boCut : bo === BOType.Two ? bo2 : bo === BOType.Five ? bo5 : bo10;

    // Get the setState function of the BO type requested
    const setState = bo === BOType.Cut ? setBoCut : bo === BOType.Two ? setBo2 : bo === BOType.Five ? setBo5 : setBo10;

    // Get the cuestack based on the BO type requested
    const cuestack = buildingConsole().bo(bo);

    // If the state is false, we'll play the cue. Otherwise, we just release it
    if(!state) {
      vista.go([{intensity: 100, mode: CuestackTriggerMode.PLAY, cuestack: cuestack}]).then(success => setState(success))

      // When we trigger a BO, we use this callback to trigger some events up in the Queuer view
      onBo();
    } else {
      vista.go([{intensity: 100, mode: CuestackTriggerMode.RELEASE, cuestack: cuestack}]).then(success => setState(!success))
    }
  }


  return (
    <Grid container direction={'row'} spacing={2} alignItems={"center"} justifyContent={"center"}>

      {/* House / Wash Button Group */}
      <Grid item>
        <ButtonGroup orientation={'horizontal'} sx={{width: "100%"}}>
          <Button size={'large'} variant={'contained'} onClick={(e) => goHouse(e)}>{house < 1 ? "House Full" : house < 2 ? "House Half" : "Release House"}</Button>
          <Button size={'large'} variant={'contained'} onClick={(e) => goWash(e)}>{!wash ? "Wash 100" : "Release Wash"}</Button>
        </ButtonGroup>
      </Grid>

      {/* BO Button Group */}
      <Grid item>
        <ButtonGroup orientation={'horizontal'} sx={{width: "100%"}}>
          <Button size={'large'} variant={'contained'} sx={{background: "black", border: "3px solid white !important"}} onClick={(e) => goBO(e, BOType.Cut)}>{!boCut ? "Cut BO" : "Release Cut BO"}</Button>
          <Button size={'large'} variant={'contained'} sx={{background: "black", border: "3px solid white !important"}} onClick={(e) => goBO(e, BOType.Two)}>{!bo2 ? "2 BO" : "Release 2 BO"}</Button>
          <Button size={'large'} variant={'contained'} sx={{background: "black", border: "3px solid white !important"}} onClick={(e) => goBO(e, BOType.Five)}>{!bo5 ? "5 BO" : "Release 5 BO"}</Button>
          <Button size={'large'} variant={'contained'} sx={{background: "black", border: "3px solid white !important"}} onClick={(e) => goBO(e, BOType.Ten)}>{!bo10 ? "10 BO" : "Release 10 BO"}</Button>
        </ButtonGroup>
      </Grid>

    </Grid>
  );
}
