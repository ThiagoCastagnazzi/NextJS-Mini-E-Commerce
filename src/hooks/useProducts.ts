import { useQuery } from "@tanstack/react-query";

export async function getProducts() {
  const response = await fetch("/api/products/productList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "*",
    },
  });
  const data = await response.json();

  return data;
}

export async function getProduct(id: string) {
  const response = await fetch(`/api/products/findProduct?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}

export function useProduct(id: string) {
  return useQuery(["product", id], () => getProduct(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useProducts() {
  return useQuery(["product"], () => getProducts(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
