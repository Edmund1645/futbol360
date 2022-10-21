import React, { useEffect, useState } from "react";

import {
  Box,
  Image,
  Stack,
  VStack,
  Text,
  Flex,
  Skeleton,
  Button,
  Heading,
} from "@chakra-ui/react";
import { FiMapPin, FiLink, FiPhone } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { fetchPLStandings, fetchTeam, queryKeys } from "../api";
import { ITeamCompact, ITeamStanding } from "../@types";

import SeasonStats from "./SeasonStats";
interface Props {
  team: ITeamCompact;
  setSelectedTeam: React.Dispatch<React.SetStateAction<ITeamCompact>>;
}
const TeamCard = ({ team, setSelectedTeam }: Props) => {
  const { isLoading, data: response } = useQuery(
    [queryKeys.team, team.id],
    () => fetchTeam(team.id)
  );
  const { data: leagueStanding } = useQuery(
    [queryKeys.PLStandings],
    fetchPLStandings
  );

  const [PLStanding, setPLStanding] = useState<ITeamStanding>();
  const [otherTeams, setOtherTeams] = useState<ITeamStanding[]>([]);

  useEffect(() => {
    if (leagueStanding?.data) {
      const teamsInLeague = leagueStanding.data.standings[0].table;
      const teamStanding = teamsInLeague.find((record) => {
        return record.team.id === team.id;
      });
      setPLStanding(teamStanding);

      // shuffle and pick three teams
      const shuffled = [...teamsInLeague].sort(() => 0.5 - Math.random());
      setOtherTeams(shuffled.slice(0, 3));
    }
  }, [leagueStanding, team.id]);

  return (
    <Skeleton isLoaded={!isLoading}>
      {response ? (
        <Box
          w="full"
          bg="whiteAlpha.50"
          p="4"
          minH="52"
          my="70px"
          borderRadius="lg"
        >
          <Stack direction={["column", "row"]} alignItems="center">
            <Image
              src={response.data.crest}
              boxSize={["100px", "200px"]}
              mr={["0px", "10px"]}
            />
            <Box>
              <Text
                mb="5"
                mt="3"
                display="block"
                as="strong"
                textAlign={["center", "left"]}
              >
                {response.data.name}
              </Text>
              <VStack gap="10px">
                <Flex alignItems="center" w="full">
                  <Box flexShrink="0">
                    <FiMapPin />
                  </Box>
                  <Text pl="2">{response.data.address}</Text>
                </Flex>
                <Flex alignItems="center" w="full">
                  <FiLink />
                  <Text
                    pl="2"
                    textDecoration="underline"
                    as="a"
                    href={response.data.website}
                  >
                    {response.data.website}
                  </Text>
                </Flex>
                <Flex alignItems="center" w="full">
                  <FiPhone />
                  <Text pl="2">N/A</Text>
                </Flex>
              </VStack>
            </Box>
          </Stack>

          {PLStanding && (
            <>
              <Heading as="h3" size="md" mt="10" mb="8" textAlign="center">
                2020/2021 Season stats
              </Heading>
              <SeasonStats standing={PLStanding} />
              <Text my="5" textAlign="center">
                Other teams in this league
              </Text>
              <Stack
                direction={["column", "row"]}
                alignItems="center"
                justifyContent="center"
              >
                {otherTeams.map(({ team }) => (
                  <Button
                    key={team.id}
                    variant="ghost"
                    onClick={() => setSelectedTeam(team as ITeamCompact)}
                  >
                    {team.name}
                  </Button>
                ))}
              </Stack>
            </>
          )}
        </Box>
      ) : (
        <Text mt="70px" textAlign="center">
          There was an error fetching this team's info
        </Text>
      )}
    </Skeleton>
  );
};

export default TeamCard;
