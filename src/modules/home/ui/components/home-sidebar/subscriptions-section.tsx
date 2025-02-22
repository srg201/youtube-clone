"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import UserAvatar from "@/components/user-avatar";
import { trpc } from "@/trpc/client";
import Link from "next/link";

const SubscriptionsSection = () => {
  const subscriptions = trpc.subscriptions.getSubscriptionsList.useQuery();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Your subscriptions</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="max-h-36 overflow-y-auto">
          {subscriptions?.data?.map((item) => (
            <SidebarMenuItem key={item.creator.id}>
              <SidebarMenuButton
                asChild
                tooltip={item.creator.name}
                isActive={false}
              >
                <Link
                  href={`/users/${item.creator.id}`}
                  className="flex items-center gap-4"
                >
                  <UserAvatar
                    imageUrl={item.creator.imageUrl}
                    name={item.creator.name}
                    size={"sm"}
                  />
                  <span className="text-sm text-muted-foreground line-clamp-1">
                    {item.creator.name}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default SubscriptionsSection;
