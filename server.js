'use strict'

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
const pg = require('pg');
require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get ('/', newSearch);
app.post('/searches', searchForBooks);

function newSearch(req, res) {
  res.render('index');
}

function searchForBooks(req, res) {
  const thingUserSearchedFor = req.body.search[0];
  const typeOfSearch = req.body.search[1];

  let url = `https://www.googleapis.com/books/v1/volumes?q=`;

  if (typeOfSearch === 'title') {
    url += `+intitle:${thingUserSearchedFor}`
  }
  if (typeOfSearch === 'author') {
    url += `+inauthor:${thingUserSearchedFor}`
  }
  superagent.get(url)
    .then(results => {
      console.log('return from google books:', results.body.items);
      const bookArray = results.body.items.map(book => {
        return new Book(book.volumeInfo);
      })
    })
    res.status(200).render('searches/show');
}

function Book(bookObj) {
  const placeholderImage = `https://www.freeiconspng.com/uploads/book-icon--icon-search-engine-6.png`;
  this.title = bookObj.title || 'no book title available';
  this.author = bookObj.author;
  this.description = bookObj.description;
}


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})


