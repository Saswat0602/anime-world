// GraphQL query for searching anime
export const SEARCH_ANIME_QUERY = `
    query SearchAnime(
    $page: Int = 1,
    $search: String,
    $type: MediaType = ANIME,
    $isAdult: Boolean = false,
    $sort: [MediaSort] = [SEARCH_MATCH]
  ) {
    Page(page: $page, perPage: 20) {
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
        sort: $sort
      ) {
        id
        title {
          english
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



