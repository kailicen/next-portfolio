import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Contact from "./Contact";

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
          <Contact />
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
