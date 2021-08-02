import * as GeoJSON from "geojson";

//===== route =====
export interface Waypoint {
  distance: number;
  name: string;
  location: number[];
  waypoint_index: number;
  trips_index: number;
}

export interface Intersection {
  out: number;
  entry: boolean[];
  bearings: number[];
  location: number[];
  in?: number;
}

export interface Maneuver {
  bearing_after: number;
  bearing_before: number;
  location: number[];
  type: string;
  instruction: string;
  modifier: string;
}

export interface Step {
  intersections: Intersection[];
  driving_side: string;
  geometry: GeoJSON.LineString;
  mode: string;
  maneuver: Maneuver;
  weight: number;
  duration: number;
  name: string;
  distance: number;
}

export interface Leg {
  summary: string;
  weight: number;
  duration: number;
  steps: Step[];
  distance: number;
}

export interface Trip {
  geometry: GeoJSON.LineString;
  legs: Leg[];
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
}

export interface ResponseData {
  code: string;
  waypoints: Waypoint[];
  trips: Trip[];
}
