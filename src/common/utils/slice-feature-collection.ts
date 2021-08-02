import * as GeoJSON from "geojson";

/**
 * Helper to slice FeatureCollection
 * @param collections - origin FeatureCollection
 * @param length - of new FeatureCollection
 * @return FeatureCollection
 */
export const sliceFeatureCollection = (
  collections: GeoJSON.FeatureCollection<GeoJSON.LineString>,
  length: number
): GeoJSON.FeatureCollection<GeoJSON.LineString> => ({
  ...collections,
  features:
    collections.features.length > length
      ? collections.features.slice(0, length)
      : collections.features,
});
