import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Task } from "@/src/types/task";
import { useTaskService } from "@/lib/useTaskService";

interface CardTaskProps {
  tasks: Task[];
}

export function CardTask({ tasks }: CardTaskProps) {
  const { deleteTask, fetchTasks } = useTaskService();

  function handleDeleteTask(id: number) {
    deleteTask(id);
    fetchTasks();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Backlog</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between ${
                task.isCompleted ? "line-through text-muted-foreground" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={task.isCompleted}
                  onCheckedChange={() => {
                    // setSelectedTask(task);
                    // toggleTaskCompletion(task.id);
                  }}
                />
                <span>{task.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  onValueChange={(newDay) => {
                    // setSelectedTask(task);
                    // moveTask(newDay);
                  }}
                  value={task.dayOfWeek}
                >
                  <SelectTrigger className="h-8 px-2 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backlog">Backlog</SelectItem>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    // setSelectedTask(task);
                    // deleteTask(task.id);
                  }}
                  className="hover:bg-red-500 hover:text-white rounded-full"
                >
                  <Trash
                    className="w-6 h-6 hover:bg-destructive p-1"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
