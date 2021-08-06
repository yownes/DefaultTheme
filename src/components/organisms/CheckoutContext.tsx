import { useQuery } from "@apollo/client";
import React, { createContext, ReactNode, useContext, useState } from "react";

import { CART } from "../../api/queries";
import { AddressFragment } from "../../api/types/AddressFragment";
import { Cart } from "../../api/types/Cart";
import { CartFragment } from "../../api/types/CartFragment";
import { PaymentMethodFragment } from "../../api/types/PaymentMethodFragment";

interface CheckoutContextProps {
  cart?: CartFragment;
  paymentMethod?: PaymentMethodFragment;
  address?: AddressFragment;
  paymentAddress?: AddressFragment;
  setPaymentMethod?: React.Dispatch<
    React.SetStateAction<PaymentMethodFragment | undefined>
  >;
  setAddress?: React.Dispatch<
    React.SetStateAction<AddressFragment | undefined>
  >;
  setPaymentAddress?: React.Dispatch<
    React.SetStateAction<AddressFragment | undefined>
  >;
}

const CheckoutContext = createContext<CheckoutContextProps>({});

export const useCheckout = () => useContext(CheckoutContext);

interface CheckoutProviderProps {
  children: ReactNode;
}

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const { data } = useQuery<Cart>(CART);
  const [address, setAddress] = useState<AddressFragment>();
  const [paymentAddress, setPaymentAddress] = useState<AddressFragment>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodFragment>();
  return (
    <CheckoutContext.Provider
      value={{
        paymentMethod,
        address,
        setAddress,
        setPaymentMethod,
        paymentAddress,
        setPaymentAddress,
        cart: data?.cart,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
