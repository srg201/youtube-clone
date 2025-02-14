import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
};
export default Layout;
