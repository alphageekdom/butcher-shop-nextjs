import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import '@/assets/styles/global.css';

import { GlobalProvider } from '@/context/GlobalContext';
import AuthProvider from '@/components/AuthProvider';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Ribeye Don's | Luxury Cuts",
  description: 'Explore your new favorite cut',
  keywords: 'butcher shop, steaks, poultry, pork',
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang='en'>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
