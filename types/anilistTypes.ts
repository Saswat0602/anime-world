import { Anime } from "./types";

export type AnimeDetailsWithExtras = Anime & {
  genres?: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  studios?: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  relations?: Array<{
    relation: string;
    entry: Array<{
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }>;
  }>;
  streaming?: Array<{
    name: string;
    url: string;
  }>;
  trailer?: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
};

export type PageInfo = {
  currentPage: number;
  hasNextPage: boolean;
  lastPage: number;
  perPage: number;
  total: number;
};