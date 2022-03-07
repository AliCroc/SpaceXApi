import { launchesTypes } from "./types";

export type TLaunchAction = {
  type: string,
  payload?: any,  //Array<object> | [] | Set<object> | object;
}


type TLaunchesActions = {
  fetchLaunchesRequest: () => TLaunchAction;
  fetchLaunchesSuccess: (arg0: []) => TLaunchAction;
  fetchLaunchesFailure: (arg0: string) => TLaunchAction;
}

export const launchesActions: TLaunchesActions = {
  fetchLaunchesRequest: () => {
    return {
      type: launchesTypes.FETCH_LAUNCHES_REQUEST,
    }
  },

  fetchLaunchesSuccess: (launches) => {
    return {
      type: launchesTypes.FETCH_LAUNCHES_SUCCESS,
      payload: launches,
    }
  },

  fetchLaunchesFailure: (error) => {
    return {
      type: launchesTypes.FETCH_LAUNCHES_FAILURE,
      payload: error,
    }
  }
};