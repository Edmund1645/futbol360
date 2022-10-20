import React, { useState } from "react";
import { Box, Heading, Divider } from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { fetchTeamList, queryKeys } from "../api";
import { ITeamCompact } from "../@types";

import SearchBox from "../components/SearchBox";
import TeamCard from "../components/TeamCard";

const Home = () => {
  const { data: response } = useQuery([queryKeys.teamList], fetchTeamList, {
    staleTime: Infinity,
    enabled: false,
  });
  const [selectedTeam, setSelectedTeam] = useState<ITeamCompact>(
    {} as ITeamCompact
  );

  return (
    <Box h="100vh" p="6" maxW={768} mx="auto">
      <Box width="full">
        <Heading textAlign="center" mb="6">
          Futbol360
        </Heading>
        <Divider />
      </Box>

      <SearchBox
        teams={response?.data?.teams}
        setSelectedTeam={setSelectedTeam}
      />

      <TeamCard team={selectedTeam} />
    </Box>
  );
};

export default Home;
