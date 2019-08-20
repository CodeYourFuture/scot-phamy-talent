export const createNewOpprtunity = formEntry => {
  return fetch("/api/newOpportunity", {
    method: "POST",
    body: JSON.stringify(formEntry),
    headers: { "Content-Type": "application/json" }
  }).then(res => res.json());
};
