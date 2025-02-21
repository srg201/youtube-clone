import { DEFAULT_LIMIT } from "@/constants";
import SubscriptionsView from "@/modules/home/ui/view/subscriptions-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.videos.getSubscriptions.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });
  return (
    <HydrateClient>
      <SubscriptionsView />
    </HydrateClient>
  );
};
export default Page;
