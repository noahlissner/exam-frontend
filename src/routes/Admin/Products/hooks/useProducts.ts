import axios from "axios";
import useSWR from "swr";
import { IError, IProducts } from "../types";

type IProps = {
  data: IProducts[];
  error: IError | undefined;
  isLoading: boolean;
  mutate: any;
};

const URL_PATH = "http://localhost:5000/api/admin";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const updateCall = async (data: any) => {
  await axios.post(URL_PATH + "/products/update", {
    data,
  });
};

const createCall = async (data: any) => {
  await axios.post(URL_PATH + "/products/create", {
    data,
  });
};

const useProducts = () => {
  const { data, mutate, error, isLoading }: IProps = useSWR(
    URL_PATH + "/products/getall",
    fetcher
  );

  const update = (newData: any) => {
    return mutate(async () => await updateCall(newData), {
      optimisticUpdates: [...data, newData],
      rollbackOnError: true,
      populateCache: true,
      // revalidate: false,
    });
  };

  const create = (data: any) => {
    return mutate(async () => await createCall(data));
  };

  return { data, update, create, error, isLoading };
};

export default useProducts;
