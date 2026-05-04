import { FaFacebook, FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
const Bottom = () => {
  return (
    <footer className="flex items-center justify-between bg-[#FAFAFA] px-[16px] py-[16px] md:px-[60px] lg:px-[100px]">
      <h6 className="text-secondText">
        Made With Love By Figmaland All Right Reserved{" "}
      </h6>
      <div className="flex items-center gap-[10px]">
        <FaFacebook className="text-[18px] text-primary" />
        <IoLogoInstagram className="text-[18px] text-primary" />
        <FaTwitter className="text-[18px] text-primary" />
      </div>
    </footer>
  );
};

export default Bottom;
