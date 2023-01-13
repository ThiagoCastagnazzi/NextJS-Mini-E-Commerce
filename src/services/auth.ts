interface SignInRequestData {
  email: string;
  password: string;
}

export function signInRequest(data: SignInRequestData) {
  return fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
