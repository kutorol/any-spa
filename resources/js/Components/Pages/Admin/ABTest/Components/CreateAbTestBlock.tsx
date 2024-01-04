import { Chip, Grid, Table, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { toNumber } from "lodash";
import * as React from "react";
import { useMemo, useState } from "react";
import { UAParser } from "ua-parser-js";
import useOnCmdEnter from "../../../../../hooks/useOnCmdEnter";
import { createErrMgs } from "../../../../../store/reducers/func/snackbar/error-snackbar";
import { createWarningMgs } from "../../../../../store/reducers/func/snackbar/warning-snackbar";
import { __ } from "../../../../../utils/funcs/locale";
import { IABTest, IABTestValue, IOnCreateFields } from "../../../../../utils/interfaces/admin/ab";
import Btn from "../../../../Common/Gui/Btn/Btn";
import RoundBtn from "../../../../Common/Gui/Btn/RoundBtn";
import Icon from "../../../../Common/Gui/Common/Icon";
import SelectBlock from "../../../../Common/Gui/Select/Plain/SelectBlock";
import MainCard from "../../../../Common/MainCard/MainCard";
import InputCreate from "./InputCreate";

interface ICreateAbTestBlock {
  onCreate: (test: IABTest) => Promise<boolean>;
  findDuplicate: (v: string, id?: number) => boolean;
  totalUsers: number;
}

const fieldTestName = "key";
const fieldTotalPercentFromUser = "total_percent_from_users";

export const defaultAbTest = {
  id: 0,
  key: "",
  total_percent_from_users: 0,
  total_users_in_test: 0,
  max_count_users_in_test: 0,
  active: false,
  comment: "",
  test_values: [],
  created_at: "",
  updated_at: ""
} as IABTest;

export const setMaxPeopleAndPercent = (newTest: IABTest, field: keyof IOnCreateFields, value: any, totalUsers: number): IABTest => {
  if (field !== fieldTotalPercentFromUser) {
    return newTest;
  }

  // в процентах, сколько людей нужно добавить в тест
  value = Math.min(Math.max(toNumber(value), 0), 100) as number;

  newTest[fieldTotalPercentFromUser] = value;
  newTest.max_count_users_in_test = 0;
  if (value > 0 && value < 100) {
    newTest.max_count_users_in_test = Math.ceil(totalUsers * (value / 100));
  } else if (value === 100) {
    newTest.max_count_users_in_test = totalUsers;
  }

  return newTest;
};

export const checkOnDuplicateOnChange = (newTest: IABTest, field: keyof IOnCreateFields, findDuplicate: (v: string, id?: number) => boolean): void => {
  if (field === fieldTestName && findDuplicate(newTest.key, newTest.id)) {
    createWarningMgs(__("A/B тест с таким названием уже существует"), 1500);
  }
};

const CreateAbTestBlock = ({ onCreate, findDuplicate, totalUsers }: ICreateAbTestBlock) => {
  const isMacOS = useMemo(() => UAParser().os.name === "macOS", []);

  const { t } = useLaravelReactI18n();
  const [test, setTest] = useState<IABTest>(defaultAbTest);
  const [newValue, setNewValue] = useState<string>("");

  const titleCreate = t("Создать");
  const onChange = (field: keyof IOnCreateFields, value: any): void => {
    let newTest = {
      ...test,
      [field]: value
    };

    newTest = setMaxPeopleAndPercent(newTest, field, value, totalUsers);

    checkOnDuplicateOnChange(newTest, field, findDuplicate);

    setTest(newTest);
  };

  const _onCreate = (): void => {
    onCreate(test).then((res: boolean) => {
      if (res) {
        setTest(defaultAbTest);
        setNewValue("");
      }
    });
  };

  const onAddValue = (): void => {
    if (isDuplicateNewVariant) {
      duplicateWarning();
      return;
    }

    if (newValue.trim().length === 0) {
      createWarningMgs(t("Вы не ввели значение нового варианта A/B теста"), 1500);
      return;
    }

    const values = [...test.test_values];

    values.push({
      id: 0,
      ab_test_id: 0,
      total_user_with_value: 0,
      value: newValue,
      created_at: "",
      updated_at: ""
    } as IABTestValue);

    setTest({
      ...test,
      test_values: values
    });
    setNewValue("");
  };

  const duplicateWarning = (): void => createWarningMgs(t("Уже введено такое же значение варианта A/B теста"), 1500);

  // @ts-ignore
  const isDuplicateNewVariant = Boolean(newValue.trim().length > 0 && test.test_values.find((v: IABTestValue) => v.value.toLowerCase().trim() === newValue.toLowerCase().trim()));

  const onChangeNewValue = (field: any, value: string): void => {
    // @ts-ignore
    if (test.test_values.find((v: IABTestValue) => v.value.toLowerCase() === value.toLowerCase())) {
      duplicateWarning();
    }
    setNewValue(value);
  };

  const disableBtn = (test.key.trim().length === 0 || findDuplicate(test.key.trim()))
    || test.total_percent_from_users === 0
    || test.comment.trim().length === 0
    || (
      test.test_values.length === 0
      || test.test_values.filter((v: IABTestValue) => v.value.trim() === "").length > 0
    );

  return (
    <MainCard title={t("Создание A/B теста")} sx={{ mb: 3 }}>
      <Grid container>
        <Grid item xs={12}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <InputCreate
                    title={t("Название A/B теста") + "*"}
                    value={test.key}
                    field={fieldTestName}
                    onChangeVal={onChange}
                    helpText={t("Обязательное поле")}
                  />
                </TableCell>
                <TableCell align="center">
                  <InputCreate
                    title={t("Комментарий") + "*"}
                    value={test.comment}
                    field="comment"
                    onChangeVal={onChange}
                    helpText={t("Обязательное поле")}
                  />
                </TableCell>
                <TableCell align="center">
                  <SelectBlock
                    name="active"
                    label={t("Статус")}
                    variants={{
                      0: t("Не активен"),
                      1: t("Активен")
                    }}
                    onChange={(e) => {
                      onChange("active", toNumber(e.target.value) === 1);
                    }}
                    chosenVariant={test.active ? 1 : 0}
                  />
                </TableCell>
                <TableCell align="center">
                  <InputCreate
                    type="number"
                    min={0}
                    max={100}
                    multiline={false}
                    title={t("Процент юзеров (от 1 до 100%)") + "*"}
                    helpText={
                      <>
                        {t("Сколько пользователей в процентах попадут в A/B тест?")}
                        <br/>
                        <Chip
                          color={test.max_count_users_in_test > 0 ? "success" : "default"}
                          size="small"
                          label={t("Попадут в A/B тест: :num из :total", {
                            total: totalUsers,
                            num: test.max_count_users_in_test
                          })}
                        />
                      </>
                    }
                    value={test.total_percent_from_users === 0 ? "" : test.total_percent_from_users}
                    field={fieldTotalPercentFromUser}
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
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }} variant="head" colSpan={5} align="center">
                  {t("Добавленные варианты A/B теста")}:
                </TableCell>
              </TableRow>

              {(test.test_values.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    {t("Варианты A/B теста еще не добавлены")}
                  </TableCell>
                </TableRow>
              )}

              {test.test_values.map((v: IABTestValue, i: number) => {
                const onDelete = () => {
                  setTest({
                    ...test,
                    test_values: test.test_values.filter((v2: IABTestValue, i2: number) => i2 !== i)
                  });
                };

                const onChangeValue = (field: any, value: string): void => {
                  // @ts-ignore
                  if (test.test_values.find((v2: IABTestValue) => v2.value.trim() === value.trim())) {
                    duplicateWarning();
                  }

                  if (value.trim().length === 0) {
                    createErrMgs(t("Введите значение варианта A/B теста"), 1500);
                  }

                  setTest({
                    ...test,
                    test_values: test.test_values.map((v2: IABTestValue, i2: number) => {
                      if (i === i2) {
                        v2.value = value;
                      }

                      return v2;
                    })
                  });
                };

                return (
                  <TableRow key={i}>
                    <TableCell align="center">{i + 1}</TableCell>
                    <TableCell colSpan={3} align="center">
                      <InputCreate
                        title={t("Вариант A/B теста") + "*"}
                        value={v.value}
                        field={fieldTestName}
                        onChangeVal={onChangeValue}
                        helpText={t("Обязательное поле")}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title={t("Удалить без подтверждения")}>
                        <span>
                          <RoundBtn
                            size="small"
                            color="error"
                            icon={<Icon tablerIcon="IconTrashFilled"/>}
                            onClick={onDelete}
                          />
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableRow>
                <TableCell colSpan={5} align="center" variant="head" sx={{ borderBottom: "none" }}>
                  {t("Добавить вариант A/B теста")}
                </TableCell>
              </TableRow>

              <TableRow
                sx={{ "& .MuiTableCell-root": { borderBottom: "none" } }}
              >
                <TableCell colSpan={4} align="center">
                  <InputCreate
                    title={t("Новый вариант A/B теста")}
                    value={newValue}
                    field="key"
                    onChangeVal={onChangeNewValue}
                    onKeyDown={useOnCmdEnter(onAddValue)}
                    helpText={t(
                      isMacOS
                        ? "Cmd + Enter чтобы быстро добавить вариант A/B теста"
                        : "Ctrl + Enter чтобы быстро добавить вариант A/B теста"
                    )}
                  />
                </TableCell>
                <TableCell align="center">
                  <RoundBtn
                    disabled={newValue.trim().length === 0 || isDuplicateNewVariant}
                    color="error"
                    icon={<Icon tablerIcon="IconCirclePlus"/>}
                    onClick={onAddValue}
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

export default CreateAbTestBlock;