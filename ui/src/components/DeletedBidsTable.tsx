import { FunctionComponent,useState,useEffect} from 'react';
import {Bid} from '@/src/types/bid'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {AiOutlineMenu} from 'react-icons/ai'
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast'
import Pagination from "@/src/components/pagination/Pagination";
import BidSelect from "@/src/components/pagination/BidSelect";

interface Props {
  columns: string[];
  data: Bid[]|[];
}

interface idBidPayload {
  id: string;
}

const DeletedBidsTable: FunctionComponent<Props> = ({columns,data})  => { 

  const queryClient = useQueryClient();
  const allBidsCount = data.length;
  const [bidsPerPage, setBidsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(()=>{
    if(!currentPage){
     setCurrentPage(1)
    }
  },[currentPage])

const lastBidNumber = currentPage * bidsPerPage;
  const firstBidIndex = lastBidNumber - bidsPerPage;
  const limitedBids = data.slice(
    firstBidIndex,
    lastBidNumber
  );


   const restoreDeleteBid = (id:string) => {
    const payload: idBidPayload = {
        id: id,
      };
    execRestoreDeleteBid(payload)
  };

 const fullDeleteBid = (id:string) => {
    const payload: idBidPayload = {
        id: id,
      };
    execfullDeleteBid(payload)
  };

  const {
    mutate: execRestoreDeleteBid,
    error: RestoreDeleteBidError,
    isError: isRestoreDeleteBidError,
    isSuccess: isRestoreDeleteBidSuccess,
  } = useMutation(
    async (payload:idBidPayload): Promise<Bid | null >   => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restore-delete-bid?id=${payload.id}`, {
             method: 'POST',
             mode: 'cors',
            })

       if(!res.ok)
           toast.error(`An error occurred restoring the bid`); 
       else
          toast.success('Bid restored')
      return null;
    },
    {
      onMutate: async () => {
          const cacheKey = ['BIDS', `deletedbids`];
          const snapshot = queryClient.getQueryData(cacheKey);
          return { cacheKey, snapshot };
      },
      onSettled: (_comment, error, _variables, context) => {
        if (context) {
          const { cacheKey: ck, snapshot } = context;
          if (error && ck) {
            queryClient.setQueryData(ck, snapshot);
          }
          if (context)
           queryClient.invalidateQueries(ck);
           queryClient.invalidateQueries(['BIDS','mybids'])
        }
      },
    },
  );

   const {
    mutate: execfullDeleteBid,
    error: fullDeleteBidError,
    isError: isfullDeleteBidError,
    isSuccess: isfullDeleteBidSuccess,
  } = useMutation(
    async (payload:idBidPayload): Promise<Bid | null >   => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/full-delete-bid?id=${payload.id}`, {
             method: 'POST',
             mode: 'cors',
            })

       if(!res.ok)
           toast.error(`An error occurred deleting the bid`); 
       else
          toast.success('Bid definitly deleted')
      return null;
    },
    {
      onMutate: async () => {
          const cacheKey = ['BIDS', `deletedbids`];
          const snapshot = queryClient.getQueryData(cacheKey);
          return { cacheKey, snapshot };
      },
      onSettled: (_comment, error, _variables, context) => {
        if (context) {
          const { cacheKey: ck, snapshot } = context;
          if (error && ck) {
            queryClient.setQueryData(ck, snapshot);
          }
          if (context)
           queryClient.invalidateQueries(ck);
        }
      },
    },
  );

  return <>
    <Table hover >
      <thead>
        <tr>
          {columns.map(x => (x == 'Title') ? <th key='Title'><h6>{x.toUpperCase()}</h6></th> : <th key={x} className='text-center'><h6>{x.toUpperCase()}</h6></th>)}
        </tr>
      </thead>
      <tbody className='table-body'>
          {data!.length ? data!.map(bid =>  <tr key={bid.id}>
             <td  className='text-center'>{bid.agency}</td>  
              <td  className='text-center'>
              {bid.isActive ?  <Button size="sm" className='rounded rounded-5' variant="primary" href={bid.link} target="_blank">Open</Button> :
              <Button size="sm" className='rounded rounded-5' variant="warning">Paused</Button>
              }
             </td> 
             <td  className=''>{bid.title}</td>  
             <td  className='text-center'>
             <div className=' d-flex flex-row align-items-center'>
                  <DropdownButton className=''
                      autoClose={true}
                      as={ButtonGroup}
                      key='options'
                      id={`dropdown-options`}
                      variant='outline-primary rounded rounded-5' 
                      title={<AiOutlineMenu/>}
                    >
                      <Dropdown.Item eventKey="2" onClick={()=> restoreDeleteBid(bid.id)}  className='text-center' style={{fontSize:'.9em'}}>Restore</Dropdown.Item>
                      <Dropdown.Item eventKey="2"  onClick={()=> fullDeleteBid(bid.id)} className='text-center' style={{fontSize:'.9em'}}>Delete</Dropdown.Item>
                  </DropdownButton>     

               </div>     
                </td>
                </tr>  
              ) : <tr><td className='text-center' colSpan={12}>No data</td></tr> 
              } 
      </tbody>
    </Table>
    <section className='mt-4 mb-5 d-flex justify-content-end' >    
          <div className='d-flex align-items-center'>
          <Pagination  
          itemsCount={allBidsCount}
          itemsPerPage={bidsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          alwaysShown={false}
        />
          <span className='d-flex align-items-center ms-4' style={{fontSize:'.9em'}}><b>Total: {allBidsCount} bids</b></span>      

        </div>
        <BidSelect
            itemsPerPage={bidsPerPage}
            setBidsPerPage={setBidsPerPage}
          />
      </section>
  </>

}

export default DeletedBidsTable;