const express = require('express');

const BookingController = require('../../controllers/booking-controllers');

const router = express();

router.post('/bookings' , BookingController.create);

module.exports = router

