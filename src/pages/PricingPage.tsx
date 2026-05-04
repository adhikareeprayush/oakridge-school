import Pricing from "../components/Pricing";

const PricingPage = () => {
  return (
    <div className="bg-white">
      <header className="page-container border-b border-lightGray2 pb-10 pt-12 md:pt-16">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Plans</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold text-text md:text-4xl">
          Simple pricing for every learner
        </h1>
        <p className="mt-4 max-w-2xl text-secondText">
          Compare tiers and jump into signup or sales contact — buttons route through React Router.
        </p>
      </header>
      <Pricing />
    </div>
  );
};

export default PricingPage;
