import React from "react";
import { VideoGetOneOutput } from "../../types";
import Link from "next/link";
import UserAvatar from "@/components/user-avatar";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import SubscriptionButton from "@/modules/subscriptions/ui/components/subscription-button";
import UserInfo from "@/modules/users/ui/components/user-info";
import { useSubscription } from "@/modules/subscriptions/hooks/use-subscription";

interface VideoOwnerProps {
  user: VideoGetOneOutput["user"];
  videoId: string;
}

const VideoOwner = ({ user, videoId }: VideoOwnerProps) => {
  const { userId, isLoaded } = useAuth();
  const { isPending, onClick } = useSubscription({
    userId: user.id,
    isSubscribed: user.viewerSubscribed,
    fromVideoId: videoId,
  });
  return (
    <div className="flex items-center sm:items-start justify-between sm:justify-start gap-3 min-w-0">
      <Link href={`/users/${user.id}`}>
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar imageUrl={user.imageUrl} size="lg" name={user.name} />
          <div className="flex flex-col gap-1 min-w-0">
            <UserInfo name={user.name} size={"lg"} />
            <span className="text-sm text-muted-foreground line-clamp-1">
              {user.subscriberCount} Subscribers
            </span>
          </div>
        </div>
      </Link>
      {userId === user.clerkId ? (
        <Button asChild className="rounded-full" variant={"secondary"}>
          <Link href={`/studio/videos/${videoId}`}>Edit video</Link>
        </Button>
      ) : (
        <SubscriptionButton
          isSubscribed={user.viewerSubscribed}
          onClick={onClick}
          disabled={isPending || !isLoaded}
          className="flex"
        />
      )}
    </div>
  );
};

export default VideoOwner;
