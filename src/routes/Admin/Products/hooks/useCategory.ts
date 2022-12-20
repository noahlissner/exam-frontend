import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useCategory = () => {
  const { data, isLoading, error } = useSWR(
    "http://localhost:5000/api/category/getall",
    fetcher
  );

  return { data, isLoading, error };
};

export default useCategory;
