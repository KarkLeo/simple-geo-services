import React, { useEffect, useState } from "react";
import { Layer, Source } from "react-map-gl";
import { Trip } from "services/types";
import { createRouteChunk } from "../../common/utils/route-chunk";
import { sliceFeatureCollection } from "../../common/utils/slice-feature-collection";

interface RoutsProps {
  routs: Trip[];
}

const Routs: React.FC<RoutsProps> = ({ routs }) => {
  //===== chunk data to render =====
  const [data, setData] = useState(
    routs.map((i) => createRouteChunk(i.geometry))
  );
  useEffect(() => {
    setData(routs.map((i) => createRouteChunk(i.geometry)));
  }, [routs, setData]);

  //===== max lengths =====
  const [maxLengths, setMaxLengths] = useState(0);
  useEffect(() => {
    setMaxLengths(data.reduce((res, i) => Math.max(res, i.features.length), 0));
  }, [data, setMaxLengths]);

  //===== animation stat  =====
  const [animateState, setAnimateState] = useState(0);

  useEffect(() => {
    const refresh = () => {
      setAnimateState(animateState > maxLengths ? 0 : animateState + 1);
    };
    const animateID = requestAnimationFrame(refresh);
    // if (animateState > maxLengths) cancelAnimationFrame(animateID);
    return () => {
      cancelAnimationFrame(animateID);
    };
  }, [animateState, setAnimateState, maxLengths]);

  return (
    <>
      {data.map((i, index) => (
        <Source
          key={"rout_" + index}
          id={"rout_" + index}
          type="geojson"
          data={sliceFeatureCollection(i, animateState)}
        >
          <Layer
            id={"rout-line_" + index}
            type="line"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "#f0f",
              "line-width": 6,
            }}
          />
        </Source>
      ))}
    </>
  );
};

export default Routs;
