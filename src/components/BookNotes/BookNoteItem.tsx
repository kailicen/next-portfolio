import axios from "axios";
import React, { useState } from "react";
import {
  Flex,
  Heading,
  Image,
  Link,
  Skeleton,
  Text,
  useColorMode,
} from "@chakra-ui/react";

interface BookNote {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
}

interface Props {
  booknote: BookNote;
}

const BookNoteItem: React.FC<Props> = ({ booknote }) => {
  const { id, title, excerpt, featured_media } = booknote;
  const [imgUrl, setImgUrl] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };
  const borderColor = { light: "gray.300", dark: "gray.600" };

  axios
    .get(`https://kailisblog.com/wp-json/wp/v2/media/${featured_media}`)
    .then((res) => {
      setImgUrl(res.data.source_url);
      setIsLoaded(true);
    })
    .catch((err) => console.log(err));

  return (
    <div>
      <Link href={`/booknotes/${id}`}>
        <Flex
          borderRadius="5px"
          p={2}
          gap={2}
          width="100%"
          border="1px solid"
          borderColor={borderColor[colorMode]}
          bg={bgColor[colorMode]}
        >
          {isLoaded ? (
            <Image src={imgUrl} alt={title.rendered} w="100px" h="150px" />
          ) : (
            <Skeleton minW="100px" h="150px"></Skeleton>
          )}
          <Flex direction="column" gap={2}>
            <Heading fontSize={{ base: 15, md: 20 }}>{title.rendered}</Heading>
            <Text
              fontSize={{ base: 12, md: 15 }}
              dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
            ></Text>
          </Flex>
        </Flex>
      </Link>
    </div>
  );
};

export default BookNoteItem;
