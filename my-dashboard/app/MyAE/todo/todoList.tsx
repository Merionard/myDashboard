"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { TodoListWithTask } from "./page";
import {
  createTheme,
  addTask,
  changeStatutTask,
  changePriorityTask,
} from "./todoAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskPriority } from "@prisma/client";

export const Todos = ({
  userId,
  todoList,
}: {
  userId: string;
  todoList: TodoListWithTask[];
}) => {
  const [newThemeName, setNewThemeName] = useState<null | string>(null);
  const [newTaskName, setNewTaskName] = useState<null | string>(null);
  const [newTaskDescription, setNewTaskDescritpion] = useState<
    undefined | string
  >(undefined);
  const router = useRouter();

  const addTheme = async () => {
    if (newThemeName) {
      const { data, error } = await createTheme(newThemeName, userId);
      if (data) {
        toast.success("thème " + data.theme + " créé avec succès!");
        router.refresh();
      } else {
        toast.error(error);
      }
    }
  };
  const newTask = async (theme: string) => {
    if (newTaskName) {
      const newTask = await addTask(theme, newTaskName, newTaskDescription);
      toast.success("Tache " + newTask.title + " enregistrée avec succès!");
      router.refresh();
    }
  };

  const checkTask = async (check: boolean | string, taskId: number) => {
    const updatedTask = await changeStatutTask(check ? "DONE" : "OPEN", taskId);
    if (updatedTask) {
      toast.success("Tache mis à jour avec succès!");
      router.refresh();
    } else {
      toast.error("Une erreur est survenue");
    }
  };

  const setTaskPriority = async (priority: TaskPriority, taskId: number) => {
    const updatedTask = await changePriorityTask(priority, taskId);
    if (updatedTask) {
      toast.success("Tache mis à jour avec succès!");
      router.refresh();
    } else {
      toast.error("Une erreur est survenue");
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex justify-end">
            <Button>
              <PlusCircle className="me-2" /> Theme
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Nouveau thème</AlertDialogTitle>
            <AlertDialogDescription>
              <Input
                placeholder="Nouveau thème"
                onChange={(e) => setNewThemeName(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={addTheme}>Valider</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="grid grid-cols-3 gap-4 mt-3">
        {todoList.map((t) => (
          <Card key={t.theme}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {t.theme}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="rounded-full" size={"icon"}>
                      <PlusCircle />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Nouvelle tache</AlertDialogTitle>
                      <AlertDialogDescription className="space-y-2">
                        <div>
                          <Label>Titre</Label>
                          <Input
                            placeholder="tache"
                            onChange={(e) => setNewTaskName(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Titre</Label>
                          <Input
                            placeholder="description"
                            onChange={(e) =>
                              setNewTaskDescritpion(e.target.value)
                            }
                          />
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={() => newTask(t.theme)}>
                        Valider
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {t.tasks.map((t) => (
                <DropdownMenu key={t.id}>
                  <DropdownMenuTrigger asChild>
                    <div
                      className={clsx(
                        "border-b-2 ps-3 flex items-center gap-3 mb-3 rounded-md cursor-pointer",
                        { "bg-orange-200": t.priority === "MINOR" },
                        { "bg-red-400": t.priority === "CRITICAL" },
                        { "bg-lime-500": t.priority === "MAJOR" }
                      )}
                    >
                      <Checkbox
                        checked={t.status === "DONE"}
                        onCheckedChange={(e) => checkTask(e.valueOf(), t.id)}
                      />
                      <p
                        className={clsx({
                          "line-through": t.status === "DONE",
                        })}
                      >
                        {t.title}
                      </p>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Priorité</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={t.priority === "CRITICAL"}
                      onClick={() =>
                        setTaskPriority(TaskPriority.CRITICAL, t.id)
                      }
                    >
                      {TaskPriority.CRITICAL}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={t.priority === "MAJOR"}
                      onClick={() => setTaskPriority(TaskPriority.MAJOR, t.id)}
                    >
                      {TaskPriority.MAJOR}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={t.priority === "MINOR"}
                      onClick={() => setTaskPriority(TaskPriority.MINOR, t.id)}
                    >
                      {TaskPriority.MINOR}
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
