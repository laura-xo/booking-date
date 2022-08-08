const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
     
  },

  date: {
    type: String,
    
  }
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;