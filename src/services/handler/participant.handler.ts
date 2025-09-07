import { Stage } from "../types/stage.type";
import {
  deleteRequest,
  getWithParams,
  postFormData,
  postRequest,
} from "../utils/apiUtils";

// Type definitions
interface CreateParticipantParams {
  fullName: string;
  phone: string;
  email: string;
  idCard: string;
  gender: string;
  bibText: string;
  birthday: Date;
  distance: string;
  eventId: string;
}

interface PaginationParticipantParams {
  page?: number;
  limit?: number;
  search?: string;
  eventId?: string;
}

interface FindByMapParams {
  mapId: number;
  sortBy: string;
  order?: "ASC" | "DESC";
}

interface CreateFromExcelParams {
  files: FileList;
}

interface FindByIdParams {
  id: number;
}

interface CheckinParams {
  sign: File;
  picture: File;
  participantId: number;
}

interface ChangeDeviceParams {
  deviceId: string;
  participantId: number;
}

interface UpdateParticipantParams {
  id: number;
  fullName?: string;
  phone?: string;
  email?: string;
  idCard?: string;
  gender?: string;
  bibText?: string;
  birthday?: Date;
  distance?: string;
}

const ParticipantHandler = {
  createParticipant: async (
    params: CreateParticipantParams
  ): Promise<Stage<any>> => {
    return postRequest("tracker/participants/create", params);
  },

  paginationParticipant: async (
    params: PaginationParticipantParams
  ): Promise<Stage<any>> => {
    return getWithParams("tracker/participants/paginated", params);
  },

  findParticipantsByEventIdAndMapId: async (
    params: FindByMapParams
  ): Promise<Stage<any>> => {
    return getWithParams("tracker/participants/find", params);
  },

  createParticipantFromExcel: async (
    params: CreateFromExcelParams
  ): Promise<Stage<any>> => {
    if (!params.files?.length) {
      throw new Error("No file selected");
    }

    const formData = new FormData();
    formData.append("file", params.files[0]);

    return postFormData(
      "tracker/participants/create-participant-from-excel",
      formData
    );
  },

  findById: async (params: FindByIdParams): Promise<Stage<any>> => {
    return getWithParams("tracker/participants/find/id", params);
  },

  checkinOnEvent: async (params: CheckinParams): Promise<Stage<any>> => {
    const timestamp = Date.now();
    const fileName = `${params.participantId}_${timestamp}_checkin.jpg`;

    const formData = new FormData();
    formData.append("sign", params.sign);
    formData.append("picture", params.picture, fileName);
    formData.append("participantId", params.participantId.toString());

    return postFormData("tracker/participants/checkin-on-event", formData);
  },

  updateParticipant: async (
    params: UpdateParticipantParams
  ): Promise<Stage<any>> => {
    const { id, ...updateData } = params;
    return postRequest(`tracker/participants/update/${id}`, updateData);
  },

  deleteParticipant: async (id: number): Promise<Stage<any>> => {
    return deleteRequest(`tracker/participants/delete?id=${id}`);
  },

  findParticipantsAndLogByMapId: async (mapId: number): Promise<Stage<any>> => {
    if (!mapId) {
      throw new Error("Missing mapId");
    }
    return getWithParams(
      `tracker/participants/find-participants-and-log?mapId=${mapId}`
    );
  },

  changeDevice: async (params: ChangeDeviceParams): Promise<Stage<any>> => {
    return postRequest("tracker/participants/change-device", params);
  },

  getAllParticipants: async (): Promise<Stage<any>> => {
    return getWithParams("tracker/participants/all", {});
  },

  getParticipantsByEvent: async (eventId: string): Promise<Stage<any>> => {
    return getWithParams("tracker/participants/by-event", { eventId });
  },

  getParticipantStatistics: async (
    participantId: number
  ): Promise<Stage<any>> => {
    return getWithParams(
      `tracker/participants/statistics/${participantId}`,
      {}
    );
  },

  bulkDeleteParticipants: async (ids: number[]): Promise<Stage<any>> => {
    return postRequest("tracker/participants/bulk-delete", { ids });
  },

  exportParticipants: async (eventId: string): Promise<Stage<any>> => {
    return getWithParams("tracker/participants/export", { eventId });
  },
};

export default ParticipantHandler;
