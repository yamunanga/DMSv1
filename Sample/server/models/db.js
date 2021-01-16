const mongoose = require('mongoose');
//use find and modify add
mongoose.connect(process.env.MONGODB_URI,{ useFindAndModify: false }, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');
require('./document.model.js');
require('./archivedUsers.model');
require('./message.model');
require('./department.model');
require('./position.model');