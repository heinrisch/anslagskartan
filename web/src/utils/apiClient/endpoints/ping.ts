import { appConfig } from "../../../appConfig";
import { restClient } from "../restClient";

export const ping = (userId?: string) => restClient.get(`${appConfig.apiBaseUrl}/ping`, userId);
