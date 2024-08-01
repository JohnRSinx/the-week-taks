// src/api/tasks.js

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      // Listar todas as tarefas
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
    } else if (req.method === "POST") {
      // Criar nova tarefa
      const { title, dayOfWeek } = req.body;

      // Verifique se title e dayOfWeek estão definidos
      if (!title || !dayOfWeek) {
        return res
          .status(400)
          .json({ error: "Title and dayOfWeek are required" });
      }

      const newTask = await prisma.task.create({
        data: {
          title,
          dayOfWeek,
        },
      });
      res.status(201).json(newTask);
    } else if (req.method === "PUT") {
      // Atualizar tarefa
      const { id, isCompleted, dayOfWeek } = req.body;

      const updatedTask = await prisma.task.update({
        where: { id },
        data: { isCompleted, dayOfWeek },
      });
      res.status(200).json(updatedTask);
    } else if (req.method === "DELETE") {
      // Deletar tarefa
      const { id } = req.body;
      await prisma.task.delete({ where: { id } });
      res.status(204).end();
    } else if (req.method === "PATCH") {
      // Resetar tarefas completadas
      await prisma.task.updateMany({
        where: { isCompleted: true },
        data: { isCompleted: false },
      });
      res.status(204).end();
    } else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE", "PATCH"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Desconectar do Prisma após a operação
  }
}
