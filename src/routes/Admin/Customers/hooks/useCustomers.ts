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

const URL_PATH = `https://exam-backend-production.up.railway.app/api/admin`;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const updateCall = async (data: IUpdateCustomer) => {
  await axios.post(URL_PATH + "/customers/update", {
    data,
  });
};

const createCall = async (data: ICreateCustomer) => {
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

  const create = (newData: ICreateCustomer) => {
    return mutate(async () => await createCall(newData));
  };

  const remove = (id: string) => {
    return mutate(async () => await removeCall(id));
  };

  return { data, update, remove, create, error, isLoading };
};

export default useCustomers;
