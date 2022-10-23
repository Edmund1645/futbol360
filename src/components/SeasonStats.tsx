import React from "react";
import { Box, VStack, theme, Text } from "@chakra-ui/react";
import { ITeamStanding } from "../@types";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

interface Props {
  standing: ITeamStanding;
}
const SeasonStats = ({ standing }: Props) => {
  return (
    <VStack justify="center" data-testid="season-stats">
      <Text>
        Average goals per match:
        <Text as="strong">
          {" "}
          {(standing.goalsFor / standing.playedGames).toFixed(1)}
        </Text>
      </Text>
      <Box width={["full", "400px"]} maxH="400px" mt="5">
        <Pie
          data={{
            labels: ["Won", "Lost", "Draw"],
            datasets: [
              {
                label: "Match stats",
                data: [standing.won, standing.lost, standing.draw],
                backgroundColor: [
                  theme.colors.green["400"],
                  theme.colors.red["400"],
                  theme.colors.yellow["400"],
                ],
              },
            ],
          }}
        />
      </Box>
    </VStack>
  );
};

export default SeasonStats;
