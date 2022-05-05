import Cuestack, {CuestackType} from "../models/Cuestack";
import Color from "../models/Color";
import BOType from "../models/BO";
import WashZone from "../models/WashZone";
import Console, {Board} from "../models/Console";
import Wash from "../models/Wash";
import BO from "../models/BO";

const board: Board = {
  // Console 1, Top Bank
  CYC_RED:      {console: 1, position: 0, number: 10, name: "Cyc Red", type: CuestackType.Cyc, cuestack_data: Color.RED },
  CYC_GREEN:    {console: 1, position: 1, number: 11, name: "Cyc Green", type: CuestackType.Cyc, cuestack_data: Color.GREEN },
  CYC_BLUE:     {console: 1, position: 2, number: 12, name: "Cyc Blue", type: CuestackType.Cyc, cuestack_data: Color.BLUE },
  CYC_PINK:     {console: 1, position: 3, number: 13, name: "Cyc Pink", type: CuestackType.Cyc, cuestack_data: Color.PINK },
  CYC_YELLOW:   {console: 1, position: 4, number: 14, name: "Cyc Yellow", type: CuestackType.Cyc, cuestack_data: Color.YELLOW },
  CYC_TEAL:     {console: 1, position: 5, number: 15, name: "Cyc Teal", type: CuestackType.Cyc, cuestack_data: Color.TEAL },
  CYC_MAGENTA:  {console: 1, position: 6, number: 16, name: "Cyc Magenta", type: CuestackType.Cyc, cuestack_data: Color.MAGENTA },
  CYC_PURPLE:   {console: 1, position: 7, number: 17, name: "Cyc Purple", type: CuestackType.Cyc, cuestack_data: Color.PURPLE },
  CYC_ORANGE:   {console: 1, position: 8, number: 18, name: "Cyc Orange", type: CuestackType.Cyc, cuestack_data: Color.ORANGE },
  CYC_WHITE:    {console: 1, position: 9, number: 19, name: "Cyc White", type: CuestackType.Cyc, cuestack_data: Color.WHITE },
  // Console 1, Lower Bank
  STAGE_RED:      {console: 1, position: 10, number: 60, name: "Stage Red", type: CuestackType.Stage, cuestack_data: Color.RED },
  STAGE_GREEN:    {console: 1, position: 11, number: 62, name: "Stage Green", type: CuestackType.Stage, cuestack_data: Color.GREEN },
  STAGE_BLUE:     {console: 1, position: 12, number: 61, name: "Stage Blue", type: CuestackType.Stage, cuestack_data: Color.BLUE },
  STAGE_PINK:     {console: 1, position: 13, number: 63, name: "Stage Pink", type: CuestackType.Stage, cuestack_data: Color.PINK },
  STAGE_YELLOW:   {console: 1, position: 14, number: 64, name: "Stage Yellow", type: CuestackType.Stage, cuestack_data: Color.YELLOW },
  STAGE_TEAL:     {console: 1, position: 15, number: 69, name: "Stage Teal", type: CuestackType.Stage, cuestack_data: Color.TEAL },
  STAGE_MAGENTA:  {console: 1, position: 16, number: 67, name: "Stage Magenta", type: CuestackType.Stage, cuestack_data: Color.MAGENTA },
  STAGE_PURPLE:   {console: 1, position: 17, number: 68, name: "Stage Purple", type: CuestackType.Stage, cuestack_data: Color.PURPLE },
  STAGE_ORANGE:   {console: 1, position: 18, number: 64, name: "Stage Orange", type: CuestackType.Stage, cuestack_data: Color.ORANGE },
  STAGE_WHITE:    {console: 1, position: 19, number: 70, name: "Stage White", type: CuestackType.Stage, cuestack_data: Color.WHITE },

  // Console 2, Upper Bank
  CYC_RAINBOW:        {console: 2, position: 0, number: 20, name: "Cyc Rainbow", type: CuestackType.Cyc, cuestack_data: Color.RAINBOW },
  CYC_R_B:            {console: 2, position: 1, number: 21, name: "Cyc Red|Blue", type: CuestackType.Cyc, cuestack_data: Color.RB },
  CYC_TWINKLE:        {console: 2, position: 2, number: 22, name: "Cyc Twinkle", type: CuestackType.Cyc, cuestack_data: Color.TWINKLE },
  CYC_ROYGBIV:        {console: 2, position: 3, number: 23, name: "Cyc ROYGBIV", type: CuestackType.Cyc, cuestack_data: Color.ROYGBIV },
  CYC_SPAZZY:         {console: 2, position: 4, number: 24, name: "Cyc Spazzy", type: CuestackType.Cyc, cuestack_data: Color.SPAZZY },
  CYC_RED_SPAZZY:     {console: 2, position: 5, number: 25, name: "Cyc Red Spazzy", type: CuestackType.Cyc, cuestack_data: Color.RSPAZZY },
  CYC_BLUE_SPAZZY:    {console: 2, position: 6, number: 26, name: "Cyc Blue Spazzy", type: CuestackType.Cyc, cuestack_data: Color.BSPAZZY },
  CYC_GREEN_SPAZZY:   {console: 2, position: 7, number: 27, name: "Cyc Green Spazzy", type: CuestackType.Cyc, cuestack_data: Color.GSPAZZY },
  CYC_PURPLE_SPAZZY:  {console: 2, position: 8, number: 28, name: "Cyc Purple Spazzy", type: CuestackType.Cyc, cuestack_data: Color.PSPAZZY },
  CYC_POTY :          {console: 2, position: 9, number: 29, name: "Cyc POTY", type: CuestackType.Cyc, cuestack_data: Color.POTY },
  // Console 2, Lower Bank
  WASH:           {console: 2, position: 10, number: 30, name: "Wash", type: CuestackType.Wash, cuestack_data: Wash.WASH },
  DS_CTR:         {console: 2, position: 11, number: 31, name: "DS Center", type: CuestackType.Wash, cuestack_data: Wash.DS_CENTER },
  MS_CTR:         {console: 2, position: 12, number: 32, name: "MS Center", type: CuestackType.Wash, cuestack_data: Wash.MS_CENTER },
  US_CTR:         {console: 2, position: 13, number: 115, name: "US Center", type: CuestackType.Wash, cuestack_data: Wash.US_CENTER },
  FRONT_MIDS:     {console: 2, position: 14, number: 163, name: "Front Mids", type: CuestackType.Other },
  BO_2:           {console: 2, position: 15, number: 50, name: "2s Blackout", type: CuestackType.BO, cuestack_data: BO.Two },
  BO_CUT:         {console: 2, position: 16, number: 51, name: "Cut Blackout", type: CuestackType.BO, cuestack_data: BO.Cut },
  BO_5:           {console: 2, position: 17, number: 52, name: "5s Blackout", type: CuestackType.BO, cuestack_data: BO.Five },
  BO_10:          {console: 2, position: 18, number: 53, name: "10s Blackout", type: CuestackType.BO, cuestack_data: BO.Ten },
  BABY:           {console: 2, position: 19, number: 110, name: "Baby Lights", type: CuestackType.Baby },

  // Console 3, Upper Bank
  SKY:          {console: 3, position: 0, number: 8, name: "Sky Lights", type: CuestackType.Other },
  BACK_BLUE:    {console: 3, position: 1, number: 111, name: "Back Blues", type: CuestackType.Other },
  BACK_BLUE_2:  {console: 3, position: 2, number: 7, name: "Back Blues 2", type: CuestackType.Other },
  ROPES:        {console: 3, position: 3, number: 6, name: "Ropes", type: CuestackType.Other },
  WORKS:        {console: 3, position: 4, number: 5, name: "Works", type: CuestackType.Other },
  WARMERS:      {console: 3, position: 5, number: 4, name: "Warmers", type: CuestackType.Other },
  CITY:         {console: 3, position: 6, number: 2, name: "City", type: CuestackType.Other },
  PIT_COVER:    {console: 3, position: 7, number: 130, name: "Pit Cover", type: CuestackType.Other },
  RAMP:         {console: 3, position: 8, number: 3, name: "Ramp", type: CuestackType.Other },
  HOUSE:        {console: 3, position: 9, number: 1, name: "House", type: CuestackType.House },

  // Console 3, Lower Bank
  ZONE_1: {console: 3, position: 10, number: 101, name: "Zone 1", type: CuestackType.Wash, cuestack_data: Wash.Z1 },
  ZONE_2: {console: 3, position: 11, number: 102, name: "Zone 2", type: CuestackType.Wash, cuestack_data: Wash.Z2 },
  ZONE_3: {console: 3, position: 12, number: 103, name: "Zone 3", type: CuestackType.Wash, cuestack_data: Wash.Z3 },
  ZONE_4: {console: 3, position: 13, number: 104, name: "Zone 4", type: CuestackType.Wash, cuestack_data: Wash.Z4 },
  ZONE_5: {console: 3, position: 14, number: 105, name: "Zone 5", type: CuestackType.Wash, cuestack_data: Wash.Z5 },
  ZONE_6: {console: 3, position: 15, number: 106, name: "Zone 6", type: CuestackType.Wash, cuestack_data: Wash.Z6 },
  ZONE_7: {console: 3, position: 16, number: 107, name: "Zone 7", type: CuestackType.Wash, cuestack_data: Wash.Z7 },
  ZONE_8: {console: 3, position: 17, number: 108, name: "Zone 8", type: CuestackType.Wash, cuestack_data: Wash.Z8 },
  ZONE_9: {console: 3, position: 18, number: 109, name: "Zone 9", type: CuestackType.Wash, cuestack_data: Wash.Z9 },
  UNUSED: {console: 3, position: 19, number: 110, name: "UNUSED", type: CuestackType.Other },
};

function cyc(color: Color): Cuestack {
  switch(color) {
    case Color.RED: return board.CYC_RED;
    case Color.GREEN: return board.CYC_GREEN;
    case Color.BLUE: return board.CYC_BLUE;
    case Color.PINK: return board.CYC_PINK;
    case Color.YELLOW: return board.CYC_YELLOW;
    case Color.TEAL: return board.CYC_TEAL;
    case Color.MAGENTA: return board.CYC_MAGENTA;
    case Color.PURPLE: return board.CYC_PURPLE;
    case Color.ORANGE: return board.CYC_ORANGE;
    case Color.WHITE: return board.CYC_WHITE;
    case Color.RAINBOW: return board.CYC_RAINBOW;
    case Color.RB: return board.CYC_R_B;
    case Color.TWINKLE: return board.CYC_TWINKLE;
    case Color.ROYGBIV: return board.CYC_ROYGBIV;
    case Color.SPAZZY: return board.CYC_SPAZZY;
    case Color.RSPAZZY: return board.CYC_RED_SPAZZY;
    case Color.BSPAZZY: return board.CYC_BLUE_SPAZZY;
    case Color.GSPAZZY: return board.CYC_GREEN_SPAZZY;
    case Color.PSPAZZY: return board.CYC_PURPLE_SPAZZY;
    case Color.POTY: return board.CYC_POTY;
    default: return board.CYC_WHITE;
  }
}

function stage(color: Color): Cuestack {
  switch(color) {
    case Color.RED: return board.STAGE_RED;
    case Color.GREEN: return board.STAGE_GREEN;
    case Color.BLUE: return board.STAGE_BLUE;
    case Color.PINK: return board.STAGE_PINK;
    case Color.YELLOW: return board.STAGE_YELLOW;
    case Color.TEAL: return board.STAGE_TEAL;
    case Color.MAGENTA: return board.STAGE_MAGENTA;
    case Color.PURPLE: return board.STAGE_PURPLE;
    case Color.ORANGE: return board.STAGE_ORANGE;
    case Color.WHITE: return board.STAGE_WHITE;
    default: return board.STAGE_WHITE;
  }
}

function bo(mode: BOType): Cuestack {
  switch(mode) {
    case BOType.Cut: return board.BO_CUT
    case BOType.Two: return board.BO_2
    case BOType.Five: return board.BO_5
    case BOType.Ten: return board.BO_10
    default: return board.BO_2;
  }
}

function wash(zone: WashZone): Cuestack {
  switch(zone) {
    case "z1": return board.ZONE_1;
    case "z2": return board.ZONE_2;
    case "z3": return board.ZONE_3;
    case "z4": return board.ZONE_4;
    case "z5": return board.ZONE_5;
    case "z6": return board.ZONE_6;
    case "z7": return board.ZONE_7;
    case "z8": return board.ZONE_8;
    case "z9": return board.ZONE_9;
    case "UsSp": return board.US_CTR;
    case "MsSp": return board.MS_CTR;
    case "DsSp": return board.DS_CTR;
    case "wash": return board.WASH;
  }
}

const HHS: Console = {cyc, stage, wash, bo, board}

export default HHS;