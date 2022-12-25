import axios from "axios";
import useSWR from "swr";
import { IError, IProducts, IUpdatePublishedData } from "../types";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type IProps = {
  data: IProducts[];
  error: IError | undefined;
  isLoading: boolean;
  mutate: any;
};

const updateCall = async (data: any) => {
  await axios.post("http://localhost:5000/api/products/update", {
    data,
  });
};

const createCall = async (data: any) => {
  await axios.post("http://localhost:5000/api/products/create", {
    data,
  });
};

const useProducts = () => {
  const { data, mutate, error, isLoading }: IProps = useSWR(
    "http://localhost:5000/api/products/getall",
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
