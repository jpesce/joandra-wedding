type GiftList = GiftListItem[];

interface GiftListItem {
  name: string;
  price: number;
  image: string;
}

type Cart = CartItem[];

interface CartItem {
  name: string;
  quantity: number;
}

type UpdateCart = React.Dispatch<React.ReducerAction<CartReducer>>;
type SetItemListOpen = React.Dispatch<React.SetStateAction<boolean>>;

interface CartReducerAction {
  type: "increaseItemQuantity" | "decreaseItemQuantity" | "removeItem";
  item: string;
}
interface CartReducer extends React.Reducer<Cart, CartReducerAction> {
  (state: Cart, action: CartReducerAction): Cart;
}

type SetPaymentOpen = React.Dispatch<React.SetStateAction<boolean>>;
