import api from "../../../api/axios";

export const getHotelsByCityId = async (
  cityId,
  { page = 1, pageSize = 12 },
) => {
  const response = await api.get(`/cities/${cityId}/hotels`, {
    params: {
      page,
      pageSize,
    },
  });

  return response.data;
};

export const getHotels = async ({ page = 1, pageSize = 12 }) => {
  const response = await api.get(`/hotels`, {
    params: {
      page,
      pageSize,
    },
  });

  return response.data;
};

export const getHotelById = async (cityId, id) => {
  const response = await api.get(`cities/${cityId}/hotels/${id}`);

  return response.data;
};

export const createHotel = async (name, description, images) => {
  const formData = new FormData();

  if (name?.trim()) {
    formData.append("name", name.trim());
  }

  if (description?.trim()) {
    formData.append("description", description.trim());
  }

  if (images) {
    formData.append("images", [images]);
  }

  const response = await api.post("/hotels", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
