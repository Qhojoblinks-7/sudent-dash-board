$(document).ready(function() {
    // Function to get the JWT token from localStorage
    function getToken() {
        return localStorage.getItem('token');
    }

    // Function to load notifications
    function loadNotifications() {
        // Dummy data
        const notifications = [
            { _id: '1', title: 'Notification 1', message: 'This is notification 1', isRead: false },
            { _id: '2', title: 'Notification 2', message: 'This is notification 2', isRead: true },
            { _id: '3', title: 'Notification 3', message: 'This is notification 3', isRead: false }
        ];

        // Render notifications
        let notificationsHtml = '';
        notifications.forEach(notification => {
            notificationsHtml += `
                <div class="notification ${notification.isRead ? '' : 'unread'}" data-id="${notification._id}">
                    <h5>${notification.title}</h5>
                    <p>${notification.message}</p>
                    <button class="btn btn-primary mark-as-read" data-id="${notification._id}">Mark as read</button>
                </div>
            `;
        });
        $('#notifications-list').html(notificationsHtml);
    }

    // Click event handler for marking notification as read
    $(document).on('click', '.mark-as-read', function() {
        const notificationId = $(this).data('id');
        // Here you can make an AJAX request to mark the notification as read
        // For the sake of simplicity in this example, we won't implement it
        console.log('Notification marked as read:', notificationId);
    });

    // Load notifications when the document is ready
    loadNotifications();
});