import axios from "axios";
import useSWR, { KeyedMutator } from "swr";
import { IError, IProducts } from "../types";

type IProps = {
  data: IProducts[];
  error: IError | undefined;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
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

const removeCall = async (id: string) => {
  await axios.post(URL_PATH + "/products/remove", { id });
};

const useProducts = () => {
  const { data, mutate, error, isLoading }: IProps = useSWR(
    URL_PATH + "/products/getall",
    fetcher
  );

  const update = (newData: any) => {
    return mutate(async () => await updateCall(newData), {
      rollbackOnError: true,
      populateCache: true,
    });
  };

  const create = (data: any) => {
    return mutate(async () => await createCall(data));
  };

  const remove = (id: string) => {
    return mutate(async () => await removeCall(id));
  };

  return { data, remove, update, create, error, isLoading };
};

export default useProducts;
