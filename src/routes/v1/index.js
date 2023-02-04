const express = require('express');

const BookingController = require('../../controllers/booking-controllers');
const Bookingcontroller = new BookingController()

const router = express();

router.post('/bookings' , Bookingcontroller.create);
router.post('/publish' , Bookingcontroller.sendMessageToQueue);

module.exports = router

