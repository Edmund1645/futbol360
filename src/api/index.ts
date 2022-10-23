import axios from "axios";

import {
  ITeamListResponse,
  ICompetitionStandingsResponse,
  ITeamResponse,
} from "../@types";

const ProxyAPI = axios.create({
  baseURL: "/.netlify/functions",
});

export const fetchTeamList = () => {
  return ProxyAPI.post<ITeamListResponse>("/proxy/team-list", {
    targetAPIPath: "/teams",
    targetAPIFilters: {
      limit: 500,
    },
  });
};

export const fetchTeam = (id: number) => {
  return ProxyAPI.post<ITeamResponse>(`/proxy/team/${id}`, {
    targetAPIPath: `/teams/${id}`,
  });
};

export const fetchPLStandings = () => {
  return ProxyAPI.post<ICompetitionStandingsResponse>("/proxy/standings", {
    targetAPIPath: "/competitions/PL/standings",
    targetAPIFilters: {
      season: 2020,
    },
  });
};

export const queryKeys = {
  teamList: "teamList",
  team: "team",
  PLStandings: "PLStandings/2020",
};
