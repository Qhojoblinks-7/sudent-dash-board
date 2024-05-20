// This event listener ensures that the JavaScript code executes only after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Replace '123456' with the actual student ID
    const studentId = '1232268D';

    // Fetch and display student data
    fetchStudentData(studentId);

    // Fetch and display current courses
    fetchCurrentCourses(studentId);

    // Fetch and display course grades
    fetchCourseGrades(studentId);

    // Display statistical data in a chart
    displayPerformanceChart();
});

// Function to fetch student data from the backend
function fetchStudentData(studentId) {
    // Dummy student data for demonstration
    const studentData = {
        name: "Immauel Quansah Eshun",
        profilePic: "my work.jpg",
    };

    // Update the student name and profile picture
    document.getElementById('student-name').textContent = studentData.name;
    document.querySelector('.profile-pic').src = studentData.profilePic;
    // Update the student ID
    document.getElementById('student-id').textContent = `#${studentId}`;

}

// Function to fetch and display current courses
function fetchCurrentCourses(studentId) {
    // Dummy current courses data for demonstration
    const courses = [
        { name: 'Mathematics', code: 'MATH101', time: '8:00 AM - 10:00 AM', location: 'Lecture Hall A' },
        { name: 'Physics', code: 'PHYS201', time: '10:30 AM - 12:30 PM', location: 'Lecture Hall B' },
        { name: 'Chemistry', code: 'CHEM301', time: '1:00 PM - 3:00 PM', location: 'Lecture Hall C' }
    ];

    // Populate the table with current courses data
    const coursesList = document.getElementById('courses-list');
    coursesList.innerHTML = '';
    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.code}</td>
            <td>${course.time}</td>
            <td>${course.location}</td>
        `;
        coursesList.appendChild(row);
    });
}

// Function to calculate GPA from course grades
function calculateGPA(coursesWithGrades) {
    const gradePoints = {
        "A+": 5.00,
        "A": 4.50,
        "B+": 4.00,
        "B": 3.50,
        "C+": 3.00,
        "C": 2.50,
        "D+": 2.00,
        "D": 1.5,
        "F": 0.0
    };

    let totalGradePoints = 0;
    let totalCredits = 0;

    coursesWithGrades.forEach(course => {
        const creditUnits = 3; // Assuming all courses have 3 credit units
        totalCredits += creditUnits;
        totalGradePoints += gradePoints[course.grade] * creditUnits;
    });

    return totalGradePoints / totalCredits;
}

// Function to fetch and display course grades
function fetchCourseGrades(studentId) {
    // Dummy course grades data for demonstration
    const coursesWithGrades = [
        { name: "Communication Skills", grade: "A+" },
        { name: "African Studies", grade: "B+" },
        { name: "Statistical Methods 101", grade: "A" },
        { name: "Mathematics in Computer Science", grade: "A" },
        { name: "Introduction to Computer Programming", grade: "A" },
        { name: "Electrical Circuit", grade: "B+" },
        { name: "Fundamentals to Computing", grade: "A" }
    ];

    // Populate the list with courses and grades data
    const coursesGradesList = document.getElementById('courses-grades-list');
    coursesGradesList.innerHTML = '';
    coursesWithGrades.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.grade}</td>
        `;
        coursesGradesList.appendChild(row);
    });

    // Calculate and display GPA
    const gpa = calculateGPA(coursesWithGrades);
    document.getElementById('gpa-value').textContent = `GPA: ${gpa.toFixed(2)}`;
}

// Function to display statistical data in a chart
function displayPerformanceChart() {
    // Dummy data for demonstration
    const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
    const gpaData = [1.500,3.20, 3.50, 3.80, 3.60,4.00,5.00]; // GPA values for each semester

    // Get the context of the canvas element where the chart will be drawn
    const ctx = document.getElementById('performanceChart').getContext('2d');

    // Create a new chart instance
    const chart = new Chart(ctx, {
        type: 'line', // Line chart type
        data: {
            labels: semesters, // X-axis labels
            datasets: [{
                label: 'GPA', // Label for the dataset
                data: gpaData, // GPA data
                borderColor: 'rgb(29, 23, 151)', // Border color for the line
                backgroundColor: 'rgba(29, 23, 151, 0.2)', // Background color for the area under the line
                fill: true, // Fill the area under the line
            }]
        },
        options: {
            responsive: true, // Make the chart responsive
            scales: {
                x: {
                    display: true, // Display the X-axis
                    title: {
                        display: true,
                        text: 'Semester' // X-axis title
                    }
                },
                y: {
                    display: true, // Display the Y-axis
                    title: {
                        display: true,
                        text: 'GPA' // Y-axis title
                    }
                }
            }
        }
    });
}
