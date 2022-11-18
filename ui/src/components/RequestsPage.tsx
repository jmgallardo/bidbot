import { FunctionComponent,useState,useEffect, ChangeEvent, ChangeEventHandler} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import BidsTable from '@/src/components/BidsTable';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { HiOutlineAtSymbol} from 'react-icons/hi';
//import { GoSearch } from 'react-icons/go'
import {Bid} from '@/src/types/bid'
import useBids from '@/src/hooks/useBids'
import toast from 'react-hot-toast'
//import { useScroll } from "@/src/components/scroll";


const RequestsPage: FunctionComponent = () => {
  
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState ('');
  const {data:{total,fetched,bids:b}={total:0,fetched:0,bids:[]}} = useBids();
  const [bids, setBids] = useState<Bid[]>([]); 
  
  useEffect(()=>{
    if(b){
      if(filter.length)
          filterTable(filter)
      else    
          setBids(b);
    }
  },[b])

  const handleFilterChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setFilter(ev.target.value);
    filterTable(ev.target.value)

  };

  const filterTable = (value:string) => {
    const lowercasedValue = value.toLowerCase().trim();
    const excludeColumns:string[]=['id','link']
    if (lowercasedValue === "") setBids(b);
    else {
      const filteredData:Bid[] = b.filter(bid => {
        return Object.keys(bid).some(key =>
        excludeColumns.includes(key) ? false : (bid as any)[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setBids(filteredData);
    }
  }

  const {
    mutate: execSearchBids,
    error: searchBidsError,
    isError: isSearchBidsError,
    isLoading: isSearchBidsLoading,
    isSuccess: isSearchBidsSuccess,
    status,
  } = useMutation(
    async (): Promise<Bid[] | null> => {
      let bids: Bid[] = [];
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search-bids`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'        
              },
            })
      let response =  await res.json();
       if(!response.ok){
           toast.error(response.error); //Mostrar Error 
       }
       else{
          toast.success('Bids updated')
           bids = response.bids;
          }  
      return null;
    },
    {
      onMutate: async () => {
          const cacheKey = ['BIDS', `mybids`];
          const snapshot = queryClient.getQueryData(cacheKey);
          return { cacheKey, snapshot };
      },
      onSettled: (_comment, error, _variables, context) => {
        if (context) {
          const { cacheKey: ck, snapshot } = context;
          if (error && ck) {
            queryClient.setQueryData(ck, snapshot);
          }
          if (context) queryClient.invalidateQueries(ck);
        }
      },
    },
  );

  return <Container className=''> 
   <section className='d-flex flex-row justify-content-start mt-2'>          
      <InputGroup className='w-50'>
        <Form.Control className="rounded rounded-5 me-1"
          //size='sm'
          placeholder=" Filter..."
          aria-label="InputFilter"
          value={filter}
          onChange = {handleFilterChange}
        />
        {/*<Button variant="primary rounded rounded-5"><GoSearch/></Button>*/}
      </InputGroup>
     <Button variant="primary" className='rounded rounded-4 ms-5' onClick={() => execSearchBids()} disabled={isSearchBidsLoading}>
        <HiOutlineAtSymbol className='me-1'/>Search Bids
      </Button>
      {isSearchBidsLoading && (<Spinner className='ms-3' animation="grow" variant="info" />)}
    </section>
    <section className='mt-3'>
      <BidsTable key='requestPageTable' columns={['Agency','Link','Title','']} data={bids}/>      
    </section>
</Container> 
}

export default RequestsPage;