"use client";
import { Delete } from "../../../../queryKeyFactory/queryKeyFactory";
import { api } from "../../../../utils/api";
import { useMutation } from "@tanstack/react-query";

type DeletePostParams = {
  options?: Record<string, unknown>;
};
export const useDeletePost = ({ options = {} }: DeletePostParams) => {
  return useMutation({
    mutationKey: [Delete],
    mutationFn: async (id: number | null) => {
      const data = await api.delete(`/posts/${id}`);
      return data;
    },
    ...options,
  });
};
