import { Box, Flex, Text, Link, useColorMode } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link as ReactLink } from "react-scroll";
import { useEffect, useRef } from "react";

interface RightContentProps {
  page:
    | "postsPage"
    | "booknotesPage"
    | "singleProjectPage"
    | "singleBookNotePage";
  link?: string;
  excerpt?: string;
  indexes?: string[];
}

const RightContent: React.FC<RightContentProps> = ({
  page,
  link,
  excerpt,
  indexes,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };
  const borderColor = { light: "gray.300", dark: "gray.600" };
  const brandColor = { light: "darkturquoise", dark: "turquoise" };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (container.scrollHeight <= container.offsetHeight) {
        container.style.setProperty("::-webkit-scrollbar", "display: none;");
      } else {
        container.style.removeProperty("::-webkit-scrollbar");
      }
    };
    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Box
        position="sticky"
        top="100px"
        maxWidth="350px"
        borderRadius="5px"
        border="1px solid"
        borderColor={borderColor[colorMode]}
      >
        <Flex
          align="center"
          borderRadius="5px 5px 0px 0px"
          bg={brandColor[colorMode]}
          p={3}
        >
          {page === "postsPage" && (
            <Text fontWeight={700}>Kaili&apos;s Blog</Text>
          )}
          {page === "booknotesPage" && (
            <Text fontWeight={700}>Kaili&apos;s Book Notes</Text>
          )}
          {page === "singleProjectPage" && (
            <Text fontWeight={700}>Project Info</Text>
          )}
          {page === "singleBookNotePage" && (
            <Text fontWeight={700}>Book Index</Text>
          )}
        </Flex>
        <Flex
          direction="column"
          p={3}
          borderRadius="0px 0px 5px 5px"
          bg={bgColor[colorMode]}
          maxHeight="calc(100vh - 160px)" // add this line
          overflowY="auto" // use "auto" instead of "scroll" to hide the scrollbar when not needed
        >
          {page === "postsPage" && (
            <Text fontSize="10pt">
              Miscellaneous bits of insights about personal development,
              philosophy, epistemology, nonduality, life purpose, etc. Updated
              randomly throughout the week. Insights here are meant to be quick
              and half-baked.
            </Text>
          )}
          {page === "booknotesPage" && (
            <Text fontSize="10pt">
              Reading for change, not just knowledge. My book notes will be
              actionable steps for personal growth, not just chapter summaries.
              Empowerment through self-education, not just information.
            </Text>
          )}
          {page === "singleProjectPage" && (
            <>
              <Link href={link as string} isExternal mb={5}>
                Project URL <ExternalLinkIcon mx="2px" />
              </Link>
              <Text>Used technologies: </Text>
              <Text
                fontSize=""
                dangerouslySetInnerHTML={{ __html: excerpt as string }}
              ></Text>
            </>
          )}
          {page === "singleBookNotePage" && (
            <Flex direction="column" className="post-item">
              {indexes?.map((title, index) => (
                <ReactLink
                  key={index}
                  to={`section-${index + 1}`}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  {title}
                </ReactLink>
              ))}
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default RightContent;
