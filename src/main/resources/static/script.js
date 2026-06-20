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
    let recommendations = [];
    let score = 0;
    let warnings = [];

    if (password.length >= 8) score += 25;
    else warnings.push("Too short");

    if (password.length >= 12) score += 25;

    if (/[A-Z]/.test(password)) {
        score += 15;
    } else {
        warnings.push("Missing uppercase letter");
        recommendations.push("Add at least one uppercase letter");
    }

    if (/[0-9]/.test(password)) {
        score += 15;
    } else {
        warnings.push("Missing number");
        recommendations.push("Add at least one number");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score += 20;
    } else {
        warnings.push("Missing special character");
        recommendations.push("Add symbols like ! @ # $ %");
    }

    if (password !== "") {
        passwordHistory.unshift(password);

        if (passwordHistory.length > 5) {
            passwordHistory.pop();
        }

        updateHistory();
    }

    const commonPasswords = [
        "password",
        "password123",
        "admin",
        "administrator",
        "root",
        "qwerty",
        "qwerty123",
        "welcome",
        "letmein",
        "football",
        "baseball",
        "dragon",
        "monkey",
        "abc123",
        "111111",
        "123123",
        "123456",
        "12345678",
        "123456789",
        "1234567890",
        "password1",
        "iloveyou",
        "sunshine",
        "princess",
        "master",
        "login",
        "passw0rd"
    ];

    if (commonPasswords.includes(password.toLowerCase())) {
        warnings.push("Common password detected");
        recommendations.push("Choose a less predictable password");
        score = Math.max(score - 50, 0);
    }

    let strength = "Weak";

    if (score >= 80) {
        strength = "Strong";
    } else if (score >= 50) {
        strength = "Medium";
    }

    const entropy = Math.round(password.length * Math.log2(94));

    document.getElementById("score").textContent =
        "Score: " + score + "/100";

    document.getElementById("strength").textContent =
        "Strength: " + strength;

    document.getElementById("entropy").textContent =
        "Entropy: " + entropy + " bits";

    document.getElementById("warnings").textContent =
        warnings.length > 0
            ? "Warnings: " + warnings.join(", ")
            : "Warnings: None";

    document.getElementById("recommendations").textContent =
        recommendations.length > 0
            ? "Recommendations: " + recommendations.join(", ")
            : "Recommendations: Password meets basic security requirements";
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
    const password =
        document.getElementById("passwordInput").value;

    if (password === "") {
        alert("No password to copy!");
        return;
    }

    navigator.clipboard.writeText(password);

    document.getElementById("copyMessage").textContent =
        "✓ Password copied!";
}

function updateHistory() {
    const historyList =
        document.getElementById("historyList");

    historyList.innerHTML = "";

    passwordHistory.forEach(password => {
        const li = document.createElement("li");
        li.textContent =
            password.substring(0, 3) + "********";
        historyList.appendChild(li);
    });
}