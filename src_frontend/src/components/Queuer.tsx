import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import Color from "../models/Color";
import CuestackTrigger, {CuestackTriggerMode} from "../models/CuestackTrigger";
import * as HHS from "../constants/ConsoleEnumsHHS"
import {useVista} from "../hooks/useVista";
import ColorSelector, {ColorChange} from "./ColorSelector";
import AlwaysLiveRow from "./AlwaysLiveRow";
import WashEditor from "./WashEditor";
import ZoneState from "../models/ZoneState";
import ZoneStates from "../models/ZoneStates";
import BuildingBoard from "../models/BuildingBoard";

const initialWashState = {
  z1: {enabled: false, intensity: 100, name: "z1"} as ZoneState,
  z2: {enabled: false, intensity: 100, name: "z2"} as ZoneState,
  z3: {enabled: false, intensity: 100, name: "z3"} as ZoneState,
  z4: {enabled: false, intensity: 100, name: "z4"} as ZoneState,
  z5: {enabled: false, intensity: 100, name: "z5"} as ZoneState,
  z6: {enabled: false, intensity: 100, name: "z6"} as ZoneState,
  z7: {enabled: false, intensity: 100, name: "z7"} as ZoneState,
  z8: {enabled: false, intensity: 100, name: "z8"} as ZoneState,
  z9: {enabled: false, intensity: 100, name: "z9"} as ZoneState,
  UsSp: {enabled: false, intensity: 100, name: "UsSp"} as ZoneState,
  MsSp: {enabled: false, intensity: 100, name: "MsSp"} as ZoneState,
  DsSp: {enabled: false, intensity: 100, name: "DsSp"} as ZoneState,
  wash: {enabled: false, intensity: 100, name: "wash"} as ZoneState
};

export default function Queuer() {

  const boardType = BuildingBoard.HHS;

  const vista = useVista();
  // Cyc
  const [cycLive, setCycLive] = useState<ColorChange>({color: Color.OFF, intensity: 100});
  const [cycPreview, setCycPreview] = useState<ColorChange>({color: Color.OFF, intensity: 100});

  // Stage LEDs
  const [stageLive, setStageLive] = useState<ColorChange>({color: Color.OFF, intensity: 100});
  const [stagePreview, setStagePreview] = useState<ColorChange>({color: Color.OFF, intensity: 100});

  // Wash
  const [washPreview, setWashPreview] = useState<ZoneStates>(initialWashState)
  const [washLive, setWashLive] = useState<ZoneStates>(initialWashState)

  // Are we editing live?
  const [live, setLive] = useState<boolean>(false);

  const toggleLive = () => {
    if(live) {
      setLive(false);
      setWashPreview(washLive);
      setStagePreview(stageLive);
      setCycPreview(cycLive);
    } else {
      setLive(true);
    }
  }

  const onCycChange = (val: ColorChange) => {
    if (live) {
      setCycLive(val);
      goCues(calculateCycCues(val));
    } else {
      setCycPreview(val);
    }
  }

  const onStageChange = (val: ColorChange) => {
    if(live) {
      setStageLive(val);
      goCues(calculateStageCues(val));
    } else {
      setStagePreview(val);
    }
  }

  const onWashChange = (val: ZoneStates) => {
    if(live) {
      setWashLive(val);
      goCues(calculateWashCues(val));
    } else {
      setWashPreview(val);
    }
  }

  const goCues = (queue: CuestackTrigger[]) => {
    if(queue.length > 0) {
      vista.go(queue).then(success => {
        if(success) {
          // do nothing?
        } else {
          // error occured? sad
        }
      });
    }
  }

  const onBo = () => {
    setLive(false);
    setCycPreview({color: Color.OFF, intensity: 100});
    setStagePreview({color: Color.OFF, intensity: 100});
    setWashPreview(initialWashState);
  }

  const goPreview = () => {
    if(live) return;
    const queue = generateAllCues();
    if(queue.length > 0) {
      vista.go(queue).then(success => {
        if(success) {
          setCycLive(cycPreview);
          setStageLive(stagePreview);
          setWashLive(washPreview);
          setLive(true);
        } else {
          // error occured? sad
        }
      });
    }
  }

  const calculateWashCues = (vals: ZoneStates) => {
    const queue = [] as CuestackTrigger[];
    for(let zone in vals) {
      if(vals.hasOwnProperty(zone)) {
        if(vals[zone].enabled === washLive[zone].enabled && vals[zone].intensity === washLive[zone].intensity) continue; // skip if no changes
        queue.push({
          intensity: vals[zone].intensity,
          cuestack: HHS.wash(vals[zone].name),
          // if it's on in live, just adjust intensity
          mode: washLive[zone].enabled && vals[zone].enabled ? CuestackTriggerMode.INTENSITY :
                vals[zone].enabled ? CuestackTriggerMode.PLAY : CuestackTriggerMode.RELEASE
        })
      }
    }

    return queue;
  }

  const calculateStageCues = (vals: ColorChange) => {
    const queue = [] as CuestackTrigger[];
    if(stageLive.color !== vals.color) {    // Both color changed
      queue.push({
        intensity: vals.intensity,
        cuestack: HHS.stage(vals.color),
        mode: vals.color === Color.OFF ? CuestackTriggerMode.RELEASE : CuestackTriggerMode.PLAY
      });
    } else if (stageLive.color === vals.color && stageLive.intensity !== vals.intensity) { // only intensity changed
      queue.push({
        intensity: vals.intensity,
        cuestack: HHS.stage(vals.color),
        mode: CuestackTriggerMode.INTENSITY
      });
    }

    return queue;
  }

   const calculateCycCues = (vals: ColorChange) => {
     const queue = [] as CuestackTrigger[];
     if(cycLive.color !== vals.color) {    // Both color changed
       queue.push({
         intensity: vals.intensity,
         cuestack: HHS.cyc(vals.color),
         mode: vals.color === Color.OFF ? CuestackTriggerMode.RELEASE : CuestackTriggerMode.PLAY
       });
     } else if (cycLive.color === vals.color && cycLive.intensity !== vals.intensity) { // only intensity changed
       queue.push({
         intensity: vals.intensity,
         cuestack: HHS.cyc(vals.color),
         mode: CuestackTriggerMode.INTENSITY
       });
     }

     return queue;
   }

  const generateAllCues = (): CuestackTrigger[] => {
    return [
      ...calculateWashCues(washPreview),
      ...calculateStageCues(stagePreview),
      ...calculateCycCues(cycPreview)
    ];
  }

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container direction={'column'} sx={{height: '100%'}} >
        <Grid item sm={1}>
          <Box sx={{background: live ? "rgba(255, 0, 0, 1)" : "lightgrey"}}>
            <Typography sx={{textAlign: 'center'}} variant={'h2'}>{live ? "LIVE EDITING" : "Queueing Mode"}</Typography>
          </Box>
        </Grid>
        <Grid item sm={1} sx={{mb: 2}}>
          <Button variant={'contained'} sx={{width: 1}} onClick={() => {toggleLive()}}>{live ? "TO QUEUING MODE" : "ENTER LIVE MODE"}</Button>
        </Grid>
        <Grid item sm={6}>
          <Grid container direction={'row'} spacing={4}>
            <Grid item xs={3} sx={{height: '100%'}}>
              <ColorSelector onChange={(d) => {onCycChange(d)}} value={live ? cycLive : cycPreview} cyc title={"Cyc"} />
            </Grid>
            <Grid item xs={2} sx={{height: '100%'}}>
              <ColorSelector onChange={(d) => {onStageChange(d)}} value={live ? stageLive : stagePreview} title={"Stage"} />
            </Grid>
            <Grid item xs={5}>
              <WashEditor onChange={(states) => onWashChange(states)} value={live ? washLive : washPreview}/>
            </Grid>
            <Grid item>
              <Button variant={'contained'} onClick={() => {goPreview()}}>Please</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <AlwaysLiveRow onBo={() => onBo()} />
        </Grid>
      </Grid>
    </Box>
  );
}
