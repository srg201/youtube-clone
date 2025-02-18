import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import React from "react";

// TODO: properly implement video reactions
const VideoReactions = () => {
  const viewerReaction: "like" | "dislike" = "like";
  return (
    <div className="flex items-center flex-none">
      <Button
        className="rounded-l-full rounded-r-none gap-2 pr-4"
        variant={"secondary"}
      >
        <ThumbsUpIcon
          className={cn(
            "size-5",
            viewerReaction === "like" && "fill-foreground"
          )}
        />{" "}
        {1}
      </Button>
      <Separator orientation="vertical" />
      <Button
        className="rounded-l-none rounded-r-full gap-2 pl-3"
        variant={"secondary"}
      >
        <ThumbsDownIcon
          className={cn(
            "size-5",
            viewerReaction !== "like" && "fill-foreground"
          )}
        />{" "}
        {1}
      </Button>
    </div>
  );
};

export default VideoReactions;
