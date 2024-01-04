import { IBreadcrumbsUrl } from "../../../utils/interfaces/breadcrumbs";
import newsUrls from "./url/news";
import settingsUrls from "./url/settings";

// url для хлебных крошек
const breadcrumbsUrls: IBreadcrumbsUrl = {
  ...settingsUrls,
  ...newsUrls
};

export default breadcrumbsUrls;
