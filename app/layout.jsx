import '@/assets/styles/global.css';

export const metadata = {
  title: "Ribeye Don's | Luxury Cuts",
  description: 'Explore your new favorite cut',
  keywords: 'butcher shop, steaks, poultry, pork',
};

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
