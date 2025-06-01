export const SEARCH_ANIME_QUERY = `
  query SearchAnime(
    $page: Int = 1,
    $perPage: Int = 24,
    $search: String,
    $genres: [String],
    $season: MediaSeason,
    $seasonYear: Int,
    $format_in: [MediaFormat],
    $status: MediaStatus,
    $type: MediaType = ANIME,
    $isAdult: Boolean = false,
    $sort: [MediaSort] = [POPULARITY_DESC]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(
        search: $search,
        type: $type,
        isAdult: $isAdult,
        sort: $sort,
        genre_in: $genres,
        season: $season,
        seasonYear: $seasonYear,
        format_in: $format_in,
        status: $status
      ) {
        id
        title {
          english
          romaji
        }
        coverImage {
          extraLarge
          large
          color
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        bannerImage
        season
        seasonYear
        description
        type
        format
        status(version: 2)
        episodes
        duration
        genres
        averageScore
        popularity
      }
    }
  }
`;
