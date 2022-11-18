import { FunctionComponent} from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { HiOutlineTrash} from 'react-icons/hi';
import { GrSend,GrAnalytics} from 'react-icons/gr';
import { BiEditAlt} from 'react-icons/bi';
import { AiOutlineStar} from 'react-icons/ai';
import { FiSettings} from 'react-icons/fi';
import { GoHome } from 'react-icons/go'
import styles from './Menu.module.css';

const Menu: FunctionComponent = () => {
  const router = useRouter();

  return <>
   <Container>          
          <div className='d-flex flex-column align-items-center justify-content-center'>
          <Link href="/" replace>  
            <img  className={`${styles.bidbotImage}`} src="/bid-bot.png" /> 
          </Link>
          </div>
          <h2 className="name-app">BidBot</h2>
          <div className=''>
              <h6 className="mt-4 ms-3">MENU</h6>
              <Button variant="info" onClick={() => router.replace('/')}><GrSend className='me-2'/> Sent Requests</Button>
              {/*<Button variant="info"><GrSend className='me-2'/> Sent Requests</Button>
              <Button variant="info"><BiEditAlt className='me-2'/> Drafts</Button>*/}
              <Button variant="info" onClick={() => router.push('/favourite')}><AiOutlineStar className='me-2'/> Favourite</Button>
              <Button variant="info" onClick={() => router.push('/deleted')}><HiOutlineTrash className='me-2'/> Deleted</Button>
              {/*<Button variant="info"><GrAnalytics className='me-2'/> Analytics</Button>*/}
              <Button variant="info" onClick={() => router.push('/settings')}><FiSettings className='me-2'/> Settings</Button>
          </div>
    </Container> 
</>
}
export default Menu;