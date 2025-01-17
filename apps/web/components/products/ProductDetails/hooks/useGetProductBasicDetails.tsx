"use client";
import { Get } from "../../../../queryKeyFactory/queryKeyFactory";
import { api } from "../../../../utils/api";
import { useQuery } from "@tanstack/react-query";

export const useGetProductBasicDetails = (id: number | null | string) => {
  const fetchPost = async () => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  };

  return useQuery({
    queryKey: [Get, id],
    queryFn: fetchPost,
  });
};
