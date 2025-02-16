"use client";
import { Button } from "@/components/ui/button";
import { ClapperboardIcon, UserCircleIcon } from "lucide-react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

const AuthButton = () => {
  // TODO: Add different states
  return (
    <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Studio"
              href="/studio"
              labelIcon={<ClapperboardIcon className="size-4" />}
            />
          </UserButton.MenuItems>
        </UserButton>
        {/* Add menu items or other components here */}
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            className="rounded-full px-4 py-2 font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300"
            variant={"outline"}
          >
            <UserCircleIcon />
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
export default AuthButton;
