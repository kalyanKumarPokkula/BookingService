const { BookingRepository } = require('../repository/index');
const axios = require('axios');

const { FLIGHT_SERVICE_PATH } = require('../config/serverconfig');
const { ServiceError } = require('../utils/error');

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    } 

    async create(data){
        try {
            // console.log("service" , data);
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            // console.log("service " , flightData);
            const priceOftheflight = flightData.price;
            if(data.NoOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrong in the booking process' ,'Insufficient seats in the flight')
            }
            const TotalCost = priceOftheflight * data.NoOfSeats;
            // console.log("service " , TotalCost);
            const bookingpayload = {...data , TotalCost};
            // console.log("service" , bookingpayload);
            const booking = await this.bookingRepository.create(bookingpayload);
            // console.log("Booking " ,booking );
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            const updateResponse = await axios.patch(updateFlightRequestURL ,{totalSeats : flightData.totalSeats - data.NoOfSeats});
            // console.log("service " ,updateResponse);
            const finalBooking = await this.bookingRepository.update({status : "Booked"},booking.id);
            return finalBooking;

        } catch (error) {
            console.log(error);
            if(error.name == "ValidationError"  || error.name == "RepositoryError"){
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService