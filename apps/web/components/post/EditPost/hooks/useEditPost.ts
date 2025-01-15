"use client";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../utils/api";
import { Edit } from "../../../../queryKeyFactory/queryKeyFactory";

type EditPostParams = {
  options?: Record<string, unknown>;
  id: string | number | null;
};

type PostProps = {
  title: string;
  body: string;
};
export const useEditPost = ({ options = {}, id }: EditPostParams) => {
  return useMutation({
    mutationKey: [Edit],
    mutationFn: async (postData: PostProps) => {
      const data = await api.patch(`/posts/${id}`, postData);
      return data;
    },
    ...options,
  });
};
