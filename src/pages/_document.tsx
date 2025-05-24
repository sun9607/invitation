import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body style={{ margin: 0, fontFamily: "" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
