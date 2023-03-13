import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const About: React.FC = () => {
  const [about, setAbout] = useState<{ content: { rendered: string } }>({
    content: { rendered: "" },
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("https://kailisblog.com/wp-json/wp/v2/pages")
      .then((res) => {
        setAbout(res.data[0]);
        setIsLoaded(true);
        console.log(about);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLoaded ? (
        <Flex direction="column" height="100vh" justify="space-between">
          <Flex w="100%" direction="column" align="flex-end">
            <Flex
              direction="column"
              pt="100px"
              m="0 10px"
              justify="right"
              w={{ base: "150px", md: "250px" }}
            >
              <Text color="gray.500">Let&apos;s get connected</Text>
              <Divider mt={2} mb={3} />
              <Link href="https://www.linkedin.com/in/kaili-cen-1975b4197/">
                LinkedIn <ExternalLinkIcon mx="2px" />
              </Link>
              <Link href="https://medium.com/@kailicen226">
                Medium <ExternalLinkIcon mx="2px" />
              </Link>
            </Flex>
          </Flex>
          <Flex className="post-item">
            <Heading
              maxW="900px"
              m={{ base: "0 10px", md: "0 50px" }}
              fontSize={{ base: 22, md: 35 }}
              dangerouslySetInnerHTML={{ __html: about.content.rendered }}
            ></Heading>
          </Flex>
        </Flex>
      ) : (
        <h3>Loading...</h3>
      )}
      <div className="about-page__social">
        {/* <SocialIcon
          url=""
          target="_blank"
        />
        <SocialIcon url="https://medium.com/@kailicen226" target="_blank" />
        <SocialIcon
          url="https://www.instagram.com/authenticme1/"
          target="_blank" 
        />*/}
      </div>
    </>
  );
};

export default About;
