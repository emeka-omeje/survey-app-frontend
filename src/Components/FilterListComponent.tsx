import React, { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { RiResetLeftFill } from "react-icons/ri";
import style from "./components.module.css";

const FilterListComponent = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Date");

  // Reset filter state
  const resetFilter = () => {
    setSelectedFilter("Date");
  };

  // Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <section className={style.filterListComponent_wrapper}>
      <div className={style.filterListComponent_container}>
        <HiOutlineAdjustmentsHorizontal
          style={{ fontSize: 20, color: `var(--navy-blue)` }}
        />
        <p>Filter By:</p>
        <select
          className={style.filterList_select}
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option value="Date">Date</option>
          <option value="Name">Name</option>
          <option value="Status">Status</option>
          <option value="Priority">Priority</option>
        </select>
      </div>
      <button className={style.filterListComponent_container} onClick={resetFilter}>
        <RiResetLeftFill
          style={{ fontSize: 20, color: `var(--color-error)` }}
        />
        <p className={style.resetFilter_btn}>Reset Filter</p>
      </button>
    </section>
  );
};

export default FilterListComponent;
