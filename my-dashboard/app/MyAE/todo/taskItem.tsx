import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@prisma/client";
import clsx from "clsx";
import { changeStatutTask, deleteTask } from "./todoAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

export const TaskItem = ({ task }: { task: Task }) => {
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
  return (
    <div
      key={task.id}
      className={clsx(
        "border-b-2 ps-3 flex justify-between mb-3 rounded-md cursor-pointer p-3"
      )}
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
      <Trash onClick={() => onClickDelete(task.id)} />
    </div>
  );
};
