import { Stage } from "../types/stage.type";
import { getWithParams, postFormData } from "../utils/apiUtils";

// Type definitions
interface CreateEventParams {
  name: string;
  description: string;
  eventDate: string;
  bannerImage: File | null;
}

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface FindByEmailParams {
  email: string;
}

const EventHandler = {
  createEvent: async (params: CreateEventParams) => {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("description", params.description);
    formData.append("eventDate", params.eventDate || "");

    if (params.bannerImage) {
      formData.append("bannerImage", params.bannerImage);
    }

    return postFormData("tracker/events/create", formData);
  },

  paginationEvents: async (params: PaginationParams): Promise<Stage<any>> => {
    return getWithParams("tracker/events/paginated", params);
  },

  findEventByEmailUser: async (
    params: FindByEmailParams
  ): Promise<Stage<any>> => {
    return getWithParams("tracker/events/findEventByEmailUser", params);
  },
};

export default EventHandler;
