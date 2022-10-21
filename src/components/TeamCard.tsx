import React, { useEffect, useState } from "react";

import {
  Box,
  Image,
  Stack,
  VStack,
  Text,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { FiMapPin, FiLink } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { fetchPLStandings, fetchTeam, queryKeys } from "../api";
import { ITeamCompact, ITeamStanding } from "../@types";

import SeasonRecord from "./SeasonRecord";
interface Props {
  team: ITeamCompact;
}
const TeamCard = ({ team }: Props) => {
  const { isLoading, data: response } = useQuery(
    [queryKeys.team, team.id],
    () => fetchTeam(team.id)
  );
  const { data: leagueStanding } = useQuery(
    [queryKeys.PLStandings],
    fetchPLStandings
  );

  const [PLStanding, setPLStanding] = useState<ITeamStanding>();

  useEffect(() => {
    if (leagueStanding?.data) {
      const teamStanding = leagueStanding.data.standings[0].table.find(
        (record) => {
          return record.team.id === team.id;
        }
      );

      setPLStanding(teamStanding);
    }
  }, [leagueStanding?.data, team.id]);

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
                  <FiMapPin />
                  <Text pl="2">{response.data.address}</Text>
                </Flex>
                <Flex w="full">
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
              </VStack>
            </Box>
          </Stack>
          {PLStanding && <SeasonRecord standing={PLStanding} />}
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
