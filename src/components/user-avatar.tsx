import { cva, VariantProps } from "class-variance-authority";
import { Avatar, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

const avatarVariants = cva("", {
  variants: {
    size: {
      default: "h-9 w-9",
      xs: "w-4 h-4",
      sm: "w-6 h-6",
      lg: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  imageUrl?: string;
  name: string;
  size?: "default" | "xs" | "sm" | "lg";
  className?: string;
  onClick?: () => void;
}

const UserAvatar = ({
  imageUrl,
  name,
  className,
  size = "default",
}: //   onClick,
UserAvatarProps) => {
  return (
    <div>
      <Avatar className={cn(avatarVariants({ size, className }))}>
        <AvatarImage src={imageUrl} alt={name} />
      </Avatar>
    </div>
  );
};
export default UserAvatar;
