export const TOP100_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: SCORE_DESC) {
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
