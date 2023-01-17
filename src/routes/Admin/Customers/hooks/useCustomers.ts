import axios from "axios";
import useSWR from "swr";
import { ICreateCustomer, ICustomer, IUpdateCustomer } from "../types";

type IProps = {
  data: ICustomer[];
  error: any;
  isLoading: boolean;
  mutate: any;
};

const URL_PATH = `https://exam-backend-production.up.railway.app/api/admin`;

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

const useCustomers = () => {
  const { data, mutate, error, isLoading }: IProps = useSWR(
    URL_PATH + "/customers/getall",
    fetcher
  );

  const update = (newData: IUpdateCustomer) => {
    return mutate(async () => await updateCall(newData), {
      optimisticUpdates: [...data, newData],
      rollbackOnError: true,
      populateCache: true,
      // revalidate: false,
    });
  };

  const create = (data: ICreateCustomer) => {
    return mutate(async () => await createCall(data));
  };

  return { data, update, create, error, isLoading };
};

export default useCustomers;
