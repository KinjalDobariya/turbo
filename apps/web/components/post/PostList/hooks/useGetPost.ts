"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../utils/api";

export const useGetPost = (pageNumber: number) => {
  const fetchPost = async () => {
    const response = await api.get(`/posts?_start=${pageNumber}&_limit=4`, {
      params: { page: pageNumber },
    });
    return response.data;
  };

  return useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: fetchPost,
  });
};
