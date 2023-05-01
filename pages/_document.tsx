import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <title>Heroes | Global Things</title>
      <meta name='description' content='Appplication for rendering Heroes using API' />

      {/* Icons */}
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />

      {/* Favicons */}
      <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png"/>
            <link rel="manifest" href="assets/favicon/site.webmanifest"/>
              <link rel="mask-icon" href="assets/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#da532c"/>
                  <meta name="theme-color" content="#101010"></meta>
                  <Head />
                  <body>
                    <Main />
                    <NextScript />
                  </body>
                </Html>
                )
}
