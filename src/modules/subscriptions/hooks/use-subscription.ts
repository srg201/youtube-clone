import { trpc } from "@/trpc/client";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";

interface UseSubscriptionProps {
  userId: string;
  isSubscribed: boolean;
  fromVideoId?: string;
  fromUserId?: string;
}

export const useSubscription = ({
  userId,
  isSubscribed,
  fromVideoId,
  fromUserId,
}: UseSubscriptionProps) => {
  const clerk = useClerk();
  const utils = trpc.useUtils();

  const subscribe = trpc.subscriptions.create.useMutation({
    onSuccess: () => {
      toast.success("Subscribed successfully!");
      utils.videos.getMany.invalidate();
      utils.subscriptions.getSubscriptionsList.invalidate();
      if (fromVideoId) {
        utils.videos.getOne.invalidate({ id: fromVideoId });
      }

      if (fromUserId) {
        utils.users.getOne.invalidate({ userId: fromUserId });
      }
    },
    onError: (error) => {
      toast.error(error.message);

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });
  const unsubscribe = trpc.subscriptions.remove.useMutation({
    onSuccess: () => {
      toast.success("Unsubscribed successfully!");
      utils.videos.getMany.invalidate();
      utils.subscriptions.getSubscriptionsList.invalidate();

      if (fromVideoId) {
        utils.videos.getOne.invalidate({ id: fromVideoId });
      }
      if (fromUserId) {
        utils.users.getOne.invalidate({ userId: fromUserId });
      }
    },
    onError: (error) => {
      toast.error(error.message);

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  const isPending = subscribe.isPending || unsubscribe.isPending;

  const onClick = () => {
    if (isSubscribed) {
      unsubscribe.mutate({ userId });
    } else {
      subscribe.mutate({ userId });
    }
  };

  return {
    isPending,
    onClick,
  };
};
