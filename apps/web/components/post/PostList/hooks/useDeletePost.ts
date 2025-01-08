"use client";
import { api } from "../../../../utils/api";
import { useMutation } from "@tanstack/react-query";

interface DeletePostParams {
  options?: Record<string, unknown>;
}
export const useDeletePost = ({ options = {} }: DeletePostParams) => {
  return useMutation({
    mutationKey: ["delete"],
    mutationFn: async (id: number) => {
      const data = await api.delete(`/posts/${id}`);
      return data;
    },
    ...options,
  });
};
