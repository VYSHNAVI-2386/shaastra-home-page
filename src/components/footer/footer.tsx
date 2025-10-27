
import React from 'react';

import footerBg from '/footer.jpg'; 
import dummyqr from '/qr-code.png';
import { 
  Youtube, 
  Linkedin, 
  Instagram, 
  Facebook, 
  Twitter 
} from 'lucide-react';

const Footer = () => {
  
  // Store social links in an array for easy mapping
  const socialLinks = [
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer
      className="bg-cover bg-center text-yellow-400 w-full"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="container mx-auto px-6 py-16 lg:py-24">
        
        {/* Main grid for content */}
        <div className="flex gap-12 lg:gap-16 px-4 lg:px-12">
          
          {/* Column 1: Address */}
          <div className='flex flex-col gap-12'>
          <div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-400 mb-4 lg:mb-6">Address</h3>
            <p className="text-sm lg:text-base leading-relaxed">
              IITM Students Activities Trust Shaastra,
              <br />
              1st Floor, O/o Dean Of Students Office,
              <br />
              IIT Madras, Guindy, Chennai,
              <br />
              Tamil Nadu, India - 600036
            </p>
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-400 mb-4 lg:mb-6">Connect with us</h3>
            
            {/* Social Icons */}
            <div className="flex space-x-4 mb-6 lg:mb-8 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <social.icon size={24} className="lg:w-7 lg:h-7" />
                </a>
              ))}
            </div>
          </div>
          </div>
          
          {/* Column 2: Contact */}
          <div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-400 mb-4 lg:mb-6">Contact Us</h3>
            <p className="text-sm lg:text-base mb-4 lg:mb-6">
              <a 
                href="mailto:outreach@shaastra.org" 
                className="hover:text-white hover:underline transition-colors duration-200"
              >
                outreach@shaastra.org
              </a>
            </p>
            <p className="text-sm lg:text-base">
              Got a problem?
              <br />
              <a 
                href="/complaint" 
                className="text-gray-400 underline hover:text-gray-300 transition-colors duration-200"
              >
                Lodge your complaint here
              </a>
            </p>
          </div>          
          {/* Column 3: QR Code Section */}
            <div className="bg-opacity-40 p-4 lg:p-6 rounded-lg">
              <div className="flex space-x-4 justify-center mb-3">
                <div className="flex flex-col items-center">
                  <img 
                    src={dummyqr} 
                    alt="iOS QR Code" 
                    className="w-20 h-20 lg:w-24 lg:h-24 bg-white p-1 rounded-sm mb-1" 
                  />
                  <span className="text-xs lg:text-sm text-gray-400">iOS</span>
                </div>
                <div className="flex flex-col items-center">
                  <img 
                    src={dummyqr} 
                    alt="Android QR Code" 
                    className="w-20 h-20 lg:w-24 lg:h-24 bg-white p-1 rounded-sm mb-1" 
                  />
                  <span className="text-xs lg:text-sm text-gray-400">Android</span>
                </div>
              </div>
              <p className="text-xs lg:text-sm text-gray-400 text-center">Download Shaastra App now</p>
            </div>

        </div>

        {/* Bottom Bar: Copyright and Credit */}
        <div className="mt-16 lg:mt-24 pt-8 text-right text-sm lg:text-base">
          <p className="mb-2">© Shaastra 2025. All Rights Reserved.</p>
          <p>
            Made with <span className="text-red-500">❤</span> by Shaastra Webops
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;