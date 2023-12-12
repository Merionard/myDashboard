import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { CustomerForm } from "./customerForm";

export default async function NewCustomer() {
  const session = getRequiredAuthSession();

  return (
    <Card>
      <CardContent>
        <CustomerForm />
      </CardContent>
    </Card>
  );
}
