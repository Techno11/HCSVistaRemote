import Cuestack, {CuestackType} from "../models/Cuestack";
import Color from "../models/Color";
import BOType from "../models/BO";
import WashZone from "../models/WashZone";
import Console, {Board} from "../models/Console";
import Wash from "../models/Wash";
import BO from "../models/BO";

const board: Board = {
  // Console 1, Top Bank
  CYC_RED:      {console: 1, position: 0, number: 1, name: "Cyc Red", type: CuestackType.Cyc, cuestack_data: Color.RED },
  CYC_GREEN:    {console: 1, position: 1, number: 2, name: "Cyc Green", type: CuestackType.Cyc, cuestack_data: Color.GREEN },
  CYC_BLUE:     {console: 1, position: 2, number: 3, name: "Cyc Blue", type: CuestackType.Cyc, cuestack_data: Color.BLUE },
  CYC_PINK:     {console: 1, position: 3, number: 4, name: "Cyc Pink", type: CuestackType.Cyc, cuestack_data: Color.PINK },
  CYC_ORANGE:   {console: 1, position: 4, number: 5, name: "Cyc Orange", type: CuestackType.Cyc, cuestack_data: Color.ORANGE },
  CYC_MAGENTA:  {console: 1, position: 5, number: 6, name: "Cyc Magenta", type: CuestackType.Cyc, cuestack_data: Color.MAGENTA },
  CYC_TEAL:     {console: 1, position: 6, number: 7, name: "Cyc Teal", type: CuestackType.Cyc, cuestack_data: Color.TEAL },
  CYC_PURPLE:   {console: 1, position: 7, number: 8, name: "Cyc Purple", type: CuestackType.Cyc, cuestack_data: Color.PURPLE },
  CYC_YELLOW:   {console: 1, position: 8, number: 9, name: "Cyc Yellow", type: CuestackType.Cyc, cuestack_data: Color.YELLOW },
  CYC_WHITE:    {console: 1, position: 9, number: 10, name: "Cyc White", type: CuestackType.Cyc, cuestack_data: Color.WHITE },
  // Console 1, Lower Bank
  STAGE_RED:      {console: 1, position: 10, number: 26, name: "Stage Red", type: CuestackType.Stage, cuestack_data: Color.RED },
  STAGE_GREEN:    {console: 1, position: 11, number: 27, name: "Stage Green", type: CuestackType.Stage, cuestack_data: Color.GREEN },
  STAGE_BLUE:     {console: 1, position: 12, number: 28, name: "Stage Blue", type: CuestackType.Stage, cuestack_data: Color.BLUE },
  STAGE_PINK:     {console: 1, position: 13, number: 36, name: "Stage Pink", type: CuestackType.Stage, cuestack_data: Color.PINK },
  STAGE_ORANGE:   {console: 1, position: 14, number: 32, name: "Stage Orange", type: CuestackType.Stage, cuestack_data: Color.ORANGE },
  STAGE_MAGENTA:  {console: 1, position: 15, number: 119, name: "Stage Magenta", type: CuestackType.Stage, cuestack_data: Color.MAGENTA },
  STAGE_TEAL:     {console: 1, position: 16, number: 29, name: "Stage Teal", type: CuestackType.Stage, cuestack_data: Color.TEAL },
  STAGE_PURPLE:   {console: 1, position: 17, number: 30, name: "Stage Purple", type: CuestackType.Stage, cuestack_data: Color.PURPLE },
  STAGE_YELLOW:   {console: 1, position: 18, number: 31, name: "Stage Yellow", type: CuestackType.Stage, cuestack_data: Color.YELLOW },
  STAGE_WHITE:    {console: 1, position: 19, number: 35, name: "Stage White", type: CuestackType.Stage, cuestack_data: Color.WHITE },

  // Console 2, Upper Bank
  CYC_R_B:            {console: 2, position: 0, number: 11, name: "Cyc Red|Blue", type: CuestackType.Cyc, cuestack_data: Color.RB },
  CYC_R_O:            {console: 2, position: 1, number: 12, name: "Cyc Red|Orange", type: CuestackType.Cyc, cuestack_data: Color.RO }, // RO
  CYC_B_G:            {console: 2, position: 2, number: 13, name: "Cyc Blue|Green", type: CuestackType.Cyc, cuestack_data: Color.BG }, // BG
  CYC_OPY:            {console: 2, position: 3, number: 14, name: "Cyc OPY", type: CuestackType.Cyc, cuestack_data: Color.OPY }, // OPY
  CYC_BRGPY:          {console: 2, position: 4, number: 15, name: "Cyc BRGPY", type: CuestackType.Cyc, cuestack_data: Color.BRGPY }, // BRGPY
  CYC_ROYGBIV:        {console: 2, position: 5, number: 16, name: "Cyc ROYGBIV", type: CuestackType.Cyc, cuestack_data: Color.ROYGBIV },
  CYC_R_W_B:          {console: 2, position: 6, number: 125, name: "Cyc RWB", type: CuestackType.Cyc, cuestack_data: Color.RWB }, // RWB
  CYC_SPAZZY:         {console: 2, position: 7, number: 18, name: "Cyc Spazzy", type: CuestackType.Cyc, cuestack_data: Color.SPAZZY },
  CYC_RAINBOW:        {console: 2, position: 8, number: 19, name: "Cyc Rainbow", type: CuestackType.Cyc, cuestack_data: Color.RAINBOW },
  CYC_SPECIAL:        {console: 2, position: 9, number: 20, name: "Cyc Special", type: CuestackType.Cyc, cuestack_data: Color.SPECIAL }, // "Special"

  // Console 2, Lower Bank
  WASH:           {console: 2, position: 10, number: 80, name: "Wash", type: CuestackType.Wash, cuestack_data: Wash.WASH },
  MS_CTR:         {console: 2, position: 11, number: 83, name: "MS Center", type: CuestackType.Wash, cuestack_data: Wash.MS_CENTER },
  US_CTR:         {console: 2, position: 12, number: 84, name: "US Center", type: CuestackType.Wash, cuestack_data: Wash.US_CENTER },
  SL_CTR:         {console: 2, position: 13, number: 85, name: "Stage Left Center", type: CuestackType.Wash, cuestack_data: Wash.SL_CENTER },
  BRICKS:         {console: 2, position: 14, number: 86, name: "Bricks", type: CuestackType.Other },
  BO_2:           {console: 2, position: 15, number: 51, name: "2s Blackout", type: CuestackType.BO, cuestack_data: BO.Two },
  BO_CUT:         {console: 2, position: 16, number: 52, name: "Cut Blackout", type: CuestackType.BO, cuestack_data: BO.Cut },
  BO_5:           {console: 2, position: 17, number: 53, name: "5s Blackout", type: CuestackType.BO, cuestack_data: BO.Five },
  BO_10:          {console: 2, position: 18, number: 54, name: "10s Blackout", type: CuestackType.BO, cuestack_data: BO.Ten },
  BABY:           {console: 2, position: 19, number: 88, name: "Baby Lights", type: CuestackType.Baby },

  // Console 3, Upper Bank
  M_SPECIAL:    {console: 3, position: 0, number: 159, name: "Mover Special", type: CuestackType.Other },
  UNUSED5:      {console: 3, position: 1, number: -1, name: "UNUSED", type: CuestackType.Other },
  T_SPAZZY:     {console: 3, position: 2, number: 158, name: "Truss Spazzy", type: CuestackType.Other },
  M_HOME:       {console: 3, position: 3, number: 160, name: "Mover Home", type: CuestackType.Other },
  LED_AA:       {console: 3, position: 4, number: 142, name: "LED Always On", type: CuestackType.Other },
  DANCE:        {console: 3, position: 5, number: 118, name: "Dance", type: CuestackType.Other },
  UNUSED6:      {console: 3, position: 6, number: -1, name: "UNUSED", type: CuestackType.Other },
  FLAGS:        {console: 3, position: 7, number: 187, name: "Flags", type: CuestackType.Other },
  HOUSE:        {console: 3, position: 8, number: 99, name: "House", type: CuestackType.House },
  REHEARSE:     {console: 3, position: 9, number: 89, name: "Rehearse", type: CuestackType.Other },

  // Console 3, Lower Bank
  M_RED:      {console: 3, position: 10, number: 131, name: "Mover Red", type: CuestackType.Mover, cuestack_data: Color.RED },
  M_GREEN:    {console: 3, position: 11, number: 132, name: "Mover Green", type: CuestackType.Mover, cuestack_data: Color.GREEN },
  M_BLUE:     {console: 3, position: 12, number: 133, name: "Mover Blue", type: CuestackType.Mover, cuestack_data: Color.BLUE },
  UNUSED7:    {console: 3, position: 13, number: -1, name: "UNUSED", type: CuestackType.Other },
  M_ORANGE:   {console: 3, position: 14, number: 135, name: "Mover Orange", type: CuestackType.Mover, cuestack_data: Color.ORANGE },
  M_MAGENTA:  {console: 3, position: 15, number: 161, name: "Mover Magenta", type: CuestackType.Mover, cuestack_data: Color.MAGENTA },
  M_TEAL:     {console: 3, position: 16, number: 136, name: "Mover Teal", type: CuestackType.Mover, cuestack_data: Color.TEAL },
  M_PURPLE:   {console: 3, position: 17, number: 134, name: "Mover Purple", type: CuestackType.Mover, cuestack_data: Color.PURPLE },
  M_YELLOW:   {console: 3, position: 18, number: 137, name: "Mover Yellow", type: CuestackType.Mover, cuestack_data: Color.YELLOW },
  M_WHITE:    {console: 3, position: 19, number: 138, name: "Mover White", type: CuestackType.Mover, cuestack_data: Color.WHITE },

  // Console 4, Upper Bank

  ZONE_1: {console: 4, position: 0, number: 101, name: "Zone 1", type: CuestackType.Wash, cuestack_data: Wash.Z1 },
  ZONE_2: {console: 4, position: 1, number: 102, name: "Zone 2", type: CuestackType.Wash, cuestack_data: Wash.Z2 },
  ZONE_3: {console: 4, position: 2, number: 103, name: "Zone 3", type: CuestackType.Wash, cuestack_data: Wash.Z3 },
  ZONE_4: {console: 4, position: 3, number: 104, name: "Zone 4", type: CuestackType.Wash, cuestack_data: Wash.Z4 },
  ZONE_5: {console: 4, position: 4, number: 105, name: "Zone 5", type: CuestackType.Wash, cuestack_data: Wash.Z5 },
  ZONE_6: {console: 4, position: 5, number: 106, name: "Zone 6", type: CuestackType.Wash, cuestack_data: Wash.Z6 },
  UNUSED1: {console: 4, position: 6, number: -1, name: "UNUSED", type: CuestackType.Other },
  UNUSED2: {console: 4, position: 7, number: -1, name: "UNUSED", type: CuestackType.Other },
  UNUSED3: {console: 4, position: 8, number: -1, name: "UNUSED", type: CuestackType.Other },
  UNUSED4: {console: 4, position: 9, number: -1, name: "UNUSED", type: CuestackType.Other },

  // Console 4, Lower Bank
  APRON:      {console: 3, position: 10, number: 81, name: "Apron", type: CuestackType.Wash, cuestack_data: Wash.APRON },

  // Various M1 Consoles
  TRUSS_RED:      {console: -1, position: -1, number: 145, name: "Truss Red", type: CuestackType.Truss, cuestack_data: Color.RED },
  TRUSS_GREEN:    {console: -1, position: -1, number: 146, name: "Truss Green", type: CuestackType.Truss, cuestack_data: Color.GREEN },
  TRUSS_BLUE:     {console: -1, position: -1, number: 147, name: "Truss Blue", type: CuestackType.Truss, cuestack_data: Color.BLUE },
  TRUSS_PINK:     {console: -1, position: -1, number: 148, name: "Truss Pink", type: CuestackType.Truss, cuestack_data: Color.PINK },
  TRUSS_ORANGE:   {console: -1, position: -1, number: 149, name: "Truss Orange", type: CuestackType.Truss, cuestack_data: Color.ORANGE },

  TRUSS_MAGENTA:  {console: -1, position: -1, number: 150, name: "Truss Magenta", type: CuestackType.Truss, cuestack_data: Color.MAGENTA },
  TRUSS_TEAL:     {console: -1, position: -1, number: 151, name: "Truss Teal", type: CuestackType.Truss, cuestack_data: Color.TEAL },
  TRUSS_PURPLE:   {console: -1, position: -1, number: 152, name: "Truss Purple", type: CuestackType.Truss, cuestack_data: Color.PURPLE },
  TRUSS_YELLOW:   {console: -1, position: -1, number: 153, name: "Truss Yellow", type: CuestackType.Truss, cuestack_data: Color.YELLOW },
  TRUSS_WHITE:    {console: -1, position: -1, number: 154, name: "Truss White", type: CuestackType.Truss, cuestack_data: Color.WHITE },

  TRUSS_R_B:  {console: -1, position: -1, number: 150, name: "Truss R|B", type: CuestackType.Truss, cuestack_data: Color.RB },
  TRUSS_P_O:  {console: -1, position: -1, number: 151, name: "Truss P|O", type: CuestackType.Truss, cuestack_data: Color.PO },
  TRUSS_T_P:  {console: -1, position: -1, number: 152, name: "Truss T|P", type: CuestackType.Truss, cuestack_data: Color.TP },
  TRUSS_B_G:  {console: -1, position: -1, number: 153, name: "Truss B|G", type: CuestackType.Truss, cuestack_data: Color.BG },

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
    case Color.RB: return board.CYC_R_B;
    case Color.RO: return board.CYC_R_O;
    case Color.BG: return board.CYC_B_G;
    case Color.OPY: return board.CYC_OPY;
    case Color.BRGPY: return board.CYC_BRGPY;
    case Color.ROYGBIV: return board.CYC_ROYGBIV;
    case Color.RWB: return board.CYC_R_W_B;
    case Color.SPAZZY: return board.CYC_SPAZZY;
    case Color.RAINBOW: return board.CYC_RAINBOW;
    case Color.SPECIAL: return board.CYC_SPECIAL;
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

function truss(color: Color): Cuestack {
  switch(color) {
    case Color.RED: return board.TRUSS_RED;
    case Color.GREEN: return board.TRUSS_GREEN;
    case Color.BLUE: return board.TRUSS_BLUE;
    case Color.PINK: return board.TRUSS_PINK;
    case Color.YELLOW: return board.TRUSS_YELLOW;
    case Color.TEAL: return board.TRUSS_TEAL;
    case Color.MAGENTA: return board.TRUSS_MAGENTA;
    case Color.PURPLE: return board.TRUSS_PURPLE;
    case Color.ORANGE: return board.TRUSS_ORANGE;
    case Color.WHITE: return board.TRUSS_WHITE;
    case Color.RB: return board.TRUSS_R_B;
    case Color.PO: return board.TRUSS_P_O;
    case Color.TP: return board.TRUSS_T_P;
    case Color.BG: return board.TRUSS_B_G;
    case Color.SPAZZY: return board.T_SPAZZY;
    default: return board.TRUSS_WHITE;
  }
}

function mover(color: Color): Cuestack {
  switch(color) {
    case Color.RED: return board.M_RED;
    case Color.GREEN: return board.M_GREEN;
    case Color.BLUE: return board.M_BLUE;
    case Color.YELLOW: return board.M_YELLOW;
    case Color.TEAL: return board.M_TEAL;
    case Color.MAGENTA: return board.M_MAGENTA;
    case Color.PURPLE: return board.M_PURPLE;
    case Color.ORANGE: return board.M_ORANGE;
    case Color.WHITE: return board.M_WHITE;
    case Color.SPECIAL: return board.M_SPECIAL;
    default: return board.M_WHITE;
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
    case "UsSp": return board.US_CTR;
    case "MsSp": return board.MS_CTR;
    case "SlSp": return board.SL_CTR;
    case "wash": return board.WASH;
    case "Apron": return board.APRON;
    default: return {} as Cuestack;
  }
}
const PAC: Console = {cyc, stage, wash, bo, truss, mover, board}

export default PAC;