import Head from 'next/head';
import Image from 'next/image';
import { Header, Main, Topbar } from '../components';
import '@fontsource/cherry-swash';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />
      <Header />
      <Topbar />
      <Main />
    </>
  );
}
