import { FunctionComponent, ChangeEvent, ChangeEventHandler} from 'react';
import Form from "react-bootstrap/Form";

const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
  { value: 50, label: "50" }
];

interface Props {
  itemsPerPage: number,
  setBidsPerPage: (number:number) => void
}

const BidSelect: FunctionComponent<Props> = ({itemsPerPage, setBidsPerPage})  => { 

  const onItemsPerPageChange = (ev:ChangeEvent<HTMLSelectElement>) => {
    setBidsPerPage(Number(ev.target.value));
  };

  return (
      <section className='ms-4 d-flex align-items-center '>
      <div className='d-flex aling-items-center' style={{fontSize:'.9em'}}>Limit</div>
      <Form.Group className="ms-2">
        <Form.Select
          className="select" 
          as="select"
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      </section>
  );
};

export default BidSelect;
