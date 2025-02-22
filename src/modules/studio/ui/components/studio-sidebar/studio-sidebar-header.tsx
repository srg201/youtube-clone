import {
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { useClerk, useUser } from "@clerk/nextjs";

const StudioSidebarHeader = () => {
  const { user } = useUser();
  const { state } = useSidebar();
  const clerk = useClerk();

  if (!user) {
    return (
      <SidebarHeader className="flex items-center justify-center pb-4">
        <Skeleton className="size-28 rounded-full" />
        <div className="flex flex-col mt-2 items-center gap-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </SidebarHeader>
    );
  }

  if (state === "collapsed") {
    return (
      <SidebarMenuItem onClick={() => clerk.openUserProfile()}>
        <SidebarMenuButton tooltip={"Your profile"} asChild>
          <div className="flex flex-col gap-1">
            <UserAvatar
              imageUrl={user.imageUrl}
              name={user.fullName ?? "User"}
              size="xs"
            />
            <span className="text-sm">Your Profile</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarHeader
      onClick={() => clerk.openUserProfile()}
      className="flex items-center justify-center pb-4 cursor-pointer"
    >
      <UserAvatar
        imageUrl={user?.imageUrl}
        name={user?.fullName ?? "User"}
        className="size-28 hover:opacity-80 transition-opacity"
      />
      <div className="flex flex-col mt-2 items-center gap-y-2">
        <p className="text-sm font-medium">Your Profile</p>
        <p className="text-xs text-muted-foreground">{user?.fullName}</p>
      </div>
    </SidebarHeader>
  );
};
export default StudioSidebarHeader;
