import React, { useEffect, useRef, useState } from "react";
import MapGL, { WebMercatorViewport } from "react-map-gl";
import { STYLE, TOKEN } from "./config";
import { getPathFromPoints } from "services";
import { Trip } from "services/types";
import Routs from "components/Routs/Routs";
import { convertToBbox } from "common/utils/coordinats";
import useCSVCoordinate from "common/hooks/useCSVCoordinate";
import PostcodeMarker from "components/Routs/PostcodeMarker/PostcodeMarker";

const AppMap: React.FC = () => {
  //===== init base viewport =====
  const [viewport, setViewport] = useState({
    longitude: -91.874,
    latitude: 42.76,
    zoom: 12,
  });

  //===== get coordinates from CSV =====
  const coordinates = useCSVCoordinate();

  //===== update view port from data =====
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initMapPosition = () => {
      if (rootRef.current && coordinates.length) {
        const [minLng, minLat, maxLng, maxLat] = convertToBbox(
          coordinates.reduce(
            (res, i) => [...res, i.to, i.from],
            [] as number[][]
          )
        );

        const vp = new WebMercatorViewport({
          width: rootRef.current.offsetWidth,
          height: rootRef.current.offsetHeight,
        });
        const { longitude, latitude, zoom } = vp.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          {
            padding: 32,
          }
        );
        setViewport({
          latitude: latitude,
          longitude: longitude,
          zoom: zoom
        });
      }
    };
    initMapPosition();
    window.addEventListener("resize", initMapPosition);
    return () => window.removeEventListener("resize", initMapPosition);
  }, [rootRef, coordinates]);

  //===== rots state =====
  const [routs, setRouts] = useState<Trip[]>([]);

  useEffect(() => {
    const requst = async () => {
      Promise.all(
        coordinates.map((i) => getPathFromPoints([i.from, i.to]))
      ).then((values) => {
        setRouts(values.reduce((res, i) => [...res, ...i.trips], [] as Trip[]));
      });
    };
    requst();
  }, [setRouts, coordinates]);

  return (
    <div
      ref={rootRef}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={STYLE}
        onViewportChange={setViewport}
        mapboxApiAccessToken={TOKEN}
      >
        <Routs routs={routs} />
        <PostcodeMarker coordinates={coordinates}/>
      </MapGL>
    </div>
  );
};

export default AppMap;
