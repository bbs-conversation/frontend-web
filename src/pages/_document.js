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
          <link rel='shortcut icon' type='image/png' href='/icon-512x512.png' />
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
          <meta
            name='title'
            content='Conversations by Bluebells | An app to communicate privately'
          />
          <meta
            name='description'
            content='Conversations is an app developed for the students by the students, this solves the challenge of communicating privately with their school counsellors'
          />
          <meta
            name='keywords'
            content='Bluebells School International, conversations, private Chat, School students, counseling app'
          />
          <meta name='robots' content='index, follow' />
          <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
          <meta name='language' content='English' />
          <meta name='revisit-after' content='1 days' />
          <meta name='author' content='Yashraj Pahwa' />
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
