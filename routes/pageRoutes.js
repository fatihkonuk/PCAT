const express = require('express');
const pageController = require('../controllers/pageController');
const route = express.Router();

route.get('/about', pageController.getAboutPage);
route.get('/add', pageController.getAddPage);
route.get('/photos/edit/:id', pageController.getEditPage);

module.exports = route;