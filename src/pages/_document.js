import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
            rel='stylesheet'
          />

          <link rel='manifest' href='/manifest.json' />
          <link
            rel='mask-icon'
            href='/static/icons/safari-pinned-tab.svg'
            color='#5bbad5'
          />

          <script
            data-ad-client='ca-pub-9945040118733921'
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
          ></script>
        </Head>
        <body
          style={{
            background:
              'linear-gradient(135deg, #f7f7f7 21px, #dfdfdfac 22px, #dfdfdfac 24px, transparent 24px, transparent 67px, #dfdfdfac 67px, #dfdfdfac 69px, transparent 69px),linear-gradient(225deg, #f7f7f7 21px, #dfdfdfac 22px, #dfdfdfac 24px, transparent 24px, transparent 67px, #dfdfdfac 67px, #dfdfdfac 69px, transparent 69px)0 64px',
            backgroundColor: '#f7f7f7',
            backgroundSize: '64px 128px',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
