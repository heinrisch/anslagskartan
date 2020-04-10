import { restClient } from "../restClient";
import { appConfig } from "../../../appConfig";

export const authPing = (userId?: string) =>
  restClient.get<void>(`${appConfig.apiBaseUrl}/check-auth`, userId);
