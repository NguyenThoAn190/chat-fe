import { Stage } from "../types/stage.type";
import { getWithParams, postFormData } from "../utils/apiUtils";

// Type definitions
interface CreateMapParams {
  name: string;
  runTime: string;
  title: string;
  locationStart: string;
  runEndTime: string;
  locationEnd: string;
  file: File;
  bannerImage: File | null;
  eventId: string;
}

interface CreateMapV2Params {
  name: string;
  runTime: string;
  title: string;
  locationStart: string;
  runEndTime: string;
  locationEnd: string;
  file: File;
  bannerImage: File | null;
}

interface PaginationMapsParams {
  page?: number;
  limit?: number;
  search?: string;
  urlSlug?: string;
}

interface FindByIdParams {
  id: number;
}

interface UpdateMapParams {
  id: number;
  name?: string;
  runTime?: string;
  title?: string;
  locationStart?: string;
  runEndTime?: string;
  locationEnd?: string;
  file?: File;
  bannerImage?: File | null;
}

interface DeleteMapParams {
  id: number;
}

const MapHandler = {
  createMap: async (params: CreateMapV2Params): Promise<Stage<any>> => {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("title", params.title);
    formData.append("runTime", params.runTime);
    formData.append("locationStart", params.locationStart);
    formData.append("runEndTime", params.runEndTime);
    formData.append("locationEnd", params.locationEnd);
    formData.append("file", params.file);

    if (params.bannerImage) {
      formData.append("bannerImage", params.bannerImage);
    }

    return postFormData("tracker/maps/create/map", formData);
  },

  paginationMaps: async (params: PaginationMapsParams): Promise<Stage<any>> => {
    return getWithParams("tracker/maps/paginated", params);
  },

  findById: async (params: FindByIdParams): Promise<Stage<any>> => {
    return getWithParams("tracker/maps/find", params);
  },

  updateMap: async (params: UpdateMapParams): Promise<Stage<any>> => {
    const { id, ...updateData } = params;
    const formData = new FormData();

    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "bannerImage" && value instanceof File) {
          formData.append(key, value);
        } else if (key !== "bannerImage") {
          formData.append(key, value.toString());
        }
      }
    });

    return postFormData(`tracker/maps/update/${id}`, formData);
  },

  deleteMap: async (params: DeleteMapParams): Promise<Stage<any>> => {
    return getWithParams(`tracker/maps/delete/${params.id}`, {});
  },

  getAllMaps: async (): Promise<Stage<any>> => {
    return getWithParams("tracker/maps/all", {});
  },

  getMapsByEvent: async (eventId: string): Promise<Stage<any>> => {
    return getWithParams("tracker/maps/by-event", { eventId });
  },

  getMapStatistics: async (mapId: number): Promise<Stage<any>> => {
    return getWithParams(`tracker/maps/statistics/${mapId}`, {});
  },
};

export default MapHandler;
