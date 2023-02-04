const { StatusCodes } = require('http-status-codes');
const { BookingService } = require('../services/index');
const { REMINDER_BINDING_KEY } = require('../config/serverconfig');
const { Createchannel , publishMessage} = require('../utils/messagequeue');


const bookingservice  = new BookingService();

class BookingController{

    constructor(){

    }

    async sendMessageToQueue(req ,res){
        const channel = await Createchannel();
        const message = {message : 'success'};
        publishMessage(channel , REMINDER_BINDING_KEY , JSON.stringify(message));
        return res.status(200).json({
            message : "Successfully published a event"
        })



    }
    async create(req ,res)  {
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
}

module.exports = BookingController;