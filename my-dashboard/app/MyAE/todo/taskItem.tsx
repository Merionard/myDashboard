import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@prisma/client";
import clsx from "clsx";
import { changeStatutTask, deleteTask, toogleCriticalTask } from "./todoAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Megaphone, MegaphoneOff, Trash } from "lucide-react";
import { DraggableProvided } from "react-beautiful-dnd";

export const TaskItem = ({
  task,
  provided,
}: {
  task: Task;
  provided: DraggableProvided;
}) => {
  const router = useRouter();

  const checkTask = async (check: boolean | string, taskId: number) => {
    const updatedTask = await changeStatutTask(check ? "DONE" : "OPEN", taskId);
    if (updatedTask) {
      toast.success("Tache mis à jour avec succès!");
      router.refresh();
    } else {
      toast.error("Une erreur est survenue");
    }
  };

  const onClickDelete = async (taskId: number) => {
    const deletedTask = await deleteTask(taskId);
    if (deletedTask) {
      toast.success("Tache supprimée!");
      router.refresh();
    } else {
      toast.error("Une erreur est survenue");
    }
  };

  const toogleCritical = async () => {
    await toogleCriticalTask(!task.critical, task.id);
    router.refresh();
  };
  return (
    <div
      ref={provided.innerRef}
      className={clsx(
        "border-b-2 ps-3 flex justify-between mb-3 rounded-md  p-3 ",
        { "bg-red-500": task.critical, "bg-green-400": !task.critical }
      )}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.status === "DONE"}
          onCheckedChange={(e) => checkTask(e.valueOf(), task.id)}
        />
        <p
          className={clsx({
            "line-through": task.status === "DONE",
          })}
        >
          {task.title}
        </p>
      </div>
      <div className="flex gap-2">
        {task.critical ? (
          <MegaphoneOff className="cursor-pointer" onClick={toogleCritical} />
        ) : (
          <Megaphone className="cursor-pointer" onClick={toogleCritical} />
        )}

        <Trash
          onClick={() => onClickDelete(task.id)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
