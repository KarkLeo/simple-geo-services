import { bbox, lineString } from "@turf/turf";

/**
 * Crate rect in with all addresses
 * @param points - address list item
 * @return bbox object
 */
export const convertToBbox = (points: number[][]) => {
  const line = lineString(points);
  return bbox(line);
};
