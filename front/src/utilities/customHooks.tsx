import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { LaunchesState } from "../redux/launches/reducer";
import { queries } from "../consts/graphql/queries";
import { queryFunctions } from "./requestManager";
import { log } from "../dev/consoleMsg";
import { Dispatch } from "redux";
import { launchesTypes } from "../redux/launches/types";

export function useFetchLaunchesDataWithinIndex(dispatch: Dispatch<any>) {
  const [startIndex, endIndex, isThereMore] = useSelector(({ launches }: LaunchesState) => {
    return [launches.startIndex, launches.endIndex, launches.isThereMore];
  });
  useEffect(() => {
    if (isThereMore == true) {
      dispatch({ type: launchesTypes.FETCH_LAUNCHES_REQUEST });
      queryFunctions.getLaunchesListWithinIndexes(startIndex, endIndex)
        .then(data => {
          if (data.launches) {
            dispatch({ type: launchesTypes.FETCH_LAUNCHES_SUCCESS, payload: data.launches });
            if(data.launches < endIndex - startIndex) {
              dispatch({ type: launchesTypes.SET_NO_MORE_DATA })
            }
          }
          else
            dispatch({ type: launchesTypes.FETCH_LAUNCHES_FAILURE, payload: "API ERROR: No data was returned" })
        }).catch(error => {
          console.error("ERROR", error)
          dispatch({ type: launchesTypes.FETCH_LAUNCHES_FAILURE, payload: error })
        })
    }
  }, [startIndex]);
}