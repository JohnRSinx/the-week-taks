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
import { TrashIcon } from "../ui/trashIcon";

export function CardTask({ tasks }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Backlog</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tasks.backlog.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between ${
                task.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => {
                    setSelectedTask(task);
                    toggleTaskCompletion(task.id);
                  }}
                />
                <span>{task.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  onValueChange={(newDay) => {
                    setSelectedTask(task);
                    moveTask(newDay);
                  }}
                  value={task.day}
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
                    setSelectedTask(task);
                    deleteTask(task.id);
                  }}
                  className="hover:bg-red-500 hover:text-white rounded-full"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
