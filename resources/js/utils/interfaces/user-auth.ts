import { ERoles } from "../enums/user";

export interface IUserSocialAuth {
  auth(re: object, captchaToken: string, chosenRole?: ERoles): Promise<boolean>;

  fetchData(url: string, accessToken: string): any;
}