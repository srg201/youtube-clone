import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "@/modules/auth/ui/components/auth-button";
import { ThemeToggle } from "@/components/theme-toggle";
import StudioUploadModal from "../studio-upload-modal";

const StudioNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-background flex items-center px-2 pr-5 z-50 border-b shadow-sm">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and Logo  */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href={"/studio"}>
            <div className="p-4 flex items-center gap-1 cursor-pointer">
              <Image src={"/logo.svg"} width={32} height={32} alt="Logo" />
              <p className="tracking-tight font-semibold text-xl">Studio</p>
            </div>
          </Link>
        </div>

        <div className="flex-1" />

        <div className="flex-shrink-0 items-center flex gap-2">
          <StudioUploadModal />
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
export default StudioNavbar;
