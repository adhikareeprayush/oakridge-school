import type { FormEvent } from "react";
import { useState } from "react";

/**
 * Newsletter capture — replace submit handler with POST /newsletter/subscribe.
 */
const WatchCourses = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
    setEmail("");
  };

  return (
    <section className="flex flex-col items-center justify-center gap-[80px]">
      <div className="flex flex-col gap-[10px]">
        <h6 className="text-center text-primary">Newsletter</h6>
        <h3 className="text-center text-text">Watch our Courses</h3>
        <p className="max-w-[480px] text-center text-secondText">
          Problems trying to resolve the conflict between the two major realms of Classical physics:
          Newtonian mechanics
        </p>
      </div>
      <form className="flex h-[50px] max-w-full items-center" onSubmit={onSubmit}>
        <input
          className="h-full w-full rounded-l-[5px] border-[1px] border-r-0 border-[#E6E6E6] bg-[#F9F9F9] px-[15px] py-[15px] font-mont text-[14px] font-normal leading-5 tracking-wide text-secondText placeholder:text-secondText outline-none focus:outline-none md:w-[300px] lg:w-[500px]"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
          aria-label="Email for newsletter"
        />
        <button
          type="submit"
          className="btn h-full rounded-r-[5px] border-[1px] border-[#E6E6E6] bg-primary px-[22.5px] py-[15px] text-white"
        >
          Subscribe
        </button>
      </form>
      {sent && (
        <p className="text-center text-sm font-semibold text-success" role="status">
          Thanks — you&apos;re on the list (mock).
        </p>
      )}
    </section>
  );
};

export default WatchCourses;
