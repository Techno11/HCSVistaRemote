import Cuestack from "../models/Cuestack";
import Color from "../models/Color";
import WashType from "../models/Wash";
import BOType from "../models/BO";

const board = {
  // Console 1, Top Bank
  CYC_RED:      {console: 1, position: 0, number: 10, name: "Cyc Red"} as Cuestack,
  CYC_GREEN:    {console: 1, position: 1, number: 11, name: "Cyc Green" } as Cuestack,
  CYC_BLUE:     {console: 1, position: 2, number: 12, name: "Cyc Blue" } as Cuestack,
  CYC_PINK:     {console: 1, position: 3, number: 13, name: "Cyc Pink" } as Cuestack,
  CYC_YELLOW:   {console: 1, position: 4, number: 14, name: "Cyc Yellow" } as Cuestack,
  CYC_TEAL:     {console: 1, position: 5, number: 15, name: "Cyc Teal" } as Cuestack,
  CYC_MAGENTA:  {console: 1, position: 6, number: 16, name: "Cyc Magenta" } as Cuestack,
  CYC_PURPLE:   {console: 1, position: 7, number: 17, name: "Cyc Purple" } as Cuestack,
  CYC_ORANGE:   {console: 1, position: 8, number: 18, name: "Cyc Orange" } as Cuestack,
  CYC_WHITE:    {console: 1, position: 9, number: 19, name: "Cyc White" } as Cuestack,
  // Console 1, Lower Bank
  STAGE_RED:      {console: 1, position: 10, number: 60, name: "Stage Red" } as Cuestack,
  STAGE_GREEN:    {console: 1, position: 11, number: 62, name: "Stage Green" } as Cuestack,
  STAGE_BLUE:     {console: 1, position: 12, number: 61, name: "Stage Blue" } as Cuestack,
  STAGE_PINK:     {console: 1, position: 13, number: 63, name: "Stage Pink" } as Cuestack,
  STAGE_YELLOW:   {console: 1, position: 14, number: 64, name: "Stage Yellow" } as Cuestack,
  STAGE_TEAL:     {console: 1, position: 15, number: 69, name: "Stage Teal" } as Cuestack,
  STAGE_MAGENTA:  {console: 1, position: 16, number: 67, name: "Stage Magenta" } as Cuestack,
  STAGE_PURPLE:   {console: 1, position: 17, number: 68, name: "Stage Purple" } as Cuestack,
  STAGE_ORANGE:   {console: 1, position: 18, number: 64, name: "Stage Orange" } as Cuestack,
  STAGE_WHITE:    {console: 1, position: 19, number: 70, name: "Stage White" } as Cuestack,

  // Console 2, Upper Bank
  CYC_RAINBOW:        {console: 2, position: 0, number: 20, name: "Cyc Rainbow" } as Cuestack,
  CYC_R_B:            {console: 2, position: 1, number: 21, name: "Cyc Red|Blue" } as Cuestack,
  CYC_TWINKLE:        {console: 2, position: 2, number: 22, name: "Cyc Twinkle" } as Cuestack,
  CYC_ROYGBIV:        {console: 2, position: 3, number: 23, name: "Cyc ROYGBIV" } as Cuestack,
  CYC_SPAZZY:         {console: 2, position: 4, number: 24, name: "Cyc Spazzy" } as Cuestack,
  CYC_RED_SPAZZY:     {console: 2, position: 5, number: 25, name: "Cyc Red Spazzy" } as Cuestack,
  CYC_BLUE_SPAZZY:    {console: 2, position: 6, number: 26, name: "Cyc Blue Spazzy" } as Cuestack,
  CYC_GREEN_SPAZZY:   {console: 2, position: 7, number: 27, name: "Cyc Green Spazzy" } as Cuestack,
  CYC_PURPLE_SPAZZY:  {console: 2, position: 8, number: 28, name: "Cyc Purple Spazzy" } as Cuestack,
  CYC_POTY :          {console: 2, position: 9, number: 29, name: "Cyc POTY" } as Cuestack,
  // Console 2, Lower Bank
  BABY:           {console: 2, position: 10, number: 140, name: "Baby Lights" } as Cuestack,
  DS_CTR:         {console: 2, position: 11, number: 31, name: "DS Center" } as Cuestack,
  MS_CTR:         {console: 2, position: 12, number: 32, name: "MS Center" } as Cuestack,
  US_CTR:         {console: 2, position: 13, number: 115, name: "US Center" } as Cuestack,
  FRONT_MIDS:     {console: 2, position: 14, number: 163, name: "Front Mids" } as Cuestack,
  BO_2:           {console: 2, position: 15, number: 50, name: "2s Blackout" } as Cuestack,
  BO_CUT:         {console: 2, position: 16, number: 51, name: "Cut Blackout" } as Cuestack,
  BO_5:           {console: 2, position: 17, number: 52, name: "5s Blackout" } as Cuestack,
  BO_10:          {console: 2, position: 18, number: 53, name: "10s Blackout" } as Cuestack,
  UNUSED:         {console: 2, position: 19, number: 54, name: "UNUSED" } as Cuestack,

  // Console 3, Upper Bank
  SKY:          {console: 3, position: 0, number: 8, name: "Sky Lights" } as Cuestack,
  BACK_BLUE:    {console: 3, position: 1, number: 111, name: "Back Blues" } as Cuestack,
  BACK_BLUE_2:  {console: 3, position: 2, number: 7, name: "Back Blues 2" } as Cuestack,
  ROPES:        {console: 3, position: 3, number: 6, name: "Ropes" } as Cuestack,
  WORKS:        {console: 3, position: 4, number: 5, name: "Works" } as Cuestack,
  WARMERS:      {console: 3, position: 5, number: 4, name: "Warmers" } as Cuestack,
  CITY:         {console: 3, position: 6, number: 2, name: "City" } as Cuestack,
  PIT_COVER:    {console: 3, position: 7, number: 130, name: "Pit Cover" } as Cuestack,
  RAMP:         {console: 3, position: 8, number: 3, name: "Ramp" } as Cuestack,
  HOUSE:        {console: 3, position: 9, number: 1, name: "House" } as Cuestack,

  // Console 3, Lower Bank
  ZONE_1: {console: 3, position: 10, number: 101, name: "Zone 1" } as Cuestack,
  ZONE_2: {console: 3, position: 11, number: 102, name: "Zone 2" } as Cuestack,
  ZONE_3: {console: 3, position: 12, number: 103, name: "Zone 3" } as Cuestack,
  ZONE_4: {console: 3, position: 13, number: 104, name: "Zone 4" } as Cuestack,
  ZONE_5: {console: 3, position: 14, number: 105, name: "Zone 5" } as Cuestack,
  ZONE_6: {console: 3, position: 15, number: 106, name: "Zone 6" } as Cuestack,
  ZONE_7: {console: 3, position: 16, number: 107, name: "Zone 7" } as Cuestack,
  ZONE_8: {console: 3, position: 17, number: 108, name: "Zone 8" } as Cuestack,
  ZONE_9: {console: 3, position: 18, number: 109, name: "Zone 9" } as Cuestack,
  WASH:   {console: 3, position: 19, number: 30, name: "Wash" } as Cuestack,
}

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

function wash(mode: WashType) {
  switch(mode) {
    case WashType.WASH: return board.WASH;
    case WashType.FRONT_MIDS: return board.FRONT_MIDS;
    case WashType.DS_CENTER: return board.DS_CTR;
    case WashType.MS_CENTER: return board.MS_CTR;
    case WashType.US_CENTER: return board.US_CTR;
    case WashType.Z1: return board.ZONE_1;
    case WashType.Z2: return board.ZONE_2;
    case WashType.Z3: return board.ZONE_3;
    case WashType.Z4: return board.ZONE_4;
    case WashType.Z5: return board.ZONE_5;
    case WashType.Z6: return board.ZONE_6;
    case WashType.Z7: return board.ZONE_7;
    case WashType.Z8: return board.ZONE_8;
    case WashType.Z9: return board.ZONE_9;
    default: return board.WASH;
  }
}

function bo(mode: BOType) {
  switch(mode) {
    case BOType.Cut: return board.BO_CUT
    case BOType.Two: return board.BO_2
    case BOType.Five: return board.BO_5
    case BOType.Ten: return board.BO_10
    default: return board.BO_2;
  }
}

export {cyc, stage, wash, bo, board}