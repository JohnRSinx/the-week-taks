"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardTask } from "./CardTask";
import { useTaskService } from "@/lib/useTaskService";

export function Dashboard() {
  const { tasks, fetchTasks, createTask } = useTaskService();
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addNewTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      await createTask({ title: newTaskTitle, dayOfWeek: "backlog" });
      setNewTaskTitle("");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-3xl text-center">Tarefas da Semana</h1>
        <div className="flex gap-2 w-2/4 ">
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Nova tarefa"
            className="w-full"
          />
          <Button onClick={addNewTask}>Adicionar</Button>
        </div>
      </div>
      <div className="flex pt-4 gap-4">
        {tasks.map((task) => (
          <CardTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
