import * as React from 'react';
import {Box, Typography} from "@mui/material";
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
      <Box sx={{border: "2px solid grey", padding: 1, borderRadius: '10px'}}>
        {children}
      </Box>
    </div>
  );
}
