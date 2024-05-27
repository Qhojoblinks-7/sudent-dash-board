$(document).ready(function() {
    // Function to get the JWT token from localStorage
    function getToken() {
        return localStorage.getItem('token');
    }

    // Function to load complaints
    function loadComplaints() {
        // Dummy data
        const complaints = [
            {
                _id: '1',
                complaint: 'Internet connection is very slow in my room',
                date: '2024-05-26T10:00:00Z',
                replies: [
                    {
                        repliedBy: { fullName: 'Admin' },
                        reply: 'We are working on improving the internet speed. It should be resolved soon.',
                        date: '2024-05-26T11:00:00Z'
                    }
                ]
            },
            {
                _id: '2',
                complaint: 'The library hours are not suitable for me',
                date: '2024-05-25T09:00:00Z',
                replies: [
                    {
                        repliedBy: { fullName: 'Librarian' },
                        reply: 'We understand your concern. We will review the library hours.',
                        date: '2024-05-25T10:00:00Z'
                    }
                ]
            },
            {
                _id: '3',
                complaint: 'There is a water leakage issue in the restroom',
                date: '2024-05-24T08:00:00Z',
                replies: [
                    {
                        repliedBy: { fullName: 'Maintenance Team' },
                        reply: 'We will send our team to fix the issue immediately.',
                        date: '2024-05-24T09:00:00Z'
                    }
                ]
            }
        ];

        // Render complaints
        let complaintsList = '';
        complaints.forEach(complaint => {
            let repliesList = '';
            complaint.replies.forEach(reply => {
                repliesList += `
                    <li class="list-group-item">
                        <p><strong>${reply.repliedBy.fullName}:</strong> ${reply.reply}</p>
                        <small class="text-muted">${new Date(reply.date).toLocaleString()}</small>
                    </li>
                `;
            });

            complaintsList += `
                <li class="list-group-item complaint-card">
                    <p>${complaint.complaint}</p>
                    <small class="text-muted">${new Date(complaint.date).toLocaleString()}</small>
                    <ul class="list-group replies mt-3">${repliesList}</ul>
                </li>
            `;
        });
        $('#complaints-list').html(complaintsList);
    }

    // Load complaints when the page is ready
    loadComplaints();
});