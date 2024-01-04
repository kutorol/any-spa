import * as React from "react";

export interface ILinkFooter {
  title: string;
  url: string;
  onClick?: (e?: React.SyntheticEvent) => void;
}