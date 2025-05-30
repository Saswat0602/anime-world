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
      bannerImage
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
      genres
      tags {
        name
        description
        rank
        isGeneralSpoiler
        isMediaSpoiler
        userId
      }
      averageScore
      meanScore
      popularity
      favourites
      isAdult
      source
      countryOfOrigin
      rankings {
        rank
        type
        allTime
        context
        year
        season
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
            format
            status
            coverImage {
              large
            }
          }
        }
      }
      characters(sort: [ROLE, RELEVANCE], perPage: 10) {
        edges {
          role
          node {
            id
            name {
              full
              native
            }
            image {
              large
            }
          }
          voiceActors(language: JAPANESE) {
            id
            name {
              full
            }
            image {
              large
            }
          }
        }
      }
      staff(perPage: 10) {
        edges {
          role
          node {
            id
            name {
              full
              native
            }
            image {
              large
            }
          }
        }
      }
      streamingEpisodes {
        title
        url
        site
        thumbnail
      }
      trailer {
        id
        site
        thumbnail
      }
      externalLinks {
        site
        url
        icon
        color
      }
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      recommendations(perPage: 10, sort: RATING_DESC) {
        nodes {
          rating
          mediaRecommendation {
            id
            title {
              userPreferred
            }
            coverImage {
              large
            }
            type
            averageScore
            genres
          }
        }
      }
      stats {
        scoreDistribution {
          score
          amount
        }
        statusDistribution {
          status
          amount
        }
      }
      reviews(perPage: 10, sort: RATING_DESC) {
        nodes {
          id
          summary
          rating
          ratingAmount
          user {
            name
            avatar {
              large
            }
          }
        }
      }
      mediaListEntry {
        id
        status
        score
        progress
      }
      siteUrl
    }
  }
`;
