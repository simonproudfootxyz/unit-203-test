import styled from "styled-components";
import { formatMoney } from "../lib/formatMoney";
import { lineItem } from "../pages/api/line-items";

const ESTIMATED_DELIVERY = "Nov 24, 2021";

const LineItemsStyles = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const LineItemStyles = styled.li`
  padding: 2rem 0;
  display: grid;
  grid-template-columns: auto 1fr auto;

  img {
    margin-right: 1rem;
  }

  .line-item__info {
    h3 {
      margin-top: 0;
    }

    .line-item__swatch {
      padding-top: 20px;
      display: inline-flex;
      align-items: center;
    }
  }

  .line-item__utilities {
    text-align: right;
  }

  .line-item__delivery {
    margin-top: 50px;
  }

  .line-item__button-container {
    margin-top: 25px;
  }

  h3,
  p {
    margin: 0;
  }
`;

const TextButtonStyles = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  display: inline-block;
  padding: 2px 5px;
  color: black;
`;

interface lineItemsProps {
  lineItems: lineItem[];
  onRemoveButtonClick: Function;
  onAddButtonClick: Function;
}

const LineItems = ({
  lineItems,
  onRemoveButtonClick,
  onAddButtonClick,
}: lineItemsProps) => {
  return (
    <LineItemsStyles>
      {lineItems.map((lineItem: lineItem) => (
        <LineItemStyles key={lineItem.id}>
          <img width="150" src={lineItem.image} alt={lineItem.title} />
          <div className="line-item__info">
            <h3>
              {lineItem.swatchTitle.toUpperCase()} / {lineItem.title} /{" "}
              {lineItem.quantity}
            </h3>
            <p className="line-item__swatch">
              <span
                style={{
                  display: "inline-block",
                  background: `${lineItem.swatchColor}`,
                  width: `30px`,
                  height: `30px`,
                  borderRadius: `50%`,
                  marginRight: `10px`,
                }}
              ></span>
              <span>{lineItem.swatchTitle}</span>
            </p>
          </div>
          <div className="line-item__utilities">
            <p>{formatMoney(lineItem.quantity * lineItem.price)}</p>
            <p className="line-item__delivery">{lineItem.deliveryDate}</p>
            <div className="line-item__button-container">
              <TextButtonStyles
                value={JSON.stringify(lineItem)}
                onClick={onAddButtonClick}
              >
                Add
              </TextButtonStyles>
              <TextButtonStyles
                value={lineItem.id}
                onClick={onRemoveButtonClick}
              >
                Remove
              </TextButtonStyles>
            </div>
          </div>
        </LineItemStyles>
      ))}
    </LineItemsStyles>
  );
};

export { LineItems };
