import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";

const pricingPlans = [
  {
    name: "Basic",
    price: 0,
    period: "month",
    description: "Perfect for getting started with learning",
    features: [
      "Access to 10 free courses",
      "Basic learning materials",
      "Community forum access",
      "Email support",
      "Course completion certificates",
    ],
    buttonText: "Get Started Free",
    popular: false,
  },
  {
    name: "Professional",
    price: 29,
    period: "month",
    description: "Best for serious learners and professionals",
    features: [
      "Access to 100+ courses",
      "Premium learning materials",
      "Priority support",
      "Downloadable resources",
      "Course completion certificates",
      "Live Q&A sessions",
      "Career guidance",
    ],
    buttonText: "Start Learning",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    period: "month",
    description: "For teams and organizations",
    features: [
      "Unlimited course access",
      "Custom learning paths",
      "Dedicated account manager",
      "Team analytics dashboard",
      "API access",
      "Custom certificates",
      "Bulk enrollment",
      "White-label options",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="flex flex-col gap-[80px] bg-fadedSecondary2">
      <div className="flex flex-col gap-[10px] items-center text-center">
        <h6 className="text-primary">Pricing</h6>
        <h2 className="text-text">Choose Your Plan</h2>
        <p className="text-secondText max-w-[480px]">
          Select the perfect plan for your learning journey. Upgrade or
          downgrade at any time.
        </p>
      </div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] items-start">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`flex flex-col p-[40px] rounded-[10px] ${
              plan.popular
                ? "bg-primary text-white"
                : "bg-white accentuedDropShadow"
            }`}
          >
            {plan.popular && (
              <div className="bg-secondary text-white text-center py-[5px] px-[15px] rounded-[20px] w-fit mx-auto mb-[20px]">
                <h6>Most Popular</h6>
              </div>
            )}
            <h4
              className={
                plan.popular
                  ? "text-white text-center"
                  : "text-text text-center"
              }
            >
              {plan.name}
            </h4>
            <div className="flex items-end justify-center gap-[5px] mt-[20px]">
              <h1 className={plan.popular ? "text-white" : "text-text"}>
                ${plan.price}
              </h1>
              <span
                className={`mb-[15px] ${
                  plan.popular ? "text-white/80" : "text-secondText"
                }`}
              >
                /{plan.period}
              </span>
            </div>
            <p
              className={`text-center mt-[10px] ${
                plan.popular ? "text-white/80" : "text-secondText"
              }`}
            >
              {plan.description}
            </p>
            <hr
              className={`my-[30px] ${
                plan.popular ? "border-white/30" : "border-lightGray2"
              }`}
            />
            <div className="flex flex-col gap-[15px]">
              {plan.features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="flex items-center gap-[10px]"
                >
                  <FaCheck
                    className={`text-[16px] flex-shrink-0 ${
                      plan.popular ? "text-white" : "text-primary"
                    }`}
                  />
                  <span
                    className={plan.popular ? "text-white" : "text-secondText"}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to={plan.name === "Enterprise" ? "/contact" : "/signup"}
              className={`mt-[30px] block w-full rounded-[5px] px-[40px] py-[15px] text-center font-bold ${
                plan.popular ? "bg-white text-primary" : "bg-primary text-white"
              }`}
            >
              {plan.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
