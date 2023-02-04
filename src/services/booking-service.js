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
            
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            const priceOftheflight = flightData.price;
            if(data.NoOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrong in the booking process' ,'Insufficient seats in the flight')
            }
            const TotalCost = priceOftheflight * data.NoOfSeats;
            const bookingpayload = {...data , TotalCost};
            const booking = await this.bookingRepository.create(bookingpayload);
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            const updateResponse = await axios.patch(updateFlightRequestURL ,{totalSeats : flightData.totalSeats - data.NoOfSeats});
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

    async cancel(data){
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            const userId= data.id;
            const bookingData = await this.bookingRepository.get(data.id);
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            await axios.patch(updateFlightRequestURL , {totalSeats : flightData.totalSeats + bookingData.NoOfSeats});
            const finalBooking = await this.bookingRepository.update({status : "Cancelled"} , bookingData.id);
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