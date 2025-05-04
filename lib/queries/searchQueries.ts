// GraphQL query for searching anime
export const SEARCH_ANIME_QUERY = `
  query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, search: $search) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        description
        format
        status
        episodes
        duration
        season
        seasonYear
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
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
        genres
        synonyms
        averageScore
        popularity
        favourites
        isAdult
        source
        rankings {
          rank
          type
          allTime
        }
        studios { 
          edges { 
            isMain 
            node { 
              id 
              name 
            } 
          } 
        }
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }           
      }
    }
  }
`; 