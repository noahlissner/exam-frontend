import axios from "axios";
import useSWR, { KeyedMutator } from "swr";
import { IError } from "../../Products/types";
import { ICreateCustomer, ICustomer, IUpdateCustomer } from "../types";

type IProps = {
  data: ICustomer[];
  error: IError | undefined;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
};

const URL_PATH = `http://localhost:5000/api/admin`;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const updateCall = async (data: any) => {
  await axios.post(URL_PATH + "/customers/update", {
    data,
  });
};

const createCall = async (data: any) => {
  await axios.post(URL_PATH + "/customers/create", {
    data,
  });
};

const removeCall = async (id: string) => {
  await axios.post(URL_PATH + "/customers/remove", { id });
};

const useCustomers = () => {
  const { data, mutate, error, isLoading }: IProps = useSWR(
    URL_PATH + "/customers/getall",
    fetcher
  );

  const update = (newData: IUpdateCustomer) => {
    return mutate(async () => await updateCall(newData), {
      rollbackOnError: true,
      populateCache: true,
    });
  };

  const create = (data: ICreateCustomer) => {
    return mutate(async () => await createCall(data));
  };

  const remove = (id: string) => {
    return mutate(async () => await removeCall(id));
  };

  return { data, update, remove, create, error, isLoading };
};

export default useCustomers;
