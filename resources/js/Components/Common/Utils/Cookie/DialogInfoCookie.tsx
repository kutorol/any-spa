import { Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useMatch from "../../../../hooks/useMatch";
import { cookieURL, privacyURL } from "../../../../routes/Components/SpecialRoutes";
import { getUrl } from "../../../../utils/funcs/url";
import Btn from "../../Gui/Btn/Btn";
import Icon from "../../Gui/Common/Icon";
import FullScreenDialog from "../../Gui/Dialog/FullScreenDialog";
import MainCard from "../../MainCard/MainCard";
import DynamicImportLocaleComponent from "../DynamicImportLocaleComponent";
// import DynamicImportLocaleComponent from "../DynamicImportLocaleComponent";
import { isPrivacy } from "./CookieConfirm";
import TermsOfUseCookie from "./TermsOfUseCookie";

interface IDialogInfoCookie {
  isOpenDialog: boolean;
  onCloseClick: (e: React.SyntheticEvent) => void;
}

const DialogInfoCookie = ({ isOpenDialog, onCloseClick }: IDialogInfoCookie) => {
  const { t } = useLaravelReactI18n();
  const nav = useNavigate();
  const loc = useLocation();

  const [documentAgreement, setDocumentAgreement] = useState<boolean>(isPrivacy(loc));

  const ref = useRef(null);

  const onChangeDocument = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    nav(documentAgreement ? getUrl(cookieURL) : getUrl(privacyURL));
  };

  useEffect(() => {
    if (!documentAgreement && isPrivacy(loc)) {
      setDocumentAgreement(true);
    } else if (documentAgreement && !isPrivacy(loc)) {
      setDocumentAgreement(false);
    }
  }, [documentAgreement, loc.pathname]);

  useEffect(() => {
    if (isOpenDialog && ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({
          block: "start",
          behavior: "smooth"
        });
      }, 50);

    }
  }, [ref, documentAgreement, isOpenDialog]);

  const { matchDownMd } = useMatch();

  const titleBtnBack = t("Условия использования файлов cookie");
  const titleDialog = documentAgreement ? t("Соглашение об обработке персональных данных") : titleBtnBack;

  return (
    <FullScreenDialog
      refDiv={ref}
      title={titleDialog}
      isOpen={isOpenDialog}
      onCloseClick={onCloseClick}
    >
      <MainCard
        border={false}
        sx={{ "& > .MuiCardContent-root": { padding: 0 } }}
      >
        <Grid container>
          <Grid item xs={12} hidden={!documentAgreement}>
            <Btn
              webTitle={titleBtnBack}
              mobTitle={titleBtnBack}
              icon={<Icon tablerIcon={"IconChevronLeft"}/>}
              onClick={onChangeDocument}
            />
          </Grid>
        </Grid>
      </MainCard>

      <MainCard border={false}>
        <Grid container>
          <Grid item xs={matchDownMd ? 0 : 2}/>
          <Grid
            item
            xs={matchDownMd ? 12 : 8}
            hidden={!documentAgreement}
          >
            <DynamicImportLocaleComponent
              pathToFiles="../../Common/Utils/Cookie/Locales"
              nameFile="DocumentAgreement"
            />
          </Grid>

          <Grid
            item
            xs={matchDownMd ? 12 : 8}
            hidden={documentAgreement}
          >
            <TermsOfUseCookie onChangeDocument={onChangeDocument}/>
          </Grid>
          <Grid item xs={matchDownMd ? 0 : 2}/>
        </Grid>
      </MainCard>
    </FullScreenDialog>
  );
};

export default DialogInfoCookie;