import * as React from "react";
import { EColor } from "../enums/common";

export interface IVariantSelectObject {
  key: any;
  label: string;
}

// Кнопка с точками, которая открывает Popover
export interface IVariantDottedBtn {
  title: string;
  icon: React.ReactNode;
  onClick: (e) => void;
  iconColor?: EColor;
}