"use client";
import { api } from "../../../../utils/api";
import { useQuery } from "@tanstack/react-query";

export const useGetPostBasicDetails = (id: number | null | string) => {
  const fetchPost = async () => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  };

  return useQuery({
    queryKey: ["posts", id],
    queryFn: fetchPost,
  });
};
