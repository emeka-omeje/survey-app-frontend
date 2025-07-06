import style from "./dashboardComponent.module.css";

type ListingItemsProps = {
  title: string;
  tag: string;
};

const ListingItems: React.FC<ListingItemsProps> = ({ title, tag }) => {
  return (
    <section className={style.listing_items_wrapper}>
      <header className={style.listing_items_header}>
        <h3>{title} surveys</h3>
        <p>See All</p>
      </header>
      <hr className={style.listing_items_line} />
      <p>There are no {tag} survey listing on display at the moment.</p>
    </section>
  );
};

export default ListingItems;
