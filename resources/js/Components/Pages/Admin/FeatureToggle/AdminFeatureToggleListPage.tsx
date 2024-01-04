import { Grid, Table, TableContainer } from "@mui/material";
// @ts-ignore
import dayjs from "dayjs";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { get } from "lodash";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import useDeleteDialogConfirm from "../../../../hooks/dialog/useDeleteDialogConfirm";
import useDialogConfirm from "../../../../hooks/dialog/useDialogConfirm";
import { changeFullScreenLoaderState } from "../../../../store/reducers/func/common/full-screen-loader";
import { createWarningMgs } from "../../../../store/reducers/func/snackbar/warning-snackbar";
import { eventScrollUp } from "../../../../utils/funcs/event";
import { IFeatureToggle, IOnChangeVal } from "../../../../utils/interfaces/admin/toggle";
import toggle from "../../../../utils/repository/admin/toggle";
import ErrorBlock from "../../../Common/Gui/Block/ErrorBlock";
import SiteAdminRole from "../../../Common/Gui/Role/SiteAdminRole";
import CustomTextarea from "../../../Common/Inputs/CustomTextarea";
import MainCard from "../../../Common/MainCard/MainCard";
import CreateToggleBlock from "./Components/CreateToggleBlock";
import TableBodyList from "./Components/TableBodyList";
import TableHead from "./Components/TableHead";

const AdminFeatureToggleListPage = () => {
  const { t } = useLaravelReactI18n();
  const [isError, setIsError] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>("");
  const [toggleList, setToggleList] = useState<IFeatureToggle[] | null>(null);

  const onDelete = (name: string): Promise<boolean> => {
    changeFullScreenLoaderState(true);
    return toggle.delete(name).then((res: boolean) => {
      changeFullScreenLoaderState(true);
      res && setToggleList([...toggleList.filter((t: IFeatureToggle) => t.name !== name)]);
      return res;
    });
  };

  const getPageToggleList = () => {
    changeFullScreenLoaderState(true);
    toggle.find().then(res => {
      changeFullScreenLoaderState(false);

      if (!get(res, "data.toggles", null)) {
        setIsError(true);
        return false;
      }

      const info = res.data.toggles as IFeatureToggle[];

      setIsError(false);
      setToggleList(info);

      eventScrollUp(50);
      return true;
    });
  };

  useEffect(() => {
    getPageToggleList();
  }, []);

  const findDuplicate = (name: string): boolean => {
    // @ts-ignore
    return typeof toggleList.find((t: IFeatureToggle) => t.name === name) !== "undefined";
  };

  const onCreate = (name: string, value: string, comment: string): Promise<boolean> => {
    // @ts-ignore
    if (findDuplicate(name)) {
      createWarningMgs(t("Фичетогл с таким названием уже существует"), 1500);
      // @ts-ignore
      return new Promise(r => r(false));
    }

    changeFullScreenLoaderState(true);
    return toggle.create(name, value, comment).then((res: boolean) => {
      changeFullScreenLoaderState(false);
      if (!res) {
        return false;
      }

      const now = dayjs();
      setToggleList([
        {
          name: name,
          value: value,
          comment: comment,
          created_at: now,
          updated_at: now
        } as IFeatureToggle,
        ...toggleList
      ]);

      return true;
    });
  };

  const onChangeVal = ({ name, value, comment }: IOnChangeVal): Promise<boolean> => {
    return toggle.update(name, value, comment).then(res => {
      if (!res) {
        return false;
      }

      setToggleList([
        ...toggleList.map((res: IFeatureToggle) => {
          if (res.name !== name) {
            return res;
          }

          res.value = value;
          res.comment = comment;
          return res;
        })
      ]);

      return true;
    });
  };

  const { openConfirmDialog, confirmDialogTSX } = useDialogConfirm(
    onChangeVal,
    t("сохранить данные фичетогла"),
    undefined,
    (params: IOnChangeVal): void => {

      setToggleList([
        ...toggleList.map((t: IFeatureToggle) => {
          if (t.name === params.name) {
            t.randDataForUpdate = Math.random() * 125123252;
          }
          return t;
        })
      ]);
    }
  );

  const { openDeleteDialog, deleteDialogTSX } = useDeleteDialogConfirm(
    onDelete,
    t("фичетогл")
  );

  const list = useMemo(() => {
    const l = filterName.trim().length;
    // @ts-ignore
    return (toggleList || []).filter((t: IFeatureToggle) => l === 0 || (l > 0 && t.name.includes(filterName.trim())));
  }, [toggleList, filterName]);

  const onChangeFilter = (e: React.ChangeEvent): void => {
    // @ts-ignore
    setFilterName(e.target.value);
  };


  const onChangeValueWithConfirm = (name: string, value: string, comment: string): void => {
    openConfirmDialog({ name, value, comment } as IOnChangeVal);
  };
  // если еще не сделали первый запрос на сервер
  if (!isError && toggleList === null) {
    return null;
  }

  // если ошибка при первом запросе
  if (isError && !toggleList) {
    return (
      <ErrorBlock
        errorText={t("Произошла ошибка получения фичетоглов!")}
        actionOnReload={e => {
          setToggleList(null);
          setIsError(false);
          getPageToggleList();
        }}
      />
    );
  }

  return (
    <>
      {deleteDialogTSX}
      {confirmDialogTSX}

      <MainCard>
        <SiteAdminRole>
          <CreateToggleBlock
            onCreate={onCreate}
            findDuplicate={findDuplicate}
          />
        </SiteAdminRole>

        <MainCard title={t("Поиск фичетогла сайта")} sx={{ mb: 3 }}>
          <Grid container>
            <Grid item xs={12}>
              <CustomTextarea
                name="find_name"
                title={t("Введите название фичетогла")}
                handleChange={onChangeFilter}
                value={filterName}
                minRows={2}
                shrink
                placeholder={t("Введите название для поиска фичетогла сайта")}
              />
            </Grid>
          </Grid>
        </MainCard>

        <MainCard title={t(filterName.trim().length > 0 ? "Найденные фичетоглы сайта" : "Все фичетоглы сайта")}>
          <TableContainer sx={{ maxHeight: 900, mb: 3 }}>
            <Table stickyHeader>
              <TableHead/>
              <TableBodyList
                items={list}
                onChangeVal={onChangeValueWithConfirm}
                onDelete={openDeleteDialog}
              />
            </Table>
          </TableContainer>
        </MainCard>
      </MainCard>
    </>
  );
};

export default AdminFeatureToggleListPage;