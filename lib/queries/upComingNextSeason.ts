export const UPCOMING_NEXT_SEASON_QUERY = `
  query ($page: Int = 1, $perPage: Int = 10) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, status: NOT_YET_RELEASED, sort: POPULARITY_DESC) {
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

        coverImage {
          extraLarge
          large
          medium
          color
        }
        
        genres
        
        averageScore
        popularity
        favourites
        isAdult
        source

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
