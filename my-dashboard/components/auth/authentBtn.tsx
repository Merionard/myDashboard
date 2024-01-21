"use client";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

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
    <Button onClick={() => signOut()} variant={"destructive"}>
      {<LogOut size={12} className="mr-2" />}Déconnexion
    </Button>
  );
};
