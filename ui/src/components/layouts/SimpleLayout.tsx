import { FunctionComponent} from 'react';
import Container from 'react-bootstrap/Container';
import Menu from '@/components/Menu';
import Row from 'react-bootstrap/Row';
import withTitle from '@/src/HOCs/withTitle';

type Props = {
  children: JSX.Element | JSX.Element[];
  title?: string;
};

const SimpleLayout: FunctionComponent<Props> = ({ children,title }) => {
  return (
    <><div className='fluid-container'> 
        <div className='d-flex '>
            <div className={`menu-section`}><Menu/></div>
            <div className={`content-section`}>
              <section className='d-flex flex-row justify-content-between'>
                <Container className='d-flex align-items-end m-3' ><h3>{title}</h3></Container> 
                <img  className={`cursor-pointer dpalogo me-5`} src="/dpalogo-product.png" /> 
              </section>
              <Container> 
               {children}
              </Container>
            </div>
          </div>
      </div>
    </>    
  );
};

export default withTitle(SimpleLayout);
