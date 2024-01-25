import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/prisma/client";
import { UserForm } from "./userForm";
import { redirect } from "next/navigation";

export default async function MyAccount() {
  const session = await getAuthSession();

  if (session == null || !session.user.id) {
    return redirect("/");
  }
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    throw new Error("User inconnu!");
  }

  return (
    <div className="container mt-5">
      <Card>
        <CardHeader>
          <CardTitle>Mon compte</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
