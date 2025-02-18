import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const userInfoVariants = cva("flex items-center gap-1", {
  variants: {
    size: {
      default: "[&_p]:text-sm [&_svg]:size-4",
      lg: "[&_p]:text-base [&_svg]:size-5 [&_p]:font-medium [&_p]:text-foreground",
      sm: "[&_p]:text-xs [&_svg]:size-3.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserInfoProps extends VariantProps<typeof userInfoVariants> {
  name: string;
  className?: string;
}

const UserInfo = ({ name, className, size }: UserInfoProps) => {
  return (
    <div className={cn(userInfoVariants({ size, className }))}>
      <Tooltip>
        <TooltipTrigger>
          <p className="text-foreground/50 line-clamp-1">{name}</p>
        </TooltipTrigger>

        <TooltipContent
          className={"bg-foreground/80 backdrop-blur-lg font-medium"}
        >
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default UserInfo;
