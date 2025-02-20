import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "./search-input";
import AuthButton from "@/modules/auth/ui/components/auth-button";
import { ThemeToggle } from "@/components/theme-toggle";

const HomeNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-background flex items-center px-2 z-50">
      <div className="flex items-center gap-2 sm:gap-4 w-full">
        {/* Menu and Logo  */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href={"/"}>
            <div className="p-1 sm:p-4 flex items-center gap-1 cursor-pointer">
              <Image src={"/logo.svg"} width={32} height={32} alt="Logo" />
              <p className="tracking-tight font-semibold text-xl hidden sm:block">
                NewTube
              </p>
            </div>
          </Link>
        </div>

        {/* Search Bar  */}
        <div className="flex-1 flex justify-center max-w-screen-md mx-auto">
          <SearchInput />
        </div>

        <div className="flex-shrink-0 items-center flex gap-2">
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
export default HomeNavbar;
