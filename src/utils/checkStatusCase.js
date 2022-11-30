

export const checkStatus = async (numberCase) => {
  try {
    const response = await fetch(`http://3.87.52.235:3000`, {
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
