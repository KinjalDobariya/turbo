"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../utils/api";
import { Get } from "../../../../queryKeyFactory/queryKeyFactory";

export const useGetPost = (search: string) => {
  const fetchAllPosts = async () => {
    const response = await api.get("/posts?_limit=100");
    return response.data;
  };

  return useQuery({
    queryKey: [Get, search],
    queryFn: fetchAllPosts,
  });
};
