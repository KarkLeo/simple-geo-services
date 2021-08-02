import { CoordinateData, CSVCoordinateData } from "../hooks/useCSVCoordinate";

export const convertCSVtoCoordinate = (
  csvData: CSVCoordinateData[]
): CoordinateData[] =>
  csvData.map((i) => ({
    from: i.from.split(",").map((i) => parseFloat(i)),
    to: i.to.split(",").map((i) => parseFloat(i)),
  }));
