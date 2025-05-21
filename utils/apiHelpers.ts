import { PageInfo } from "@/types/anilistTypes";
import { AniListMedia, Anime } from "@/types/types";


export const convertToAnime = (media: AniListMedia): Anime => {
    const mainStudios = media.studios?.edges
        .filter(edge => edge.isMain)
        .map(edge => edge.node.name) || [];
    return {
        mal_id: media.id, // Using AniList ID instead of MAL ID
        url: `https://anilist.co/anime/${media.id}`,
        title: media.title.userPreferred || media.title.english || media.title.romaji || '',
        title_english: media.title.english || undefined,
        title_japanese: media.title.native || undefined,
        type: media.format || 'Unknown',
        source: media.source || 'Unknown',
        episodes: media.episodes || undefined,
        status: media.status || 'Unknown',
        airing: media.status === 'RELEASING',
        nextAiringEpisode: media.nextAiringEpisode || undefined,
        duration: media.duration ? `${media.duration} min per ep` : 'Unknown',
        rating: media.isAdult ? 'R+ - Mild Nudity' : 'PG-13 - Teens 13 or older',
        score: media.averageScore || 0, // AniList scores are 0-100
        scored_by: media.popularity || undefined,
        rank: media.rankings?.find((r: { type: string }) => r.type === 'RATED')?.rank || undefined,
        popularity: media.popularity || undefined,
        members: media.popularity || undefined,
        favorites: media.favourites || undefined,
        synopsis: media.description || undefined,
        background: media.description || undefined,
        season: media.season ? media.season.toLowerCase() : undefined,
        year: media.seasonYear || undefined,
        color: media?.coverImage.color || "",
        images: {
            jpg: {
                image_url: media.coverImage.medium || '',
                small_image_url: media.coverImage.large || undefined,
                large_image_url: media.coverImage.extraLarge || undefined,
            }
        },
        bannerImage: media.bannerImage || "",
        genres: (media.genres || []).map(genre => ({
            mal_id: 0, // AniList doesn't have IDs for genres
            type: 'anime',
            name: genre,
            url: `https://anilist.co/search/anime?genres=${encodeURIComponent(genre)}`
        })),
        studios: mainStudios.map(studio => ({
            mal_id: 0,
            type: 'anime',
            name: studio,
            url: `https://anilist.co/search/studio?name=${encodeURIComponent(studio)}`
        })),
        isAdult: media.isAdult || false,
    };
};


const formatAiredString = (
    startDate: { year: number | null; month: number | null; day: number | null } | null | undefined,
    endDate: { year: number | null; month: number | null; day: number | null } | null | undefined
): string => {
    if (!startDate || !startDate.year) return 'Not available';

    const start = `${startDate.year}-${String(startDate.month || 1).padStart(2, '0')}-${String(startDate.day || 1).padStart(2, '0')}`;

    if (!endDate || !endDate.year) {
        return `${start} to ?`;
    }

    const end = `${endDate.year}-${String(endDate.month || 1).padStart(2, '0')}-${String(endDate.day || 1).padStart(2, '0')}`;
    return `${start} to ${end}`;
};

export const convertPagination = (pageInfo: PageInfo) => {
  return {
    last_visible_page: pageInfo.lastPage,
    has_next_page: pageInfo.hasNextPage,
    current_page: pageInfo.currentPage,
    items: {
      count: pageInfo.perPage,
      total: pageInfo.total,
      per_page: pageInfo.perPage
    }
  };
};
