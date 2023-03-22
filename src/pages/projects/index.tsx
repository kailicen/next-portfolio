import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectItem from "@/components/Projects/ProjectItem";
import { Box, Button, Flex, Skeleton } from "@chakra-ui/react";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://kailisblog.com/wp-json/wp/v2/projects?page=${page}`
        );
        setProjects(res.data);
        setTotalPages(parseInt(res.headers["x-wp-totalpages"]));
      } catch (err) {
        console.log(`error: ${err}`);
      }
      setLoading(false);
    };
    fetchData();
    window.scrollTo(0, 0); // scroll to top when page changes
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

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
        {totalPages > 1 && (
          <Flex justifyContent="space-between" m={4}>
            {page > 1 && <Button onClick={handlePrevPage}>Previous</Button>}
            {page < totalPages && (
              <Button onClick={handleNextPage}>Next</Button>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Projects;
