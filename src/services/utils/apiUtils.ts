import apiClient from "../axiosConfig";
import { Stage } from "../types/stage.type";
import { createResponse } from "./createResponse";
import { handleError } from "./errorUtils";
import { AxiosResponse } from "axios";

export const getWithParams = async <T>(
  url: string,
  params?: Record<string, any>,
): Promise<Stage<T | null>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url, { params });
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const postRequest = async <T>(
  url: string,
  data?: any,
  apiKey?: string,
): Promise<Stage<T | null>> => {
  try {
    const config = apiKey ? { headers: { "API-Key": apiKey } } : undefined;
    const response: AxiosResponse<T> = await apiClient.post(url, data, config);
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const putRequest = async <T>(
  url: string,
  data?: any,
): Promise<Stage<T | null>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.put(url, data);
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const deleteRequest = async <T>(
  url: string,
  params?: Record<string, any>,
): Promise<Stage<T | null>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.delete(url, { params });
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const postFormData = async <T>(
  url: string,
  formData: FormData,
): Promise<Stage<T | null>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const putFormData = async <T>(
  url: string,
  formData: FormData,
): Promise<Stage<T | null>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.put(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const postList = async <T>(
  url: string,
  dataList: any[],
): Promise<Stage<T | null>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(url, {
      items: dataList,
    });
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const getFile = async (
  url: string,
  params?: Record<string, any>,
): Promise<Stage<Blob | null>> => {
  try {
    const response: AxiosResponse<Blob> = await apiClient.get(url, {
      params,
      responseType: "blob", // quan trọng để nhận file dưới dạng Blob
    });
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};
