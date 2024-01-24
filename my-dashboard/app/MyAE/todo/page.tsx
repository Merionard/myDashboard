import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TodoList() {
  const session = await getAuthSession();

  if (session == null) {
    return redirect("/");
  }
  return (
    <div className="container mt-5">
      <Card>
        <CardHeader>
          <CardTitle>TODO LIST</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
