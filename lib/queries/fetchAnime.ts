// GraphQL query for getting trending anime
export const TRENDING_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: TRENDING_DESC, status: RELEASING) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        format
        status
        
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
        isAdult

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


// GraphQL query for getting upcoming anime
export const UPCOMING_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: START_DATE, status: NOT_YET_RELEASED) {
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

// GraphQL query for getting new releases
export const NEW_RELEASES_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) {
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

// GraphQL query for getting seasonal anime
export const SEASONAL_ANIME_QUERY = `
  query ($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC) {
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

// GraphQL query for getting yearly anime
export const YEARLY_ANIME_QUERY = `
  query ($page: Int, $perPage: Int, $year: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, seasonYear: $year, sort: POPULARITY_DESC) {
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

// GraphQL query for most popular anime
export const POPULAR_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
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

// GraphQL query for getting most favorited anime
export const MOST_FAVORITED_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: FAVOURITES_DESC) {
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