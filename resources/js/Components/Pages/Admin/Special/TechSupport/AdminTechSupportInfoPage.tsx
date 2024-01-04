import { useLaravelReactI18n } from "laravel-react-i18n";
import { get, toNumber } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useDeleteDialogConfirm from "../../../../../hooks/dialog/useDeleteDialogConfirm";
import { changeFullScreenLoaderState } from "../../../../../store/reducers/func/common/full-screen-loader";
import { ETechSupportStatus } from "../../../../../utils/enums/admin/tech-support";
import { eventScrollUp } from "../../../../../utils/funcs/event";
import { IInfoProblemData, IProblemAttachment } from "../../../../../utils/interfaces/admin/tech-support";
import techSupport from "../../../../../utils/repository/admin/tech-support";
import ErrorBlock from "../../../../Common/Gui/Block/ErrorBlock";
import InfoProblemPage from "./Components/InfoProblemPage";

const AdminTechSupportInfoPage = () => {
  const params = useParams();
  const { t } = useLaravelReactI18n();
  const [isError, setIsError] = useState<boolean>(false);
  const [info, setInfo] = useState<IInfoProblemData | null>(null);
  const [backdropImageUrl, setBackdropImageUrl] = React.useState<null | string>(null);

  const { deleteDialogTSX, openDeleteDialog } = useDeleteDialogConfirm((id: number): Promise<boolean> => {
    return techSupport.deleteAttach(id).then((res: boolean) => {
      res && setInfo({
        ...info,
        attachments: info.attachments.filter((attach: IProblemAttachment) => attach.id !== id)
      });
      return res;
    });
  }, t("прикрепленный файл"));

  const problemID = toNumber(params.id);

  const getInfoProblem = () => {
    changeFullScreenLoaderState(true);
    return techSupport.info(problemID).then(res => {
      changeFullScreenLoaderState(false);

      if (!get(res, "data.problem", null)) {
        !isError && setIsError(true);
        return false;
      }

      isError && setIsError(false);
      setInfo(res.data as IInfoProblemData);

      eventScrollUp(50);
      return true;
    });
  };

  useEffect(() => {
    getInfoProblem();
  }, [problemID]);


  const onSubmit = (comment: string, status: ETechSupportStatus): Promise<boolean> => {
    return techSupport.changeStatus(info.problem.id, status, comment).then(res => {
      if (!get(res, "status", false)) {
        return false;
      }

      const comments = [...info.comments];
      if (res.data.response) {
        comments.push(res.data.response);
      }

      setInfo({
        ...info,
        problem: {
          ...info.problem,
          status: status
        },
        comments: [...comments]
      });

      return true;
    });
  };


  // если еще не сделали первый запрос на сервер
  if (!isError && !info) {
    return null;
  }

  // если ошибка при первом запросе
  if (isError && !info) {
    return (
      <ErrorBlock
        errorText={t("Произошла ошибка получения запросов в техническую поддержку!")}
      />
    );
  }

  return (
    <>
      <InfoProblemPage
        info={info}
        onDeleteAttach={openDeleteDialog}
        onSubmit={onSubmit}
        backdropImageUrl={backdropImageUrl}
        setBackdropImageUrl={setBackdropImageUrl}
      />

      {deleteDialogTSX}
    </>
  );
};

export default AdminTechSupportInfoPage;