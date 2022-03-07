import { launchesTypes } from "./types";

export type LaunchesState = {
  loading: boolean,
  launches: any,
  error: string,
  startIndex: number,
  endIndex: number,
  isThereMore: boolean,
}

const initailStateConfig = {
  amountOfLoadedContent: 10,
}

const initialState: LaunchesState = {
  loading: false,
  launches: [],
  error: "",
  startIndex: 0,
  endIndex: initailStateConfig.amountOfLoadedContent,
  isThereMore: true,
}

export const launchesReducer: (arg0: LaunchesState, arg1: {type: string, payload?: any}) => any = (state = initialState, action) => {  //should return LaunchesState
  switch (action.type) {
    case launchesTypes.FETCH_LAUNCHES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case launchesTypes.FETCH_LAUNCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        launches: [...state.launches, ...action.payload],
        error: "",
        isThereMore: action.payload.length < state.endIndex - state.startIndex ? false : true,
      }
    case launchesTypes.FETCH_LAUNCHES_FAILURE: //payload: 
      return {
        ...state,
        loading: false,
        launches: state.launches,
        error: action.payload,
      }
    case launchesTypes.INCREMENT_INDEXES:
      return {
        ...state,
        startIndex:  state.startIndex + initailStateConfig.amountOfLoadedContent,
        endIndex:  state.endIndex + initailStateConfig.amountOfLoadedContent,
      }
    case launchesTypes.SET_NO_MORE_DATA:
      return {
        ...state,
        isThereMore: false,
      }
    default:
      return state;
  }
}