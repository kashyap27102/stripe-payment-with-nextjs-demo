import { AddressElement } from "@stripe/react-stripe-js";

export const AddressForm = () => {
  return (
    <div>
      {/* <h3 className="text-lg font-medium mb-2">Shipping</h3> */}
      <AddressElement
        options={{ mode: "billing" }}
      />
    </div>
  );
};
