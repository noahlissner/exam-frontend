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

const updPublished = async (id: string, value: boolean) => {
  await axios.post("http://localhost:5000/api/products/update/published", {
    id,
    value,
  });
};

const useProducts = () => {
  const { data, mutate, error, isLoading }: IProps = useSWR(
    "http://localhost:5000/api/products/getall",
    fetcher
  );

  const updatePublished = (data: IUpdatePublishedData) => {
    return mutate(async () => await updPublished(data.id, data.value));
  };

  return { data, updatePublished, error, isLoading };
};

export default useProducts;
