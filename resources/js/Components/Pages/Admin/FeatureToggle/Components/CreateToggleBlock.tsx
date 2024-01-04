import { Grid, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useState } from "react";
import { createWarningMgs } from "../../../../../store/reducers/func/snackbar/warning-snackbar";
import { IFeatureToggle } from "../../../../../utils/interfaces/admin/toggle";
import Btn from "../../../../Common/Gui/Btn/Btn";
import Icon from "../../../../Common/Gui/Common/Icon";
import MainCard from "../../../../Common/MainCard/MainCard";
import Input from "./Input";

interface ICreateToggleBlock {
  onCreate: (name: string, value: string, comment: string) => Promise<boolean>;
  findDuplicate: (name: string) => boolean;
}

export const defaultToggle = {
  name: "",
  value: "",
  comment: "",
  created_at: "",
  updated_at: ""
} as IFeatureToggle;

const CreateToggleBlock = ({ onCreate, findDuplicate }: ICreateToggleBlock) => {
  const { t } = useLaravelReactI18n();
  const [toggle, setToggle] = useState<IFeatureToggle>(defaultToggle);

  const titleCreate = t("Создать");
  const onChange = (name: string, value: string, comment: string): void => {
    setToggle({
      ...toggle,
      name: name,
      value: value,
      comment: comment
    });

    if (findDuplicate(name)) {
      createWarningMgs(t("Фичетогл с таким названием уже существует"));
    }
  };

  const _onCreate = () => {
    onCreate(toggle.name, toggle.value, toggle.comment).then((res: boolean) => res && setToggle(defaultToggle));
  };

  const disableBtn = (toggle.name.trim().length === 0 || findDuplicate(toggle.name.trim()))
    || toggle.value.trim().length === 0
    || toggle.comment.trim().length === 0;

  return (
    <MainCard title={t("Создание фичетогла")} sx={{ mb: 3 }}>
      <Grid container>
        <Grid item xs={12}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Input
                    item={toggle}
                    field="name"
                    onChangeVal={onChange}
                  />
                </TableCell>
                <TableCell align="center">
                  <Input
                    item={toggle}
                    field="value"
                    onChangeVal={onChange}
                  />
                </TableCell>
                <TableCell align="center">
                  <Input
                    item={toggle}
                    field="comment"
                    onChangeVal={onChange}
                  />
                </TableCell>
                <TableCell align="center">
                  <Btn
                    webTitle={titleCreate}
                    mobTitle={titleCreate}
                    icon={<Icon tablerIcon="IconPlus"/>}
                    onClick={_onCreate}
                    disabled={disableBtn}
                    variant="contained"
                    color="success"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default CreateToggleBlock;