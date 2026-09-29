import api from "../../../api/axios";

export const getHotels = async () => {
  const response = await api.get("/hotels");

  return response.data;
};

export const getHotelById = async (id) => {
  const response = await api.get(`/hotels/${id}`);

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
