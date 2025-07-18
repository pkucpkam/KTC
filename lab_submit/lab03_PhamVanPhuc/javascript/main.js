document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName = document.getElementById("firstname").value.trim();
        const lastName = document.getElementById("lastname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const question = document.getElementById("question").value.trim();
        const checkboxes = document.querySelectorAll(
            "input[name='info']:checked"
        );

        let isValid = true;
        let message = "";

        if (!firstName || !lastName) {
            isValid = false;
            message += "❗ Please enter your full name.\n";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            isValid = false;
            message += "❗ Invalid email address.\n";
        }

        const phonePattern = /^[0-9]{8,15}$/;
        if (!phonePattern.test(phone)) {
            isValid = false;
            message += "❗ Invalid phone number. Only numbers (8-15 digits).\n";
        }

        if (checkboxes.length === 0) {
            isValid = false;
            message += "❗ Please select at least one area of interest.\n";
        }

        if (!question) {
            isValid = false;
            message += "❗ Please enter your question.\n";
        }

        if (!isValid) {
            alert(message);
            return;
        }

        alert("Form submitted successfully!");
        form.submit();
    });
});
