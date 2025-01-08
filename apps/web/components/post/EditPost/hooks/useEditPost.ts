"use client";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../utils/api";

interface EditPostParams {
  options?: Record<string, unknown>;
  id: string | number | null;
}

interface PostProps {
  title: string;
  body: string;
}
export const useEditPost = ({ options = {}, id }: EditPostParams) => {
  return useMutation({
    mutationKey: ["edit"],
    mutationFn: async (postData: PostProps) => {
      const data = await api.patch(`/posts/${id}`, postData);
      return data;
    },
    ...options,
  });
};
