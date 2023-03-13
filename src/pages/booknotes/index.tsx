import React, { useEffect, useState } from "react";
import axios from "axios";
import BookNoteItem from "@/components/BookNotes/BookNoteItem";
import PageContent from "@/components/Layout/PageContent";
import RightContent from "@/components/Layout/RightContent";
import { Stack } from "@chakra-ui/react";
import BookNoteLoader from "@/components/BookNotes/BookNoteLoader";

const BookNotes: React.FC = () => {
  const [bookNotes, setBookNotes] = useState<[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://kailisblog.com/wp-json/wp/v2/booknotes"
        );
        setBookNotes(res.data);
        setIsLoaded(true);
      } catch (err) {
        console.log(`error: ${err}`);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageContent>
        <>
          {isLoaded ? (
            <Stack mt="42px" pt="42px" spacing={3}>
              {bookNotes.map((booknote, index) => (
                <BookNoteItem key={index} booknote={booknote} />
              ))}
            </Stack>
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
