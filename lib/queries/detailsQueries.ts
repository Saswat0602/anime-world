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
        edges {
          isMain
          node {
            id
            name
          }
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