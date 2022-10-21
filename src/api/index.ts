import axios from "axios";

import {
  ITeamListResponse,
  ICompetitionStandingsResponse,
  ITeamResponse,
} from "../@types";

const ProxyAPI = axios.create({
  baseURL: "/.netlify/functions/proxy",
});

export const fetchTeamList = () => {
  return ProxyAPI.post<ITeamListResponse>("/", {
    targetAPIPath: "/teams",
    targetAPIParams: {
      limit: 500,
    },
  });
};

export const fetchTeam = (id: number) => {
  return ProxyAPI.post<ITeamResponse>("/", {
    targetAPIPath: `/teams/${id}`,
  });
};

export const fetchPLStandings = () => {
  return ProxyAPI.post<ICompetitionStandingsResponse>("/", {
    targetAPIPath: "/competitions/PL/standings",
    targetAPIParams: {
      season: 2020,
    },
  });
};

export const queryKeys = {
  teamList: "teamList",
  team: "team",
  PLStandings: "PLStandings/2020",
};
