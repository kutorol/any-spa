import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import useDialogConfirm from "../../../../../hooks/dialog/useDialogConfirm";
import { IABTest } from "../../../../../utils/interfaces/admin/ab";
import FullScreenDialog from "../../../../Common/Gui/Dialog/FullScreenDialog";
import EditForm from "./EditForm";

interface IEditBlock {
  editTest: null | IABTest;
  setEditTest: (v: null | IABTest) => void;
  totalUsers: number;
  findDuplicate: (v: string, id?: number) => boolean;
  onUpdate: (test: IABTest) => Promise<boolean>;
}

const EditBlock = ({ editTest, setEditTest, totalUsers, findDuplicate, onUpdate }: IEditBlock) => {
  const { t } = useLaravelReactI18n();
  const onCloseConfirmEdit = (v: any): Promise<boolean> => {
    setEditTest(v);
    // @ts-ignore
    return new Promise<boolean>(r => r(true));
  };

  const { openConfirmDialog, confirmDialogTSX } = useDialogConfirm(
    onCloseConfirmEdit,
    t("закрыть редактирование A/B теста")
  );

  if (!editTest) {
    return null;
  }

  return (
    <>
      {confirmDialogTSX}

      <FullScreenDialog
        title={t("Редактирование теста: :testName", { testName: editTest.key })}
        isOpen
        onCloseClick={() => openConfirmDialog(null)}
      >
        <EditForm
          editTest={editTest}
          totalUsers={totalUsers}
          findDuplicate={findDuplicate}
          onUpdate={onUpdate}
        />
      </FullScreenDialog>
    </>
  );
};

export default EditBlock;