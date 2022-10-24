import { URL_SERVER } from "@env";

export const checkStatus = async (numberCase) => {
  try {
    const response = await fetch(`http://52.2.236.126:3000`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiptNumber: numberCase,
    }),
    })
      const data = await response.json();
      return data;
  } catch (error) {
    console.log("Error:", error);
  }
};
