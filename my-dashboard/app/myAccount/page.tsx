import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserForm } from "./userForm";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/prisma/client";

export default async function MyAccount() {
  const session = await getRequiredAuthSession();
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
