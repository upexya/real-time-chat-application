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

export const registerService = async ({
  email,
  password,
  name,
  avatar,
}: {
  email: string;
  password: string;
  name: string;
  avatar?: string;
}) => {
  if (!email || !password || !name) {
    return { error: true, message: "All fields are required" };
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${endpoints.register}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, avatar }),
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
