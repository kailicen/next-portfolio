import { Inter } from "next/font/google";
import { Flex, Heading } from "@chakra-ui/react";
import Contact from "./about/Contact";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Flex
        direction="column"
        height="100vh"
        justify="space-between"
        className="home-background"
      >
        <Contact />
        <Flex direction="column" m={5} display={{ base: "none", md: "flex" }}>
          <Heading fontSize="90px">
            Free your mind, <br />
            unleash limitless potential.
          </Heading>
        </Flex>
        <Flex direction="column" m={5} display={{ base: "flex", md: "none" }}>
          <Heading fontSize="60px">
            Free <br />
            your <br />
            mind, <br />
            unleash <br />
            limitless <br />
            potential.
          </Heading>
        </Flex>
      </Flex>
    </>
  );
}
