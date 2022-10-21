import React, { useState } from "react";
import { Container, Box, Heading, Divider } from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { fetchTeamList, queryKeys } from "../api";
import { ITeamCompact } from "../@types";

import SearchBox from "../components/SearchBox";
import TeamCard from "../components/TeamCard";

const Home = () => {
  const { data: response } = useQuery([queryKeys.teamList], fetchTeamList);
  const [selectedTeam, setSelectedTeam] = useState<ITeamCompact>(
    {} as ITeamCompact
  );

  return (
    <Container p="6" maxW={768} mx="auto">
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

      {selectedTeam.id && (
        <TeamCard team={selectedTeam} setSelectedTeam={setSelectedTeam} />
      )}
    </Container>
  );
};

export default Home;
