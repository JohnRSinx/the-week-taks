"use client"; // Adicione esta linha para garantir que este componente seja um Client Component

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardTask } from "./CardTask";
import { useTaskService } from "@/lib/useTaskService";

export function Dashboard() {
  const { tasks, createTask, loading, error } = useTaskService();
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const addNewTask = async () => {
    if (!newTaskTitle.trim()) return;

    await createTask({ title: newTaskTitle, dayOfWeek: "backlog" });
    setNewTaskTitle(""); // Limpa o campo de entrada
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
        {loading && <div>Carregando tarefas...</div>}
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <div className="flex pt-4 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => <CardTask key={task.id} tasks={[task]} />)
        ) : (
          <div>Nenhuma tarefa disponível.</div>
        )}
      </div>
    </div>
  );
}
