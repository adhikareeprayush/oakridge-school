import { IoLocationOutline } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { LogoLockup } from "./Logo";

const Footer = () => {
  return (
    <footer className="page-container grid w-full gap-[24px] border-t border-lightGray2 py-14 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
      <div className="col-span-1 flex flex-col gap-[20px]">
        <LogoLockup size="sm" wordmarkClassName="text-base text-text" className="w-fit" />
        <h5 className="text-text">Company Info</h5>
        <div className="flex flex-col gap-[10px]">
          <Link to="/about" className="text-secondText">
            About Us
          </Link>
          <Link to="/" className="text-secondText">
            Careers
          </Link>
          <Link to="/" className="text-secondText">
            We are hiring
          </Link>
          <Link to="/" className="text-secondText">
            Blog
          </Link>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-[20px]">
        <h5 className="text-text">Legal</h5>
        <div className="flex flex-col gap-[10px]">
          <Link to="/pricing" className="text-secondText">
            Terms
          </Link>
          <Link to="/" className="text-secondText">
            Privacy
          </Link>
          <Link to="/" className="text-secondText">
            Security
          </Link>
          <Link to="/" className="text-secondText">
            Sitemap
          </Link>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-[20px]">
        <h5 className="text-text">Features</h5>
        <div className="flex flex-col gap-[10px]">
          <Link to="/courses" className="text-secondText">
            Business Marketing
          </Link>
          <Link to="/courses" className="text-secondText">
            User Analytics
          </Link>
          <Link to="/" className="text-secondText">
            Live Chat
          </Link>
          <Link to="/" className="text-secondText">
            Unlimited Support
          </Link>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-[20px]">
        <h5 className="text-text">Resources</h5>
        <div className="flex flex-col gap-[10px]">
          <Link to="/" className="text-secondText">
            IOS & Android
          </Link>
          <Link to="/" className="text-secondText">
            Watch a Demo
          </Link>
          <Link to="/" className="text-secondText">
            Customers
          </Link>
          <Link to="/" className="text-secondText">
            API
          </Link>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-[20px]">
        <h5 className="text-text">Get In Touch</h5>
        <div className="flex flex-col gap-[10px]">
          <span className="flex items-center gap-2">
            <FiPhone className="text-primary text-[24px]" />
            <h6 className="text-secondText">(480) 555-0103</h6>
          </span>
          <span className="flex items-center gap-2">
            <IoLocationOutline className="text-primary text-[32px]" />
            <h6 className="text-secondText">
              4517 Washington Ave. Manchester, Kentucky 39495
            </h6>
          </span>
          <span className="flex items-center gap-2">
            <IoIosMail className="text-primary text-[24px]" />
            <h6 className="text-secondText">debra.holt@example.com</h6>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
