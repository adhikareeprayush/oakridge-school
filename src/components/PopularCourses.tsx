import CardMentors from "./Reuseable/CardMentors";
import { featuredInstructors } from "../data/instructors";

/**
 * Homepage faculty strip — data lives in `src/data/instructors.ts` for reuse/API parity.
 */
const PopularCourses = () => {
  return (
    <section className="flex flex-col gap-[112px]">
      <div className="flex flex-col gap-[10px]">
        <h6 className="text-primary">Team</h6>
        <h3 className="text-text">Our Popular Courses</h3>
        <p className="max-w-[480px] text-secondText">
          Problems trying to resolve the conflict between the two major realms of Classical physics:
          Newtonian mechanics
        </p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-between gap-[30px]">
        {featuredInstructors.map((card, index) => (
          <div className="col-span-1" key={index}>
            <CardMentors {...card} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCourses;
