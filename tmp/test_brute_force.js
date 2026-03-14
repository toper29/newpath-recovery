async function testBruteForce() {
    const email = "user@newpath.com"; // Change to a valid user
    console.log("Starting Brute Force Test on", email);
    
    for(let i=1; i<=6; i++) {
        console.log(`\nAttempt ${i}:`);
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password: "wrongpassword123" })
        });
        
        console.log(`Status: ${res.status}`);
        const data = await res.json();
        console.log(`Response:`, data);
        
        if (res.status === 429) {
            console.log("\n✅ SUCCESS: Account successfully locked out!");
            break;
        }
    }
}

testBruteForce();
