"use client";

import { useRouter } from "next/navigation";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { cn } from "@/src/lib/utils";

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO: add more error handling like src/lib/api/login.ts
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className={cn(navigationMenuTriggerStyle(), className)}
      >
        Logout
      </button>
    </form>
  );
}
