import { URL_SERVER } from "@env";

export const checkStatus = async (numberCase) => {
  // let receiptNumber = `${numberCase.slice(0, 3).toUpperCase()}${numberCase.slice(3)}`;
  // console.log(receiptNumber);
  try {
    const data = fetch(`http://${URL_SERVER}:3001/status/${numberCase}`, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
