import Head from 'next/head'
import SimpleLayout from '@/components/layouts/SimpleLayout';
import RequestsPage from '@/components/RequestsPage';

export default function Home() { 
    
  return (
    <>
    <Head>
        <meta property="og:title" content='Bidbot'/>
    </Head>
    <SimpleLayout title='My Bids'> 
       <RequestsPage/>
    </SimpleLayout>
    </>
  )
}
