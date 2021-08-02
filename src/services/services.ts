import { TOKEN } from "components/AppMap/config";
import { client } from "./client";
import { GeodataResponce } from "./geodata.types";
import { ResponseData } from "./types";

export const getPathFromPoints = async (pints: number[][]) => {
  const pointsStr = pints.map((i) => i.join(",")).join(";");
  const res = await client.get<ResponseData>(
    `optimized-trips/v1/mapbox/walking/${pointsStr}?steps=true&geometries=geojson&access_token=${TOKEN}`
  );

  return res.data;
};

export const getPostcodeFromPoints = async (pint: number[]) => {
  const res = await client.get<GeodataResponce>(
    `geocoding/v5/mapbox.places/${pint.join(',')}.json?access_token=${TOKEN}`
  );

  return res.data;
};