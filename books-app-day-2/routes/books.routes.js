const router = require("express").Router()

const Book = require('./../models/Book.model')



// ------------------
// Book listing
// ------------------

router.get('/listado', (req, res) => {

    Book
        .find()
        .select('title')
        .then(books => {
            res.render('books/books-list', { books })
        })
        .catch(err => console.log(err))
})


router.get('/detalles/:book_id', (req, res) => {

    const { book_id } = req.params

    Book
        .findById(book_id)
        .then(book => {
            res.render('books/book-details', book)
        })
        .catch(err => console.log(err))
})





// ------------------
// Book creation
// ------------------

router.get('/crear', (req, res) => {
    res.render('books/create-book')
})

router.post('/crear', (req, res) => {

    const { title, description, author, rating } = req.body

    Book
        .create({ title, description, rating, author })
        .then(newBook => {
            res.redirect(`/libros/detalles/${newBook._id}`)
        })
        .catch(err => console.log(err))
})





// ------------------
// Book edition 
// ------------------

router.get('/editar', (req, res) => {

    const { book_id } = req.query

    Book
        .findById(book_id)
        .then(book => {
            res.render('books/edit-book', book)
        })
        .catch(err => console.log(err))
})

router.post('/editar', (req, res) => {

    const { book_id } = req.query
    const { title, description, author, rating } = req.body

    Book
        .findByIdAndUpdate(book_id, { title, description, author, rating })
        .then(book => {
            res.redirect(`/libros/detalles/${book._id}`)
        })
        .catch(err => console.log(err))
})





// ------------------
// Book deletion 
// ------------------

router.post('/eliminar', (req, res) => {

    const { book_id } = req.query

    Book
        .findByIdAndDelete(book_id)
        .then(() => {
            res.redirect('/libros/listado')
        })
        .catch(err => console.log(err))
})


module.exports = router