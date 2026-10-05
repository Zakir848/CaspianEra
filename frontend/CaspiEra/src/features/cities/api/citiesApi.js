import api from "../../../api/axios";

export async function getCities({ page = 1, pageSize = 20 }) {
  const response = await api.get("/cities", {
    params: {
      page,
      pageSize,
    },
  });

  return response.data;
}
