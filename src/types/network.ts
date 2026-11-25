export interface EditionStatus {
  edition: "java" | "bedrock";
  online: boolean;
  playersOnline: number;
  playersMax: number;
  version: string;
  motd: string;
  address: string;
  ip: string;
  port: number;
  gameModes: string[];
}

export interface NetworkStatusResponse {
  java: EditionStatus;
  bedrock: EditionStatus;
  totalPlayersOnline: number;
  anyOnline: boolean;
  fetchedAt: string;
}

export interface CommunityReview {
  id: string;
  name: string;
  comment: string;
  rating: number;
  createdAt: string;
}
