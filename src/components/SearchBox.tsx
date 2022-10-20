import React, { useState, useMemo, useCallback } from "react";
import { Box, Input, Text, Stack, Button, Image } from "@chakra-ui/react";
import Fuse from "fuse.js";

import { ITeamCompact } from "../@types/index.d";

interface Props {
  teams: ITeamCompact[] | undefined;
  setSelectedTeam: React.Dispatch<React.SetStateAction<ITeamCompact>>;
}

const SearchBox = ({ teams = [], setSelectedTeam }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    Fuse.FuseResult<ITeamCompact>[]
  >([]);
  const [showResultBox, setShowResultBox] = useState(false);

  const miniSearch = useMemo(() => {
    const search = new Fuse(teams, {
      keys: ["name"],
    });
    return search;
  }, [teams]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      const results = miniSearch.search(e.target.value);
      setSearchResults(results);
    },
    [miniSearch]
  );

  return (
    <Box mt="10" position="relative">
      <Input
        placeholder="Search team"
        onChange={handleSearch}
        value={searchTerm}
        onFocus={() => setShowResultBox(true)}
        onBlur={() => setShowResultBox(false)}
      />
      {showResultBox ? (
        <Box
          position="absolute"
          bottom="-56"
          w="full"
          h="52"
          opacity="0.8"
          borderWidth="1px"
          borderRadius="base"
          borderStyle="solid"
          borderColor="gray.600"
          backgroundColor="whiteAlpha.100"
          backdropBlur="lg"
          p="3"
        >
          {searchResults.length === 0 && (
            <Text textAlign="center" mt="10">
              No results to display
            </Text>
          )}

          <Stack h="full" overflow="scroll" w="full">
            {searchResults.map(({ item }) => {
              return (
                <Button
                  p="3"
                  textAlign="left"
                  onClick={() => setSelectedTeam(item)}
                >
                  <Image
                    boxSize="30px"
                    src={item.crest}
                    loading="lazy"
                    mr="2"
                  />
                  <Text key={item.id}>{item.name}</Text>
                </Button>
              );
            })}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default SearchBox;
