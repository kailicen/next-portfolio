import { Flex, Heading, Stack, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

interface Post {
  title: { rendered: string };
  date: string;
  content: { rendered: string };
}

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({ post }) => {
  const { title, date, content } = post;

  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };
  const borderColor = { light: "gray.300", dark: "gray.600" };

  return (
    <Flex
      borderRadius="5px"
      p={1}
      width="100%"
      border="1px solid"
      borderColor={borderColor[colorMode]}
      bg={bgColor[colorMode]}
    >
      <Stack spacing={1} p="10px" className="post-item">
        <Heading>{title.rendered}</Heading>
        <Text>{date.split("T")[0]}</Text>
        <Text
          dangerouslySetInnerHTML={{
            __html: content.rendered.replace(/&#x0022;/g, '"'),
          }}
        ></Text>
      </Stack>
    </Flex>
  );
};

export default PostItem;
