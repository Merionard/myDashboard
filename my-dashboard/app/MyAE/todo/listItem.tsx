import React, { useEffect, useState } from "react";
import { TodoListWithTask } from "./page";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Pencil, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TaskItem } from "./taskItem";
import {
  addTask,
  deleteTodoList,
  reorderTask,
  updateTodoList,
} from "./todoAction";
import { toast } from "sonner";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

export const ListItem = ({ todoList }: { todoList: TodoListWithTask }) => {
  useEffect(() => {
    setTasks([...todoList.tasks]);
  }, [todoList]);

  const [newTaskName, setNewTaskName] = useState<null | string>(null);
  const [newTaskDescription, setNewTaskDescritpion] = useState<
    undefined | string
  >(undefined);
  const [tasks, setTasks] = useState([...todoList.tasks]);
  const [todoListTitle, setTodoListTitle] = useState(todoList.title);

  const newTask = async (theme: string, maxOrder: number) => {
    if (newTaskName) {
      const newTask = await addTask(
        theme,
        newTaskName,
        newTaskDescription,
        maxOrder + 1
      );
      toast.success("Tache " + newTask.title + " enregistrée avec succès!");
      router.refresh();
    }
  };

  const handleDeleteList = async (title: string) => {
    const deleteList = await deleteTodoList(title);
    if (deleteList) {
      toast.success("Liste " + deleteList.title + " supprimée avec succès");
      router.refresh();
    } else {
      toast.error("une erreur est survenue");
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const cloneTasks = [...tasks];
    const [removed] = cloneTasks.splice(result.source.index, 1);

    cloneTasks.splice(result.destination.index, 0, removed);
    cloneTasks.forEach((c, index) => (c.order = index + 1));
    setTasks(cloneTasks);
    const msg = await reorderTask(cloneTasks);
    if (msg) {
      toast.success(msg);
    } else {
      toast.error("une erreur est survenue");
    }
  };

  const editTodoListTitle = async () => {
    await updateTodoList(todoListTitle, todoList.title);
    toast.success("liste mise à jour");
    router.refresh();
  };
  const router = useRouter();
  return (
    <Card key={todoList.title}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div>
            <span>{todoList.title}</span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Pencil className="inline ms-1 cursor-pointer h-5" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Maj titre liste</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-2">
                    <div>
                      <Label>Titre</Label>
                      <Input
                        placeholder="titre"
                        onChange={(e) => setTodoListTitle(e.target.value)}
                      />
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={editTodoListTitle}>
                    Valider
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="rounded-full" size={"icon"}>
                <Plus />
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
                      onChange={(e) => setNewTaskDescritpion(e.target.value)}
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    newTask(
                      todoList.title,
                      todoList.tasks.length === 0
                        ? 0
                        : Math.max(...todoList.tasks.map((t) => t.order))
                    )
                  }
                >
                  Valider
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={`droppable${todoList.title}`}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={"d-flex flex-column gap-2 w-full"}
              >
                {tasks.map((t, index) => (
                  <Draggable
                    key={index}
                    draggableId={`draggable${String(index)}`}
                    index={index}
                  >
                    {(provided) => <TaskItem task={t} provided={provided} />}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
      <AlertDialog>
        <CardFooter className="flex justify-end">
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Supprimer</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer liste</AlertDialogTitle>
              <AlertDialogDescription>
                Vous etes sur le point de supprimer une liste avec toutes ses
                taches associée.Confirmez vous?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteList(todoList.title)}
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </CardFooter>
      </AlertDialog>
    </Card>
  );
};
