import React, { useEffect, useState } from "react";
import axios from "axios";
import BookNoteItem from "@/components/BookNotes/BookNoteItem";
import PageContent from "@/components/Layout/PageContent";
import RightContent from "@/components/Layout/RightContent";
import { Button, Flex, Stack } from "@chakra-ui/react";
import BookNoteLoader from "@/components/BookNotes/BookNoteLoader";

const BookNotes: React.FC = () => {
  const [bookNotes, setBookNotes] = useState<[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(true);
        const res = await axios.get(
          `https://kailisblog.com/wp-json/wp/v2/booknotes?page=${page}`
        );
        setBookNotes(res.data);
        setTotalPages(parseInt(res.headers["x-wp-totalpages"]));
      } catch (err) {
        console.log(`error: ${err}`);
      }
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
    <>
      <PageContent>
        <>
          {isLoaded ? (
            <>
              <Stack
                mt={{ base: "30px", md: "42px" }}
                pt={{ base: "30px", md: "42px" }}
                spacing={3}
              >
                {bookNotes.map((booknote, index) => (
                  <BookNoteItem key={index} booknote={booknote} />
                ))}
              </Stack>
              {totalPages > 1 && (
                <Flex justifyContent="space-between" m={4}>
                  {page > 1 && (
                    <Button onClick={handlePrevPage}>Previous</Button>
                  )}
                  {page < totalPages && (
                    <Button onClick={handleNextPage}>Next</Button>
                  )}
                </Flex>
              )}
            </>
          ) : (
            <BookNoteLoader />
          )}
        </>
        <>
          <RightContent page="booknotesPage" />
        </>
      </PageContent>
    </>
  );
};

export default BookNotes;
