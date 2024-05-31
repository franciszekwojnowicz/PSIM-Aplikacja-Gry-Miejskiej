import Navbar from "../components/Navbar";
import ListAchivements from "../components/ListAchievements";

function Achievements() {
  return (
    // TODO: Filters?
    <>
      <Navbar />
      <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-3xl mx-auto mt-16">
        <ListAchivements />
      </ul>
    </>
  );
}

export default Achievements;
