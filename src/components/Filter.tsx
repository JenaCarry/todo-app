interface FilterProps {
  setFilter: (filter: string) => void;
  filter: string;
}

export function Filter({ setFilter, filter }: FilterProps): JSX.Element {
  return (
    <ul className="bg-main-bg text-details font-bold flex items-center justify-center gap-5 py-3 rounded-md">
      <li className={`${filter === "All" ? "text-bright-blue" : ""}`}>
        <button onClick={() => setFilter("All")} className="hover:text-text">
          All
        </button>
      </li>
      <li className={`${filter === "Active" ? "text-bright-blue" : ""}`}>
        <button onClick={() => setFilter("Active")} className="hover:text-text">
          Active
        </button>
      </li>
      <li className={`${filter === "Completed" ? "text-bright-blue" : ""}`}>
        <button
          onClick={() => setFilter("Completed")}
          className="hover:text-text"
        >
          Completed
        </button>
      </li>
    </ul>
  );
}
