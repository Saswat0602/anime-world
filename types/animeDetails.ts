// types/types.ts

export interface AnimeDetailsResponse {
    data: {
        Media: Media;
    };
}

export interface Media {
    id: number;
    title: {
        romaji: string;
        english: string;
        native: string;
        userPreferred: string;
    };
    description: string;
    format: string;
    status: string;
    episodes: number;
    duration: number;
    season: string;
    seasonYear: number;
    startDate: FuzzyDate;
    endDate: FuzzyDate;
    coverImage: CoverImage;
    bannerImage: string;
    genres: string[];
    tags: Tag[];
    synonyms: string[];
    averageScore: number;
    meanScore: number;
    popularity: number;
    favourites: number;
    isAdult: boolean;
    source: string;
    countryOfOrigin: string;
    rankings: Ranking[];
    studios: StudioConnection;
    relations: MediaConnection;
    characters: CharacterConnection;
    staff: StaffConnection;
    streamingEpisodes: StreamingEpisode[];
    trailer: Trailer | null;
    externalLinks: ExternalLink[];
    nextAiringEpisode: AiringSchedule | null;
    recommendations: RecommendationConnection;
    stats: Stats;
    reviews: ReviewConnection;
    mediaListEntry: MediaListEntry | null;
    siteUrl: string;
}

export interface FuzzyDate {
    year: number;
    month: number;
    day: number;
}

export interface CoverImage {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
}

export interface Tag {
    name: string;
    description: string;
    rank: number;
    isGeneralSpoiler: boolean;
    isMediaSpoiler: boolean;
    userId: number | null;
}

export interface Ranking {
    rank: number;
    type: string;
    allTime: boolean;
    context: string;
    year?: number;
    season?: string;
}

export interface StudioConnection {
    edges: StudioEdge[];
}

export interface StudioEdge {
    isMain: boolean;
    node: {
        id: number;
        name: string;
    };
}

export interface MediaConnection {
    edges: MediaEdge[];
}

export interface MediaEdge {
    relationType: string;
    node: {
        id: number;
        title: {
            userPreferred: string;
        };
        type: string;
        format: string;
        status: string;
        bannerImage: string;
        coverImage: {
            large: string;
        };
    };
}

export interface MediaRelationEdge {
    relationType: string;
    node: {
        id: number;
        title: {
            userPreferred: string;
        };
        coverImage: {
            large: string;
        };
        format?: string;
        status?: string;
    };
}


export interface CharacterConnection {
    edges: CharacterEdge[];
}

export interface CharacterEdge {
    node: {
        id: number;
        name: {
            full: string;
        };
        image: {
            large: string;
        };
    };
    role: string;
    voiceActors?: {
        name: {
            full: string;
        };
        image: {
            large: string;
        };
    }[];
}

export interface VoiceActor {
    id: number;
    name: {
        full: string;
    };
    image: {
        large: string;
    };
}

export interface StaffConnection {
    edges: StaffEdge[];
}

export interface StaffEdge {
    role: string;
    node: {
        id: number;
        name: {
            full: string;
        };
        image: {
            large: string;
        };
    };
}


export interface StreamingEpisode {
    title: string;
    url: string;
    site: string;
    thumbnail: string;
}

export interface Trailer {
    id: string;
    site: string;
    thumbnail: string;
}

export interface ExternalLink {
    site: string;
    url: string;
    icon: string;
    color: string;
}

export interface AiringSchedule {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
}

export interface RecommendationConnection {
    nodes: RecommendationNode[];
}

export interface RecommendationNode {
    rating: number;
    mediaRecommendation: {
        id: number;
        title: {
            userPreferred: string;
        };
        coverImage: {
            large: string;
        };
        type: string;
        genres: string[];
        averageScore: number;


    };
}

export interface Recommendation {
    rating: number;
    mediaRecommendation: {
        averageScore: number;
        id: number;
        title: {
            userPreferred: string;
        };
        coverImage: {
            large: string;
        };
        type: string;
        genres: string[];
    };
}


export interface Stats {
    scoreDistribution: Array<{
        score: number;
        amount: number;
    }>;
    statusDistribution: Array<{
        status: string;
        amount: number;
    }>;
}

export interface ReviewConnection {
    nodes: Review[];
}

export interface Review {
    id: number;
    summary: string;
    rating: number;
    ratingAmount: number;
    user: {
        name: string;
        avatar: {
            large: string;
        };
    };
}

export interface MediaListEntry {
    id: number;
    status: string;
    score: number;
    progress: number;
}

export interface Episode {
    id: string;
    title: string;
    url: string;
    site: string;
    thumbnail?: string;
    episode: number;
}
