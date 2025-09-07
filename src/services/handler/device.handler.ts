import { Stage } from "../types/stage.type";
import { getWithParams, postFormData, postRequest } from "../utils/apiUtils";

// Type definitions
interface PaginationDevicesParams {
  page?: number;
  limit?: number;
  search?: string;
  batt?: number;
  sortBy?: string;
  sortOrder?: string;
  deviceStatus?: boolean;
  startDate?: Date;
  endDate?: Date;
}

interface AddDeviceParams {
  id: string;
  idDevice: string;
  name: string;
  phone: string | null;
}

interface CreateFromExcelParams {
  files: FileList;
}

interface PaginationLogParams {
  page?: number;
  limit?: number;
  deviceId?: string;
}

interface SearchLogParams {
  participantId: number;
}

interface FindLogByTimeParams {
  timeStart: Date;
  timeEnd: Date;
  deviceId: string;
}

const DeviceHandler = {
  paginationDevices: async (
    params: PaginationDevicesParams
  ): Promise<Stage<any>> => {
    return getWithParams("tracker/devices/paginated", params);
  },

  addDevice: async (params: AddDeviceParams): Promise<Stage<any>> => {
    return postRequest("tracker/devices/create-device", params);
  },

  getAllDevices: async (): Promise<Stage<any[] | null>> => {
    return getWithParams<any[]>("tracker/devices/find");
  },

  createDeviceFromExcel: async (
    params: CreateFromExcelParams
  ): Promise<Stage<any>> => {
    if (!params.files?.length) {
      throw new Error("No file selected");
    }

    const formData = new FormData();
    formData.append("file", params.files[0]);

    return postFormData("tracker/devices/create-device-from-excel", formData);
  },

  paginationLogDevices: async (
    params: PaginationLogParams
  ): Promise<Stage<any>> => {
    return getWithParams("tracker/devices/log/paginated", params);
  },

  searchLogLatByDeviceIdAndTime: async (
    params: SearchLogParams
  ): Promise<Stage<any>> => {
    return getWithParams(
      "tracker/devices/find/logs/search-lat-by-device-id-and-time",
      params
    );
  },

  findDeviceById: async (id: string): Promise<Stage<any>> => {
    return getWithParams("tracker/devices/find/find-by-id", { id });
  },

  findAllLogDeviceByTime: async (
    params: FindLogByTimeParams
  ): Promise<Stage<any>> => {
    return getWithParams("tracker/devices/find/all-log-device-by-time", params);
  },
};

export default DeviceHandler;
