import { GraphQLClient, gql } from "graphql-request";
import { queries } from "../consts/graphql/queries";

const url: string = "http://localhost:5011/graphql";

const graphQLClient: GraphQLClient = new GraphQLClient(url);

function fetchData(gqlRequest: string) {
  return graphQLClient.request(gqlRequest);
}

function getAllLaunchesList() {
  return fetchData(gql`
  query {
    launches {
      mission_name,
      launch_year,
      launch_success,
      links {
        mission_patch_small
      }
    }
  }
  `)
}

function getLaunchesListWithinIndexes(startIndex: number, endIndex: number) {
    return fetchData(gql`
    query {
      launches(start: ${startIndex}, end: ${endIndex}) {
        mission_name,
        launch_year,
        launch_success,
        links {
          mission_patch_small
        }
      }
    }
    `)
}

function getLaunchPageData(launchId: string) {
  return fetchData(gql`
  query {
    launch(launchId: ${launchId}) {
      mission_name,
      launch_year,
      launch_success,
      upcoming,
      site {
        site_id,
        site_name,
        site_name_long,
      },
      rocket {
        rocket_name,
        rocket_type,
      },
      links {
        mission_patch_small,
        mission_patch,
        wikipedia,
        video_link,
      },
      launch_failure_details {
        reason
      },
    }
  }
  `)
}

export const queryFunctions = {
  getAllLaunchesList: getAllLaunchesList,
  getLaunchesListWithinIndexes: getLaunchesListWithinIndexes,
  getLaunchPageData: getLaunchPageData,
}