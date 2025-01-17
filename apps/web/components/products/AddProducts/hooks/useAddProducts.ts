"use client";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../utils/api";
import { Add } from "../../../../queryKeyFactory/queryKeyFactory";
import { ProductSchema } from "../../ProductForm";

export const useAddProducts = ({ options = {} }) => {
  return useMutation({
    mutationKey: [Add],
    mutationFn: async (productsData: Partial<ProductSchema>) => {
      const data = await api.post("/products", productsData);
      return data;
    },
    ...options,
  });
};
