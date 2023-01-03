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
  lastAction?: string;
};

type CartActionType =
  | "increaseItemQuantity"
  | "decreaseItemQuantity"
  | "removeItem";
type CartReducerAction = {
  type: CartActionType;
  item: string;
  price?: number;
};
type CartReducer = React.Reducer<Cart, CartReducerAction>;
type UpdateCart = React.Dispatch<React.ReducerAction<CartReducer>>;

type SetPaymentOpen = React.Dispatch<React.SetStateAction<boolean>>;

type SetPayWhatYouWantValue = React.Dispatch<React.SetStateAction<number>>;
