import * as React from 'react';
import {useRef, useState} from 'react';
import {Box, Button, LinearProgress, Typography} from "@mui/material";
import {useVista} from "../hooks/useVista";
import ClickHere from "../assets/clickhere.jpg"
import UpsideDownMouse from "../assets/upsidedownmouse.jpg"
import Com0ComConfig from "../assets/com0comconfig.png"
import VistaSerialSettings from "../assets/vista-config.png"
import BuildingBoard from "../models/BuildingBoard";

interface IProps {
  status: {serial_status: boolean, board_status: boolean}
  finished: () => void
}

/*
Steps:
0: Welcome
1: Locate Board 1
2: Locate Board 2
3: Locate Board 3
4: Locate Board 4
5: Start Calibration
6: Calibrating...
7: Post Calibration/Serial Info
8: Serial Loading
9: Select Building
10: All Done / Vista Serial Config
 */

export default function Setup({status, finished}: IProps) {

  const vista = useVista();
  const [step, setStepState] = useState<number>(!status.board_status ? 0 : 7)
  const stepRef = useRef<number>(step);

  const setStep = (num: number) => {
    setStepState(num);
    stepRef.current = num;
  }

  const getStep = () => stepRef.current;

  const nextStep = () => {
    const next = getStep() + 1;
    setStep(next);
    if(next < 5) { // Kickoff board locators
      vista.setupBoard(next - 1).then(() => {
        nextStep();
      })
    } else if (next === 6) { // Kickoff board calibration
      vista.calibrateBoards().then(() => {
        nextStep();
      })
    } else if (next === 7 && status.serial_status) { // Determine if we can skip serial setup?
      setStep(9);
    }  else if (next === 8) { // Kickoff serial config
      vista.setupSerial().then(() => {
        nextStep();
      })
    } else if (next === 11) { // All done!
      finished();
    }
  }

  const setBuilding = (bldg: BuildingBoard) => {
    vista.setBuilding(bldg).then(() => {
      nextStep();
    })
  }

  // Step 0
  const Welcome = () => {
    return (
      <>
        <Typography variant={"h5"}>Welcome to the Vista light board remote!</Typography>
        <Typography>Please open your show in vista and arrange the consoles so that </Typography>
        <Typography>each fader in each console is fully visible from top to bottom. </Typography>
        <Button variant={"contained"} onClick={() => nextStep()}>Begin Setup</Button>
      </>
    )
  }

  // Steps 1-4
  const BoardSteps = ({boardNum}: {boardNum: number}) => {
    const consoleDesc =
      (boardNum === 1) ? "usually contains cyc and stage colors" :
      (boardNum === 2) ? "usually contains cyc effects, basic wash, and BO cues" :
      (boardNum === 3) ? "usually contains truss colors and wash zones" :
                         "usually contains other useful things";
    return (
      <>
        { step === 1 &&
          <Typography variant={"h5"}>The first thing we need to do is locate each console on your screen.</Typography>
        }
        <Typography>With Vista open, please click the upper-left-most fader, right in the center around the 85-90% mark.</Typography>
        <img alt={"vista diagram of where to click"} src={ClickHere} />
        <LinearProgress sx={{width: "30%", marginLeft: "auto", marginRight: "auto"}} />
        <Typography variant={"h5"}><b>You're locating console #{boardNum}</b></Typography>
        <b><Typography>This console {consoleDesc}</Typography></b>
      </>
    )
  }

  // Step 5
  const ConfigBoard = () => {
    return (
      <>
        <Typography variant={"h5"}>Great Stuff!</Typography>
        <Typography>Now, to complete the process, please place your mouse upside-down and tap calibrate.</Typography>
        <img alt={"upside down mouse"} src={UpsideDownMouse} />
        <br />
        <Button variant={"contained"} onClick={() => nextStep()}>Calibrate</Button>
      </>
    )
  }

  // Step 6
  const BoardConfiguring = () => {
    return (
      <>
        <Typography variant={"h5"}>Please Wait...</Typography>
        <Typography>The application is locating the min and max of the faders for each console.</Typography>
        <Typography>This may take a second. Please do not touch the mouse during this process</Typography>
        <img alt={"upside down mouse"} src={UpsideDownMouse} />
        <br />
        <LinearProgress />
      </>
    )
  }

  // Step 7
  const SerialStep = () => {
    return (
      <>
        <Typography variant={"h5"}>Setup Serial</Typography>
        <Typography>The consoles are now properly calibrated. Please refrain from moving them on the screen</Typography>
        <Typography>Now, please launch "com0com" setup from the start menu and ensure the configuration looks as follows</Typography>
        <img alt={"com0com config"} src={Com0ComConfig} />
        <Typography>If your config does not match, please update it so that it does. The COM ports chosen much match the photo.</Typography>
        <Typography>Minimize the window when you're finished and tap continue below.</Typography>
        <Button variant={"contained"} onClick={() => nextStep()}>Setup Serial and Continue</Button>
      </>
    )
  }

  // Step 8
  const SerialLoading = () => {
    return (
      <>
        <Typography variant={"h5"}>Configuring...</Typography>
        <Typography>The serial interface is configuring. Please hold tight...</Typography>
        <LinearProgress />
      </>
    )
  }

  // Step 9
  const SetBuilding = () => {
    return (
      <>
        <Typography variant={"h5"}>Select Building</Typography>
        <Typography>Which building are you at?</Typography>
        <Button variant={"contained"} onClick={() => setBuilding(BuildingBoard.HHS)}>Hartland High School</Button>
        <Typography>or</Typography>
        <Button variant={"contained"} onClick={() => setBuilding(BuildingBoard.PAC)}>Hartland Performing Arts Center</Button>
      </>
    )
  }

  // Step 10
  const AllDone = () => {
    return (
      <>
        <Typography variant={"h5"}>Server Config Finished</Typography>
        <Typography>The server is now properly configured.</Typography>
        <Typography>As a final step, please check that the serial settings in Vista match as seen below</Typography>
        <img alt={"vista config"} src={VistaSerialSettings} />
        <br />
        <Button variant={"contained"} onClick={() => nextStep()}>Beam me up, Scotty!</Button>
      </>
    )
  }

  return (
    <Box sx={{paddingTop: "20vh", textAlign: "center"}}>
      { step === 0 &&
        <Welcome />
      }
      { step > 0 && step < 5 &&
        <BoardSteps boardNum={step}/>
      }
      { step === 5 &&
        <ConfigBoard />
      }
      { step === 6 &&
        <BoardConfiguring />
      }
      { step === 7 &&
        <SerialStep />
      }
      { step === 8 &&
        <SerialLoading />
      }
      { step === 9 &&
        <SetBuilding />
      }
      { step === 10 &&
        <AllDone />
      }
    </Box>
  );
}
