import { Stage } from "../types/stage.type";
import { getWithParams } from "../utils/apiUtils";

const UserService = {
  paginationUsers: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    batt?: number;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<Stage<any>> => {
    console.log(params);
    return await getWithParams("tracker/users/paginated", params);
  },
};

export default UserService;
