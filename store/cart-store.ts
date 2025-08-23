import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
    id: string;
    name: string;
    price: number; // display currency units (e.g., Rs)
    imageUrl: string | null;
    quantity: number;
}

type AddItemInput = Omit<CartItem, "quantity"> & { quantity?: number };

interface CartStore {
    items: CartItem[];
    addItem: (item: AddItemInput) => void;
    removeItem: (id: string) => void;
    increment: (id: string, delta?: number) => void;
    decrement: (id: string, delta?: number) => void;
    clear: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (payload) => {
                const qty = Math.max(1, payload.quantity ?? 1);
                set((state) => {
                    const idx = state.items.findIndex((i) => i.id === payload.id);
                    if (idx >= 0) {
                        const items = state.items.slice();
                        items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
                        return { items };
                    }
                    return {
                        items: [
                            ...state.items,
                            {
                                id: payload.id,
                                name: payload.name,
                                price: payload.price,
                                imageUrl: payload.imageUrl ?? null,
                                quantity: qty,
                            },
                        ],
                    };
                });
            },
            removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
            increment: (id, delta = 1) =>
                set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i)) })),
            decrement: (id, delta = 1) =>
                set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, quantity: i.quantity - delta } : i)).filter((i) => i.quantity > 0) })),
            clear: () => set({ items: [] }),
            totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        }),
        {
            name: "cart-store",
            // createJSONStorage's callback is only executed client-side
            storage: createJSONStorage(() => localStorage),
            version: 1,
            skipHydration: true,
            partialize: (state) => ({ items: state.items }),
        }
    )
);