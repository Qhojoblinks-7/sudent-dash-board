document.addEventListener("DOMContentLoaded", function() {
    const authSection = document.getElementById("auth-section");
    const signupSection = document.getElementById("signup-section");
    const showSignup = document.getElementById("show-signup");
    const showLogin = document.getElementById("show-login");

    showSignup.addEventListener("click", function(event) {
        event.preventDefault();
        authSection.style.display = "none";
        signupSection.style.display = "block";
    });

    showLogin.addEventListener("click", function(event) {
        event.preventDefault();
        signupSection.style.display = "none";
        authSection.style.display = "block";
    });

    document.getElementById("login-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                window.location.href = "studentDashboard.html"; // Redirect to the student dashboard
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert('Error logging in');
        }
    });

    document.getElementById("signup-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        const fullName = document.getElementById("full-name").value;
        const department = document.getElementById("department").value;
        const course = document.getElementById("course").value;
        const email = document.getElementById("email").value;
        const studentId = document.getElementById("student-id").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, department, course, email, studentId, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                window.location.href = "studentDashboard.html"; // Redirect to the student dashboard
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert('Error signing up');
        }
    });
});
