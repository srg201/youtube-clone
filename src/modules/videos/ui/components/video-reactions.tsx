import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import React from "react";
import { VideoGetOneOutput } from "../../types";
import { useClerk } from "@clerk/nextjs";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

interface VideoReactionProps {
  videoId: string;
  likes: number;
  dislikes: number;
  viewerReaction: VideoGetOneOutput["viewerReaction"];
}

// TODO: properly implement video reactions
const VideoReactions = ({
  dislikes,
  likes,
  videoId,
  viewerReaction,
}: VideoReactionProps) => {
  const clerk = useClerk();
  const utils = trpc.useUtils();

  const like = trpc.videoReactions.like.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
      //  TODO: invalidate liked playlists
    },
    onError: (error) => {
      toast.error("Something went wrong...");
      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });
  const dislike = trpc.videoReactions.dislike.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
      //  TODO: invalidate liked playlists
    },
    onError: (error) => {
      toast.error("Something went wrong...");
      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  return (
    <div className="flex items-center flex-none">
      <Button
        onClick={() => like.mutate({ videoId })}
        disabled={like.isPending || dislike.isPending}
        className="rounded-l-full rounded-r-none gap-2 pr-4"
        variant={"secondary"}
      >
        <ThumbsUpIcon
          className={cn(
            "size-5",
            viewerReaction === "like" && "fill-foreground"
          )}
        />{" "}
        {likes}
      </Button>
      <Separator orientation="vertical" />
      <Button
        onClick={() => dislike.mutate({ videoId })}
        disabled={like.isPending || dislike.isPending}
        className="rounded-l-none rounded-r-full gap-2 pl-3"
        variant={"secondary"}
      >
        <ThumbsDownIcon
          className={cn(
            "size-5",
            viewerReaction === "dislike" && "fill-foreground"
          )}
        />{" "}
        {dislikes}
      </Button>
    </div>
  );
};

export default VideoReactions;
