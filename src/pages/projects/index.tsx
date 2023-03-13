import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectItem from "@/components/Projects/ProjectItem";
import {
  Box,
  Flex,
  Skeleton,
  SkeletonText,
  Stack,
  useColorMode,
} from "@chakra-ui/react";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setLoading(true);
        const res = await axios.get(
          `https://kailisblog.com/wp-json/wp/v2/projects`
        );
        setProjects(res.data);
      } catch (err) {
        console.log(`error: ${err}`);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Flex w="100vw">
      <Flex
        direction="column"
        mt={{ base: "30px", md: "42px" }}
        pt={{ base: "30px", md: "42px" }}
        w="100%"
        gap={5}
      >
        {loading ? (
          <>
            <Skeleton height="290px" />
            <Skeleton mt="1" height="290px" />
            <Skeleton mt="1" height="290px" />
          </>
        ) : (
          <>
            {projects.map((project, index) => (
              <ProjectItem key={index} project={project} />
            ))}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Projects;
