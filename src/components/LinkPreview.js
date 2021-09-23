import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ArticlePreview = styled.div`
  margin: auto;
  min-width: 500px;
  min-height: 300px;
  max-height: 600px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.32) 0px 3px 8px;

  @media screen and (max-width: 600px) {
    min-width: 400px;
    max-width: 90%;
    padding: 20px;
  }
  @media screen and (max-width: 480px) {
    min-width: 300px;
    font-size: 14px;
  }
`;
const Loader = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 2px;
  color: #454545;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
`;
const Domain = styled.div`
  margin: 5px 0;
  font-size: 20px;

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;
const Title = styled.h3`
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;

  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
`;
const Link = styled.a`
  max-width: 100px;
  text-decoration: none;
`;
const Button = styled.button`
  margin-top: 20px;
  padding: 8px 16px;
  border: none;
  outline: none;
  font-size: 18px;
  background: ${(props) => (props.$isClose ? "#454545" : "#ff6600")};
  color: #ffffff;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

const LinkPreview = ({ url, domainName, handleClose, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  let previewData;
  const baseURL = "https://cors-anywhere.herokuapp.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}${url}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [url]);

  const getTitle = () => {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle != null && ogTitle.content.length > 0) {
      return ogTitle.content;
    }
    const docTitle = document.querySelector("#page title").innerHTML;
    if (docTitle != null && docTitle.length > 0) {
      return docTitle;
    }
    const h1 = document.querySelector("h1").innerHTML;
    if (h1 != null && h1.length > 0) {
      return h1;
    }
  };

  const getDescription = () => {
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription != null && ogDescription.content.length > 0) {
      return ogDescription.content;
    }
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription != null && metaDescription.content.length > 0) {
      return metaDescription.content;
    }
    const h1 = document.querySelector("h1").innerHTML;
    if (h1 != null && h1.length > 0) {
      return h1;
    }
  };

  const getImg = (url) => {
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg != null && ogImg.content.length > 0) {
      return ogImg.content;
    }
    let imgs = Array.from(document.getElementsByTagName("img"));
    if (imgs.length > 0) {
      imgs = imgs.filter((img) => {
        let addImg = true;
        if (img.naturalWidth > img.naturalHeight) {
          if (img.naturalWidth / img.naturalHeight > 3) {
            addImg = false;
          }
        } else {
          if (img.naturalHeight / img.naturalWidth > 3) {
            addImg = false;
          }
        }
        if (img.naturalHeight <= 50 || img.naturalWidth <= 50) {
          addImg = false;
        }
        return addImg;
      });
      imgs.forEach((img) => {
        try {
          const url = new URL(img.currentSrc);
          return url;
        } catch (err) {
          return "";
        }
      });
      return imgs[0].currentSrc;
    }
  };

  const getPreviewData = () => {
    const page = document.createElement("div");
    page.setAttribute("id", "page");
    page.style.display = "none";
    page.innerHTML = data;
    document.body.appendChild(page);

    const obj = {};
    obj.title = getTitle();
    obj.description = getDescription();
    obj.domainName = domainName;
    obj.imgSrc = getImg();

    document.body.removeChild(page);
    return obj;
  };

  if (data) {
    previewData = getPreviewData();
  }

  return (
    <ArticlePreview
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {!loading ? (
        <>
          <Image src={previewData.imgSrc} alt="" />
          <Domain>{previewData.domainName}</Domain>
          <Title>{previewData.title}</Title>
          <p>{previewData.description}</p>
          <Link href={url}>
            <Button>Read</Button>
          </Link>
        </>
      ) : (
        <Loader>Loading...</Loader>
      )}
    </ArticlePreview>
  );
};

export default LinkPreview;
