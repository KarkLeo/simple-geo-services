import { convertCSVtoCoordinate } from "../utils/convertCSVtoCoordinate";
import { useEffect, useState } from "react";
import csvLoader from "services/csvLoader";

export interface CSVCoordinateData {
  from: string;
  to: string;
}

export interface CoordinateData {
  from: number[];
  to: number[];
}

const useCSVCoordinate = (): CoordinateData[] => {
  const [data, setData] = useState<CoordinateData[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await csvLoader<CSVCoordinateData>("/data/data.csv");
      setData(convertCSVtoCoordinate(res));
    };
    fetch();
  }, [setData]);

  return data;
};

export default useCSVCoordinate;
