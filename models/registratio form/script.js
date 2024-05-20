$(document).ready(function() {
    $('#registration-form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        const formData = {
            name: $('#student-name').val(),
            id: $('#student-id').val(),
            email: $('#email').val(),
            password: $('#password').val()
        };

        // Send form data to the server
        $.ajax({
            type: 'POST',
            url: '/register', // URL of the backend API endpoint
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                // Display registration details
                $('#registration-details').html(`<p>Registration successful! Student ID: ${response.id}</p>`);
            },
            error: function(error) {
                console.error('Error:', error);
                $('#registration-details').html('<p>Registration failed. Please try again.</p>');
            }
        });
    });
});
