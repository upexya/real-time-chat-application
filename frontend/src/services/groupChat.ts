import endpoints from "src/constants/endpoints";
import axiosInstance from "./axiosInstance";

export async function createGroupChat({
  chat_name,
  users,
  group_admin,
}: {
  chat_name: string;
  users: string[];
  group_admin: string;
}) {
  const payload = {
    chat_name,
    users,
    group_admin,
    is_group_chat: 1,
  };

  try {
    const response = await axiosInstance.post(endpoints.chat, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
}
