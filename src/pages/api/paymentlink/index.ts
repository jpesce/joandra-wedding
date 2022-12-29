import type { NextApiRequest, NextApiResponse } from 'next';
import MercadoPago from "mercadopago";

const paymentHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    return response.status(405).send({ message: "Method not allowed" });
  }
  if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    return response.status(500).send({ message: "Undefined access token" });
  }

  MercadoPago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
  });

  const preference = { ...request.body,
    "payment_methods": {
      "excluded_payment_types": [
        { id: "ticket" },
        { id: "debit_card" },
      ],
    }
  };

  try {
    const preferenceResponse = await MercadoPago.preferences.create(preference)
    return response.status(200).send(preferenceResponse?.body?.init_point)
  } catch (error) {
    return response.status(500).send(JSON.stringify(error))
  }
};

export default paymentHandler;
