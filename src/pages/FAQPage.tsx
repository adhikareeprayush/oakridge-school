import FAQ from "../components/FAQ";

const FAQPage = () => {
  return (
    <div className="bg-white">
      <header className="page-container border-b border-lightGray2 pb-10 pt-12 md:pt-16">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Help center</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold text-text md:text-4xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 max-w-2xl text-secondText">
          Billing, pacing, certificates, and support — accordion below matches the homepage FAQ module.
        </p>
      </header>
      <FAQ />
    </div>
  );
};

export default FAQPage;
