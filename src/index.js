const express =  require('express');
const bodyparser = require('body-parser');
const { PORT , FLIGHT_SERVICE_PATH } = require('./config/serverconfig');
const APIROUTES = require('./routes/index');

const { BookingRepository }  = require('./repository/index');
const { BookingService } = require('./services/index');



const SetupandStartServer = () =>{

    const app = express();

    app.use('/api' , APIROUTES);

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended : true}));

    app.listen(PORT , async () => {
        console.log(`Server started at port ${PORT}`);
        // const bookingservice = new BookingService();
        // const cancel = await bookingservice.cancel({flightId : 5 , userId : 5 , id : 1});
        // console.log(cancel);
        
    })

}

SetupandStartServer();