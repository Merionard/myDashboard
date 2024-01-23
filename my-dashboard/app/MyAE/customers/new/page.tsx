import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { CustomerForm } from "./customerForm";

export default async function NewCustomer() {
  const session = getRequiredAuthSession();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardContent>
          <CustomerForm customer={null} />
        </CardContent>
      </Card>
    </div>
  );
}
