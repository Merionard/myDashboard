"use client";
import { Loader2, LogIn, LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export const AuthentBtn = () => {
  const session = useSession();
  if (!session.data) {
    return (
      <Button onClick={() => signIn()} variant={"outline"} size={"sm"}>
        {<LogIn size={12} className="mr-2" />}Connexion
      </Button>
    );
  }
  return (
    <Button onClick={() => signOut()} variant={"outline"} size={"sm"}>
      {<LogOut size={12} className="mr-2" />}Déconnexion
    </Button>
  );
};
