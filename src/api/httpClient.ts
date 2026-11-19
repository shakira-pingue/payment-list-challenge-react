import axios from "axios";
import { I18N } from "../constants/i18n";

export const httpClient = axios.create();

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const message =
      status === 404
        ? I18N.PAYMENT_NOT_FOUND
        : status === 500
        ? I18N.INTERNAL_SERVER_ERROR
        : I18N.SOMETHING_WENT_WRONG;
    return Promise.reject(new Error(message));
  }
);
