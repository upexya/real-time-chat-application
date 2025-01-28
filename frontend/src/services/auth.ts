import endpoints from "src/constants/endpoints";

export const loginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${endpoints.login}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      data.error = true;
    }
    return data;
  } catch (error) {
    throw error;
  }
};
