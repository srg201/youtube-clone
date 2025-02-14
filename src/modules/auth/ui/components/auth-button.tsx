import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

const AuthButton = () => {
  // TODO: Add different states
  return (
    <Button
      className="rounded-full px-4 py-2 font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300"
      variant={"outline"}
    >
      <UserCircleIcon />
      Sign In
    </Button>
  );
};
export default AuthButton;
