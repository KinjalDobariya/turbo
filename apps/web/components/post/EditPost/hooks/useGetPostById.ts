"use client";
import { Get } from "../../../../queryKeyFactory/queryKeyFactory";
import { api } from "../../../../utils/api";
import { useQuery } from "@tanstack/react-query";

export const useGetPostById = (id: number | null) => {
  const fetchPost = async () => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  };

  return useQuery({
    queryKey: [Get, id],
    queryFn: fetchPost,
    enabled: !!id,
  });
};
