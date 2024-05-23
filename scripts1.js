document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('header nav');

    burgerMenu.addEventListener('click', function () {
        burgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
    });

    const pastCourses = [
        { course: "Communication Skills", grade: "A+", creditHours: 3 },
        { course: "African Studies", grade: "B+", creditHours: 3 },
        { course: "Statistical Methods 101", grade: "A", creditHours: 3 },
        { course: "Mathematics in Computer Science", grade: "A", creditHours: 3 },
        { course: "Introduction to Computer Programming", grade: "A", creditHours: 3 },
        { course: "Electrical Circuit", grade: "B+", creditHours: 3 },
        { course: "Fundamentals to Computing", grade: "A", creditHours: 3 },
    ];

    const currentCourses = [
        { course: 'Computer Hardware 108', progress: 0, meetings: 24, days: ['Monday'] },
        { course: 'Communication Skills 102', progress: 0, meetings: 24, days: ['Tuesday'] },
        { course: 'Mathematics for Computer Science 106', progress: 0, meetings: 24, days: ['Monday'] },
        { course: 'OOP in JAVA 104', progress: 0, meetings: 24, days: ['Tuesday'] },
        { course: 'EEE101 Introduction to Electronics', progress: 0, meetings: 24, days: ['Monday'] },
        { course: 'Introduction To Computing II 101', progress: 0, meetings: 24, days: ['Friday'] },
        { course: 'Statistical Methods II 102', progress: 0, meetings: 24, days: ['Friday'] },
    ];

    const upcomingClasses = [
        { day: 'Monday', time: '7:00 AM - 10:00 AM', class: 'Computer Hardware 108' },
        { day: 'Tuesday', time: '2:00 AM - 4:00 PM', class: 'Communication Skills 102' },
        { day: 'Monday', time: '3:00 PM - 5:00 PM', class: 'Discrete Maths for Computer Science' },
        { day: 'Tuesday', time: '11:00 AM - 1:00 PM', class: 'OOP in JAVA' },
        { day: 'Monday', time: '11:00 AM - 1:00 PM', class: 'EEE101 Introduction To Electronics' },
        { day: 'Friday', time: '11:00 AM - 1:00 PM', class: 'Introduction To Computing 101' },
        { day: 'Friday', time: '2:00 PM - 5:00 PM', class: 'Statistical Methods II 102' },
    ];

    const pastCoursesTable = document.getElementById('past-courses');
    pastCourses.forEach(function (course) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.course}</td>
            <td>${course.grade}</td>
            <td>${course.creditHours}</td>
        `;
        pastCoursesTable.appendChild(row);
    });

    const currentCoursesContainer = document.getElementById('current-courses');
    currentCourses.forEach(function (course) {
        course.progress = calculateCourseProgress(course);
        const courseElement = document.createElement('div');
        courseElement.classList.add('current-course');
        courseElement.innerHTML = `
            <h5>${course.course}</h5>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${course.progress}%;" aria-valuenow="${course.progress}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <p>Progress: ${course.progress}%</p>
        `;
        currentCoursesContainer.appendChild(courseElement);
    });

    const upcomingClassesContainer = document.getElementById('upcoming-classes');

    function updateUpcomingClasses() {
        console.log("Updating upcoming classes...");
        upcomingClassesContainer.innerHTML = '';
        const now = new Date();
        upcomingClasses.sort((a, b) => {
            const timeA = parseClassTime(a.day, a.time);
            const timeB = parseClassTime(b.day, b.time);
            return timeA - timeB;
        });
        upcomingClasses.forEach(function (upcomingClass) {
            const startTime = parseClassTime(upcomingClass.day, upcomingClass.time);
            if (startTime > now) {
                console.log("Adding upcoming class to table:", upcomingClass);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${upcomingClass.time}</td>
                    <td>${upcomingClass.class}</td>
                `;
                upcomingClassesContainer.appendChild(row);
            } else {
                console.log("Skipping past/upcoming class:", upcomingClass);
            }
        });
    }

    updateUpcomingClasses();
    setInterval(updateUpcomingClasses, 60000);

    function calculateCourseProgress(course) {
        const now = new Date();
        let attendedMeetings = 0;
        course.days.forEach(function (day) {
            const dayOfWeek = getDayOfWeek(day);
            let startDate = new Date(now.getFullYear(), 0, 1);
            const dayOffset = (dayOfWeek - startDate.getDay() + 7) % 7;
            const firstMeeting = new Date(startDate.setDate(startDate.getDate() + dayOffset));
            for (let i = 0; i < course.meetings; i++) {
                const meetingDate = new Date(firstMeeting);
                meetingDate.setDate(firstMeeting.getDate() + (7 * i));
                if (meetingDate <= now) {
                    attendedMeetings++;
                }
            }
        });
        const progress = (attendedMeetings / course.meetings) * 100;
        return progress.toFixed(2);
    }

    function getDayOfWeek(day) {
        switch (day.toLowerCase()) {
            case 'sunday': return 0;
            case 'monday': return 1;
            case 'tuesday': return 2;
            case 'wednesday': return 3;
            case 'thursday': return 4;
            case 'friday': return 5;
            case 'saturday': return 6;
        }
    }

    function updateTime() {
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const amPm = now.getHours() >= 12 ? 'PM' : 'AM';
        document.getElementById('current-time').textContent = `${hours}:${minutes}`;
        document.getElementById('am-pm').textContent = amPm;
    }
    updateTime();
    setInterval(updateTime, 60000);

    var ctx = document.getElementById('academicPerformanceChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
            datasets: [{
                label: 'GPA',
                data: [1.5, 3.2, 3.5, 3.7],
                borderColor: 'rgb(18, 10, 225)',
                backgroundColor: 'rgba(18, 10, 225, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { display: true, title: { display: true, text: 'Semesters' } },
                y: { display: true, title: { display: true, text: 'GPA' } }
            }
        }
    });
});

function parseClassTime(day, timeString) {
    const [startTimeStr, endTimeStr] = timeString.split(' - ');
    const [startHours, startMinutes] = parseTime(startTimeStr);
    const [endHours, endMinutes] = parseTime(endTimeStr);

    const now = new Date();
    const dayOfWeek = getDayOfWeek(day);
    const currentDayOfWeek = now.getDay();
    const dayOffset = (dayOfWeek + 7 - currentDayOfWeek) % 7;

    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset, startHours, startMinutes);
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset, endHours, endMinutes);

    return startTime;
}

function parseTime(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    return [hours, minutes];
}

function getDayOfWeek(day) {
    switch (day.toLowerCase()) {
        case 'sunday': return 0;
        case 'monday': return 1;
        case 'tuesday': return 2;
        case 'wednesday': return 3;
        case 'thursday': return 4;
        case 'friday': return 5;
        case 'saturday': return 6;
    }
}










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