import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ItemCard from "../components/ItemCard";

const SearchPage = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState();
  console.log("Query", query);
  useEffect(() => {
    const findProducts = async () => {
      console.log("Query", query);
      const response = await fetch(`/api/find-products/${query}`);
      const result = await response.json();
      result.status === 200
        ? setSearchResults(result.data)
        : setError(result.message);
      setIsLoaded(true);
    };
    findProducts();
  }, [query]);

  return (
    <Wrapper>
      {isLoaded ? (
        searchResults.map((itemInformation, index) => {
          return <ItemCard itemInformation={itemInformation} key={index} />;
        })
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  margin-bottom: 60px;
`;

export default SearchPage;
