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

export interface ITeamListResponse {
  count: number;
  filters: Record<string, string | number>;
  teams: ITeamCompact[];
}

export interface ITeamVerbose {
  area: Area;
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
  runningCompetitions: RunningCompetition[];
  coach: Coach;
  squad: Squad[];
  staff: any[];
  lastUpdated: Date;
}

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: Date;
  nationality: string;
  contract: Record<string, any>;
}

export interface RunningCompetition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Squad {
  id: number;
  name: string;
  position: Position;
  dateOfBirth: Date;
  nationality: string;
}
