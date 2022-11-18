import Head from 'next/head'
import SimpleLayout from '@/components/layouts/SimpleLayout';
import DeletedPage from '@/components/DeletedPage';

export default function Sent() {
  
  return (
    <>
    <Head>
        <meta property="og:title" content='Bidbot'/>
    </Head>
    <SimpleLayout title='Deleted Bids'> 
       <DeletedPage/>
    </SimpleLayout>
    </>
  )
}
