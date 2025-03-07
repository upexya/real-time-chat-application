import axiosInstance from "./axiosInstance";
import endpoints from "src/constants/endpoints";

export async function getChatPreviews() {
  try {
    const response = await axiosInstance.get(endpoints.chat);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
}

export async function createChat({
  chat_name,
  users,
}: {
  chat_name: string;
  users: string[];
}) {
  try {
    const response = await axiosInstance.post(endpoints.chat, {
      chat_name,
      users,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
}
