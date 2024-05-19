import Navbar from "../components/Navbar";
import Check from "../components/icons/Check";
import XMark from "../components/icons/XMark";
import Italian from "../components/icons/Italian";
import Crown from "../components/icons/Crown";
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
