import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";
import { Task } from "@/src/types/task";
import { CreateTaskData } from "@/src/types/CreateTaskData";
import { UpdateTaskData } from "@/src/types/UpdateTaskData";

export const useTaskService = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<Task[]>("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao pegar tarefas:", error);
      setError("Erro ao carregar tarefas.");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: CreateTaskData): Promise<void> => {
    try {
      const response = await axiosInstance.post<Task>("/tasks", taskData);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      setError("Erro ao criar tarefa.");
    }
  };

  const updateTask = async (
    taskId: string,
    taskData: UpdateTaskData
  ): Promise<void> => {
    try {
      const response = await axiosInstance.put<Task>(
        `/tasks/${taskId}`,
        taskData
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...response.data } : task
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      setError("Erro ao atualizar tarefa.");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axiosInstance.delete(`/tasks/`, { data: { id } });
      console.log(`Tarefa com ID ${id} deletada com sucesso.`); // Log para verificar a exclusão
      fetchTasks();
      console.log(tasks);
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      setError("Erro ao deletar tarefa.");
    }
  };

  const resetCompletedTasks = async (): Promise<void> => {
    try {
      await axiosInstance.patch("/tasks");
      // Re-fetch tasks or update state accordingly as needed
      fetchTasks();
    } catch (error) {
      console.error("Erro ao resetar tarefas completas:", error);
      setError("Erro ao resetar tarefas completas.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    resetCompletedTasks,
    loading,
    error,
  };
};
