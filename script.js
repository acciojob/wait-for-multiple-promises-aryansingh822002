const output = document.getElementById("output");

// Show "Loading..." row initially with an ID for Cypress tests
output.innerHTML = `<tr id="loading"><td colspan="2" class="text-center">Loading...</td></tr>`;

function createPromise(index) {
  const delay = Math.floor(Math.random() * 3) + 1; // random 1–3 seconds
  const start = performance.now();

  return new Promise((resolve) => {
    setTimeout(() => {
      const end = performance.now();
      const timeTaken = (end - start) / 1000; // in seconds
      resolve({ name: `Promise ${index}`, time: timeTaken });
    }, delay * 1000);
  });
}

const promises = [createPromise(1), createPromise(2), createPromise(3)];
const startAll = performance.now();

Promise.all(promises).then((results) => {
  const endAll = performance.now();
  const totalTime = (endAll - startAll) / 1000;

  // Clear "Loading..." row
  output.innerHTML = "";

  // Add each promise result
  results.forEach((res) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${res.name}</td><td>${res.time.toFixed(3)}</td>`;
    output.appendChild(row);
  });

  // Add total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${totalTime.toFixed(3)}</strong></td>`;
  output.appendChild(totalRow);
});
