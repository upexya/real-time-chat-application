import axiosInstance from "./axiosInstance";
import endpoints from "src/constants/endpoints";

export async function getActiveChatMessages(props: {
  chat_id: string;
  page?: number;
}) {
  const { chat_id, page = 0 } = props;
  try {
    const response = await axiosInstance.get(
      `${endpoints.message}/${chat_id}?page=${page}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
}

export async function sendMessage(props: {
  chat_id: string;
  content: string;
}) {
  const { chat_id, content } = props;
  try {
    const response = await axiosInstance.post(endpoints.message, {
      chat_id,
      content,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
}
