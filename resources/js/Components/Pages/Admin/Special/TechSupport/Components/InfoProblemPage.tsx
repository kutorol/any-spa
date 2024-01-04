import { Grid, Link } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { get } from "lodash";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { UAParser } from "ua-parser-js";
import { createWarningMgs } from "../../../../../../store/reducers/func/snackbar/warning-snackbar";
import r from "../../../../../../utils/ajax";
import { ETechSupportStatus } from "../../../../../../utils/enums/admin/tech-support";
import { IInfoProblemData } from "../../../../../../utils/interfaces/admin/tech-support";
import BackBtn from "../../../../../Common/Gui/Btn/BackBtn";
import ImageFullScreen from "../../../../../Common/Gui/Img/ImageFullScreen";
import CustomMarkdown from "../../../../../Common/Gui/Text/CustomMarkdown";
import MainCard from "../../../../../Common/MainCard/MainCard";
import AdminCommentsList from "./AdminCommentsList";
import FormAnswer from "./FormAnswer";
import ProblemComment from "./ProblemComment";
import TableOneProblem from "./TableOneProblem";

interface IInfoProblemPage {
  info: IInfoProblemData;
  onDeleteAttach: (id: number) => void;
  setBackdropImageUrl: (url: string | null) => void;
  onSubmit: (comment: string, status: ETechSupportStatus) => Promise<boolean>;
  backdropImageUrl: string | null;
}

const getJsonMarkdown = (obj: object): string => {
  const pretty = JSON.stringify(obj, null, 2);
  return "```json\n" + pretty + "\n```";
};

const InfoProblemPage = ({
                           info,
                           onDeleteAttach,
                           onSubmit,
                           backdropImageUrl,
                           setBackdropImageUrl
                         }: IInfoProblemPage) => {
  const { t } = useLaravelReactI18n();
  const [extendedIp, setExtendedIp] = useState<null | string>(null);

  const urlToIpExtended: null | string = info.problem.ip ? `http://www.geoplugin.net/json.gp?ip=${info.problem.ip}` : null;

  const getIpExtendedData = (): void => {
    r.getOutside(urlToIpExtended).then(res => {
      if (!get(res, "geoplugin_request", false)) {
        createWarningMgs(t("Ошибка получения данных по IP"));
        return;

      }

      setExtendedIp(getJsonMarkdown(res));
    });
  };

  useEffect(() => {
    if (!info.problem.ip) {
      return;
    }

    getIpExtendedData();
  }, [info.problem]);

  const preparedUserAgent = useMemo<null | string>(() => {
    if (!info.problem.user_agent) {
      return null;
    }

    return getJsonMarkdown(UAParser(info.problem.user_agent));
  }, [info.problem]);

  return (
    <>
      <BackBtn defaultBackUrl="/admin/tech-support/list"/>

      <MainCard sx={{ mb: 2 }} title={t("Запрос в техническую поддержку")}>
        <TableOneProblem problem={info.problem}/>


        <Grid container item sx={{ mb: 4, ml: 2 }} spacing={2}>
          {info.problem.from_url && (
            <Grid item xs={12}>
              <b>{t("Отправлено с URL")}:</b>
              &nbsp;
              <Link href={info.problem.from_url} underline="hover" target="_blank">
                {info.problem.from_url}
              </Link>
            </Grid>
          )}

          {info.problem.ip && (
            <>
              <Grid item xs={12}>
                <b>{t("IP")}:</b>
                &nbsp;
                {info.problem.ip}
              </Grid>

              <Grid item xs={12}>
                <b>{t("Посмотреть информацию по IP")}:</b>
                &nbsp;
                <Link href={urlToIpExtended} underline="hover" target="_blank">
                  {urlToIpExtended}
                </Link>
              </Grid>

              {extendedIp && (
                <Grid item xs={12}>
                  <CustomMarkdown text={extendedIp}/>
                </Grid>
              )}
            </>
          )}

          {preparedUserAgent && (
            <>
              <Grid item xs={12}>
                <b>{t("UserAgent браузера")}:</b>
                &nbsp;
                {info.problem.user_agent}
              </Grid>
              <Grid item xs={12}>
                <CustomMarkdown text={preparedUserAgent}/>
              </Grid>
            </>
          )}
        </Grid>

        <ProblemComment
          info={info}
          onDeleteAttach={onDeleteAttach}
          setBackdropImageUrl={setBackdropImageUrl}
        />
      </MainCard>

      <MainCard title={t("Ответы администратора")}>
        <Grid container>
          <AdminCommentsList comments={info.comments}/>

          <FormAnswer
            problem={info.problem}
            onSubmit={onSubmit}
          />
        </Grid>
      </MainCard>

      <ImageFullScreen
        url={backdropImageUrl}
        setBackdropImageUrl={setBackdropImageUrl}
      />
    </>
  );
};

export default InfoProblemPage;