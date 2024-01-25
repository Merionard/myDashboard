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
import { ListItem } from "./listItem";
import { TodoListWithTask } from "./page";
import { createTodoList } from "./todoAction";

export const Todos = ({
  userId,
  todoList,
}: {
  userId: string;
  todoList: TodoListWithTask[];
}) => {
  const [newThemeName, setNewThemeName] = useState<null | string>(null);

  const router = useRouter();

  const addTheme = async () => {
    if (newThemeName) {
      const { data, error } = await createTodoList(newThemeName, userId);
      if (data) {
        toast.success("thème " + data.title + " créé avec succès!");
        router.refresh();
      } else {
        toast.error(error);
      }
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex justify-end">
            <Button>
              <PlusCircle className="me-2" /> Liste
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Nouvelle liste</AlertDialogTitle>
            <AlertDialogDescription>
              <Input
                placeholder="Titre"
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
        {todoList.map((list) => (
          <ListItem key={list.title} todoList={list} />
        ))}
      </div>
    </div>
  );
};
