import { configureStore, createSlice } from '@reduxjs/toolkit';

// יצירת slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      const generateId = `${Date.now()}-${Math.random()}`; // משלב את הזמן הנוכחי עם מספר אקראי   
      if (existingItem) {
        existingItem.quantity += 1; // אם המוצר קיים, להגדיל את הכמות
      } else {
        state.items.push({ myCustomId: generateId, name: action.payload.name, quantity: 1, category: action.payload.category });
      }
    },
    removeItem: (state, action) => {
      console.log("i am");
      
      const item = state.items.find(item => item.name === action.payload.name);
      if (item.quantity > 1) {
        item.quantity -= 1; // אם המוצר קיים, להקטין את הכמות
      } else {
        state.items.remove(action.payload);
      }
    },
  },
});

// יצירת store
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

// יצוא הפעולות
export const { addItem, removeItem } = cartSlice.actions;
