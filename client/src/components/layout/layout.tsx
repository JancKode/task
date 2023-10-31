import React from "react";
import Headers from "../headers/headers";
import Footer from "../footer/footer";

interface ILayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Headers />
      <div className="flex flex-grow justify-center items-center  mx-auto sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default layout;
