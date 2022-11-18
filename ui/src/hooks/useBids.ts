import { useQuery } from 'react-query';
import {Bid} from '@/src/types/bid'

const _ = require('lodash');

export const getBids= async (): Promise<{bids:Bid[],fetched:number,total:number}> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/get-bids`
  const res = await fetch(url);
  if (!res.ok) return {bids:[],fetched:0,total:-1};
  let {bids,fetched,total} = await res.json();
  bids = _.uniqBy(bids, 'id'); //delete duplicates when keywords filter is actived
  return {bids,fetched,total};
};

interface Options {
  staleTime?: number;
  enabled?: boolean;
}

const useBids = (options?: Options) => {
  const { staleTime, enabled } = options || {
    staleTime: 1000 * 60 * 60,
    enabled: true,
  };
  let ck = ['BIDS', `mybids`];
 
  return useQuery<{bids:Bid[],fetched:number,total:number}>(ck, () => getBids(), {
    staleTime,
    enabled,
    retry:3
  });
};

export default useBids;