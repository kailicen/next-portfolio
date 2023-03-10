import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "@/components/Posts/PostItem";
import PageContent from "@/components/Layout/PageContent";
import PostLoader from "@/components/Posts/PostLoader";
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 5;
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pages, setPages] = useState<number[]>([]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * postsPerPage;
        const res = await axios.get(
          `https://kailisblog.com/wp-json/wp/v2/posts?offset=${offset}&per_page=${postsPerPage}`
        );
        setPosts(res.data);
        if (res.headers["x-wp-totalpages"] !== undefined)
          setTotalPages(parseInt(res.headers["x-wp-totalpages"], 10));
      } catch (err) {
        console.log(`error: ${err}`);
      }
      setLoading(false);
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const pagesArr: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArr.push(i);
    }
    setPages(pagesArr);
    console.log("totalPages", totalPages);
  }, [totalPages]);

  return (
    <>
      <PageContent>
        <>
          {loading ? (
            <PostLoader />
          ) : (
            <Stack mt="70px" pt="70px" spacing={10}>
              {currentPage === 1 && (
                <Flex direction="column">
                  <Heading>Kaili&apos;s Blog</Heading>
                  <Text>
                    Miscellaneous bits of insights about personal development,
                    philosophy, epistemology, nonduality, life purpose, etc.
                    Updated randomly throughout the week. Insights here are
                    meant to be quick and half-baked.
                  </Text>
                </Flex>
              )}

              {posts.map((post, index) => (
                <PostItem key={index} post={post} />
              ))}

              <Flex>
                <Button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </Button>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={page === currentPage ? "active" : ""}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </Flex>
            </Stack>
          )}
        </>
        <></>
      </PageContent>
    </>
  );
};

export default Posts;
