import { useState } from "react";
import axios from "axios";
import { Task } from "@/src/types/task";
import { CreateTaskData } from "@/src/types/CreateTaskData";

export const useTaskService = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao pegar tarefas:", error);
    }
  };

  const createTask = async (taskData: CreateTaskData): Promise<void> => {
    await axios.post<Task>("/api/tasks", taskData);
    await fetchTasks(); // Atualiza a lista de tarefas após criar uma nova
  };

  return { tasks, fetchTasks, createTask };
};
