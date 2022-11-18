import { FunctionComponent,useState,useEffect, ChangeEvent} from 'react';
import BidsTable from '@/src/components/BidsTable';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { GoSearch } from 'react-icons/go'
import {Bid} from '@/src/types/bid'
import useBids from '@/src/hooks/useBids'

const FavouritePage: FunctionComponent = () => {
  
  const [filter, setFilter] = useState ('');
  const {data:{total,fetched,bids:b}={total:0,fetched:0,bids:[]}} = useBids();
  const [bids, setBids] = useState<Bid[]>([]); 

  useEffect(()=>{
    if(b){
      if(filter.length)
          filterData(filter)
      else    
        setBids(b.filter(x => x.isFavourite));
    }
  },[b])

const handleFilterChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setFilter(ev.target.value);
    filterData(ev.target.value)

  };

  const filterData = (value:string) => {
    const lowercasedValue = value.toLowerCase().trim();
    const excludeColumns:string[]=['id','link']
    if (lowercasedValue === "") setBids(b.filter(x => x.isFavourite));
    else {
      const filteredData:Bid[] = (b.filter(x => x.isFavourite)).filter(bid => {
        return Object.keys(bid).some(key =>
        excludeColumns.includes(key) ? false : (bid as any)[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setBids(filteredData);
    }
  }

  return <Container className=''> 
   <section className='d-flex flex-row justify-content-start mt-2'>          
      <InputGroup className='w-50'>
        <Form.Control className="rounded rounded-5 me-1"
         //size='sm'
          placeholder=" Filter..."
          aria-label="FilterSearch"
          value={filter}
          onChange = {handleFilterChange}
        />
        {/*<Button variant="primary rounded rounded-5"><GoSearch/></Button>*/}
      </InputGroup>
    </section>
    <section className='mt-3'>
      <BidsTable key='favouritePageTable' columns={['Agency','Link','Title','']} data={bids}/>
    </section>
</Container> 

}

export default FavouritePage;