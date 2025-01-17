"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../utils/api";
import { Get } from "../../../../queryKeyFactory/queryKeyFactory";

export const useGetProduct = (search: string) => {
  const fetchAllProducts = async () => {
    const response = await api.get("/products");
    return response.data;
  };

  return useQuery({
    queryKey: [Get, search],
    queryFn: fetchAllProducts,
  });
};
