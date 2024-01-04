import { get } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ELanguages } from "../../../utils/enums/user";

interface IDynamicImportComponent {
  // Путь до файлов с языками, относительно текущей папки (./)
  pathToFiles: string;
  // Название файла - всегда оканчивается на имя языка с большой буквы
  nameFile: string;
}

const DynamicImportLocaleComponent = ({ pathToFiles, nameFile }: IDynamicImportComponent) => {
  const [module, setModule] = useState(null);
  const userLocale: ELanguages = useSelector((s: RootState) => s.userInfo.user.locale);
  const name = `${nameFile}${userLocale.toUpperCase()}`;

  useEffect(() => {
    const fetchData = () => {
      // @ts-ignore
      // @vite-ignore
      import(`${pathToFiles}/${name}`).then(res => {
        setModule(get(res, "default", null));
      }).catch(e => {
        console.error("Error loading module agreement:", e);
      });
    };

    fetchData();
  }, [userLocale]);

  return (<>{module}</>);
};

export default DynamicImportLocaleComponent;