export interface ITeamCompact {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: Date;
}
export interface IRunningCompetition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface ITeamListResponse {
  count: number;
  filters: Record<string, string | number>;
  teams: ITeamCompact[];
}

export interface ITeamResponse {
  area: Record<string, any>;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: IRunningCompetition[];
  coach: Record<string, any>;
  squad: Record<string, any>[];
  staff: any[];
  lastUpdated: Date;
}

export interface ICompetitionStandingsResponse {
  filters: Record<string, number | string>;
  area: Record<string, any>;
  competition: IRunningCompetition;
  season: Record<string, number | any>;
  standings: {
    stage: string;
    type: string;
    table: ITeamStanding[];
  }[];
}

export interface ITeamStanding {
  position: number;
  team: Pick<ITeamCompact, "id" | "name" | "shortName" | "tla" | "crest">;
  playedGames: number;
  form: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}
