export const createNewOpportunity = formEntry => {
  return fetch("/api/opportunities/newOpportunity", {
    method: "POST",
    body: JSON.stringify(formEntry),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res;
      } else {
        throw new Error("HTTP error");
      }
    })
    .then(res => res.json());
};
