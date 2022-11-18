import { useQuery } from 'react-query';
import {Bid} from '@/src/types/bid'

export const getDeletedBids= async (): Promise<{bids:Bid[],fetched:number,total:number}> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/get-deleted-bids`
  const res = await fetch(url);
  if (!res.ok) return {bids:[],fetched:0,total:-1};
  const {bids,fetched,total} = await res.json();
  return {bids,fetched,total};
};

interface Options {
  staleTime?: number;
  enabled?: boolean;
}

const useDeletedBids = (options?: Options) => {
  const { staleTime, enabled } = options || {
    staleTime: 1000 * 60 * 60,
    enabled: true,
  };
  let ck = ['BIDS', `deletedbids`];
 
  return useQuery<{bids:Bid[],fetched:number,total:number}>(ck, () => getDeletedBids(), {
    staleTime,
    enabled,
    retry:3
  });
};

export default useDeletedBids;