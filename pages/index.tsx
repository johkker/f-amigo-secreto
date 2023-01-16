import { Footer, Header, Main, Topbar } from '../sections';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />
      <Header />
      <Topbar />
      <Main />
      <Footer />
    </>
  );
}
