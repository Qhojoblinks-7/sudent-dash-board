---

# Student Dashboard Application
---

This project aims to create a comprehensive student dashboard tailored for use at Accra Technical University. The dashboard provides students with essential information regarding their current courses, grades, academic performance, and access to important school resources. It's primarily developed to enhance my industry experience and serve as a personal project.

## Features

- **Profile Card**: Displays the student's name, ID, and profile picture.
- **Current Courses**: Lists the courses the student is currently enrolled in, including course code, time, and location.
- **Current Semester Courses and Grades**: Allows students to view their current semester courses along with their grades.
- **Academic Performance**: Provides a graphical representation of the student's academic performance.
- **School Resources**: Offers links to various resources such as newsletters, announcements, reports, library, classes, and more.
- **Frequently Asked Questions (FAQs)**: Provides answers to common questions students may have.
- **Complaints System**: Allows students to submit complaints and view replies.
- **Notifications**: Displays notifications related to the student's activities.
- **Virtual Library**: Provides access to the library's resources and allows book borrowing and returning.
- **Replies**: Enables students to reply to complaints.
- **Financial Management**: Manages and displays financial information for the students.

## Technology Stack

- **Frontend**: HTML, CSS (Bootstrap), JavaScript (jQuery), Chart.js
- **Backend**: Node.js (Express.js)
- **Database**: MongoDB (with Mongoose ORM)
- **Other Tools**: Axios (for HTTP requests), Cors (for enabling Cross-Origin Resource Sharing)

## Getting Started

### Prerequisites

- Ensure you have Node.js and MongoDB installed on your system.

### Installation

1. Clone this repository to your local machine:
   ```sh
   git clone https://github.com/yourusername/student-dashboard.git
   ```
2. Navigate to the project directory:
   ```sh
   cd student-dashboard
   ```
3. Install dependencies using npm:
   ```sh
   npm install
   ```

### Database Setup

1. Ensure MongoDB is running on your local machine.

2. Seed the database with initial FAQs:
   ```sh
   node seedFaqs.js
   ```

### Running the Application

1. Start the server:
   ```sh
   npm start
   ```
2. Open your web browser and navigate to `http://localhost:3000` to access the student dashboard.

## Project Structure

- **/public**: Contains static files such as images and client-side JavaScript.
  - **faqs.js**: Handles loading and displaying FAQs.
  - **complaints.js**: Manages complaint submissions and displaying replies.
  - **notifications.js**: Handles fetching and displaying notifications.
  - **virtualLibrary.js**: Manages library resources, borrowing, and returning books.
  - **replies.js**: Handles replies to complaints.
  - **studentDashboard.js**: Manages the main dashboard functionalities.
  - **financialManagement.js**: Manages and displays financial information.
- **/routes**: Defines route handlers for various API endpoints.
- **/models**: Contains Mongoose models for interacting with MongoDB.
- **/views**: Contains HTML files for rendering the frontend of the application.
  - **faqs.html**: FAQ page.
  - **complaints.html**: Complaints submission and viewing page.
  - **notifications.html**: Notifications page.
  - **virtualLibrary.html**: Virtual library page.
  - **replies.html**: Replies to complaints page.
  - **studentDashboard.html**: Main student dashboard.
  - **financialManagement.html**: Financial management page.
- **server.js**: Entry point for the Node.js server.
- **seedFaqs.js**: Script to seed the database with initial FAQ data.

## Contributing

Contributions to this project are currently not open to external contributors. However, if you have suggestions or feedback, feel free to create an issue or reach out to me directly.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Immanuel Eshun Quansah**  
- Email: immanueleshun9@gmail.com
- Whatsapp: +233592558160

## Acknowledgment

This project is developed independently as a personal endeavor to gain industry experience.

---

By following these updated instructions, you should be able to set up and run the student dashboard application successfully, complete with the new pages and features.
