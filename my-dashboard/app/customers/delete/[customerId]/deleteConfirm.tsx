"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteConfirm(props: { businessName: string }) {
  const router = useRouter();
  router.push("/customers");
  router.refresh();
  toast.success("le client " + props.businessName + " a été supprimé");
  return null;
}
