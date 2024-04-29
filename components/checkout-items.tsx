import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export const CheckoutItems = ({ checkoutItems }: { checkoutItems: any }) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <Link href={"/custom-checkout/canceled"}>
          <IoArrowBack className="text-gray-600"/>
        </Link>
        <p className="text-xl">My Store</p>
      </div>
      <p className="font-bold text-3xl">${checkoutItems.totalAmount}</p>
      <p className="text-gray-600">Checkedout Products</p>
      {checkoutItems.products.map((p: any) => {
        return (
          <div className="flex gap-2 items-center" key={p.id}>
            <div>
              <Image
                src={p.imageUrl}
                alt="product-image"
                className="col-span-1 rounded-lg shadow-xl"
                width={30}
                height={30}
              />
            </div>
            <div>
              <p className="text-lg font-semibold">{p.title}</p>
              <p>
                ${p.price} * <span className="text-blue-700">{p.quantity}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
