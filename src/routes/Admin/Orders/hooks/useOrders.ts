import axios from "axios";
import useSWR, { KeyedMutator } from "swr";
import { IError } from "../../Products/types";
import { IOrder } from "../types";

type IProps = {
  data: IOrder[];
  error: IError | undefined;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
};

const URL_PATH = `https://exam-backend-production.up.railway.app/api/admin/orders`;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const updateCall = async (data: { _id?: string; status?: string }) => {
  await axios.post(URL_PATH + "/update", {
    data,
  });
};

const useOrders = () => {
  const { data, mutate, error, isLoading }: IProps = useSWR(
    URL_PATH + "/getall",
    fetcher
  );

  const update = (newData: { _id?: string; status?: string }) => {
    return mutate(async () => await updateCall(newData), {
      rollbackOnError: true,
      populateCache: true,
    });
  };

  return { data, update, error, isLoading };
};

export default useOrders;
