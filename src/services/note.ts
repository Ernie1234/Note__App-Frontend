import axiosInstance from "./axiosInstance";

export interface INote {
  userId: string;
  id: string;
  title: string;
  body: string;
  updatedAt: Date;
  createdAt: Date;
}

interface NotesResponse {
  data: INote[];
  message: string;
  success: boolean;
}

export const getAllNotes = async (): Promise<INote[]> => {
  const response = await axiosInstance.get<NotesResponse>("/notes");
  return response.data.data;
};
