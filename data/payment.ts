export const createPaymentIntent = async () => {
  try {
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body:JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    });
    const data = await res.json();

    return data.clientSecret;
  } catch (error) {
    console.log(error);
    return null;
  }
};
