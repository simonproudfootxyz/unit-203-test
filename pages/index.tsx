import { lineItem, LineItems } from "../components/lineItems";
import styled from "styled-components";
import { useState } from "react";

//Styling variables
const BLUE = "#172162"; //"rgb(23, 33, 98)";
const LIGHT_GREY = "#6e7484";
const BLACK = "#000000";

//First part given
const initialLineItems = [
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

const SUBTOTAL = 2094.97;
const HST = 272.3461;
const TOTAL = 2382.3161;
const ESTIMATED_DELIVERY = "Nov 24, 2021";

const CartStyles = styled.div`
  display: grid;
  height: 100%;
  width: 40%;
  min-width: 900px;
  padding: 20px;
  margin: 0 auto;
  grid-template-rows: auto 1fr auto;

  header {
    border-bottom: 5px solid white;

    h2 {
      margin: 0;
    }
  }

  footer {
    border-top: 10px double white;
    margin: 2rem 0;
    padding: 2rem 0;
    align-items: center;

    div {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;

      &.order-total {
        font-weight: bold;
      }
    }

    p {
      margin: 0;
    }
  }
`;

export default function Home() {
  const [lineItems, setLineItems] = useState(initialLineItems);

  // CART FUNCTIONALITY
  const removeLineItem = ({ target }) => {
    const { value } = target;
    const productId = parseInt(value);
    const updatedLineItems = lineItems.filter(
      (item: lineItem) => item.id !== productId
    );
    setLineItems(updatedLineItems);
  };

  const addLineItem = ({ target }) => {
    const { value } = target;
    const productId = parseInt(value);
    const newLineItems: lineItem[] = lineItems.map((lineItem: lineItem) =>
      lineItem.id === productId
        ? { ...lineItem, quantity: lineItem.quantity + 1 }
        : lineItem
    );
    setLineItems(newLineItems);
  };

  return (
    <CartStyles>
      <header>
        <h2>Your Cart</h2>
      </header>
      <LineItems
        lineItems={lineItems}
        onRemoveButtonClick={removeLineItem}
        onAddButtonClick={addLineItem}
      />
      <footer>
        <div className="order-subtotal">
          <p>Subtotal</p>
          <p>{SUBTOTAL}</p>
        </div>
        <div className="order-subtotal">
          <p>Taxes (estimated)</p>
          <p>{HST}</p>
        </div>
        <div className="order-subtotal">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="order-total">
          <p>Total</p>
          <p>{TOTAL}</p>
        </div>
      </footer>
    </CartStyles>
  );
}
