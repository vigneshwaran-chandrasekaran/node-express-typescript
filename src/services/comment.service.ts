import api from "../external/api";

export const getCommentsData = async (): Promise<any> => {
  try {
    const res = await api.get(
      "https://jsonplaceholder.typicode.com/comments?_limit=2"
    );
    return res?.data || [];
  } catch (error) {
    console.error("Error:", error);
  }
};
