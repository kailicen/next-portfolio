import PageContent from "@/components/Layout/PageContent";
import RightContent from "@/components/Layout/RightContent";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Heading, Link, Text, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProjectPage: React.FC = () => {
  const router = useRouter();
  const [project, setProject] = useState<{
    title: { rendered: string };
    content: { rendered: string };
    acf: { link: string };
    excerpt: { rendered: string };
  }>({
    title: { rendered: "" },
    content: { rendered: "" },
    acf: { link: "" },
    excerpt: { rendered: "" },
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };
  const borderColor = { light: "gray.300", dark: "gray.600" };

  useEffect(() => {
    const { pid } = router.query;
    axios
      .get(`https://kailisblog.com/wp-json/wp/v2/projects/${pid}`)
      .then((res) => {
        setProject(res.data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [router.query]);

  return (
    <>
      {isLoaded ? (
        <PageContent>
          <>
            <Flex mt="42px" pt="42px" gap={3}>
              <Flex
                direction="column"
                borderRadius="5px"
                p="10px"
                width="100%"
                border="1px solid"
                borderColor={borderColor[colorMode]}
                bg={bgColor[colorMode]}
                className="post-item"
              >
                <Heading>{project.title.rendered}</Heading>
                <Link
                  href={project.acf.link}
                  isExternal
                  mb={5}
                  display={{ base: "block", md: "none" }}
                >
                  Project URL <ExternalLinkIcon mx="2px" />
                </Link>
                <Text
                  dangerouslySetInnerHTML={{ __html: project.content.rendered }}
                ></Text>
              </Flex>
            </Flex>
          </>
          <>
            <RightContent
              page="singleProjectPage"
              link={project.acf.link}
              excerpt={project.excerpt.rendered}
            />
          </>
        </PageContent>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
};

export default ProjectPage;
