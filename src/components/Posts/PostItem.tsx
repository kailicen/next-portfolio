import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
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

  return (
    <Flex borderRadius="5px" p={1}>
      <Stack spacing={1} p="10px">
        <Heading>{title.rendered}</Heading>
        <Text>{date.split("T")[0]}</Text>
        <Text dangerouslySetInnerHTML={{ __html: content.rendered }}></Text>
      </Stack>
    </Flex>
  );
};

export default PostItem;
