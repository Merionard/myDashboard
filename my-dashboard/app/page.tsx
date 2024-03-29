"use client";
import { Button } from "@/components/ui/button";
import { lusitana } from "@/components/ui/font";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`text-xl text-gray-800 md:text-3xl md:leading-normal ${lusitana.className}`}
          >
            <strong>Bienvenu sur Mon Auto-entreprise</strong> Cette application
            Next JS vous fournit les outils nécessaires à la bonne gestion de
            votre auto-entreprise.
          </p>
          <div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent" />
          <Button className="w-1/3" onClick={() => signIn()}>
            Se connecter
          </Button>
        </div>

        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/login_image.jpg"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop and mobile versions"
          />
          <Image
            src={"/login_image.jpg"}
            width={560}
            height={620}
            className="block md:hidden"
            alt="blabla"
          />
        </div>
      </div>
    </main>
  );
}
