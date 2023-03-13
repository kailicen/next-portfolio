import {
  Stack,
  Box,
  SkeletonText,
  Skeleton,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

type PostLoaderProps = {};

const PostLoader: React.FC<PostLoaderProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };

  return (
    <Stack
      spacing={5}
      mt={{ base: "30px", md: "42px" }}
      pt={{ base: "30px", md: "42px" }}
    >
      <Box
        padding="10px 10px"
        boxShadow="lg"
        bg={bgColor[colorMode]}
        borderRadius={4}
      >
        <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
        <Skeleton mt="4" height="100px" />
      </Box>
      <Box
        padding="10px 10px"
        boxShadow="lg"
        bg={bgColor[colorMode]}
        borderRadius={4}
      >
        <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <Skeleton mt="4" height="200px" />
      </Box>
    </Stack>
  );
};
export default PostLoader;
