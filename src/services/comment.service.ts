import api from "../external/api";

export const getCommentsData = async (): Promise<any> => {
  try {
    return await api.get("https://jsonplaceholder.typicode.com/comments?_limit=2");
  } catch (error) {
    console.error("Error:", error);
  }
};
