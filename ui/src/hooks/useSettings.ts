import { useQuery } from 'react-query';
import {Setting} from '@/src/types/settings'

export const getSettings= async (): Promise<{setting:Setting | null,fetched:number,total:number}> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/get-settings`
  const res = await fetch(url);
  if (!res.ok) return {setting:null,fetched:0,total:-1};
  const {setting,fetched,total} = await res.json();
  return {setting,fetched,total};
};

interface Options {
  staleTime?: number;
  enabled?: boolean;
}

const useSettings = (options?: Options) => {
  const { staleTime, enabled } = options || {
    staleTime: 1000 * 60 * 60,
    enabled: true,
  };
  let ck = ['SETTINGS', `settings`];
 
  return useQuery<{setting:Setting|null,fetched:number,total:number}>(ck, () => getSettings(), {
    staleTime,
    enabled,
    retry:3
  });
};

export default useSettings;