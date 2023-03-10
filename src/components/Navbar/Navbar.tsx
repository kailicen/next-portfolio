import {
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Navbar: React.FC = () => {
  const [menuState, setMenuState] = useState<"open" | "closed">("closed");
  const { colorMode, toggleColorMode } = useColorMode();

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
        width="100vw"
        padding="6px"
        justify="space-between"
        align="center"
        position="fixed"
      >
        <Link href="/">
          <Flex align="center" ml={7} cursor="pointer">
            <Image src="/logo192-white.png" boxSize="70px" alt="logo" />
            <Text position="relative" left={-8} fontSize="17px">
              Kaili Cen
            </Text>
          </Flex>
        </Link>
        <Flex align="center" gap={10} mr={10} right="0">
          <Link href="/posts">Blog</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/booknotes">Book Notes</Link>
          <Link href="/about">About</Link>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </Flex>
      </Flex>
      <Flex
        className="navbar-mobile"
        display={{ base: "flex", md: "none" }}
        width="100vw"
        justify="space-between"
        align="center"
        position="fixed"
      >
        <Link href="/">
          <Flex align="center" mr={3} cursor="pointer">
            <Image src="/logo192-white.png" boxSize="60px" alt="logo" />
            <Text position="relative" left={-8} fontSize="15px">
              Kaili Cen
            </Text>
          </Flex>
        </Link>
        <Icon as={FaBars} fontSize={20} mr={5} onClick={handleMenuOpen} />

        {/* full screen navbar */}
        {menuState === "open" && (
          <Flex
            bg="black"
            position="fixed"
            height="100vh"
            width="100vw"
            top="0"
            zIndex="1"
            direction="column"
          >
            <Flex justify="space-between" align="center">
              <Link href="/" onClick={handleMenuClose}>
                <Flex align="center" mr={3} cursor="pointer">
                  <Image src="/logo192-white.png" boxSize="60px" alt="logo" />
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
              justify="space-around"
              fontSize={55}
              ml={3}
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
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
};
export default Navbar;
