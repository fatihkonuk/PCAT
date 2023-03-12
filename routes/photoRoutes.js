const express = require('express');
const photoController = require('../controllers/photoController');
const route = express.Router();

route.get('/', photoController.getAllPhotos);
route.get('/photos/:id', photoController.getPhoto);
route.post('/photo', photoController.createPhoto);
route.put('/photos/:id', photoController.updatePhoto);
route.delete('/photos/:id', photoController.deletePhoto);

module.exports = route;