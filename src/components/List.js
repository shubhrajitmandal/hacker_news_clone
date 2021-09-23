import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { getAllStories } from "../shared/api/hnAPI";
import ListItem from "./ListItem";

const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Pagination = styled.div`
  margin-bottom: 20px;
  padding: 15px 60px;
  width: calc(100% - 80px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 2px solid #ff6600;

  span {
    font-size: 15px;
  }

  @media screen and (max-width: 750px) {
    width: calc(100% - 60px);
  }
`;
const Button = styled.button`
  margin: 0 5px;
  outline: none;
  border: none;
  border-radius: 50%;
  color: #454545;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: transparent;

  :disabled {
    color: #adadad;
  }
  svg {
    font-size: 32px;
  }
`;
const Footer = styled.ul`
  margin-bottom: 20px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  li {
    height: 16px;
    line-height: 16px;
    color: #333333;
    padding: 0 5px;
    border-right: 1px solid #adadad;
    cursor: pointer;
  }

  li:last-child {
    border: none;
  }

  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;
const Search = styled.div`
  margin-bottom: 25px;

  input {
    margin-left: 10px;
    padding: 5px 10px;
    font-size: 16px;
    color: #454545;
    outline: #454545;
  }
`;

const List = () => {
  const [index, setIndex] = useState(0);
  const itemsPerPage = 30;

  const { data: storyIds = [] } = useQuery(
    "stories",
    () => getAllStories(),
    {}
  );

  const handlePrev = () => {
    setIndex(index - 30);
  };
  const handleNext = () => {
    setIndex(index + 30);
  };

  const page = storyIds.slice(index, index + itemsPerPage);

  return (
    <ListWrapper>
      {page.map((id, num) => (
        <ListItem id={id} index={index} num={num} />
      ))}
      <Pagination>
        <Button onClick={handlePrev} disabled={index === 0}>
          <KeyboardArrowLeft />
        </Button>
        <span>
          {index + 1} -{" "}
          {index + itemsPerPage > storyIds.length
            ? storyIds.length
            : index + itemsPerPage}{" "}
          of {storyIds.length}
        </span>
        <Button
          onClick={handleNext}
          disabled={index + itemsPerPage >= storyIds.length}
        >
          <KeyboardArrowRight />
        </Button>
      </Pagination>
      <Footer>
        <li>Guidelines</li>
        <li>FAQ</li>
        <li>Lists</li>
        <li>API</li>
        <li>Security</li>
        <li>Legal</li>
        <li>Apply to YC</li>
        <li>Contact</li>
      </Footer>
      <Search>
        Search: <input type="text" />
      </Search>
    </ListWrapper>
  );
};

export default List;
