'use strict'

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
const pg = require('pg');
require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;

const client = new pg.Client(process.env.DATABASE_URL);
client.on('err', err => { throw err; });

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get ('/search', newSearch);
app.get('/', getBooks);
app.post('/searches', searchForBooks)

let testArray = [];

function newSearch(req, res) {
  res.render('search');
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
    //   console.log('return from google books:', results.body.items);
      testArray = [];
      results.body.items.map(book => {
        testArray.push( new Book(book.volumeInfo));
        // console.log(testArray);
      })
      res.status(200).render('searches/show', {data: testArray});
    })
}


function Book(bookObj) {
  this.Image = `https://www.freeiconspng.com/uploads/book-icon--icon-search-engine-6.png`;
  this.title = bookObj.title || 'no book title available';
  this.author = bookObj.authors;
  this.description = bookObj.description;
}

function getBooks(req, res) {
  let SQL = 'SELECT * FROM books;';

  return client.query(SQL)
    .then( results => res.render('index', { results: results.rows }))
    // .catch( err => console.error(err));
}



client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  })
  .catch(err => {
    throw `PG startup error ${err.message}`;
  })

