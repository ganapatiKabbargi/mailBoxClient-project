import React from "react";

const useFetch = (url, m, obj) => {
  if (m == "") {
    return fetch(url);
  }
  if (m === "DELETE") {
    return fetch(url, {
      method: m,
    });
  } else {
    return fetch(url, {
      method: m,
      body: JSON.stringify(obj),

      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export default useFetch;
