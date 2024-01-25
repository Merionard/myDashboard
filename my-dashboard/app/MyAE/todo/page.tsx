import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { Todos } from "./todoList";

export type TodoListWithTask = Prisma.TodoListGetPayload<{
  include: { tasks: true };
}>;

export default async function TodoList() {
  const session = await getAuthSession();

  if (session == null || !session.user.id) {
    return redirect("/");
  }
  const todoList: TodoListWithTask[] = await prisma.todoList.findMany({
    where: { userId: session.user.id },
    include: { tasks: { orderBy: { order: "asc" } } },
  });
  return (
    <div className="container mt-5">
      <Card>
        <CardHeader>
          <CardTitle>TODO LIST</CardTitle>
        </CardHeader>
        <CardContent>
          <Todos todoList={todoList} userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
  );
}
