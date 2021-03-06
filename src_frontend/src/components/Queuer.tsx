import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Button, ButtonGroup, Grid, Typography} from "@mui/material";
import Color from "../models/Color";
import CuestackTrigger, {CuestackTriggerMode} from "../models/CuestackTrigger";
import HHS from "../constants/ConsoleHHS"
import PAC from "../constants/ConsolePAC"
import {useVista} from "../hooks/useVista";
import ColorSelector, {ColorChange} from "./ColorSelector";
import AlwaysLiveRow from "./AlwaysLiveRow";
import WashEditor from "./WashEditor";
import ZoneState from "../models/ZoneState";
import ZoneStates from "../models/ZoneStates";
import BuildingBoard from "../models/BuildingBoard";
import BoxTitle from "./BoxTitle";
import {CuestackType} from "../models/Cuestack";
import Wash from "../models/Wash";
import WashZone from "../models/WashZone";

const initialWashStateHHS = {
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

const initialWashStatePAC = {
  z1: {enabled: false, intensity: 100, name: "z1"} as ZoneState,
  z2: {enabled: false, intensity: 100, name: "z2"} as ZoneState,
  z3: {enabled: false, intensity: 100, name: "z3"} as ZoneState,
  z4: {enabled: false, intensity: 100, name: "z4"} as ZoneState,
  z5: {enabled: false, intensity: 100, name: "z5"} as ZoneState,
  z6: {enabled: false, intensity: 100, name: "z6"} as ZoneState,
  UsSp: {enabled: false, intensity: 100, name: "UsSp"} as ZoneState,
  MsSp: {enabled: false, intensity: 100, name: "MsSp"} as ZoneState,
  SlSp: {enabled: false, intensity: 100, name: "SlSp"} as ZoneState,
  Apron: {enabled: false, intensity: 100, name: "Apron"} as ZoneState,
  wash: {enabled: false, intensity: 100, name: "wash"} as ZoneState
};

export default function Queuer() {

  // Vista Hook
  const vista = useVista();

  // Board type
  const [boardType, setBoardType] = useState<BuildingBoard>(BuildingBoard.PAC);

  // Cyc
  const [cycLive, setCycLive] = useState<ColorChange>({color: Color.OFF, intensity: 100});
  const [cycPreview, setCycPreview] = useState<ColorChange>({color: Color.OFF, intensity: 100});

  // Stage LEDs
  const [stageLive, setStageLive] = useState<ColorChange>({color: Color.OFF, intensity: 100});
  const [stagePreview, setStagePreview] = useState<ColorChange>({color: Color.OFF, intensity: 100});

  // Truss LEDs
  const [trussLive, setTrussLive] = useState<ColorChange>({color: Color.OFF, intensity: 100});
  const [trussPreview, setTrussPreview] = useState<ColorChange>({color: Color.OFF, intensity: 100});

  // Movers
  const [moversLive, setMoversLive] = useState<ColorChange>({color: Color.OFF, intensity: 100, spazzy: false});
  const [moversPreview, setMoversPreview] = useState<ColorChange>({color: Color.OFF, intensity: 100, spazzy: false});

  // Wash
  const [washPreview, setWashPreview] = useState<ZoneStates>(boardType === BuildingBoard.PAC ? initialWashStatePAC : initialWashStateHHS)
  const [washLive, setWashLive] = useState<ZoneStates>(boardType === BuildingBoard.PAC ? initialWashStatePAC : initialWashStateHHS)

  // Are we editing live?
  const [live, setLive] = useState<boolean>(false);

  // Get correct console based on state
  const buildingConsole = () => boardType === BuildingBoard.PAC ? PAC : HHS;

  // On Page Load
  useEffect(() => {
    // Get our board type from the server
    vista.getBuilding().then(b => setBoardType(b));

    // Add a new listener to update state
    vista.registerBoardEvent(cues => {
      interpretCues(cues);
    });

    // Get current board state
    vista.getBoardState().then(state => {
      interpretCues(state)
    })
  }, [])

  /**
   * Take an array of cues (presumably fired from somewhere else) and translate them into our state
   * @param cues
   */
  const interpretCues = (cues: CuestackTrigger[]) => {
    for(const cue of cues) {
      switch(cue.cuestack.type){
        case CuestackType.Cyc:
          setCycLive({color: cue.cuestack.cuestack_data as Color, intensity: cue.intensity})
          break;
        case CuestackType.Stage:
          setStageLive({color: cue.cuestack.cuestack_data as Color, intensity: cue.intensity})
          break;
        case CuestackType.Truss:
          setTrussLive({color: cue.cuestack.cuestack_data as Color, intensity: cue.intensity})
          break;
        case CuestackType.Wash:
          // Calculate whether this is to be enabled or not
          const name = cue.cuestack.cuestack_data as WashZone
          // Create a copy of the current state
          const newZoneStates = {...washLive};
          // Update intensity
          newZoneStates[name].intensity = cue.intensity
          // If we're not just updating intensity, we're toggling the state
          if(cue.mode !== CuestackTriggerMode.INTENSITY) {
            newZoneStates[name].enabled = cue.mode === CuestackTriggerMode.PLAY;
          }
          // Update State
          setWashLive(newZoneStates)
          break;
      }
    }
  }

  /**
   * Toggle live state. If we're in live going back to preview, we take our "live" state with us
   */
  const toggleLive = () => {
    if(live) {
      setLive(false);
      setWashPreview(washLive);
      setStagePreview(stageLive);
      setCycPreview(cycLive);
      setTrussPreview(trussLive);
    } else {
      setLive(true);
    }
  }


  /**
   * Update cyc state when the cyc selector is changed
   * @param val New State
   */
  const onCycChange = (val: ColorChange) => {
    if (live) {
      setCycLive(val);
      goCues(calculateCycCues(val));
    } else {
      setCycPreview(val);
    }
  }

  /**
   * Update stage-wash state when the stage-wash selector is changed
   * @param val New state
   */
  const onStageChange = (val: ColorChange) => {
    if(live) {
      setStageLive(val);
      goCues(calculateStageCues(val));
    } else {
      setStagePreview(val);
    }
  }

  /**
   * Update truss state when the truss selector is changed
   * @param val New state
   */
  const onTrussChange = (val: ColorChange) => {
    if(live) {
      setTrussLive(val);
      goCues(calculateTrussCues(val));
    } else {
      setTrussPreview(val);
    }
  }

  /**
   * Update mover state when the mover selector is changed
   * @param val New state
   */
  const onMoverChange = (val: ColorChange) => {
    if(live) {
      setMoversLive(val);
      goCues(calculateMoverCues(val));
    } else {
      setMoversPreview(val);
    }
  }

  /**
   * Update wash state when the wash selector is changed
   * @param val New state
   */
  const onWashChange = (val: ZoneStates) => {
    if(live) {
      setWashLive(val);
      goCues(calculateWashCues(val));
    } else {
      setWashPreview(val);
    }
  }

  /**
   * Push a set of cues to Vista. Used in live mode
   * @param queue queue of cues to send
   */
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

  /**
   * A BO, once triggered successfully, releases all cuestacks, in both live and preview mode
   */
  const onBo = () => {
    // Disable live
    setLive(false);

    // Reset preview states
    setCycPreview({color: Color.OFF, intensity: 100});
    setStagePreview({color: Color.OFF, intensity: 100});
    setTrussPreview({color: Color.OFF, intensity: 100, spazzy: false});
    setMoversPreview({color: Color.OFF, intensity: 100, spazzy: false});
    setWashPreview(boardType === BuildingBoard.PAC ? initialWashStatePAC : initialWashStateHHS);

    // Reset live states
    setCycLive({color: Color.OFF, intensity: 100});
    setStageLive({color: Color.OFF, intensity: 100});
    setTrussLive({color: Color.OFF, intensity: 100, spazzy: false});
    setMoversLive({color: Color.OFF, intensity: 100, spazzy: false});
    setWashLive(boardType === BuildingBoard.PAC ? initialWashStatePAC : initialWashStateHHS);
  }

  /**
   * Calculate the queues required to push the preview to live
   */
  const goPreview = () => {
    // If we're already in live mode, ignore
    if(live) return;

    // Generate cues Cues
    const queue = generateAllCues();

    // If there are actually cues to run
    if(queue.length > 0) {

      // Push The queue of cues to the socket
      vista.go(queue).then(success => {
        if(success) {
          // Push our preview state to live
          setCycLive(cycPreview);
          setStageLive(stagePreview);
          setWashLive(washPreview);
          setTrussLive(trussPreview);
          setMoversLive(moversPreview);
          setLive(true);
        } else {
          // TODO: Toast failure
        }
      });
    }
  }

  /**
   * Calculate the cues needed to achieve the vals wash state
   * @param vals the wash state desired to be achieved
   */
  const calculateWashCues = (vals: ZoneStates) => {
    const queue = [] as CuestackTrigger[];
    for(let zone in vals) {
      if(vals.hasOwnProperty(zone)) {
        if(vals[zone].enabled === washLive[zone].enabled && vals[zone].intensity === washLive[zone].intensity) continue; // skip if no changes
        queue.push({
          intensity: vals[zone].intensity,
          cuestack: buildingConsole().wash(vals[zone].name),
          // if it's on in live, just adjust intensity
          mode: washLive[zone].enabled && vals[zone].enabled ? CuestackTriggerMode.INTENSITY :
                vals[zone].enabled ? CuestackTriggerMode.PLAY : CuestackTriggerMode.RELEASE
        })
      }
    }

    return queue;
  }

  /**
   * Calculate the cues needed to achieve the vals stage-wash state
   * @param vals the stage-wash state desired to be achieved
   */
  const calculateStageCues = (vals: ColorChange) => {
    const queue = [] as CuestackTrigger[];
    if(stageLive.color !== vals.color) {    // Both color changed
      queue.push({
        intensity: vals.intensity,
        cuestack: buildingConsole().stage(vals.color === Color.OFF ? stageLive.color : vals.color),
        mode: vals.color === Color.OFF ? CuestackTriggerMode.RELEASE : CuestackTriggerMode.PLAY
      });
    } else if (stageLive.color === vals.color && stageLive.intensity !== vals.intensity) { // only intensity changed
      queue.push({
        intensity: vals.intensity,
        cuestack: buildingConsole().stage(vals.color),
        mode: CuestackTriggerMode.INTENSITY
      });
    }

    return queue;
  }

  /**
   * Calculate the cues needed to achieve the desired truss state
   * @param vals the truss state desired to be achieved
   */
  const calculateTrussCues = (vals: ColorChange) => {
    const queue = [] as CuestackTrigger[];
    const cs = buildingConsole();
    // If we don't have a truss function configured, ignore
    if(!cs.truss) return queue;
    if(trussLive.color !== vals.color) {    // Both color changed
      queue.push({
        intensity: vals.intensity,
        cuestack: cs.truss(vals.color === Color.OFF ? trussLive.color : vals.color),
        mode: vals.color === Color.OFF ? CuestackTriggerMode.RELEASE : CuestackTriggerMode.PLAY
      });
    } else if (trussLive.color === vals.color && trussLive.intensity !== vals.intensity) { // only intensity changed
      queue.push({
        intensity: vals.intensity,
        cuestack: cs.truss(vals.color),
        mode: CuestackTriggerMode.INTENSITY
      });
    }
    // Check "Spazzy"
    if(vals.spazzy && !trussLive.spazzy) {
      queue.push({
        intensity: 100,
        cuestack: cs.truss(Color.SPAZZY),
        mode: CuestackTriggerMode.PLAY
      });
    } else if (!vals.spazzy && trussLive.spazzy) { // Spazzy is on, but is requested to be off
      queue.push({
        intensity: 100,
        cuestack: cs.truss(Color.SPAZZY),
        mode: CuestackTriggerMode.RELEASE
      });
    }

    return queue;
  }

  /**
   * Calculate the cues needed to achieve the desired mover state
   * @param vals the mover state desired to be achieved
   */
  const calculateMoverCues = (vals: ColorChange) => {
    const queue = [] as CuestackTrigger[];
    const cs = buildingConsole();
    // If we don't have a truss function configured, ignore
    if(!cs.mover) return queue;
    if(trussLive.color !== vals.color) {    // Both color changed
      queue.push({
        intensity: vals.intensity,
        cuestack: cs.mover(vals.color === Color.OFF ? moversLive.color : vals.color),
        mode: vals.color === Color.OFF ? CuestackTriggerMode.RELEASE : CuestackTriggerMode.PLAY
      });
    } else if (moversLive.color === vals.color && moversLive.intensity !== vals.intensity) { // only intensity changed
      queue.push({
        intensity: vals.intensity,
        cuestack: cs.mover(vals.color),
        mode: CuestackTriggerMode.INTENSITY
      });
    }
    // Check "Spazzy"
    if(vals.spazzy && !moversLive.spazzy) {
      queue.push({
        intensity: 100,
        cuestack: cs.mover(Color.SPECIAL),
        mode: CuestackTriggerMode.PLAY
      });
    } else if (!vals.spazzy && moversLive.spazzy) { // Spazzy is on, but is requested to be off
      queue.push({
        intensity: 100,
        cuestack: cs.mover(Color.SPECIAL),
        mode: CuestackTriggerMode.RELEASE
      });
    }

    return queue;
  }

  /**
   * Calculate the cues needed to achieve the desired cyc state
   * @param vals the cyc state desired to be achieved
   */
   const calculateCycCues = (vals: ColorChange) => {
     const queue = [] as CuestackTrigger[];
     if(cycLive.color !== vals.color) {    // Both color changed
       queue.push({
         intensity: vals.intensity,
         cuestack: buildingConsole().cyc(vals.color === Color.OFF ? cycLive.color : vals.color),
         mode: vals.color === Color.OFF ? CuestackTriggerMode.RELEASE : CuestackTriggerMode.PLAY
       });
     } else if (cycLive.color === vals.color && cycLive.intensity !== vals.intensity) { // only intensity changed
       queue.push({
         intensity: vals.intensity,
         cuestack: buildingConsole().cyc(vals.color),
         mode: CuestackTriggerMode.INTENSITY
       });
     }

     return queue;
   }

  /**
   * Generate all cues needed to achieve the overall state, and put them in an array
   */
  const generateAllCues = (): CuestackTrigger[] => {
    return [
      ...calculateWashCues(washPreview),
      ...calculateCycCues(cycPreview),
      ...calculateStageCues(stagePreview),
      ...(boardType === BuildingBoard.PAC ? calculateTrussCues(trussPreview) : []),
      ...(boardType === BuildingBoard.PAC ? calculateMoverCues(moversPreview) : [])
    ];
  }

  return (
    <Grid container direction={'column'} sx={{height: '100vh'}} spacing={0}>

      {/* Mode Header / Header Buttons */}
      <Grid item>
        <Box sx={{background: live ? "rgba(255, 0, 0, .5)" : "grey"}}>
          <Typography sx={{textAlign: 'center'}} variant={'h2'}>{live ? "LIVE EDITING" : "Queueing Mode"}</Typography>
        </Box>
        <ButtonGroup orientation={"horizontal"} size={"large"} fullWidth>
          <Button variant={'contained'} onClick={() => {toggleLive()}}>{live ? "TO QUEUING MODE" : "ENTER LIVE MODE"}</Button>
          <Button variant={'contained'} onClick={() => {goPreview()}} disabled={live}>Please</Button>
        </ButtonGroup>
      </Grid>

      {/* Cyc / Stage / Truss / Wash Selectors */}
      <Grid item sx={{maxHeight: "500px"}}>
        <Grid container direction={'row'} spacing={2} justifyContent={"center"}>

          {/* Cyc Selector */}
          <Grid item xs={2.8} sx={{height: '100%'}}>
            <BoxTitle title={"Cyc"}>
              <ColorSelector onChange={onCycChange} value={live ? cycLive : cycPreview} building={boardType} cyc />
            </BoxTitle>
          </Grid>

          {/* Stage Wash Selector */}
          <Grid item xs={1.8} sx={{height: '100%'}}>
            <BoxTitle title={"Stage"}>
              <ColorSelector onChange={onStageChange} value={live ? stageLive : stagePreview} building={boardType} />
            </BoxTitle>
          </Grid>

          {/* Truss Selector */}
          {boardType === BuildingBoard.PAC && // Only show if the building board is PAC
            <Grid item xs={2.2} sx={{height: '100%'}}>
              <BoxTitle title={"Truss"}>
                <ColorSelector onChange={onTrussChange} value={live ? trussLive : trussPreview} building={boardType} truss/>
              </BoxTitle>
            </Grid>
          }

          {/* Mover Selector */}
          {boardType === BuildingBoard.PAC && // Only show if the building board is PAC
            <Grid item xs={1.8} sx={{height: '100%'}}>
              <BoxTitle title={"Movers"}>
                <ColorSelector onChange={onMoverChange} value={live ? moversLive : moversPreview} building={boardType} mover/>
              </BoxTitle>
            </Grid>
          }

          {/* Wash Selector */}
          <Grid item xs={3}>
            <BoxTitle title={"Wash"}>
              <WashEditor onChange={onWashChange} value={live ? washLive : washPreview} board={boardType}/>
            </BoxTitle>
          </Grid>

        </Grid>
      </Grid>

      {/* Always Live Row */}
      <Grid item>
        <BoxTitle title={"Always Live"}>
          <AlwaysLiveRow onBo={() => onBo()} buildingConsole={buildingConsole} building={boardType} />
        </BoxTitle>
      </Grid>

    </Grid>
  );
}
