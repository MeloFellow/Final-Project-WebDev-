import styled from "styled-components";
import { useEffect, useContext } from "react";
import { InformationContext } from "../InformationProvider";
import { useHistory } from "react-router-dom";
const Suggestions = ({
  product,
  value,
  setInputBox,
  setMatchedSuggestions,
}) => {
  const data = useContext(InformationContext);
  const { allItems } = data;

  console.log("Suggestion title", product.name);
  // console.log("ev.target", value)
  const history = useHistory();
  let firstIndex = product.name.toUpperCase().indexOf(value.toUpperCase());

  let firstHalf = product.name.slice(0, firstIndex);
  let secondHalf = product.name.slice(firstIndex);

  // console.log("second half", secondHalf)
  // console.log("first half", firstHalf)

  // console.log("first index", firstIndex)

  return (
    <div>
      <SuggestionsText
        onClick={() => {
          setInputBox("");
          setMatchedSuggestions([]);
          history.push(`/items/${product._id}`);
          console.log("hhelo I am here", product._id);
        }}
      >
        <li key={product.id}>
          {firstHalf}
          <strong>{secondHalf}</strong>
        </li>
        <Category>{product.category}</Category>
      </SuggestionsText>
    </div>
  );
};

export default Suggestions;

const SuggestionsText = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  z-index: 9999999999999999999999;

  &:hover {
    background-color: rgba(168, 218, 220, 0.5);
    z-index: 9999999999999999999999;
    cursor: pointer;
  }
`;

const Category = styled.li`
  color: #e63946ff;
  font-style: italic;
  font-size: 12px;
  font-weight: 500;
  margin: 2px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
