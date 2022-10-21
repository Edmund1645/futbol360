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

  const handleTeamSelection = (team: ITeamCompact) => {
    setSelectedTeam(team);
    setShowResultBox(false);
  };

  return (
    <Box mt="10" position="relative">
      <Input
        placeholder="Search team"
        onChange={handleSearch}
        value={searchTerm}
        onFocus={() => setShowResultBox(true)}
      />
      {showResultBox ? (
        <Box
          position="absolute"
          bottom="-320px"
          w="full"
          h="300px"
          borderWidth="1px"
          borderRadius="base"
          borderStyle="solid"
          borderColor="gray.600"
          backgroundColor="gray.700"
          p="3"
          zIndex="overlay"
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
                  key={item.id}
                  p="3"
                  textAlign="left"
                  onClick={() => handleTeamSelection(item)}
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
