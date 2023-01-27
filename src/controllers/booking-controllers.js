const { StatusCodes } = require('http-status-codes');
const { BookingService } = require('../services/index');

const bookingservice  = new BookingService();

const create = async (req ,res) => {
    try {
        console.log("controller" , req.body);
        console.log("controller" , req.query);
        let response = await bookingservice.create(req.query);
        return res.status(StatusCodes.OK).json({
            data : response,
            message : "Successfully Fetched a flight",
            success : true,
            error : {}
        })
    } catch (error) {
        return res.status(error.statuscodes).json({
            message : error.message,
            success : false,
            data : {},
            error : error.explanation
            
        })
    }
}

module.exports = {
    create
}