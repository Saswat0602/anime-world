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
      }
    }
  }
`;

// GraphQL query for getting anime details
export const ANIME_DETAILS_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
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
        nodes {
          id
          name
        }
      }
      relations {
        edges {
          relationType
          node {
            id
            title {
              userPreferred
            }
            type
          }
        }
      }
      streamingEpisodes {
        title
        url
        site
      }
      trailer {
        id
        site
      }
    }
  }
`;

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
      }
    }
  }
`;

// Query for getting new releases
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
      media(type: ANIME, sort: START_DATE_DESC) {
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
      }
    }
  }
`;

// Query for getting most favorited anime
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
      }
    }
  }
`;

// Query for getting seasonal anime
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
    media(type: ANIME, season: $season, seasonYear: $seasonYear) {
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
      }
    }
  }
`;

// Query for getting yearly anime
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
      media(type: ANIME, seasonYear: $year) {
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
      }
    }
  }
`;

// Query for getting genres
export const GENRES_QUERY = `
  query {
    GenreCollection
  }
`;

// Query for getting anime by genre
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
      media(type: ANIME, genre: $genre) {
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
      }
    }
  }
`;

// Query for getting popular anime
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
      }
    }
  }
`;

// Query for getting anime by studio
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
      media(type: ANIME, studio: $studioId) {
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
      }
    }
  }
`;
