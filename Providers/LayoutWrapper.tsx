import NavBar from "@client/components/NavBar";
import { PropsWithChildren } from "react";

const LayoutWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="container">
      <NavBar />
      {children}
    </div>
  );
};

export default LayoutWrapper;
