import Hero from "../components/Hero";
import Stats from "../components/Stats";
import ClientMatters from "../components/ClientMatters";
import Features from "../components/Features";
import ExpertTeachers from "../components/ExpertTeachers";
import About from "../components/About";
import Testimonial from "../components/Testimonial";
import Pricing from "../components/Pricing";
import PopularCourses from "../components/PopularCourses";
import FAQ from "../components/FAQ";
import WatchCourses from "../components/WatchCourses";

const Home = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <ClientMatters />
      <Features />
      <ExpertTeachers />
      <About />
      <Testimonial />
      <Pricing />
      <PopularCourses />
      <FAQ />
      <WatchCourses />
    </div>
  );
};

export default Home;
