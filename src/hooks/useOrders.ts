import { useQuery } from "@tanstack/react-query";

export async function getOrder(id: string) {
  const response = await fetch(`/api/purchease/findOrder?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}

export function useOrder(id: string) {
  return useQuery(["order", id], () => getOrder(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
