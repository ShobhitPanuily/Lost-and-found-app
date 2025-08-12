document.getElementById("itemForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const item = Object.fromEntries(formData.entries());

  await fetch("http://localhost:5000/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });

  alert("Item submitted!");
  e.target.reset();
  loadItems();
});

async function loadItems() {
  const res = await fetch("http://localhost:5000/api/items");
  const data = await res.json();

  const container = document.getElementById("itemList");
  container.innerHTML = "";
  data.forEach((item) => {
    container.innerHTML += `
      <div style="border:1px solid #ccc; margin:10px; padding:10px">
        <strong>${item.title}</strong> (${item.status})<br>
        ${item.description}<br>
        📍 ${item.location} | 📞 ${item.contact}
      </div>
    `;
  });
}

loadItems();