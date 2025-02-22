import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import MainSection from "./main-section";
import { Separator } from "@/components/ui/separator";
import PersonalSection from "./personal-section";
import SubscriptionsSection from "./subscriptions-section";
import { HydrateClient } from "@/trpc/server";

const HomeSidebar = () => {
  return (
    <HydrateClient>
      <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
        <SidebarContent className="bg-background">
          <MainSection />
          <Separator />
          <PersonalSection />
          <Separator />
          <SubscriptionsSection />
        </SidebarContent>
      </Sidebar>
    </HydrateClient>
  );
};
export default HomeSidebar;
