import { Footer, Header, Main, Topbar } from '../components';
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
