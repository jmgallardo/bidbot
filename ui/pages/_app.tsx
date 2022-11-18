import { AppProps } from 'next/app';
import { StrictMode, FunctionComponent, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';

import './scss/custom.scss';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const AnyComponent = Component as any;
  
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            notifyOnChangeProps: 'tracked',
          },
        },
      }),
  );
  return (
    <StrictMode>
           <QueryClientProvider client={queryClient}>
                <AnyComponent {...pageProps} />
                <Toaster position="top-center" reverseOrder={false}/>
                <ReactQueryDevtools />
           </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
