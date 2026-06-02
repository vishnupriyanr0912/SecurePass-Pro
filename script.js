// ================= ELEMENTS =================
const password = document.getElementById("password");
const progressBar = document.getElementById("progressBar");
const strength = document.getElementById("strength");
const lockIcon = document.getElementById("lockIcon");

const togglePassword = document.getElementById("togglePassword");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

const conditions = {
    length: document.getElementById("length"),
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    number: document.getElementById("number"),
    special: document.getElementById("special")
};

// ✅ Clean text mapping
const keyText = {
    length: "At least 8 characters",
    uppercase: "One uppercase letter",
    lowercase: "One lowercase letter",
    number: "One number",
    special: "One special character"
};

// ================= PASSWORD CHECK =================
password.addEventListener("input", function () {
    const value = password.value;
    let score = 0;

    const checks = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[^A-Za-z0-9]/.test(value)
    };

    // ✅ CLEAN LOOP (NO ERRORS, NO ❌)
    for (let key in checks) {
        if (checks[key]) {
            conditions[key].classList.add("valid");
            conditions[key].classList.remove("invalid");
            conditions[key].innerHTML = "✔ " + keyText[key];
            score++;
        } else {
            conditions[key].classList.add("invalid");
            conditions[key].classList.remove("valid");
            conditions[key].innerHTML = "• " + keyText[key];
        }
    }

    // ================= PROGRESS BAR =================
    const percentage = score * 20;
    progressBar.style.width = percentage + "%";

    progressBar.classList.remove("bg-danger", "bg-warning", "bg-success");
    strength.classList.remove("weak", "medium", "strong");

    // ================= STRENGTH LOGIC =================
    if (score <= 2) {
        strength.textContent = "Weak Password";
        strength.classList.add("weak");
        progressBar.classList.add("bg-danger");
    } else if (score <= 4) {
        strength.textContent = "Medium Strength Password";
        strength.classList.add("medium");
        progressBar.classList.add("bg-warning");
    } else {
        strength.textContent = "Strong Password";
        strength.classList.add("strong");
        progressBar.classList.add("bg-success");
    }

    // ================= LOCK ANIMATION =================
    if (score === 5) {
        lockIcon.textContent = "🔒";
        lockIcon.classList.add("locked");
    } else {
        lockIcon.textContent = "🔓";
        lockIcon.classList.remove("locked");
    }

    // ================= BACKGROUND REACTION =================
    if (body.classList.contains("dark")) {
        if (score <= 2) {
            body.style.filter = "brightness(0.9)";
        } else if (score <= 4) {
            body.style.filter = "brightness(1)";
        } else {
            body.style.filter = "brightness(1.1)";
        }
    }
});

// ================= SHOW / HIDE PASSWORD =================
togglePassword.addEventListener("click", function () {
    const type = password.type === "password" ? "text" : "password";
    password.type = type;

    this.innerHTML = type === "password"
        ? '<i class="bi bi-eye"></i>'
        : '<i class="bi bi-eye-slash"></i>';
});

// ================= THEME TOGGLE =================

// Load saved theme or default
let currentTheme = localStorage.getItem("theme") || "light";

// Ensure only one theme class exists
body.classList.remove("light", "dark");
body.classList.add(currentTheme);

// Set correct icon
themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";

// Toggle theme
themeToggle.addEventListener("click", () => {
    if (body.classList.contains("light")) {
        body.classList.replace("light", "dark");
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.replace("dark", "light");
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});