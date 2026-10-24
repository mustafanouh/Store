import React from 'react';
import Swal from 'sweetalert2';
import { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string | number | undefined, delta: number) => void;
  onRemoveItem: (id: string | number | undefined) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => {
    const p = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    return sum + p * item.quantity;
  }, 0);

  const handleCheckout = () => {
    Swal.fire({
      title: 'Confirm Order',
      text: `Total payment: $${totalAmount.toFixed(2)}. Proceed with checkout?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, checkout!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#2563eb',
    }).then((result) => {
      if (result.isConfirmed) {
        onClearCart();
        onClose();
        Swal.fire({
          title: 'Order Placed!',
          text: 'Thank you for your purchase from Product Store!',
          icon: 'success',
          confirmButtonColor: '#2563eb',
        });
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 dark:border-neutral-700 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-neutral-700 flex justify-between items-center bg-gray-50 dark:bg-neutral-800">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-cart-shopping text-blue-500 text-lg"></i>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-700 transition cursor-pointer"
            title="Close cart"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-3 bg-blue-50 dark:bg-blue-950/40 rounded-full flex items-center justify-center text-blue-500">
                <i className="fa-solid fa-cart-shopping text-2xl"></i>
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Your cart is empty</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                Browse our products and add your favorite items to cart.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-neutral-700">
              {cart.map((item, idx) => {
                const itemPrice =
                  typeof item.price === 'number'
                    ? item.price
                    : parseFloat(item.price) || 0;
                return (
                  <div
                    key={`cart-${item.id ?? idx}`}
                    className="py-4 flex items-center justify-between gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-contain bg-white rounded p-1 border dark:border-neutral-700 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/img/icon.png';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {item.title}
                      </h4>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-1">
                        ${itemPrice.toFixed(2)} each
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-gray-200 dark:border-neutral-700 rounded-md overflow-hidden bg-gray-50 dark:bg-neutral-700">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600 transition cursor-pointer text-xs"
                          title="Decrease"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className="px-2 text-xs font-semibold text-gray-800 dark:text-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600 transition cursor-pointer text-xs"
                          title="Increase"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 transition cursor-pointer"
                        title="Remove"
                      >
                        <i className="fa-regular fa-trash-can text-sm"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/80">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 dark:text-gray-300 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClearCart}
                className="px-4 py-2.5 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition cursor-pointer text-sm font-medium"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                <span>Checkout</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
