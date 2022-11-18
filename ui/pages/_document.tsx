/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from 'next/document';


class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon-DPA-17.png"/>
          <link rel="apple-touch-icon-precomposed"href="/favicon-DPA-17.png"/>
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta name="theme-color" content="#ffffff" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
