import { URL_SERVER } from "@env";

export const checkStatus = async (numberCase) => {
  let receiptNumber = `${numberCase.slice(0, 3).toUpperCase()}${numberCase.slice(3)}`;
  try {
    const response = await fetch(`http://${URL_SERVER}:3000`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiptNumber: receiptNumber,
    }),
    })
      const data = await response.json();
      return data;
     
  } catch (error) {
    console.log("Error:", error);
  }
};
