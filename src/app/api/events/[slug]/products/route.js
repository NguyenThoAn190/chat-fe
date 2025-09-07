import { getRequest } from "@/_utils/route-handler-utils";

export async function GET(request, { params }) {
  console.log(params);

  return getRequest(`/events/${params.slug}/products`);
}
