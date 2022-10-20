import axios from "axios";

import { ITeamListResponse } from "../@types";

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

export const queryKeys = {
  teamList: "teamList",
};
