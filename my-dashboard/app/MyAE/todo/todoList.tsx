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
import { createTheme } from "./todoAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      const { data, error } = await createTheme(newThemeName, userId);
      if (data) {
        toast.success("thème " + data.theme + " créé avec succès!");
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
          <Button>
            <PlusCircle /> Theme
          </Button>
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
      {todoList.map((t) => (
        <Card key={t.theme}>
          <CardHeader>
            <CardTitle>{t.theme}</CardTitle>
          </CardHeader>
          <CardContent>
            {t.tasks.map((t) => (
              <div key={t.id} className="border-b p-3 flex">
                <p>{t.title}</p>
                <p>{t.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
