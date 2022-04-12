import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Button, ButtonGroup, Grid, Typography} from "@mui/material";
import Color from "../models/Color";
import CuestackTrigger, {CuestackTriggerMode} from "../models/CuestackTrigger";
import * as HHS from "../constants/ConsoleEnumsHHS"
import {useVista} from "../hooks/useVista";
import ColorSelector, {ColorChange} from "./ColorSelector";
import AlwaysLiveColumn from "./AlwaysLiveColumn";

export default function Queuer() {

  const vista = useVista();
  const [cycLive, setCycLive] = useState<ColorChange>({color: Color.OFF, intensity: 100});
  const [stageLive, setStageLive] = useState<ColorChange>({color: Color.OFF, intensity: 100});
  const [cycPreview, setCycPreview] = useState<ColorChange>({color: Color.OFF, intensity: 100});
  const [stagePreview, setStagePreview] = useState<ColorChange>({color: Color.OFF, intensity: 100});
  const [live, setLive] = useState<boolean>(false);

  const [queue, setQueue] = useState<CuestackTrigger[]>([]);

  const marks = [
    { value: 0, label: 'Off' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ]

  useEffect(() => {
    calculateQueue();
  }, [stagePreview, cycPreview])

  useEffect(() => {
    console.log(queue)
    if(live) go();
  }, [queue])

  const onCycChange = (val: ColorChange) => {
    setCycPreview(val);
  }

  const onStageChange = (val: ColorChange) => {
    setStagePreview(val);
  }

  const go = () => {
    if(queue.length > 0) {
      vista.socketGo(queue).then(success => {
        if(success) {
          setQueue([]);
          setCycLive(cycPreview);
          setStageLive(stagePreview);
          setLive(true);
        } else {
          // error occured? sad
        }
      });
    }
  }

  const calculateQueue = () => {
    const queue = [] as CuestackTrigger[];
    if(stageLive.color !== stagePreview.color) {    // Both color changed
      queue.push({
        intensity: stagePreview.intensity,
        cuestack: HHS.stage(stagePreview.color),
        mode: stagePreview.color === Color.OFF ? CuestackTriggerMode.RELEASE : CuestackTriggerMode.PLAY
      });
    } else if (stageLive.color === stagePreview.color && stageLive.intensity !== stagePreview.intensity) { // only intensity changed
      queue.push({
        intensity: stagePreview.intensity,
        cuestack: HHS.stage(stagePreview.color),
        mode: CuestackTriggerMode.INTENSITY
      });
    }
    // Cyc
    if(cycLive.color !== cycPreview.color) {    // Both color changed
      queue.push({
        intensity: cycPreview.intensity,
        cuestack: HHS.cyc(cycPreview.color),
        mode: cycPreview.color === Color.OFF ? CuestackTriggerMode.RELEASE : CuestackTriggerMode.PLAY
      });
    } else if (cycLive.color === cycPreview.color && cycLive.intensity !== cycPreview.intensity) { // only intensity changed
      queue.push({
        intensity: cycPreview.intensity,
        cuestack: HHS.cyc(cycPreview.color),
        mode: CuestackTriggerMode.INTENSITY
      });
    }
    setQueue(queue);
  }

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container direction={'column'} sx={{height: '100%'}}>
        <Grid item>
          <Box sx={{background: live ? "rgba(255, 0, 0, 1)" : "lightgrey"}}>
            <Typography sx={{textAlign: 'center'}} variant={'h2'}>{live ? "LIVE EDITING" : "Queueing Mode"}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Button variant={'contained'} sx={{width: 1}} onClick={() => {setLive(!live)}}>{live ? "TO QUEUING MODE" : "ENTER LIVE MODE"}</Button>
        </Grid>
        <Grid item>
          <Grid container sx={{height: '90%', m: 2, mb: 4}} direction={'row'} spacing={4}>
            <Grid item xs={3} sx={{height: '100%'}}>
              <ColorSelector onChange={(d) => {onCycChange(d)}} value={live ? cycLive : cycPreview} cyc title={"Cyc"} />
            </Grid>
            <Grid item xs={2} sx={{height: '100%'}}>
              <ColorSelector onChange={(d) => {onStageChange(d)}} value={live ? stageLive : stagePreview} title={"Stage"} />
            </Grid>
            <Grid item>
              <Button variant={'contained'} onClick={() => {go()}}>Please</Button>
            </Grid>
            <Grid item>
              <AlwaysLiveColumn />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
