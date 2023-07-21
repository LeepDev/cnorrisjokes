var express = require('express');
var router = express.Router();
const fetch = require('node-fetch')
const token = process.env.GITHUB_TOKEN;

const ROOT_URL = 'https://api.chucknorris.io'

/* GET home page. */
router.get('/', async function(req, res, next) {  
  // await results in the resolved value being returned!
  // The res.json() promise is what's being awaited 
  let jokeUrl = ''
  const category = req.query.categ
  if (!category)
    jokeUrl = `${ROOT_URL}/jokes/random`
  else
    jokeUrl = `${ROOT_URL}/jokes/random?category=${category}`
  console.log(jokeUrl)

  const rJoke = await fetch(jokeUrl)
    .then(res => res.json());

  const categ = await fetch(`${ROOT_URL}/jokes/categories`)
    .then(res => res.json());
  res.render('index', { rJoke, categ, category });
});

// let userData
// fetch(`${ROOT_URL}/users/${username}`, options)
//   .then(res => res.json())
//   .then(userInfo => {
//     userData = userInfo
//     return fetch(userData.repos_url, options);
//   })
//   .then(res=>res.json())
//   .then(repos => {
//     console.log(repos[0]);
//     res.render('index', { userData })
//   })
module.exports = router;
