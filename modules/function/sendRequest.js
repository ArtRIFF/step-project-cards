const sendRequest = async (url, method = "GET", config = null) => {
  const request = await fetch(url, {
    method: method,
    ...config,
  });
  let result = await request;
  if (method === "GET") {
    return result.json();
  } else {
    return result;
  }
};

export default sendRequest;
