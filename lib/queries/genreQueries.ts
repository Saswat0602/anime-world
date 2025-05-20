// GraphQL query for getting all genres
export const GENRES_QUERY = `
  query {
    GenreCollection
  }
`;

// GraphQL query for getting anime by genre
export const ANIME_BY_GENRE_QUERY = `
  query ($page: Int, $perPage: Int, $genre: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, genre: $genre, sort: POPULARITY_DESC) {
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

// GraphQL query for getting anime by studio
export const ANIME_BY_STUDIO_QUERY = `
  query ($page: Int, $perPage: Int, $studioId: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, studios: [$studioId], sort: POPULARITY_DESC) {
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