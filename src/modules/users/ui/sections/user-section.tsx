"use client";
import UserAvatar from "@/components/user-avatar";
import { trpc } from "@/trpc/client";
import React from "react";
import UserInfo from "../components/user-info";
import SubscriptionButton from "@/modules/subscriptions/ui/components/subscription-button";
import { useClerk, useUser } from "@clerk/nextjs";
import { useSubscription } from "@/modules/subscriptions/hooks/use-subscription";
import { Button } from "@/components/ui/button";

interface UserSectionProps {
  userId: string;
}

const UserSection = ({ userId }: UserSectionProps) => {
  const [data] = trpc.users.getOne.useSuspenseQuery({ userId });

  const { isPending, onClick } = useSubscription({
    userId: data.id,
    isSubscribed: data.viewerSubscribed,
    fromUserId: userId,
  });
  const clerk = useClerk();
  const { user } = useUser();
  return (
    <div className="p-4 flex gap-4 items-center border border-dashed bg-accent/30 rounded-xl">
      <div
        className="flex items-center gap-4
 min-w-0"
      >
        <UserAvatar
          imageUrl={data.imageUrl}
          size="lg"
          name={data.name}
          className="size-32"
        />
        <div className="flex flex-col justify-between h-full gap-1 min-w-0">
          <UserInfo name={data.name} size={"lg"} />
          <span className="text-sm text-muted-foreground line-clamp-1 mb-4">
            {data.subscribersCount} Subscribers &bull; {data.videosCount} Videos
          </span>
          {user?.id === data.clerkId ? (
            <Button
              className="rounded-full"
              onClick={() => clerk.openUserProfile()}
            >
              Edit Profile
            </Button>
          ) : (
            <SubscriptionButton
              onClick={onClick}
              isSubscribed={data.viewerSubscribed}
              size={"lg"}
              disabled={isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSection;
