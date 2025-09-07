import { Stage } from "../types/stage.type";
import { getWithParams, deleteRequest } from "../utils/apiUtils";

const NotificationService = {
  paginationNotification: async (params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<Stage<any>> => {
    return await getWithParams("tracker/notification/paginated", params);
  },

  deleteNotification: async (notificationId: string): Promise<Stage<any>> => {
    return await deleteRequest(`tracker/notification/${notificationId}`);
  },
};

export default NotificationService;
