const { Booking } = require('../models/index');
const { StatusCodes } = require('http-status-codes');

const { ValidationError, AppError } = require('../utils/error/index');

class BookingRepository{

    async create(data){
        try {

            console.log("Repository" , data);
            let booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'Cannot create booking',
                'there was some issue creating the booking , please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }

    }

    async update(data, bookingId){
        try {
            const booking = await Booking.findByPk(bookingId);
            if(booking.status){
                booking.status = data.status
            }
            await booking.save();
            return booking;
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Cannot updata booking',
                'there was some issue update the booking , please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

module.exports = BookingRepository;