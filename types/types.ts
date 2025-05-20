export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

type StudioNode = {
  id: number;
  name: string;
};

type StudioEdge = {
  isMain: boolean;
  node: StudioNode;
};
export interface AnimeImage {
  jpg: {
    image_url: string;
    small_image_url?: string;
    large_image_url?: string;
  };
  webp?: {
    image_url: string;
    small_image_url?: string;
    large_image_url?: string;
  };
}

export interface Anime {
  mal_id: number;
  url: string;
  title: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms?: string[];
  type: string;
  source: string;
  episodes?: number;
  status: string;
  airing: boolean;
  duration: string;
  rating?: string;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;
  synopsis?: string;
  background?: string;
  season?: string;
  year?: number;
  images: AnimeImage;
  color: string,
  bannerImage?: string;
  studios?: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  genres?: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  isAdult?: boolean;
  nextAiringEpisode?: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  } | null;
}

export interface AnimeResponse {
  data: Anime[];
  pagination: Pagination;
}

export interface AnimeDetailsResponse {
  data: AnimeDetails;
}

export interface AnimeDetails extends Anime {
  genres?: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  themes?: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  demographics?: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  producers?: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  studios?: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  trailer?: {
    youtube_id?: string;
    url?: string;
    embed_url?: string;
  };
  relations?: {
    relation: string;
    entry: {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }[];
  }[];
  streaming?: {
    name: string;
    url: string;
  }[];
  broadcast?: {
    day?: string;
    time?: string;
    timezone?: string;
    string?: string;
  };
}

// AniList API Types
export interface AniListMedia {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string | null;
    userPreferred: string | null;
  };
  description: string | null;
  format: string | null;
  status: string | null;
  episodes: number | null;
  duration: number | null;
  season: string | null;
  seasonYear: number | null;
  startDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  } | null;
  endDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  } | null;
  coverImage: {
    extraLarge: string | null;
    large: string | null;
    medium: string | null;
    color: string | null;
  };
  bannerImage?: string | null;
  genres: string[] | null;
  averageScore: number | null;
  popularity: number | null;
  favourites: number | null;
  isAdult: boolean;
  source: string | null;
  rankings: {
    rank: number;
    type: string;
    allTime: boolean;
  }[] | null;
  studios?: {
    edges: StudioEdge[];
  };
  relations?: {
    edges: {
      relationType: string;
      node: {
        id: number;
        title: {
          userPreferred: string;
        };
        type: string;
      };
    }[];
  };
  streamingEpisodes?: {
    title: string;
    url: string;
    site: string;
  }[];
  trailer?: {
    id: string;
    site: string;
  } | null;
  color: string | null;

  nextAiringEpisode?: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  } | null;
}

export interface AniListAnimeResponse {
  data: {
    Page: {
      pageInfo: {
        total: number;
        currentPage: number;
        lastPage: number;
        hasNextPage: boolean;
        perPage: number;
      };
      media: AniListMedia[];
    };
  };
}

export interface AniListDetailsResponse {
  data: {
    Media: AniListMedia;
  };
} 