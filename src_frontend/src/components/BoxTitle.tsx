import * as React from 'react';
import {Typography} from "@mui/material";
import Color from "../models/Color";
import {ReactNode} from "react";

export type ColorChange = {
  color: Color
  intensity: number
}

interface IProps {
  title: string
  children: ReactNode | ReactNode[]
}

export default function BoxTitle({title, children}: IProps) {

  return (
    <div>
      {/* Dynamic Title, passed in from props */}
      <Typography variant={"h4"} sx={{textAlign: "center"}}><b>{title}</b></Typography>

      {/* Children */}
      <div style={{border: "2px solid grey", padding: "10px 10px 10px 10px", borderRadius: '10px'}}>
        {children}
      </div>
    </div>
  );
}
