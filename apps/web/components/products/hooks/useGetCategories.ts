"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api";
import { Get } from "../../../queryKeyFactory/queryKeyFactory";

export const useGetCategories = () => {
  const fetchAllCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
  };

  return useQuery({
    queryKey: [Get],
    queryFn: fetchAllCategories,
  });
};
