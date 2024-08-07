"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardTask } from "./CardTask";

export function Dashboard() {
  const [tasks, setTasks] = useState({
    backlog: [
      {
        id: 1,
        title: "Criar novo design para o site",
        completed: false,
        day: "backlog",
      },
      {
        id: 2,
        title: "Atualizar documentação do projeto",
        completed: false,
        day: "backlog",
      },
      {
        id: 3,
        title: "Resolver bug no formulário de contato",
        completed: false,
        day: "backlog",
      },
    ],
    monday: [
      {
        id: 4,
        title: "Reunião com a equipe de marketing",
        completed: false,
        day: "monday",
      },
      {
        id: 5,
        title: "Enviar relatório semanal",
        completed: false,
        day: "monday",
      },
    ],
    tuesday: [
      {
        id: 6,
        title: "Finalizar apresentação para o cliente",
        completed: false,
        day: "tuesday",
      },
      {
        id: 7,
        title: "Revisar código da nova funcionalidade",
        completed: false,
        day: "tuesday",
      },
    ],
    wednesday: [
      {
        id: 8,
        title: "Criar cronograma para o próximo lançamento",
        completed: false,
        day: "wednesday",
      },
      {
        id: 9,
        title: "Atualizar o roadmap do produto",
        completed: false,
        day: "wednesday",
      },
    ],
    thursday: [
      {
        id: 10,
        title: "Entrevistar candidatos para a vaga de desenvolvedor",
        completed: false,
        day: "thursday",
      },
      {
        id: 11,
        title: "Resolver problemas de desempenho no servidor",
        completed: false,
        day: "thursday",
      },
    ],
    friday: [
      {
        id: 12,
        title: "Organizar confraternização de fim de semana",
        completed: false,
        day: "friday",
      },
      {
        id: 13,
        title: "Fazer backup dos dados do sistema",
        completed: false,
        day: "friday",
      },
    ],
  });
  // const [newTaskTitle, setNewTaskTitle] = useState("");
  // const [selectedTask, setSelectedTask] = useState(null);
  // const toggleTaskCompletion = async (taskId) => {
  //   try {
  //     const response = await fetch("YOUR_API_URL", {
  //       method: "PUT",
  //     });
  //     const updatedTask = await response.json();
  //     setTasks((prevTasks) => ({
  //       ...prevTasks,
  //       [selectedTask.day]: prevTasks[selectedTask.day].map((task) =>
  //         task.id === taskId ? updatedTask : task
  //       ),
  //     }));
  //   } catch (error) {
  //     console.error("Error toggling task completion:", error);
  //   }
  // };
  // const deleteTask = async (taskId) => {
  //   try {
  //     await fetch("YOUR_API_URL", {
  //       method: "DELETE",
  //     });
  //     setTasks((prevTasks) => ({
  //       ...prevTasks,
  //       [selectedTask.day]: prevTasks[selectedTask.day].filter(
  //         (task) => task.id !== taskId
  //       ),
  //     }));
  //     setSelectedTask(null);
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };
  // const addNewTask = async (day) => {
  //   if (newTaskTitle.trim() !== "") {
  //     try {
  //       const response = await fetch("YOUR_API_URL", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ title: newTaskTitle, day }),
  //       });
  //       const newTask = await response.json();
  //       setTasks((prevTasks) => ({
  //         ...prevTasks,
  //         [day]: [...prevTasks[day], newTask],
  //       }));
  //       setNewTaskTitle("");
  //     } catch (error) {
  //       console.error("Error adding new task:", error);
  //     }
  //   }
  // };
  // const moveTask = async (newDay) => {
  //   if (selectedTask) {
  //     try {
  //       const response = await fetch("YOUR_API_URL", {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ newDay }),
  //       });
  //       const movedTask = await response.json();
  //       setTasks((prevTasks) => ({
  //         ...prevTasks,
  //         [selectedTask.day]: prevTasks[selectedTask.day].filter(
  //           (task) => task.id !== selectedTask.id
  //         ),
  //         [newDay]: [...prevTasks[newDay], movedTask],
  //       }));
  //       setSelectedTask(null);
  //     } catch (error) {
  //       console.error("Error moving task:", error);
  //     }
  //   }
  // };
  return (
    <div>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-3xl text-center">Tarefas da Semana</h1>
        <div className="flex gap-2 w-2/4 ">
          <Input
            // value={newTaskTitle}
            // onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Nova tarefa"
            className="w-full "
          />
          <Button onClick={() => addNewTask("backlog")}>Adicionar</Button>
        </div>
      </div>
      <div className="flex pt-4 gap-4">
        <CardTask tasks={tasks} />
        <CardTask tasks={tasks} />
        <CardTask tasks={tasks} />
      </div>
      <div className="flex pt-4 gap-4">
        <CardTask tasks={tasks} />
        <CardTask tasks={tasks} />
        <CardTask tasks={tasks} />
      </div>
    </div>
  );
}
