import axios from "axios";
import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } from "graphql";

const QLRocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  })
})

const QLLaunchLinks = new GraphQLObjectType({
  name: "LaunchLinks",
  fields: ({
    mission_patch: { type: GraphQLString },
    mission_patch_small: { type: GraphQLString },
    wikipedia: { type: GraphQLString },
    video_link: { type: GraphQLString },
  })
})

const QLLaunchSiteType = new GraphQLObjectType({
  name: "LaunchSite",
  fields: ({
    site_id: { type: GraphQLString },
    site_name: { type: GraphQLString },
    site_name_long: { type: GraphQLString },
  })
})

const QLLaunchFailureDetails = new GraphQLObjectType({
  name: "LaunchFailureDetails",
  fields: ({
    time: { type: GraphQLInt },
    reason: { type: GraphQLString },
  })
})

const QLLaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    upcoming: { type: GraphQLBoolean },
    launch_year: { type: GraphQLString },
    launch_site: { type: QLLaunchSiteType },
    rocket: { type: QLRocketType },
    launch_success: { type: GraphQLBoolean },
    launch_failure_details: { type: QLLaunchFailureDetails },
    links: { type: QLLaunchLinks },
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    launches: {
      type: new GraphQLList(QLLaunchType),
      args: {
        start: { type: GraphQLInt },
        end: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const url = 'https://api.spacexdata.com/v3/launches';
        if (args.start != null || args.end != null)
          return getDataInRange(url, args.start, args.end)
        else
          return axios.get(url)
            .then(response => response.data);
      }
    },
    upcomingLaunches: {
      type: new GraphQLList(QLLaunchType),
      resolve(parent, args) {
        return axios.get('https://api.spacexdata.com/v3/launches/upcoming')
          .then(response => response.data);
      }
    },
    launch: {
      type: QLLaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(response => response.data);
      }
    },
  }
})

export const RootSchema = new GraphQLSchema({
  query: RootQuery,
});

const getDataInRange = async (url: string, start: number, end: number) => {
  return axios.get(url)
    .then(response => response.data)
    .then(data => data.slice(start < 0 ? 0 : start, end >= data.length ? data.length - 1 : end));
}
