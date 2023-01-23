const express =  require('express');
const bodyparser = require('body-parser');
const { PORT } = require('./config/serverconfig');
const APIROUTES = require('./routes/index');


const SetupandStartServer = () =>{

    const app = express();

    app.use('/api' , APIROUTES);

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended : true}));

    app.listen(PORT , () => {
        console.log(`Server started at port ${PORT}`);
    })

}

SetupandStartServer();