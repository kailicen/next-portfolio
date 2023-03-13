import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Image,
  Link,
  Skeleton,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";

interface Project {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
}

interface Props {
  project: Project;
}

const ProjectItem: React.FC<Props> = ({ project }) => {
  const { id, title, excerpt, featured_media } = project;
  const [imgUrl, setImgUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };
  const borderColor = { light: "gray.300", dark: "gray.600" };
  const brandColor = { light: "darkturquoise", dark: "turquoise" };

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      axios
        .get(`https://kailisblog.com/wp-json/wp/v2/media/${featured_media}`)
        .then((res) => {
          setImgUrl(res.data.source_url);
        });
    } catch (err) {
      console.log(`error: ${err}`);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [project]);

  return (
    <>
      <Link href={`/projects/${id}`}>
        <Flex
          direction={{ base: "column", md: "row" }}
          h={{ base: "auto", md: "300px" }}
          w={{ base: "auto", md: "100%" }}
          m={{ base: "0 10px", md: "0" }}
          gap={{ base: "3px", md: "5px" }}
          justify="space-between"
          pl={{ base: "0", md: "15px", lg: "100px" }}
          pr={{ base: "0", md: "15px", lg: "150px" }}
          border="1px solid"
          borderColor={borderColor[colorMode]}
          bg={bgColor[colorMode]}
          style={{
            transition: "background-color 0.5s ease-in-out",
            cursor: "pointer",
          }}
          _hover={{ backgroundColor: `${brandColor[colorMode]}` }}
          onMouseOver={handleHover}
          onMouseLeave={handleMouseLeave}
          overflow="hidden"
        >
          <Flex
            direction="column"
            pt={{ base: "5px", md: "50px" }}
            pl={{ base: "5px", md: "0" }}
            gap={{ base: "0", md: "5px" }}
            minW="300px"
          >
            <Heading>{title.rendered}</Heading>
            <Text dangerouslySetInnerHTML={{ __html: excerpt.rendered }}></Text>
          </Flex>
          {loading ? (
            <>
              <Spinner mr={200} mt={130} />
            </>
          ) : (
            <>
              <Image
                display={{ base: "none", md: "block" }}
                src={imgUrl}
                alt={title.rendered}
                style={{
                  transform: isHovered ? "scale(1.3)" : "scale(1)",
                  transition: "transform 0.5s ease-in-out",
                }}
              />
              <Image
                display={{ base: "block", md: "none" }}
                src={imgUrl}
                alt={title.rendered}
              />
            </>
          )}
        </Flex>
      </Link>
    </>
  );
};

export default ProjectItem;
