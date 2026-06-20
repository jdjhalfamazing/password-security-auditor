let passwordHistory = [];

function generatePassword() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";

    for (let i = 0; i < 16; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    document.getElementById("passwordInput").value = password;
}

function analyzePassword() {
    const password = document.getElementById("passwordInput").value;

    fetch("/api/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("score").textContent = "Score: " + data.score + "/100";
            document.getElementById("strength").textContent = "Strength: " + data.strength;
            document.getElementById("entropy").textContent = "Entropy: " + data.entropy + " bits";
            document.getElementById("warnings").textContent = "Warnings: " + data.warnings;
            document.getElementById("recommendations").textContent = "Recommendations: " + data.recommendations;

            if (password !== "") {
                passwordHistory.unshift(password);

                if (passwordHistory.length > 5) {
                    passwordHistory.pop();
                }

                updateHistory();
            }
        });
}

function togglePassword() {
    const passwordField = document.getElementById("passwordInput");

    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

function copyPassword() {
    const password = document.getElementById("passwordInput").value;

    if (password === "") {
        alert("No password to copy!");
        return;
    }

    navigator.clipboard.writeText(password);

    document.getElementById("copyMessage").textContent = "✓ Password copied!";
}

function updateHistory() {
    const historyList = document.getElementById("historyList");

    historyList.innerHTML = "";

    passwordHistory.forEach(password => {
        const li = document.createElement("li");
        li.textContent = password.substring(0, 3) + "********";
        historyList.appendChild(li);
    });
}