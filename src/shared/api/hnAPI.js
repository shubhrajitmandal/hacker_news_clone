import axios from "axios";

const apiURL = "https://hacker-news.firebaseio.com/v0/";
const storyURL = `${apiURL}/item`;

export const getAllStories = async () => {
  const requestURL = `${apiURL}/topstories.json`;
  const result = await axios.get(`${requestURL}`);
  return result.data;
};

export const getStoryById = async (id) => {
  const requestURL = `${storyURL}/${id}.json`;
  const result = await axios.get(`${requestURL}`);
  return result.data;
};
