import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatDistance, fromUnixTime } from "date-fns";
import { useQuery } from "react-query";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import { getStoryById } from "../shared/api/hnAPI";
import LinkPreview from "./LinkPreview";

const ListItem = styled.div`
  padding: 10px 0;
  width: calc(100% - 80px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #777777;

  @media screen and (max-width: 750px) {
    width: calc(100% - 60px);
  }
`;
const Details = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Index = styled.div`
  width: 35px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: auto;
    margin-right: 20px;
  }
  @media screen and (max-width: 600px) {
    margin-right: 10px;
  }
`;
const StyledChangeHistoryIcon = styled(ChangeHistoryIcon)`
  margin-right: 10px;
  :hover {
    cursor: pointer;
    fill: #ff6600;
  }

  @media screen and (max-width: 480px) {
    margin: 0;
  }
`;
const Content = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.div`
  color: #454545;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;

  :hover {
    color: #ff6600;
  }
  span {
    margin-right: 10px;
  }
  span:last-child {
    color: #606060;
  }
  @media screen and (max-width: 480px) {
    font-size: 15px;
  }
`;
const SubTitle = styled.div`
  font-size: 14px;
  display: flex;
  align-items: flex-end;

  @media screen and (max-width: 480px) {
    font-size: 13px;
  }
`;
const Modal = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  aling-items: center;
  z-index: 2;
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
`;

const ListContainer = ({ id, index, num, ...props }) => {
  const [show, setShow] = useState(false);

  const { data, isLoading } = useQuery(["story", id], () => getStoryById(id));

  useEffect(() => {
    setShow(false);
  }, [index]);

  const handleClose = () => {
    setShow(false);
  };

  const getDomainName = (url) => {
    try {
      const domain = new URL(url);
      return domain.hostname.replace("www.", "");
    } catch (err) {
      return "";
    }
  };

  if (isLoading) {
    return "";
  }

  return (
    <ListItem>
      {show && (
        <Modal onClick={() => setShow(false)}>
          <LinkPreview
            url={data.url}
            domainName={getDomainName(data.url)}
            handleClose={handleClose}
          />
        </Modal>
      )}
      <Details>
        <Index>{index + num + 1}.</Index>
        <StyledChangeHistoryIcon fontSize="small" />
        <Content>
          <Title onClick={() => setShow(true)}>
            <span>{data.title}</span>
            <span>({getDomainName(data.url)})</span>
          </Title>
          <div>
            <SubTitle>
              {data.score} points by {data.by}{" "}
              {formatDistance(fromUnixTime(data.time), new Date(), {
                addSuffix: true,
              })}{" "}
              | {data.descendants} comments
            </SubTitle>
          </div>
        </Content>
      </Details>
    </ListItem>
  );
};

export default ListContainer;
