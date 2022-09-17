import { useState } from "react";
import styled from "styled-components";
import Suggestions from "./Suggestions";
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { InformationContext } from "../InformationProvider";

const Searchbox = ({ handleSelect }) => {
  const data = useContext(InformationContext);
  const { allItems } = data;
  const history = useHistory();
  console.log("ALL ITEMS", allItems);

  const [inputBox, setInputBox] = useState("");
  const [searchText, setSearchText] = useState("");
  const [matchedSuggestions, setMatchedSuggestions] = useState([]);

  console.log("inputBox", inputBox);

  const handleInput = (ev) => {
    setInputBox(ev.target.value);
    setSearchText(ev.target.value);
    console.log("input box length", ev.target.value.length);
    if (ev.target.value.length >= 2) {
      const filteredSuggestions = allItems.filter((item) => {
        if (item.name.toUpperCase().includes(ev.target.value.toUpperCase())) {
          // console.log("item", item)
          return true;
        }
        return false;
      });

      setMatchedSuggestions(filteredSuggestions);
      return;
    }
    setMatchedSuggestions([]);
    return;
  };

  return (
    <Wrapper>
      <SuggestionsWrap>
        <SearchContainer>
          <Input
            type="text"
            value={inputBox}
            placeholder="Search product here"
            onChange={(ev) => handleInput(ev)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                history.push(`/search/${searchText}`);
                setInputBox("");
                setMatchedSuggestions([]);
              }
            }}
          />
          <SearchButton onClick={() => history.push(`/search/${searchText}`)} />
        </SearchContainer>
        {matchedSuggestions.length > 0 ? (
          <SuggestionsBox>
            {matchedSuggestions.map((product, index) => {
              // console.log("suggestion", suggestion)
              return (
                <Suggestions
                  product={product}
                  setInputBox={setInputBox}
                  setMatchedSuggestions={setMatchedSuggestions}
                  value={inputBox}
                  onClick={() => {
                    setInputBox("");
                    setMatchedSuggestions([]);
                  }}
                ></Suggestions>
              );
            })}
          </SuggestionsBox>
        ) : null}
      </SuggestionsWrap>
    </Wrapper>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 260px;
  height: 40px;
  border: 1px solid var(--border);
  position: relative;
`;

const SearchButton = styled.button`
  width: 40px;
  height: 100%;
  overflow: hidden;
  border: none;
  background: #fff
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat center;
  cursor: pointer;
`;

const Input = styled.input`
  /* height: 40px; */
  width: 220px;
  /* height: 100%; */
  text-indent: 12px;
  color: black;
  border-radius: none;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  outline: none;
  font-size: 14px;
  font-family: var(--font-family);

  &::placeholder {
    color: var(--light-grey);
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin-right: -1%;
`;

const SuggestionsWrap = styled.div`
  position: relative;
  display: block;
  /* position: absolute; */
  width: 300px;
`;

const SuggestionsBox = styled.ul`
  background-color: white;
  box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.2);
  /* margin-top: 20px; */
  /* border: 2px solid red; */
  z-index: 9999999999999999999999;
  position: absolute;
  padding: 5px;
  display: block;
`;

export default Searchbox;
