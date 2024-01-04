import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Chip, Divider, Grid, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { get } from "lodash";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import useDeleteDialogConfirm from "../../../../hooks/dialog/useDeleteDialogConfirm";
import { changeFullScreenLoaderState } from "../../../../store/reducers/func/common/full-screen-loader";
import { ELogLevel, ELogLevelColor } from "../../../../utils/enums/admin/logs";
import { humanDateTime } from "../../../../utils/funcs/date";
import { eventScrollUp } from "../../../../utils/funcs/event";
import { downloadStringAsFile } from "../../../../utils/funcs/file";
import { navToBackOrDefaultURL } from "../../../../utils/funcs/url";
import { IListPreparedLog, ILog, IPreparedLog } from "../../../../utils/interfaces/admin/logs";
import logsRep from "../../../../utils/repository/admin/logs";
import ErrorBlock from "../../../Common/Gui/Block/ErrorBlock";
import RoundBtn from "../../../Common/Gui/Btn/RoundBtn";
import Icon from "../../../Common/Gui/Common/Icon";
import CustomMarkdown from "../../../Common/Gui/Text/CustomMarkdown";
import MainCard from "../../../Common/MainCard/MainCard";
import ListHeader from "./Components/ListHeader";

const AdminLogsInfoPage = () => {
  const params = useParams();
  const { t } = useLaravelReactI18n();
  const [isError, setIsError] = useState<boolean>(false);
  const [log, setLog] = useState<ILog | null>(null);
  const [levelError, setLevelError] = useState<ELogLevel>(ELogLevel.ALL);

  const { deleteDialogTSX, openDeleteDialog } = useDeleteDialogConfirm((): Promise<boolean> => {
    downloadStringAsFile(log.content, log.path);
    return logsRep.delete(log.path).then((res: boolean) => {
      changeFullScreenLoaderState(false);
      res && navToBackOrDefaultURL("/admin/logs");
      return res;
    });
  }, t("лог файл"));

  const getInfoProblem = () => {
    changeFullScreenLoaderState(true);
    return logsRep.info(params.id).then(res => {
      changeFullScreenLoaderState(false);

      if (!get(res, "data.log", null)) {
        !isError && setIsError(true);
        return false;
      }

      isError && setIsError(false);
      setLog(res.data.log as ILog);

      eventScrollUp(50);
      return true;
    });
  };

  useEffect(() => {
    getInfoProblem();
  }, [params.id]);

  const handleTabChange = (e: React.SyntheticEvent, newValue: ELogLevel) => {
    setLevelError(newValue);
  };

  const preparedLogs: IListPreparedLog = useMemo((): IListPreparedLog => {
    if (!log) {
      return {} as IListPreparedLog;
    }

    const arrLogs = log.content.split("\n").filter((l: string) => l.trim() !== "");
    const logsJson: IPreparedLog[] = arrLogs.map((l: string): (IPreparedLog | null) => {
      try {
        const logJSON = JSON.parse(l);
        // проверку сделать, чтобы это было или не было параметра проверка
        const level = get(logJSON, "level_name", ELogLevel.ERROR);

        logJSON.pretty_datetime = "-/-";
        if (logJSON.datetime) {
          logJSON.pretty_datetime = humanDateTime(logJSON.datetime);
        }

        if (get(logJSON, "context.uri_path", null)) {
          logJSON.context.uri_path_Pretty = decodeURIComponent(logJSON.context.uri_path);
        }

        // @ts-ignore
        const levelEnum: ELogLevel = [ELogLevel.EMERGENCY, ELogLevel.ERROR, ELogLevel.INFO, ELogLevel.DEBUG].includes(level)
          ? level
          : ELogLevel.OTHER;

        return {
          level: levelEnum,
          datetime: logJSON.pretty_datetime,
          prettyJSON: JSON.stringify(logJSON, null, 2)
        } as IPreparedLog;
      } catch(e) {
        console.error(e);
        return null;
      }
    }).filter((l: IPreparedLog | null) => l !== null);

    logsJson.reverse();

    const logsByLevel: IListPreparedLog = {
      ALL: logsJson
    };
    logsJson.map((l: IPreparedLog) => {
      if (!logsByLevel[l.level]) {
        logsByLevel[l.level] = [];
      }

      logsByLevel[l.level].push(l);
    });

    return logsByLevel as IListPreparedLog;
  }, [log]);


  // если еще не сделали первый запрос на сервер
  if (!isError && !log) {
    return null;
  }

  // если ошибка при первом запросе
  if (isError && !log) {
    return (
      <ErrorBlock
        errorText={t("Произошла ошибка получения логов сайта!")}
      />
    );
  }

  const mainCardSx = { "& > .MuiCardContent-root": { p: 0, py: 0 } };

  return (
    <>
      {deleteDialogTSX}

      <MainCard
        sx={mainCardSx}
        title={log.path}
        secondary={
          <RoundBtn
            size="small"
            color="error"
            icon={<Icon tablerIcon="IconTrashFilled"/>}
            onClick={openDeleteDialog}
          />
        }
      >
        <TabContext value={levelError}>
          <ListHeader
            handleChange={handleTabChange}
            preparedLogs={preparedLogs}
          />

          <Divider/>

          <TabPanel value={levelError} sx={{ p: 2 }}>
            {(preparedLogs[levelError] || []).map((l: IPreparedLog, i: number) => {
              const color = ELogLevelColor[l.level];

              return (
                <MainCard
                  key={i}
                  boxShadow
                  headerSX={{ py: 1 }}
                  sx={{ mb: 3 }}
                  title={
                    <Grid item container xs={12} alignItems="center" justifyContent="space-between">
                      {color ? (
                        <Chip label={l.level} color={color}/>
                      ) : <span>&nbsp;</span>}

                      <Typography variant="caption">{l.datetime}</Typography>
                    </Grid>
                  }
                >
                  <Grid container>
                    <Grid item xs={12}>
                      <CustomMarkdown text={"```json\n" + l.prettyJSON + "\n```"}/>
                    </Grid>
                  </Grid>
                </MainCard>
              );
            })}
          </TabPanel>
        </TabContext>
      </MainCard>
    </>
  );
};

export default AdminLogsInfoPage;