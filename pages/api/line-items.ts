// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface lineItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  swatchColor: string;
  swatchTitle: string;
  deliveryDate?: string;
}

const lineItems: lineItem[] = [
  {
    id: 1,
    title: "Grey Sofa",
    price: 499.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75",
    swatchColor: "#959392",
    swatchTitle: "Grey",
  },
  {
    id: 2,

    title: "Blue Sofa",
    price: 994.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F3_Seater_SofaSofa_Ottoman_Off_Arm_Configuration_Two_Arms_Arm_Design_Slope_Chaise_Off_Fabric_Navy_Blue2.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#191944",
    swatchTitle: "Blue",
  },
  {
    id: 3,
    title: "White Sofa",
    price: 599.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_IVORY_OFF_OFF_SLOPE_5379af1f-9318-4e37-b514-962d33d1ce64.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#F8F1EC",
    swatchTitle: "White",
  },
];

const DELIVERY_DATES = [
  {
    postal: "V",
    ids: [2],
    estimatedDeliveryDate: "Nov 24, 2021",
  },
  {
    postal: "V",
    ids: [1, 3],
    estimatedDeliveryDate: "Nov 19, 2021",
  },
  {
    postal: "M",
    ids: [2, 3],
    estimatedDeliveryDate: "Nov 22, 2021",
  },
  {
    postal: "M",
    ids: [1],
    estimatedDeliveryDate: "Dec 19, 2021",
  },
  {
    postal: "K",
    ids: [1, 2, 3],
    estimatedDeliveryDate: "Dec 24, 2021",
  },
];

const getDeliveryEstimate = (lineItem, postalCodeFirstChar) => {
  const postalClustersForLetter = DELIVERY_DATES.filter((cluster) => {
    return cluster.postal === postalCodeFirstChar;
  });
  const deliveryDate = postalClustersForLetter.find((cluster) =>
    cluster.ids.includes(lineItem.id)
  )?.estimatedDeliveryDate;
  return deliveryDate;
};

const getLineItemsWithDelivery = (
  lineItems,
  postalCodeFirstChar,
  haveDeliveryBasedOnPostal
): lineItem[] => {
  const lineItemsWithDelivery: lineItem[] = lineItems.map(
    (lineItem: lineItem) => {
      return {
        ...lineItem,
        deliveryDate: haveDeliveryBasedOnPostal
          ? getDeliveryEstimate(lineItem, postalCodeFirstChar)
          : "No info available",
      };
    }
  );
  return lineItemsWithDelivery;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { postalCode } = req.query;
  if (postalCode === undefined) {
    return res.status(200).json(lineItems);
  }
  const postalCodeFirstChar = Array.from(postalCode)[0].toUpperCase();
  const haveDeliveryBasedOnPostal = DELIVERY_DATES.some(
    (date) => date.postal === postalCodeFirstChar
  );
  const lineItemsWithDelivery = getLineItemsWithDelivery(
    lineItems,
    postalCodeFirstChar,
    haveDeliveryBasedOnPostal
  );
  return res.status(200).json(lineItemsWithDelivery);
};

export default handler;
