import { AchievementAPI } from "../types";
import { getAchivements } from "../api";
import { useEffect, useState } from "react";
import Achievement from "./Achievement";

function ListAchivements() {
  const [achievements, setAchievements] = useState<AchievementAPI | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await getAchivements().then((result) => {
          setLoading(false);
          setAchievements(result);
        });
      } catch (error) {
        // Handle error
        console.error("Error fetching items", error);
      }
    };

    fetchDataAsync();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!achievements) {
    return <div className=" text-center text-3xl">Brak achivementów;/</div>;
  }

  return (
    <>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-3xl mx-auto mt-16">
        {achievements ? (
          achievements.unlocked.map((achievement) => (
            <Achievement
              id={achievement.id}
              name={achievement.name}
              requirements={achievement.requirements}
              points={achievement.points}
              isGain={true}
            />
          ))
        ) : (
          <p>Error</p>
        )}
        {achievements ? (
          achievements.locked.map((achievement) => (
            <Achievement
              id={achievement.id}
              name={achievement.name}
              requirements={achievement.requirements}
              points={achievement.points}
              isGain={false}
            />
          ))
        ) : (
          <p>Error</p>
        )}
      </ul>
    </>
  );
}

export default ListAchivements;
