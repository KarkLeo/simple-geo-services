import Papa from "papaparse";

const csvLoader = async <T extends {}>(path: string): Promise<T[]> => {
  const response = await fetch(path);
  const reader = response?.body?.getReader();
  const result = await reader?.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result?.value);
  const results = Papa.parse(csv, { header: true, delimiter: ";" });
  const rows = results.data as T[];
  return rows;
};

export default csvLoader;
