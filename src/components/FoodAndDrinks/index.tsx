import menu from "./data";

type ItemsListProps = {
  name: string;
  items: string[];
};
const ItemsList = ({ name, items }: ItemsListProps): JSX.Element => {
  return (
    <div className="space-y-2">
      <dt className="font-condensed uppercase tracking-widest">{name}</dt>
      <dd className="font-serif text-4xl">{items.join(" / ")}</dd>
    </div>
  );
};

const FoodAndDrinks = (): JSX.Element => {
  return (
    <dl className="space-y-16 border-t border-joanGreen-600 px-8 py-10 text-joanGreen-600 selection:bg-joanGreen-600 selection:text-white lg:p-20">
      {menu.map((entry, index) => (
        <ItemsList key={index} name={entry.name} items={entry.items} />
      ))}
    </dl>
  );
};

export default FoodAndDrinks;
