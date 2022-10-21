import React, { useRef } from "react";
import { Box, VStack, theme } from "@chakra-ui/react";
import { ITeamStanding } from "../@types";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

interface Props {
  standing: ITeamStanding;
}
const SeasonRecord = ({ standing }: Props) => {
  return (
    <VStack justify="center">
      <Box width={["full", "400px"]} maxH="400px">
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

export default SeasonRecord;
