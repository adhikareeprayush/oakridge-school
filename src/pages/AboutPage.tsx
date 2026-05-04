import About from "../components/About";
import { SITE_NAME } from "../constants/site";

const AboutPage = () => {
  return (
    <div className="bg-white">
      <header className="page-container border-b border-lightGray2 pb-10 pt-12 md:pt-16">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Company</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-text md:text-4xl">
          About {SITE_NAME}
        </h1>
        <p className="mt-4 max-w-2xl text-secondText">
          Mission, traction, and how we partner with instructors — static today, CMS-ready tomorrow.
        </p>
      </header>
      <About />
    </div>
  );
};

export default AboutPage;
