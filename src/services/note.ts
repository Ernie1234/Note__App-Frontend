import axiosInstance from "./axiosInstance";

interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
  updatedAt: Date;
  createdAt: Date;
}

interface NotesResponse {
  data: Post[];
  message: string;
  success: boolean;
}

export const getAllNotes = async (): Promise<Post[]> => {
  const response = await axiosInstance.get<NotesResponse>("/notes");
  return response.data.data;
};
