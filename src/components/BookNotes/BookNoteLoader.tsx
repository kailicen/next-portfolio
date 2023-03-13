import { Stack, Box, SkeletonText, useColorMode } from "@chakra-ui/react";
import React from "react";

type PostLoaderProps = {};

const PostLoader: React.FC<PostLoaderProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };

  return (
    <Stack direction="column" mt="42px" pt="42px" spacing={3}>
      <Box padding="10px 10px" bg={bgColor[colorMode]} borderRadius={4}>
        <SkeletonText mt="4" noOfLines={1} width="90%" spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} width="90%" spacing="4" />
      </Box>
      <Box padding="10px 10px" bg={bgColor[colorMode]} borderRadius={4}>
        <SkeletonText mt="4" noOfLines={1} width="90%" spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} width="90%" spacing="4" />
      </Box>
      <Box padding="10px 10px" bg={bgColor[colorMode]} borderRadius={4}>
        <SkeletonText mt="4" noOfLines={1} width="90%" spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} width="90%" spacing="4" />
      </Box>
      <Box padding="10px 10px" bg={bgColor[colorMode]} borderRadius={4}>
        <SkeletonText mt="4" noOfLines={1} width="90%" spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} width="90%" spacing="4" />
      </Box>
    </Stack>
  );
};
export default PostLoader;
