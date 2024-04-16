import '@/assets/styles/global.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: "Ribeye Don's | Luxury Cuts",
  description: 'Explore your new favorite cut',
  keywords: 'butcher shop, steaks, poultry, pork',
};

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
