import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "../lib/api/authProvider";
// import { initialiseStore } from "../redux/store";
import { wrapper } from "../redux/store";
// import store from "../redux/store";
import "../styles/globals.scss";
import { Layout } from "../ui/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CoûtCoût</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        {/* <Provider store={store}> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* </Provider> */}
      </AuthProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
