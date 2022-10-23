import React, { useState, useMemo, useCallback } from "react";
import { Box, Input, Text, Stack } from "@chakra-ui/react";
import SearchResultItem from "./SearchResultItem";
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
    setSearchTerm("");
  };

  const onInputBlur = () => {
    if (searchTerm) {
      return false;
    }
    setShowResultBox(false);
  };

  return (
    <Box mt="10" position="relative">
      <Input
        data-testid="search-input"
        placeholder="Search team"
        onChange={handleSearch}
        value={searchTerm}
        onFocus={() => setShowResultBox(true)}
        onBlur={onInputBlur}
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
          {searchResults.length === 0 ? (
            <Text textAlign="center" mt="10">
              No results to display
            </Text>
          ) : (
            <Stack
              h="full"
              overflow="scroll"
              w="full"
              data-testid="search-results"
            >
              {searchResults.map(({ item }) => (
                <SearchResultItem
                  key={item.id}
                  team={item}
                  onClick={() => handleTeamSelection(item)}
                />
              ))}
            </Stack>
          )}
        </Box>
      ) : null}
    </Box>
  );
};

export default SearchBox;
