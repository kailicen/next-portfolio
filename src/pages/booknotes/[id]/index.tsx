import PageContent from "@/components/Layout/PageContent";
import RightContent from "@/components/Layout/RightContent";
import { Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const BookNotePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [bookNote, setBookNote] = useState<{
    title: { rendered: string };
    content: { rendered: string };
  }>({
    title: { rendered: "" },
    content: { rendered: "" },
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };
  const borderColor = { light: "gray.300", dark: "gray.600" };

  const [updatedContent, setUpdatedContent] = useState<string>("");
  const [indexes, setIndexes] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://kailisblog.com/wp-json/wp/v2/booknotes/${id}`
      );
      setBookNote(res.data);
      setIsLoaded(true);

      const postContent = res.data.content.rendered;
      const parser = new DOMParser();
      const doc = parser.parseFromString(postContent, "text/html");
      const headings = doc.querySelectorAll("h4");
      const indexContent = [];

      for (let i = 0; i < headings.length; i++) {
        headings[i].id = "section-" + (i + 1);
        indexContent.push(headings[i].textContent as string);
      }

      setUpdatedContent(doc.documentElement.outerHTML);
      setIndexes(indexContent);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <PageContent>
        <>
          {isLoaded ? (
            <>
              <Flex display={{ base: "block", md: "none" }} mt="30px" pt="30px">
                <RightContent page="singleBookNotePage" indexes={indexes} />
              </Flex>
              <Flex
                mt={{ base: "5px", md: "42px" }}
                pt={{ base: "5px", md: "42px" }}
                gap={3}
              >
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
                  <Heading>{bookNote.title.rendered}</Heading>
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: updatedContent,
                    }}
                  ></Text>
                </Flex>
              </Flex>
            </>
          ) : (
            <h3>Loading...</h3>
          )}
        </>
        <>
          <RightContent page="singleBookNotePage" indexes={indexes} />
        </>
      </PageContent>
    </>
  );
};

export default BookNotePage;
