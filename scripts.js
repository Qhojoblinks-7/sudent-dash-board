        // This event listener ensures that the JavaScript code executes only after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Replace '123456' with the actual student ID
    const studentId = '123456'; 

    // Fetch and display student data
    fetchStudentData(studentId);

    // Fetch and display current courses
    fetchCurrentCourses(studentId);

    // Fetch and display course grades
    fetchCourseGrades(studentId);

    // Display statistical data in a chart
    displayPerformanceChart();

    // Event listener for previous semesters button
    document.getElementById('previous-semester').addEventListener('click', function() {
        // Fetch and display previous semesters' data
        fetchPreviousSemesters(studentId);
    });

    // Event listener for next semesters button
    document.getElementById('next-semester').addEventListener('click', function() {
        // Fetch and display next semesters' data
        fetchNextSemesters(studentId);
    });
});

// Function to fetch student data from the backend
function fetchStudentData(studentId) {
    fetch(`/api/students/${studentId}`)
        .then(response => response.json())
        .then(student => {
            // Update the student name
            document.getElementById('student-name').textContent = student.name;

            // Update the profile picture
            document.querySelector('.profile-pic').src = student.profilePic;

            // Update the student ID
            document.getElementById('student-id').textContent = `#${studentId}`;
        })
        .catch(error => console.error('Error fetching student data:', error));
}

// Function to fetch and display current courses
function fetchCurrentCourses(studentId) {
    // Dummy data for demonstration
    const courses = [
        { name: 'Mathematics', code: 'MATH101', time: '8:00 AM - 10:00 AM', location: 'Lecture Hall A' },
        { name: 'Physics', code: 'PHYS201', time: '10:30 AM - 12:30 PM', location: 'Lecture Hall B' },
        { name: 'Chemistry', code: 'CHEM301', time: '1:00 PM - 3:00 PM', location: 'Lecture Hall C' }
    ];

    const coursesList = document.getElementById('courses-list');
    coursesList.innerHTML = '';

    // Populate the table with current courses data
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

// Function to fetch and display course grades
function fetchCourseGrades(studentId) {
    // Dummy data for demonstration
    const coursesWithGrades = [
        { name: "Communication Skills", grade: "A" },
        { name: "African Studies", grade: "B+" },
        { name: "Statistical Methods 101", grade: "A-" },
        { name: "Mathematics in Computer Science", grade: "A+" },
        { name: "Introduction to Computer Programming", grade: "A+" },
        { name: "Electrical Circuit", grade: "B+" },
        { name: "Fundamentals to Computing", grade: "A+" }
    ];

    const coursesGradesList = document.getElementById('courses-grades-list');
    coursesGradesList.innerHTML = '';

    // Populate the list with courses and grades data
    coursesWithGrades.forEach(course => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${course.name}: ${course.grade}`;
        coursesGradesList.appendChild(listItem);
    });
}

// Function to fetch previous semesters' data
function fetchPreviousSemesters(studentId) {
    // Placeholder for fetching previous semesters' data from the backend
    console.log('Fetching previous semesters for student:', studentId);
}

// Function to fetch next semesters' data
function fetchNextSemesters(studentId) {
    // Placeholder for fetching next semesters' data from the backend
    console.log('Fetching next semesters for student:', studentId);
}

// Function to display statistical data in a chart
function displayPerformanceChart() {
    // Get the context of the canvas element where the chart will be drawn
    const ctx = document.getElementById('performanceChart').getContext('2d');

    // Create a new chart instance
    const chart = new Chart(ctx, {
        type: 'line', // Line chart type
        data: {
            labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'], // X-axis labels
            datasets: [{
                label: 'GPA', // Label for the dataset
                data: [3.4, 3.6, 3.8, 3.9], // Dummy GPA data (replace with actual data)
                borderColor: 'rgba(75, 192, 192, 1)', // Border color for the line
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color for the area under the line
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
