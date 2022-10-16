import { URL_SERVER } from "@env";

export const checkStatus = async (numberCase) => {
    let receiptNumber = `${numberCase.slice(0, 3).toUpperCase()}${numberCase.slice(3)}`;
  try {
    const data = fetch(`http://${URL_SERVER}:3001/status/${receiptNumber}`, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
