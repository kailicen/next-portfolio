import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "@/components/Posts/PostItem";
import PageContent from "@/components/Layout/PageContent";
import PostLoader from "@/components/Posts/PostLoader";
import { Button, Flex, Stack } from "@chakra-ui/react";
import RightContent from "@/components/Layout/RightContent";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 10;
  const [totalPages, setTotalPages] = useState<number>(0);

  const [disabled, setDisabled] = useState(false);
  const [disabledPrev, setDisabledPrev] = useState(false);

  const MAX_VISIBLE_PAGES = 3;

  const handlePageChange = (page: string | number) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleNextButton = () => {
    if (currentPage !== totalPages) {
      handlePageChange(currentPage + 1);
    } else {
      setDisabled(true);
    }
  };

  const handlePrevButton = () => {
    if (currentPage !== 1) {
      handlePageChange(currentPage - 1);
    } else {
      setDisabledPrev(true);
    }
  };

  function getPageNumbers() {
    const pageNumbers = [];
    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = Math.min(currentPage + 2, totalPages);
      if (currentPage < 3) {
        endPage = MAX_VISIBLE_PAGES;
      } else if (currentPage > totalPages - 2) {
        startPage = totalPages - MAX_VISIBLE_PAGES + 1;
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (startPage > 1) {
        pageNumbers.unshift("...");
        pageNumbers.unshift(1);
      }
      if (endPage < totalPages) {
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  }

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
    console.log("totalPages", totalPages);
  }, [totalPages]);

  return (
    <>
      <PageContent>
        <>
          {loading ? (
            <PostLoader />
          ) : (
            <Stack mt="42px" pt="42px" spacing={5}>
              {posts.map((post, index) => (
                <PostItem key={index} post={post} />
              ))}

              <Flex gap={3}>
                <Button disabled={disabledPrev} onClick={handlePrevButton}>
                  Prev
                </Button>
                {getPageNumbers().map((page, index) => (
                  <Button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={page === currentPage ? "active" : ""}
                    disabled={page === "..."}
                  >
                    {page}
                  </Button>
                ))}
                <Button disabled={disabled} onClick={handleNextButton}>
                  Next
                </Button>
              </Flex>
            </Stack>
          )}
        </>
        <>
          <RightContent page="postsPage" />
        </>
      </PageContent>
    </>
  );
};

export default Posts;
