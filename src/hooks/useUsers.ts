import { useQuery } from "@tanstack/react-query";

export async function getUsers() {
  const response = await fetch("/api/users/userList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}

export async function getUser(id: string) {
  const response = await fetch(`/api/users/findUser?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}

export function useUser(id: string) {
  return useQuery(["user", id], () => getUser(id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useUsers() {
  return useQuery(["users"], () => getUsers(), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
