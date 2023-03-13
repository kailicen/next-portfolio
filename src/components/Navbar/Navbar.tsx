import {
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Navbar: React.FC = () => {
  const [menuState, setMenuState] = useState<"open" | "closed">("closed");
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  // check if current path is homepage
  const isHomePage = router.pathname === "/";

  const modeColor = { light: "white", dark: "gray.800" };
  const bgColor = isHomePage ? "transparent" : modeColor[colorMode];
  const imgSrc = { light: "/logo192-black.png", dark: "/logo192-white.png" };

  const handleMenuOpen = () => {
    setMenuState("open");
  };

  const handleMenuClose = () => {
    setMenuState("closed");
  };
  return (
    <>
      <Flex
        display={{ base: "none", md: "flex" }}
        bg={bgColor}
        width="100vw"
        p="6px"
        justify="space-between"
        align="center"
        position="fixed"
        fontWeight={700}
        zIndex={1}
      >
        <Link href="/">
          <Flex align="center" ml={7} cursor="pointer">
            <Image src={imgSrc[colorMode]} boxSize="70px" alt="logo" />
            <Text position="relative" left={-8} fontSize="17px">
              Kaili Cen
            </Text>
          </Flex>
        </Link>
        <Flex align="center" gap={10} mr={10} right="0">
          <Link
            href="/posts"
            textDecoration={router.pathname === "/posts" ? "underline" : "none"}
          >
            Blog
          </Link>
          <Link
            href="/projects"
            textDecoration={
              router.pathname.includes("/projects") ? "underline" : "none"
            }
          >
            Projects
          </Link>
          <Link
            href="/booknotes"
            textDecoration={
              router.pathname.includes("/booknotes") ? "underline" : "none"
            }
          >
            Book Notes
          </Link>
          <Link
            href="/about"
            textDecoration={router.pathname === "/about" ? "underline" : "none"}
          >
            About
          </Link>
          {!isHomePage && (
            <Button onClick={toggleColorMode}>
              Toggle {colorMode === "light" ? "Dark" : "Light"}
            </Button>
          )}
        </Flex>
      </Flex>

      {/* mobile phone screen */}
      <Flex
        display={{ base: "flex", md: "none" }}
        bg={bgColor}
        width="100vw"
        justify="space-between"
        align="center"
        position="fixed"
        zIndex={1}
      >
        <Link href="/">
          <Flex align="center" cursor="pointer">
            <Image src={imgSrc[colorMode]} boxSize="60px" alt="logo" />
            <Text position="relative" left={-8} fontSize="15px">
              Kaili Cen
            </Text>
          </Flex>
        </Link>
        <Icon as={FaBars} fontSize={20} mr={5} onClick={handleMenuOpen} />

        {/* full screen navbar */}
        {menuState === "open" && (
          <Flex
            bg={bgColor}
            position="fixed"
            height="100vh"
            width="100vw"
            top="0"
            left="0"
            zIndex="1"
            direction="column"
          >
            <Flex justify="space-between" align="center">
              <Link href="/" onClick={handleMenuClose}>
                <Flex align="center" mr={3} cursor="pointer">
                  <Image src={imgSrc[colorMode]} boxSize="60px" alt="logo" />
                  <Text position="relative" left={-8} fontSize="15px">
                    Kaili Cen
                  </Text>
                </Flex>
              </Link>
              <Icon
                as={IoClose}
                fontSize={20}
                mr={5}
                onClick={handleMenuClose}
              />
            </Flex>
            <Flex
              direction="column"
              align="self-end"
              fontSize={55}
              mr={3}
              mt={3}
            >
              <Link href="/posts" onClick={handleMenuClose}>
                Blog
              </Link>
              <Link href="/projects" onClick={handleMenuClose}>
                Projects
              </Link>
              <Link href="/booknotes" onClick={handleMenuClose}>
                Book Notes
              </Link>
              <Link href="/about" onClick={handleMenuClose}>
                About
              </Link>
              {!isHomePage && (
                <Button
                  position="absolute"
                  bottom={10}
                  onClick={() => {
                    toggleColorMode();
                  }}
                >
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
              )}
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
};
export default Navbar;
