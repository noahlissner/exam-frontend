import axios from "axios";
import useSWR from "swr";
import { IOrder } from "../types";

type IProps = {
  data: IOrder[];
  error: any;
  isLoading: boolean;
  mutate: any;
};

const URL_PATH = `https://exam-backend-production.up.railway.app/api/admin/orders`;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const updateCall = async (data: any) => {
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
