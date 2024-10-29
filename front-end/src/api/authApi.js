export const login = async (email, password) => {
  const response = await fetch("http://localhost:3001/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  console.log("API response data:", data);
  return data;
};
