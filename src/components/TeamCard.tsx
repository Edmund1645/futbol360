import React from "react";
import { ITeamCompact } from "../@types";
import { Box } from "@chakra-ui/react";
interface Props {
  team: ITeamCompact;
}
const TeamCard = ({ team }: Props) => {
  return <Box w="full" bg="gray.600" h="52"></Box>;
};

export default TeamCard;
