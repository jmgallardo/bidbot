import { FunctionComponent,useState,useEffect} from 'react';
import {Bid} from '@/src/types/bid'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {AiOutlineMenu , AiOutlineStar,AiFillStar} from 'react-icons/ai'
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

const BidsTable: FunctionComponent<Props> = ({columns,data})  => { 

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

  const setFavourite = (id:string) => {
    const payload: idBidPayload = {
        id: id,
      };
    execSetFavourite(payload)
  };

  const setUnfavourite = (id:string) => {
    const payload: idBidPayload = {
        id: id,
      };
    execSetUnfavourite(payload)
  };

   const setActiveLink = (id:string) => {
    const payload: idBidPayload = {
        id: id,
      };
    execSetActiveLink(payload)
  };

  const setDeactiveLink = (id:string) => {
    const payload: idBidPayload = {
        id: id,
      };
    execSetDeactiveLink(payload)
  };

  const deleteBid = (id:string) => {
      const payload: idBidPayload = {
          id: id,
        };
      execDeleteBid(payload)
    };

  const {
    mutate: execSetFavourite,
    error: SetFavouriteError,
    isError: isSetFavouriteError,
    isSuccess: isSetFavouriteSuccess,
  } = useMutation(
    async (payload:idBidPayload): Promise<Bid | null >   => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/set-favourite?id=${payload.id}`, {
             method: 'POST',
             mode: 'cors',
            })

       if(!res.ok)
           toast.error(`An error occurred putting the bid in favorites`); 
       else
          toast.success('Bid put in favorites')
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

  const {
    mutate: execSetUnfavourite,
    error: SetUnfavouriteError,
    isError: isSetUnfavourite,
    isSuccess: SetUnfavouriteSuccess,
  } = useMutation(
    async (payload:idBidPayload): Promise<Bid | null >   => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/set-unfavourite?id=${payload.id}`, {
             method: 'POST',
             mode: 'cors',
            })

       if(!res.ok)
           toast.error(`An error occurred removing the bid from favorites`); 
       else
          toast.success('Bid removed from favorites')
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

  const {
    mutate: execSetActiveLink,
    error: SetActiveLinkError,
    isError: isSetActiveLinkError,
    isSuccess: isSetActiveLinkSuccess,
  } = useMutation(
    async (payload:idBidPayload): Promise<Bid | null >   => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/set-active-link?id=${payload.id}`, {
             method: 'POST',
             mode: 'cors',
            })

       if(!res.ok)
           toast.error(`An error occurred deactivating bid link`); 
       else
          toast.success('Bid link deactivated')
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

  const {
    mutate: execSetDeactiveLink,
    error: SetDeactiveLinkError,
    isError: isSetDeactiveLinkError,
    isSuccess: isSetDeactiveLinkSuccess,
  } = useMutation(
    async (payload:idBidPayload): Promise<Bid | null >   => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/set-deactivate-link?id=${payload.id}`, {
             method: 'POST',
             mode: 'cors',
            })

       if(!res.ok)
           toast.error(`An error occurred activating bid link`); 
       else
          toast.success('Bid link activated')
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

   const {
    mutate: execDeleteBid,
    error: SetDeleteBidError,
    isError: isDeleteBidError,
    isSuccess: isDeleteBidSuccess,
  } = useMutation(
    async (payload:idBidPayload): Promise<Bid | null >   => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-bid?id=${payload.id}`, {
             method: 'POST',
             mode: 'cors',
            })

       if(!res.ok)
           toast.error(`An error occurred deleting bid`); 
       else
          toast.success('Bid deleted')
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
          if (context){ 
                  queryClient.invalidateQueries(ck);
                  queryClient.invalidateQueries(['BIDS','deletedbids'])
          }
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
          {limitedBids!.length ? limitedBids!.map(bid =>  <tr key={bid.id}>
             <td  className='text-center'>{bid.agency}</td>   
             <td  className='text-center'>
              {bid.isActive ?  <Button size="sm" className='rounded rounded-5' variant="primary" href={bid.link} target="_blank">Open</Button> :
              <Button size="sm" className='rounded rounded-5' variant="warning">Paused</Button>
              }
             </td> 
             <td  className=''>{bid.title}</td>  
             <td  className='text-center'>
             <div className=' d-flex flex-row align-items-center'>
                  {bid.isFavourite ? <AiFillStar className='me-2' style={{fontSize:'1.7em',color:'#ffd41f',cursor:'pointer'}} onClick={()=> setUnfavourite(bid.id)}/> 
                  : <AiOutlineStar className='me-2' style={{fontSize:'1.7em',color:'#969ea1',cursor:'pointer'}} onClick={()=> setFavourite(bid.id)}/> }
                  <DropdownButton className=''
                      autoClose={true}
                      as={ButtonGroup}
                      key='options'
                      id={`dropdown-options`}
                      variant='outline-primary rounded rounded-5' 
                      title={<AiOutlineMenu/>}
                    >
                      {bid.isActive ? <Dropdown.Item eventKey="1" onClick={()=> setActiveLink(bid.id)} className='text-center' style={{fontSize:'.9em'}}>Disable link</Dropdown.Item> :
                      <Dropdown.Item eventKey="1" onClick={()=> setDeactiveLink(bid.id)} className='text-center' style={{fontSize:'.9em'}}>Active link</Dropdown.Item>}
                      <Dropdown.Item eventKey="2" onClick={()=> deleteBid(bid.id)} className='text-center' style={{fontSize:'.9em'}}>Delete bid</Dropdown.Item>
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

export default BidsTable;