//your JS code here. If required.
// Get table body
const output = document.getElementById("output");

// Show "Loading..." row initially
output.innerHTML = `<tr><td colspan="2" class="text-center">Loading...</td></tr>`;

// Utility: Create a promise that resolves after random delay
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

// Create 3 promises
const promises = [createPromise(1), createPromise(2), createPromise(3)];

const startAll = performance.now();

// Wait for all to resolve
Promise.all(promises).then((results) => {
  const endAll = performance.now();
  const totalTime = (endAll - startAll) / 1000;

  // Clear "Loading..."
  output.innerHTML = "";

  // Add rows for each promise
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
