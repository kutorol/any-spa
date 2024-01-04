import * as React from "react";
import { IOnCreateFields } from "../../../../../utils/interfaces/admin/ab";
import CustomTextarea from "../../../../Common/Inputs/CustomTextarea";

interface IInput {
  title: string;
  helpText?: string | React.ReactNode;
  value: any;
  field: keyof IOnCreateFields;
  onChangeVal: (field: keyof IOnCreateFields, value: any) => void;

  [k: string]: any;
}

const InputCreate = ({ title, helpText, field, value, onChangeVal, ...other }: IInput) => {
  // @ts-ignore
  const onChange = (e: React.SyntheticEvent): void => onChangeVal(field, e.target.value);

  return (
    <CustomTextarea
      name={field}
      title={title}
      handleChange={onChange}
      value={value}
      minRows={2}
      shrink
      placeholder={title}
      helpText={helpText}
      {...other}
    />
  );
};

export default InputCreate;