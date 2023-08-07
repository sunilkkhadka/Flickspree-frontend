import { loadStripe } from "@stripe/stripe-js";
import { AiFillCheckCircle } from "react-icons/ai";

const Subscription: React.FC<any> = () => {
  const checkout = async ({ lineItems }: { lineItems: any }) => {
    let stripePromise: any = null;

    let getStripe = () => {
      if (!stripePromise) {
        stripePromise = loadStripe(
          "pk_test_51NcLvFBCzSIpyk0Zu0Wb3vrB5cHEVjkugEEQOvytDnPPKTj5GJCOu0EzlBbcFjjT5lMDrpcIprhLiZYuhLbLQq6B00uYMSHpXR" as string
        );
      }

      return stripePromise;
    };

    const stripe = await getStripe();
    await stripe.redirectToCheckout({
      mode: "subscription",
      lineItems,
      successUrl: `http://localhost:3000/profiles?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: "http://localhost:3000/auth",
    });
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-white text-4xl font-semibold mb-5">
        Pick The Best Plan
      </h1>
      <p className="text-white flex flex-wrap text-5">
        Take your desired plan to get access to the contents easily, we like to
        offer special offers to our users.
      </p>
      <section className="flex flex-row w-[60rem] mt-10">
        <div className="bg-white flex-1 flex flex-col p-5 m-5 rounded-md">
          <h2 className="text-2xl text-center mb-12">STANDARD</h2>
          <h1 className="text-5xl text-slate-800 text-center mb-12">
            <span className="text-[1.8rem]">Rs.</span>
            <span className="text-[rgb(255,99,71)] font-semibold pl-2">
              150
            </span>
            <p className="text-[1rem] pt-1">per month</p>
          </h1>
          <hr />
          <ul className="m-5">
            <li className="flex gap-5">
              <AiFillCheckCircle size={30} style={{ color: "green" }} />
              Access to a wide range of content, including movies, TV shows, and
              documentaries.
            </li>
            <li className="flex gap-5 mt-5">
              <AiFillCheckCircle size={20} style={{ color: "green" }} />
              Stream on one device at a time. Standard video quality.
            </li>
          </ul>
          <button
            onClick={() => {
              checkout({
                lineItems: [
                  {
                    price: "price_1NcOwmBCzSIpyk0Zkdo8oVHo" as string,
                    quantity: 1,
                  },
                ],
              });
            }}
            className="bg-[rgb(255,99,71)] w-fit pl-5 pr-5 pt-2 pb-2 m-5 text-white"
          >
            Select Plan
          </button>
        </div>
        <div className="bg-white flex-1 flex flex-col p-5 m-5 rounded-md">
          <h2 className="text-2xl text-center mb-12">PREMIUM</h2>
          <h1 className="text-5xl text-slate-800 text-center mb-12">
            <span className="text-[1.8rem]">Rs.</span>
            <span className="text-[#FF6347] font-semibold pl-2">300</span>
            <p className="text-[1rem] pt-1">per month</p>
          </h1>
          <hr />
          <ul className="m-5">
            <li className="flex gap-5 mt-5">
              <AiFillCheckCircle size={20} style={{ color: "green" }} />
              Access to all content, including exclusive movies and series.
            </li>
            <li className="flex gap-5 mt-5">
              <AiFillCheckCircle size={15} style={{ color: "green" }} />
              Stream on multiple devices simultaneously.
            </li>
            <li className="flex gap-5 mt-5">
              <AiFillCheckCircle size={30} style={{ color: "green" }} />
              HD video quality for a superior viewing experience. Download
              content for offline viewing.
            </li>
          </ul>
          <button
            onClick={() => {
              checkout({
                lineItems: [
                  {
                    price: "price_1NcQJwBCzSIpyk0ZlGkFkNE1" as string,
                    quantity: 1,
                  },
                ],
              });
            }}
            className="bg-[rgb(255,99,71)] w-fit pl-5 pr-5 pt-2 pb-2 m-5 text-white"
          >
            Select Plan
          </button>
        </div>
      </section>
    </section>
  );
};

export default Subscription;
