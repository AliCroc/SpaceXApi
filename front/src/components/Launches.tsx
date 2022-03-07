import '../style/ui.css';
import { useFetchLaunchesDataWithinIndex } from '../utilities/customHooks';
import '../style/loader.css';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { LaunchesState } from "../redux/launches/reducer";
import { QueryObserver } from 'react-query';
import { launchesTypes } from "../redux/launches/types";


type BannerPatchProps = { patchLink: string }
type LaunchBannerPropsType = {
  year: string,
  title: string,
  patchLink: string,
  wasSuccessful: boolean,
  referenceKey?: any
}

type LaunchFetchDataType = {
  launch_success: boolean,
  launch_year: string,
  links: {
    mission_patch_small: string
  },
  mission_name: string,
}

export const Launches = (): JSX.Element => {
  const dispatch = useDispatch();
  useFetchLaunchesDataWithinIndex(dispatch);
  const [launches, isLoading, error, isThereMoreData] = useSelector(({ launches }: LaunchesState) => {
    return [launches.launches, launches.loading, launches.error, launches.isThereMore];
  });

  const lastRowObserver = useRef<IntersectionObserver>();
  const lastRowElementRef = useCallback((banner) => {
    if(isLoading || !isThereMoreData) return;
    if(lastRowObserver.current != undefined) lastRowObserver.current.disconnect();
    lastRowObserver.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        dispatch({ type: launchesTypes.INCREMENT_INDEXES})
      }
    })
    if(banner) lastRowObserver.current.observe(banner)

  }, [isLoading, isThereMoreData])

  let footer = undefined;
  console.log("FROM CUSTOM HOOK", launches, isLoading, error, isThereMoreData)
  if (launches && launches.length > 0) {

    console.warn("launch RENDERING")
    if (isThereMoreData == false) {
      footer = (<Footer />);
    }
    console.log("DATA", launches);
    return (
      <div className={"launchesContainer"}>
        {
          launches.map((launch: LaunchFetchDataType, index: number) => { 
            if (index !== launches.length - 1 && isThereMoreData) {
              return <LaunchBanner
                year={launch.launch_year}
                title={launch.mission_name}
                patchLink={launch.links.mission_patch_small}
                wasSuccessful={launch.launch_success}
                key={index}
                />
            }
                
            else //referenceKey={lastRowElementRef}
              return <LaunchBanner
                year={launch.launch_year}
                title={launch.mission_name}
                patchLink={launch.links.mission_patch_small}
                wasSuccessful={launch.launch_success}
                key={index} 
                referenceKey={lastRowElementRef}
                />
          })}
        {footer}
      </div>
    )
  }
  // else if (status == 'error') {
  //   return (
  //     <div><p>Sorry, an error occured. Please reload the page or check the console for error message.</p>
  //       <br/>
  //       <p>:(</p>
  //     </div>
  //   )
  // }
  else return <div><LoadingCircle/></div>
}

const LaunchBanner: (arg0: LaunchBannerPropsType) => JSX.Element = ({year, title, patchLink, wasSuccessful, referenceKey}) => {
  let resultOfLaunch = wasSuccessful ? "success" : "failed";
  return (
    <div className={"launchBanner"} ref={referenceKey || null}>
      <div className={"grid"}>
        <div className={`title ${resultOfLaunch}`}>{ title }</div>
        <div className={"year"}>{ year }</div>
        <LaunchBannerPatch patchLink={ patchLink }/>
      </div>
    </div>
  )
}

const LaunchBannerPatch = ({patchLink}: BannerPatchProps): JSX.Element => {
  
  return (
    <div className={"patch"}>
      <img src={patchLink}></img>
    </div>
  )
}

const Footer = () => {
  return(
    <div style={{ textAlign: 'center', width: '100%'}}>
      End of results.
    </div>
  )
}

const LoadingCircle = () => {
  return (
    <div className={"lds-spinner"}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}