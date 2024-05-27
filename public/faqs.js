

    


$(document).ready(function() {

// Dummy FAQ Data
    const dummyFAQs = [
        {
            question: "What is Lorem Ipsum?",
            answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            question: "Why do we use it?",
            answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        },
        {
            question: "Where does it come from?",
            answer: "Contrary to popular belief, Lorem Ipsum is not simply random text."
        }
    ];

    function loadFAQs() {
        $.ajax({
            url: '/api/faqs',
            method: 'GET',
            success: function(faqs) {
                let faqsHtml = '';
                dummyFAQs.forEach(faq => {
                    faqsHtml += `
                        <div class="faq">
                            <h5>${faq.question}</h5>
                            <p>${faq.answer}</p>
                        </div>
                    `;
                });
                $('#faqs-list').html(faqsHtml);
            },
            error: function(xhr, status, error) {
                alert('Failed to load FAQs');
            }
        });
    }

    loadFAQs();
});


$(document).ready(function() {

    // Dummy FAQ Data
    const dummyFAQs = [
        {
            question: "What is Lorem Ipsum?",
            answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            question: "Why do we use it?",
            answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        },
        {
            question: "Where does it come from?",
            answer: "Contrary to popular belief, Lorem Ipsum is not simply random text."
        }
    ];
    function loadFAQs() {
        $.ajax({
            url: '/api/faqs',
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            success: function(faqs) {
                let faqsHtml = '';
                faqs.forEach(faq => {
                    faqsHtml += `
                        <div class="faq">
                            <h5>${faq.question}</h5>
                            <p>${faq.answer}</p>
                        </div>
                    `;
                });
                $('#faqs-list').html(faqsHtml);
            },
            error: function(xhr, status, error) {
                alert('Failed to load FAQs');
            }
        });
    }

    loadFAQs();
});
