import { Task } from "@/src/types/task";
import axiosInstance from "./axiosInstance";
import { CreateTaskData } from "@/src/types/CreateTaskData";
import { UpdateTaskData } from "@/src/types/UpdateTaskData";

export const getTasks = async (): Promise<Task[]> => {
  const response = await axiosInstance.get<Task[]>("/tasks");
  return response.data;
};

export const createTask = async (taskData: CreateTaskData): Promise<Task> => {
  const response = await axiosInstance.post<Task>("/tasks", taskData);
  return response.data;
};

export const updateTask = async (
  taskId: number,
  taskData: UpdateTaskData
): Promise<Task> => {
  const response = await axiosInstance.put<Task>(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await axiosInstance.delete(`/tasks/${taskId}`);
};

export const resetCompletedTasks = async (): Promise<void> => {
  await axiosInstance.patch("/tasks");
};
