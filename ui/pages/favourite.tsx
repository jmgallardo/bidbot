import Head from 'next/head'
import SimpleLayout from '@/components/layouts/SimpleLayout';
import FavouritePage from '@/components/FavouritePage';

export default function Sent() {
  
  return (
    <>
    <Head>
        <meta property="og:title" content='Bidbot'/>
    </Head>
    <SimpleLayout title='Favourite Bids'> 
       <FavouritePage/>
    </SimpleLayout>
    </>
  )
}
