import { Diary } from "../types";

interface AllDiaryEntriesProps {
  diaries: Diary[];
}

const AllDiaryEntries = (props: AllDiaryEntriesProps) => {
  const { diaries } = props;
  if (diaries.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="font-bold text-2xl mb-5">Diary Entries</h2>
      <ul className="space-y-4">
        {diaries.map((diary) => {
          return (
            <li key={diary.id}>
              <h3 className="font-bold text-xl mb-3">{diary.date}</h3>
              <p>visibility: {diary.visibility}</p>
              <p>weather: {diary.weather}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllDiaryEntries;
