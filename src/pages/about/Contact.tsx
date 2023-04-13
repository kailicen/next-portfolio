import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Divider, Text, Link } from "@chakra-ui/react";

const Contact: React.FC = () => {
  return (
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
        <Link
          isExternal
          href="https://www.linkedin.com/in/kaili-cen-1975b4197/"
        >
          LinkedIn <ExternalLinkIcon mx="2px" />
        </Link>
        <Link isExternal href="https://medium.com/@kailicen226">
          Medium <ExternalLinkIcon mx="2px" />
        </Link>
        <Link
          isExternal
          href="https://drive.google.com/file/d/1MIV2NgqHcArEWchFo4nTqWk4jWLqmOUd/view?usp=share_link/"
        >
          Resume <ExternalLinkIcon mx="2px" />
        </Link>
      </Flex>
    </Flex>
  );
};
export default Contact;
