import Head from 'next/head'
import SimpleLayout from '@/components/layouts/SimpleLayout';
import SettingsPage from '@/components/SettingsPage';

export default function Sent() {
  
  return (
    <>
    <Head>
        <meta property="og:title" content='Bidbot'/>
    </Head>
    <SimpleLayout title='Settings'> 
       <SettingsPage/>
    </SimpleLayout>
    </>
  )
}
