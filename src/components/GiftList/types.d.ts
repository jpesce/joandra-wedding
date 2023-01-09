type GiftList = GiftListItem[];

type GiftListItem = {
  name: string;
  price: number;
  image: string;
};

type Cart = {
  lastAction?: CartReducerAction;
  items: CartItem[];
};

type CartItem = {
  name: string;
  quantity: number;
  price?: number;
};

type CartReducerAction =
  | { type: "setCart"; cart: Cart }
  | { type: "increaseItemQuantity"; item: string; price?: number }
  | { type: "decreaseItemQuantity"; item: string }
  | { type: "removeItem"; item: string };
type CartReducer = React.Reducer<Cart, CartReducerAction>;
type UpdateCart = React.Dispatch<React.ReducerAction<CartReducer>>;

type SetPaymentOpen = React.Dispatch<React.SetStateAction<boolean>>;

type SetPayWhatYouWantValue = React.Dispatch<React.SetStateAction<number>>;
