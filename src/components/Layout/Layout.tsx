import { Button } from "@chakra-ui/react";
import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Create a state variable for showing or hiding button
  const [showButton, setShowButton] = useState(false);

  // Create a function that scrolls window to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Create an effect that updates showButton based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    // Add event listener for scroll event
    window.addEventListener("scroll", handleScroll);
    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {showButton && (
        <Button
          position="fixed"
          bottom="4"
          right="4"
          borderRadius="full"
          onClick={scrollToTop}
        >
          Scroll To Top
        </Button>
      )}
    </>
  );
};
export default Layout;
