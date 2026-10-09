import { useQuery } from "@tanstack/react-query";
import { getHotels, getHotelsByCityId } from "../api/hotelsApi";

export const useHotelsByCityId = ({ cityId, page = 1, pageSize = 10 }) => {
  return useQuery({
    queryKey: ["hotels", "city", cityId, page, pageSize],

    queryFn: () => {
      return getHotelsByCityId(cityId, {
        page,
        pageSize,
      });
    },

    staleTime: 5 * 60 * 1000,
  });
};

export const useHotels = ({ page = 1, pageSize = 10 } = {}) => {
  return useQuery({
    queryKey: ["hotels", "all", page, pageSize],

    queryFn: async () => {
      return await getHotels({
        page,
        pageSize,
      });
    },

    staleTime: 5 * 60 * 1000,
  });
};
