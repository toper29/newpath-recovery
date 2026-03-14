

async function test() {
  const res = await fetch('http://localhost:3000/api/admin/users/pending');
  const json = await res.json();
  console.log("Pending users:", json);
  
  if (json.data && json.data.length > 0) {
    const userId = json.data[0].id;
    console.log("Testing PATCH on user:", userId);
    const patchRes = await fetch(`http://localhost:3000/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "APPROVED" })
    });
    console.log("PATCH status:", patchRes.status);
    const patchJson = await patchRes.text();
    console.log("PATCH response:", patchJson);
  }
}

test();
