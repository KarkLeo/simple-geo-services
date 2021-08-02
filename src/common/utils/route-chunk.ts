import * as GeoJSON from "geojson";
import * as turf from "@turf/turf";
import { ROUTE_CHUNK_CONFIG } from "./route-chunk.config";

/**
 * Create array with line 100 meters length (as ROUTE_CHUNK_CONFIG)
 * @param geometry - Geo Geometry Line String
 * @return FeatureCollection with 100 meters length
 */
export const createRouteChunk = (geometry: GeoJSON.LineString) => {
  const line = turf.lineString(geometry.coordinates);

  return turf.lineChunk(line, ...ROUTE_CHUNK_CONFIG);
};
