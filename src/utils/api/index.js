export const convertResponse = async (v2) => {
  try {
    console.log("xxxxxxxxxxxx");
    const res = await fetch("http://localhost:4000/convert-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(v2),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    return {
      error: e.message,
    };
  }
};
