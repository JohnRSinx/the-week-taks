import { useState, useEffect } from "react";
import axios from "axios";
import { Task } from "@/src/types/task";
import { CreateTaskData } from "@/src/types/CreateTaskData";

export const useTaskService = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Task[]>("/api/tasks");
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
      const response = await axios.post<Task>("/api/tasks", taskData);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      setError("Erro ao criar tarefa.");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`/api/tasks`, { data: { id } });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      setError("Erro ao deletar tarefa.");
    }
  };

  const toggleTaskCompletion = async (id: number, isCompleted: boolean) => {
    try {
      const response = await axios.put(`/api/tasks`, { id, isCompleted });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, isCompleted: response.data.isCompleted }
            : task
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      setError("Erro ao atualizar tarefa.");
    }
  };

  const updateTaskDay = async (id: number, dayOfWeek: string) => {
    try {
      const response = await axios.put(`/api/tasks`, { id, dayOfWeek });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, dayOfWeek: response.data.dayOfWeek }
            : task
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar dia da tarefa:", error);
      setError("Erro ao atualizar dia da tarefa.");
    }
  };

  useEffect(() => {
    fetchTasks(); // Carregar tarefas ao montar o componente
  }, []);

  return {
    tasks,
    fetchTasks,
    createTask,
    deleteTask,
    toggleTaskCompletion,
    updateTaskDay,
    loading,
    error,
  };
};
