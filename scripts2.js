document.addEventListener('DOMContentLoaded', function () {
    // Dummy data for past courses
    var pastCourses = [
        { course: "Communication Skills", grade: "A+", creditHours: 3},
        { course: "African Studies", grade: "B+" ,creditHours: 3},
        { course: "Statistical Methods 101", grade: "A" ,creditHours: 3},
        { course: "Mathematics in Computer Science", grade: "A" ,creditHours: 3},
        { course: "Introduction to Computer Programming", grade: "A", creditHours: 3},
        { course: "Electrical Circuit", grade: "B+" ,creditHours: 3},
        { course: "Fundamentals to Computing", grade: "A", creditHours: 3},
    ];

    // Populate past courses table
    var pastCoursesTable = document.getElementById('past-courses');
    pastCourses.forEach(function(course) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.course}</td>
            <td>${course.grade}</td>
            <td>${course.creditHours}</td>
        `;
        pastCoursesTable.appendChild(row);
    });

    // Dummy data for current courses
    var currentCourses = [
        {course: 'Physics 101', progress: 75, meetings: 20},
        {course: 'Chemistry 101', progress: 60, meetings: 18},
        {course: 'Math 201', progress: 90, meetings: 22}
    ];

    // Populate current courses
    var currentCoursesContainer = document.getElementById('current-courses');
    currentCourses.forEach(function(course) {
        var courseElement = document.createElement('div');
        courseElement.classList.add('mb-2');
        courseElement.innerHTML = `
            <h6>${course.course}</h6>
            <div class="progress mb-1">
                <div class="progress-bar" role="progressbar" style="width: ${course.progress}%;" aria-valuenow="${course.progress}" aria-valuemin="0" aria-valuemax="100">${course.progress}%</div>
            </div>
            <p>Meetings: ${course.meetings}</p>
        `;
        currentCoursesContainer.appendChild(courseElement);
    });

    // Function to update time
    function updateTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        // Format time as HH:MM:SS
        var timeString = hours.toString().padStart(2, '0') + ':' +
                         minutes.toString().padStart(2, '0') + ':' +
                         seconds.toString().padStart(2, '0');
        document.getElementById('current-time').textContent = timeString;
        document.getElementById('am-pm').textContent = ampm;
    }

    // Initial call to display time immediately
    updateTime();

    // Update time every second
    setInterval(updateTime, 1000);

    // Dummy data for upcoming classes
    var upcomingClasses = [
        {time: '9:00 AM', class: 'Math 201'},
        {time: '11:00 AM', class: 'English 101'},
        {time: '1:00 PM', class: 'Physics 201'}
    ];

    // Populate upcoming classes table
    var upcomingClassesTable = document.getElementById('upcoming-classes');
    upcomingClasses.forEach(function(upcomingClass) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${upcomingClass.time}</td>
            <td>${upcomingClass.class}</td>
        `;
        upcomingClassesTable.appendChild(row);
    });

    // Academic Performance Chart
    var ctx = document.getElementById('academicPerformanceChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
            datasets: [{
                label: 'GPA',
                data: [3.2, 3.5, 3.7, 3.8],
                borderColor: 'rgb(18, 10, 225)',
                backgroundColor: 'rgba(18, 10, 225, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { display: true, title: { display: true, text: 'Semesters' }},
                y: { display: true, title: { display: true, text: 'GPA' }}
            }
        }
    });

    function adjustLayout() {
        const header = document.getElementById('header');
        const mainContent = document.getElementById('main-content');

        if (window.innerWidth >= 768 && window.innerHeight >= 1024) {
            // Larger screens
            header.style.position = 'fixed';
            header.style.width = '150px';
            header.style.height = '100vh';
            header.style.top = '0';
            header.style.left = '0';
            header.style.flexDirection = 'column';

            mainContent.style.marginLeft = '160px';
            mainContent.style.paddingTop = '20px';
        } else {
            // Smaller screens
            header.style.position = 'relative';
            header.style.width = '100%';
            header.style.height = 'auto';
            header.style.flexDirection = 'row';

            mainContent.style.marginLeft = '0';
            mainContent.style.paddingTop = '70px';
        }
    }

    adjustLayout();

    window.addEventListener('resize', adjustLayout);
});










/*document.addEventListener('DOMContentLoaded', function() {
    // Dummy data for past courses
    var pastCourses = [
        {course: 'Math 101', grade: 'A', creditHours: 3},
        {course: 'Biology 101', grade: 'B+', creditHours: 4},
        {course: 'Chemistry 101', grade: 'A-', creditHours: 3}
    ];

    // Function to calculate GPA
    function calculateGPA(courses) {
        var totalQualityPoints = 0;
        var totalCreditHours = 0;
        courses.forEach(function(course) {
            var gradePoints = 0;
            switch (course.grade) {
                case 'A': gradePoints = 4; break;
                case 'B+': gradePoints = 3.5; break;
                case 'B': gradePoints = 3; break;
                case 'C+': gradePoints = 2.5; break;
                case 'C': gradePoints = 2; break;
                case 'D+': gradePoints = 1.5; break;
                case 'D': gradePoints = 1; break;
                default: gradePoints = 0;
                }
                totalQualityPoints += gradePoints * course.creditHours;
                totalCreditHours += course.creditHours;
                });
                return totalQualityPoints / totalCreditHours;
                }
                    // Function to calculate CGPA
                    function calculateCGPA() {
                        return (calculateGPA(pastCourses) + Math.random() * 0.5).toFixed(2); // Random CGPA
                    }
                
                    // Populate GPA and CGPA
                    document.getElementById('gpa').textContent = calculateGPA(pastCourses).toFixed(2);
                    document.getElementById('cgpa').textContent = calculateCGPA();
                
                    // Dummy data for academic performance chart
                    function generateRandomGPAs(num) {
                        var gpas = [];
                        for (var i = 0; i < num; i++) {
                            gpas.push((Math.random() * 4).toFixed(2));
                        }
                        return gpas;
                    }
                
                    // Update academic performance chart
                    function updateAcademicPerformanceChart() {
                        var ctx = document.getElementById('academicPerformanceChart').getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
                                datasets: [{
                                    label: 'GPA',
                                    data: generateRandomGPAs(4), // Generate random GPAs for 4 semesters
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    fill: true
                                }]
                            },
                            options: {
                                responsive: true,
                                scales: {
                                    x: { display: true, title: { display: true, text: 'Semesters' }},
                                    y: { display: true, title: { display: true, text: 'GPA' }}
                                }
                            }
                        });
                    }
                
                    updateAcademicPerformanceChart();
                
                    // Dummy data for upcoming classes
                    var upcomingClasses = [
                        {time: '9:00 AM', class: 'Math 201', duration: 60},
                        {time: '11:00 AM', class: 'English 101', duration: 60},
                        {time: '1:00 PM', class: 'Physics 201', duration: 60}
                    ];
                
                    // Populate upcoming classes table
                    var upcomingClassesTable = document.getElementById('upcoming-classes').querySelector('tbody');
                    upcomingClasses.forEach(function(upcomingClass) {
                        var row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${upcomingClass.time}</td>
                            <td>${upcomingClass.class}</td>
                        `;
                        row.setAttribute('data-time', upcomingClass.time);
                        row.setAttribute('data-duration', upcomingClass.duration);
                        upcomingClassesTable.appendChild(row);
                    });
                
                    // Academic Performance Chart
                    var ctx = document.getElementById('academicPerformanceChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
                            datasets: [{
                                label: 'GPA',
                                data: [3.2, 3.5, 3.7, 3.8],
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                fill: true
                            }]
                        },
                        options: {
                            responsive: true,
                            scales: {
                                x: { display: true, title: { display: true, text: 'Semesters' }},
                                y: { display: true, title: { display: true, text: 'GPA' }}
                            }
                        }
                    });
                
                    // Navigation buttons for semesters
                    var currentSem = 1; // Example current semester
                    document.getElementById('prev-sem-btn').addEventListener('click', function() {
                        if (currentSem > 1) {
                            currentSem--;
                            updateAcademicPerformanceGraph(currentSem);
                        }
                    });
                
                    document.getElementById('next-sem-btn').addEventListener('click', function() {
                        if (currentSem < 4) { // Assuming 4 semesters for example
                            currentSem++;
                            updateAcademicPerformanceGraph(currentSem);
                        }
                    });
                
                    function updateAcademicPerformanceGraph(sem) {
                        // Example update logic, replace with actual data retrieval and update
                        myChart.data.datasets[0].data = [Math.random() * 4, Math.random() * 4, Math.random() * 4, Math.random() * 4];
                        myChart.update();
                    }
                
                    // Function to remove past classes
                    function removePastClasses() {
                        var now = new Date();
                        var upcomingClassesRows = document.querySelectorAll('#upcoming-classes tbody tr');
                        upcomingClassesRows.forEach(function(row) {
                            var classTime = row.getAttribute('data-time');
                            var duration = parseInt(row.getAttribute('data-duration'), 10);
                            var classEndTime = new Date(now.toDateString() + ' ' + classTime);
                            classEndTime.setMinutes(classEndTime.getMinutes() + duration);
                            if (now > classEndTime) {
                                row.style.display = 'none';
                            }
                        });
                    }
                
                    // Call removePastClasses function periodically
                    setInterval(removePastClasses, 60000); // Check every minute
                    removePastClasses(); // Initial call to remove already past classes
                });*/