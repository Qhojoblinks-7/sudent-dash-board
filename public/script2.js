$(document).ready(function() {
    function getToken() {
        return localStorage.getItem('token');
    }

    // Dummy data for categories
    const dummyCategories = [
        { name: 'Fiction' },
        { name: 'Science Fiction' },
        { name: 'Mystery' },
        { name: 'Fantasy' },
        { name: 'Romance' }
    ];

    // Dummy data for books
    const dummyBooks = [
        { 
            _id: '1',
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            coverImage: 'mock-cover-image.jpg'
        },
        { 
            _id: '2',
            title: '1984',
            author: 'George Orwell',
            coverImage: 'mock-cover-image.jpg'
        },
        { 
            _id: '3',
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            coverImage: 'mock-cover-image.jpg'
        },
        { 
            _id: '4',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            coverImage: 'mock-cover-image.jpg'
        },
        { 
            _id: '5',
            title: 'Brave New World',
            author: 'Aldous Huxley',
            coverImage: 'mock-cover-image.jpg'
        }
    ];

    function loadCategories() {
        // Replace this line with code to load categories from the server
        // For now, use the dummyCategories array
        let categoriesList = '';
        dummyCategories.forEach(category => {
            categoriesList += `<li class="list-group-item">${category.name}</li>`;
        });
        $('#categories-list').html(categoriesList);
    }

    function loadBooks(books, targetElement) {
        let booksHtml = '';
        books.forEach(book => {
            booksHtml += `
                <div class="col-md-4">
                    <div class="book-card">
                        <img src="${book.coverImage}" alt="${book.title}">
                        <h5>${book.title}</h5>
                        <p>by ${book.author}</p>
                        <button class="btn btn-primary borrow-book" data-id="${book._id}">Borrow</button>
                        <button class="btn btn-secondary return-book" data-id="${book._id}">Return</button>
                    </div>
                </div>
            `;
        });
        $(targetElement).html(booksHtml);
    }

    loadCategories();
    loadBooks(dummyBooks, '#new-arrivals-list');
    loadBooks(dummyBooks, '#popular-books-list');
});
