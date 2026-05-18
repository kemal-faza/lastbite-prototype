import { createContext, useContext, useReducer, type ReactNode } from 'react';

export interface OrderItem {
  id: number;
  name: string;
  store: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  name: string;
  phone: string;
  timestamp: number;
  status: 'pending-pickup' | 'picked-up';
  pickupCode: string;
}

type OrderAction =
  | { type: 'ADD_ORDER'; payload: Omit<Order, 'id' | 'pickupCode' | 'timestamp' | 'status'> }
  | { type: 'SET_STATUS'; payload: { id: string; status: Order['status'] } };

interface OrderState {
  orders: Order[];
}

function generatePickupCode(): string {
  return 'LAST-' + (1000 + Math.floor(Math.random() * 9000));
}

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'ADD_ORDER': {
      const newOrder: Order = {
        ...action.payload,
        id: 'ord-' + Date.now(),
        pickupCode: generatePickupCode(),
        timestamp: Date.now(),
        status: 'pending-pickup',
      };
      return { orders: [newOrder, ...state.orders] };
    }
    case 'SET_STATUS':
      return {
        orders: state.orders.map((o) =>
          o.id === action.payload.id ? { ...o, status: action.payload.status } : o
        ),
      };
    default:
      return state;
  }
}

const OrderContext = createContext<{
  orders: Order[];
  pendingOrders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'pickupCode' | 'timestamp' | 'status'>) => void;
  markPickedUp: (id: string) => void;
  pendingCount: number;
} | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, { orders: [] });

  const addOrder = (order: Omit<Order, 'id' | 'pickupCode' | 'timestamp' | 'status'>) =>
    dispatch({ type: 'ADD_ORDER', payload: order });

  const markPickedUp = (id: string) =>
    dispatch({ type: 'SET_STATUS', payload: { id, status: 'picked-up' } });

  const pendingOrders = state.orders.filter((o) => o.status === 'pending-pickup');

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        pendingOrders,
        addOrder,
        markPickedUp,
        pendingCount: pendingOrders.length,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
}
