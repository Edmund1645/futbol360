import React from "react";
import { Text, Button, Image } from "@chakra-ui/react";
import { ITeamCompact } from "../@types/index.d";

interface Props {
  team: ITeamCompact;
  onClick: () => void;
}
const SearchResultItem = ({ team, onClick }: Props) => {
  return (
    <Button key={team.id} p="3" textAlign="left" onClick={onClick}>
      <Image boxSize="30px" src={team.crest} loading="lazy" mr="2" />
      <Text key={team.id}>{team.name}</Text>
    </Button>
  );
};

export default SearchResultItem;
