import axios from "axios";
import useSWR, { KeyedMutator } from "swr";
import { ICreateProduct, IError, IProducts, IUpdateProduct } from "../types";

type IProps = {
  data: IProducts[];
  error: IError | undefined;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
};

const URL_PATH = "https://exam-backend-production.up.railway.app/api/admin";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const updateCall = async (data: IUpdateProduct) => {
  await axios.post(URL_PATH + "/products/update", {
    data,
  });
};

const createCall = async (data: ICreateProduct) => {
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

  const update = (newData: IUpdateProduct) => {
    return mutate(async () => await updateCall(newData), {
      rollbackOnError: true,
      populateCache: true,
    });
  };

  const create = (newData: ICreateProduct) => {
    return mutate(async () => await createCall(newData));
  };

  const remove = (id: string) => {
    return mutate(async () => await removeCall(id));
  };

  return { data, remove, update, create, error, isLoading };
};

export default useProducts;
