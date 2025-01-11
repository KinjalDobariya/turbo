"use client";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../utils/api";

type PostProps = {
  title: string;
  body: string;
}

export const useAddPost = ({ options = {} }) => {
  return useMutation({
    mutationKey: ["add"],
    mutationFn: async (postData: PostProps) => {
      const data = await api.post("/posts", postData);
      return data;
    },
    ...options,
  });
};
