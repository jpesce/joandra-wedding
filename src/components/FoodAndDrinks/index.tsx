const MENU = [
  {
    name: "Comidas",
    items: [
      "Pães",
      "Frutas",
      "Queijos",
      "Embutidos",
      "Muitos outros antepastos",
      "Arroz de tomate com burrata e rúcula",
      "Arroz de polvo",
      "Arroz mineiro com linguiça e couve",
    ],
  },
  {
    name: "Bebidas",
    items: [
      "Negroni",
      "Gin & Tônica",
      "Campari & Tônica",
      "Boulevardier",
      "Whisky",
      "Cerveja",
      "Suco",
      "Água",
    ],
  },
];

interface ItemsListProps {
  name: string;
  items: string[];
}

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
    <dl className="space-y-16 border-t border-joanGreen-500 p-20 text-joanGreen-500 selection:bg-joanGreen-500 selection:text-white">
      {MENU.map((entry, index) => (
        <ItemsList key={index} name={entry.name} items={entry.items} />
      ))}
    </dl>
  );
};

export default FoodAndDrinks;
