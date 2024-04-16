import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapPin,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-sky-950 text-white py-8 reverse-shadow'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4'>
        {/* Company Information */}
        <div className='mb-4 md:mb-0'>
          <h3 className='text-lg font-semibold mb-2'>EliteCuts</h3>
          <p className='text-sm flex items-center'>
            <FaMapPin className='mr-1' />
            <a
              href='https://www.google.com/maps/search/?api=1&query=123+Carnivore+Street+Grillville+CA+90210'
              target='_blank'
              rel='noopener noreferrer'
            >
              123 Carnivore Street
            </a>
          </p>
          <p className='text-sm ml-5'>Grillville, CA 90210</p>
          <p className='text-sm flex items-center'>
            <FaPhone className='mr-1' />{' '}
            <a href='tel:+15551234567'>(555) 123-4567</a>
          </p>
          <p className='text-sm flex items-center'>
            <FaEnvelope className='mr-1' />{' '}
            <a href='mailto:info@meatcuttingwebapp.com'>
              info@meatcuttingwebapp.com
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-lg font-semibold mb-2'>Quick Links</h3>
          <ul>
            <li className='text-sm mb-1'>
              <a href='#' className='hover:text-gray-400'>
                About Us
              </a>
            </li>
            <li className='text-sm mb-1'>
              <a href='#' className='hover:text-gray-400'>
                Services
              </a>
            </li>
            <li className='text-sm mb-1'>
              <a href='#' className='hover:text-gray-400'>
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div>
          <h3 className='text-lg font-semibold mb-2'>Follow Us</h3>
          <div className='flex space-x-4'>
            <a href='#' className='text-2xl hover:text-gray-400'>
              <FaFacebook />
            </a>
            <a href='#' className='text-2xl hover:text-gray-400'>
              <FaTwitter />
            </a>
            <a href='#' className='text-2xl hover:text-gray-400'>
              <FaInstagram />
            </a>
            <a href='#' className='text-2xl hover:text-gray-400'>
              <FaPinterest />
            </a>
            <a href='#' className='text-2xl hover:text-gray-400'>
              <FaLinkedin />
            </a>
            <a href='#' className='text-2xl hover:text-gray-400'>
              <FaYoutube />
            </a>
            {/* Add more social media icons here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
