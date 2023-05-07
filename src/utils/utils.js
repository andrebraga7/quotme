import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, current) => {
        return acc.some((accResult) => accResult.id === current.id)
          ? acc
          : [...acc, current];
      }, prevResource.results),
    }));
  } catch (error) {
    // console.log(error);
  }
};
