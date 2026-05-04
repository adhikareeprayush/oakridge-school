import { useState } from "react";
import { SITE_SUPPORT_EMAIL } from "../constants/site";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";

const faqData = [
  {
    question: "How do I enroll in a course?",
    answer:
      "Simply browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. You'll be guided through a simple registration process to get started immediately.",
  },
  {
    question: "Are the courses self-paced?",
    answer:
      "Yes, all our courses are designed to be self-paced. You can learn at your own convenience and complete the modules according to your schedule.",
  },
  {
    question: "Do I get a certificate after completing a course?",
    answer:
      "Absolutely! Upon successful completion of any course, you'll receive a digital certificate that you can share on your LinkedIn profile or include in your resume.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, PayPal, and bank transfers. We also offer flexible payment plans for our premium courses.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with your course, you can request a full refund within 30 days of purchase.",
  },
  {
    question: "How can I contact support?",
    answer:
      `You can reach our support team via email at ${SITE_SUPPORT_EMAIL}, through our live chat feature, or by calling our helpline. We're available 24/7 to assist you.`,
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="flex flex-col gap-[80px]">
      <div className="flex flex-col gap-[10px] items-center text-center">
        <h6 className="text-primary">FAQ</h6>
        <h2 className="text-text">Frequently Asked Questions</h2>
        <p className="text-secondText max-w-[480px]">
          Find answers to common questions about our platform, courses, and
          services.
        </p>
      </div>
      <div className="flex flex-col gap-[15px] max-w-[800px] mx-auto w-full">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-lightGray2 rounded-[10px] overflow-hidden bg-white"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between w-full p-[25px] text-left"
            >
              <h5 className="text-text">{faq.question}</h5>
              {openIndex === index ? (
                <HiMiniChevronUp className="text-primary text-[24px] flex-shrink-0" />
              ) : (
                <HiMiniChevronDown className="text-primary text-[24px] flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-[25px] pb-[25px]">
                <p className="text-secondText">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
