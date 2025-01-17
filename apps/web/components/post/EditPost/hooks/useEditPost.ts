"use client";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../utils/api";
import { Edit } from "../../../../queryKeyFactory/queryKeyFactory";
import { PostSchema } from "../../PostForm";

type EditPostParams = {
  options?: Record<string, unknown>;
  id: string | number | null;
};

export const useEditPost = ({ options = {}, id }: EditPostParams) => {
  return useMutation({
    mutationKey: [Edit],
    mutationFn: async (postData: Partial<PostSchema>) => {
      const data = await api.patch(`/posts/${id}`, postData);
      return data;
    },
    ...options,
  });
};
