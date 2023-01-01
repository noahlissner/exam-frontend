import axios from "axios";
import useSWR from "swr";
import { ICategory, IError } from "../types";

type IProps = {
  data: ICategory[];
  error: IError | undefined;
  isLoading: boolean;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const URL_PATH = "http://localhost:5000/api/admin";

const useCategory = () => {
  const { data, isLoading, error }: IProps = useSWR(
    URL_PATH + "/category/getall",
    fetcher
  );

  return { data, isLoading, error };
};

export default useCategory;
