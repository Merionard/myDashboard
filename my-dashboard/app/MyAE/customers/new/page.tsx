import { Card, CardContent } from "@/components/ui/card";
import { getAuthSession, getRequiredAuthSession } from "@/lib/auth";
import { CustomerForm } from "./customerForm";
import { redirect } from "next/navigation";

export default async function NewCustomer() {
  const session = await getAuthSession();

  if (session == null || !session.user.id) {
    return redirect("/");
  }
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardContent>
          <CustomerForm customer={null} userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
  );
}
