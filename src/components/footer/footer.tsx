import apple from "/apple-1.png"
import playstore from "/playstore-1.png"
import BrickSvg from "../../assets/img/brick.svg";
import { Youtube, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Youtube, href: "https://www.youtube.com/@iitmshaastra", label: "YouTube" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/shaastra-iit-madras/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/shaastra_iitm/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/Shaastra/", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/ShaastraIITM", label: "Twitter" },
  ];

  return (
    <footer
  className="relative w-full overflow-hidden text-[#ffe5b4]"
  style={{
    backgroundImage: `url(${BrickSvg})`,
    backgroundRepeat: "repeat",
    backgroundSize: "auto 80px",
    backgroundPosition: "bottom",
    backgroundColor: "#3a0707", // warm maroon base matching #490a0a
  }}
>
  <div className="relative z-10 container mx-auto px-6 py-8 lg:py-10">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-8">

      {/* Column 1 */}
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-lg lg:text-xl font-semibold text-[#ffb347] mb-4">
            Address
          </h3>
          <p className="text-sm lg:text-base leading-relaxed text-gray-100">
            IITM Students Activities Trust Shaastra,
            <br />
            1st Floor, O/o Dean Of Students Office,
            <br />
            IIT Madras, Guindy, Chennai,
            <br />
            Tamil Nadu, India - 600036
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg lg:text-xl font-semibold text-[#ffb347] mb-4">
            Connect with us
          </h3>
          <div className="flex space-x-4 gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-gray-400 transition-colors duration-200"
              >
                <social.icon size={24} className="lg:w-7 lg:h-7" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col justify-start">
        <div>
          <h3 className="text-lg lg:text-xl font-semibold text-[#ffb347] mb-4">
            Contact Us
          </h3>
          <p className="text-sm lg:text-base mb-4">
            <a
              href="mailto:outreach@shaastra.org"
              className="text-gray-100 hover:text-gray-200 hover:underline transition-colors duration-200"
            >
              outreach@shaastra.org
            </a>
          </p>
          <p className="text-sm lg:text-base text-gray-100">
            Got a problem?
            <br />
            <a
              href="mailto:outreach@shaastra.org?subject=Complaint"
              className="underline text-gray-100 hover:text-gray-50 transition-colors duration-200"
            >
              Lodge your complaint here
            </a>
          </p>
        </div>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col justify-between items-center md:items-end">
        <div className="bg-opacity-40 p-4 lg:p-6 rounded-lg">
          <div className="flex space-x-4 justify-center mb-3 ">
            <div className="flex flex-col items-center transition-all duration-300 transform hover:scale-105 hover:cursor-pointer ">
              <img
                src={apple}
                alt="iOS QR Code"
                className="w-24 h-24 lg:w-28 lg:h-28 bg-white p-1 rounded-sm mb-1"
              />
              <span className="text-xs lg:text-sm text-gray-100">iOS</span>
            </div>
            <div className="flex flex-col items-center transition-all duration-300 transform hover:scale-105 hover:cursor-pointer">
              <img
                src={playstore}
                alt="Android QR Code"
                className="w-24 h-24 lg:w-28 lg:h-28 bg-white p-1 rounded-sm mb-1"
              />
              <span className="text-xs lg:text-sm text-gray-100">Android</span>
            </div>
          </div>
          <p className="text-xs lg:text-sm text-gray-100 text-center">
            Download Shaastra App now
          </p>
        </div>

        <div className="text-center md:text-right mt-8 md:mt-0 text-xs lg:text-sm text-gray-200">
          <p className="mb-1">© Shaastra 2025. All Rights Reserved.</p>
          <p>
            Made with <span className="text-white">❤</span> by Shaastra Webops
          </p>
        </div>
      </div>

    </div>
  </div>
</footer>

  );
};

export default Footer;
