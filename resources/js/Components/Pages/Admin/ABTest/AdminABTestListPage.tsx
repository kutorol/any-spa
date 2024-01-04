import { Grid, Table, TableContainer } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { get } from "lodash";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import useDeleteDialogConfirm from "../../../../hooks/dialog/useDeleteDialogConfirm";
import useDialogConfirm from "../../../../hooks/dialog/useDialogConfirm";
import { changeFullScreenLoaderState } from "../../../../store/reducers/func/common/full-screen-loader";
import { createWarningMgs } from "../../../../store/reducers/func/snackbar/warning-snackbar";
import { eventScrollUp } from "../../../../utils/funcs/event";
import { IABTest } from "../../../../utils/interfaces/admin/ab";
import abRep from "../../../../utils/repository/admin/ab";
import ErrorBlock from "../../../Common/Gui/Block/ErrorBlock";
import SiteAdminRole from "../../../Common/Gui/Role/SiteAdminRole";
import CustomTextarea from "../../../Common/Inputs/CustomTextarea";
import MainCard from "../../../Common/MainCard/MainCard";
import CreateAbTestBlock from "./Components/CreateAbTestBlock";
import EditBlock from "./Components/EditBlock";
import TableBodyList from "./Components/TableBodyList";
import TableHead from "./Components/TableHead";

const AdminABTestListPage = () => {
  const { t } = useLaravelReactI18n();
  const [isError, setIsError] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>("");
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [abTestList, setAbTestList] = useState<IABTest[] | null>(null);
  const [editTest, setEditTest] = useState<IABTest | null>(null);

  const getPageAbTestList = () => {
    changeFullScreenLoaderState(true);
    abRep.find().then(res => {
      changeFullScreenLoaderState(false);

      if (!get(res, "data.list_ab_tests", null)) {
        setIsError(true);
        return;
      }

      const info = res.data.list_ab_tests as IABTest[];

      setIsError(false);
      setAbTestList(info);
      setTotalUsers(res.data.total_users as number);

      eventScrollUp(50);
    });
  };

  useEffect(() => {
    getPageAbTestList();
  }, []);

  const onDelete = (id: number): Promise<boolean> => {
    changeFullScreenLoaderState(true);
    return abRep.delete(id).then((res: boolean) => {
      changeFullScreenLoaderState(true);
      res && setAbTestList([...abTestList.filter((t: IABTest) => t.id !== id)]);
      return res;
    });
  };

  // находит уже созданную такой же а/б тест
  const findDuplicate = (keyTest: string, id?: number): boolean => {
    // @ts-ignore
    return typeof abTestList.find((t: IABTest) => t.key === keyTest && (!id || t.id !== id)) !== "undefined";
  };

  const onCreate = (test: IABTest): Promise<boolean> => {
    // @ts-ignore
    if (findDuplicate(test.key)) {
      createWarningMgs(t("A/B тест с таким названием уже существует"), 1500);
      // @ts-ignore
      return new Promise(r => r(false));
    }

    changeFullScreenLoaderState(true);
    return abRep.create(test).then(res => {
      if (res.status) {
        getPageAbTestList();
      } else {
        changeFullScreenLoaderState(false);
      }
      return res.status;
    });
  };

  const onOpenDialogEdit = (test: IABTest): void => {
    setEditTest(test);
  };

  // обновляем тест
  const onChangeVal = (test: IABTest): Promise<boolean> => {
    return abRep.update(test).then((res: boolean) => {
      if (res) {
        getPageAbTestList();
        setEditTest(null);
      } else {
        changeFullScreenLoaderState(false);
      }
      return res;
    });
  };

  const { openConfirmDialog, confirmDialogTSX } = useDialogConfirm(
    onChangeVal,
    t("сохранить данные A/B теста"),
    undefined,
    (params: IABTest): void => {
      setAbTestList([
        ...abTestList.map((t: IABTest) => {
          if (t.id === params.id) {
            t.randDataForUpdate = Math.random() * 125123252;
          }
          return t;
        })
      ]);
    }
  );

  const { openDeleteDialog, deleteDialogTSX } = useDeleteDialogConfirm(
    onDelete,
    t("A/B тест")
  );

  const list = useMemo(() => {
    const l = filterName.trim().length;
    // @ts-ignore
    return (abTestList || []).filter((t: IABTest) => l === 0 || (l > 0 && t.key.includes(filterName.trim())));
  }, [abTestList, filterName]);

  const onChangeFilter = (e: React.ChangeEvent): void => {
    // @ts-ignore
    setFilterName(e.target.value);
  };

  const onChangeValueWithConfirm = (test: IABTest): void => {
    openConfirmDialog(test);
  };


  useEffect(() => {
    if (editTest) {
      abRep.info(editTest.id).then((res: null | IABTest) => setEditTest(res));
    }
  }, [get(editTest, "id", 0)]);

  // если еще не сделали первый запрос на сервер
  if (!isError && abTestList === null) {
    return null;
  }

  // если ошибка при первом запросе
  if (isError && !abTestList) {
    return (
      <ErrorBlock
        errorText={t("Произошла ошибка получения A/B тестов!")}
        actionOnReload={e => {
          setAbTestList(null);
          setIsError(false);
          getPageAbTestList();
        }}
      />
    );
  }

  return (
    <>
      {deleteDialogTSX}
      {confirmDialogTSX}

      <EditBlock
        editTest={editTest}
        setEditTest={setEditTest}
        totalUsers={totalUsers}
        findDuplicate={findDuplicate}
        onUpdate={onChangeVal}
      />

      <MainCard>
        <SiteAdminRole>
          <CreateAbTestBlock
            onCreate={onCreate}
            findDuplicate={findDuplicate}
            totalUsers={totalUsers}
          />
        </SiteAdminRole>

        <MainCard title={t("Поиск A/B тестов")} sx={{ mb: 3 }}>
          <Grid container>
            <Grid item xs={12}>
              <CustomTextarea
                name="find_name"
                title={t("Введите название A/B теста")}
                handleChange={onChangeFilter}
                value={filterName}
                minRows={2}
                shrink
                placeholder={t("Введите название для поиска A/B теста")}
              />
            </Grid>
          </Grid>
        </MainCard>

        <MainCard title={t(filterName.trim().length > 0 ? "Найденные A/B тесты" : "Все A/B тесты")}>
          <TableContainer>
            <Table>
              <TableHead/>
              <TableBodyList
                items={list}
                onOpenDialogEdit={onOpenDialogEdit}
                onDelete={openDeleteDialog}
              />
            </Table>
          </TableContainer>
        </MainCard>
      </MainCard>
    </>
  );
};

export default AdminABTestListPage;