// Always significant to understand what and how to import
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground'); // Two initial dots bcz we need to back out one bcz of directories

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)]; // return random element from the array and save it in sample


const seedDB = async () => {
    await Campground.deleteMany({}); // Delete everything and below we created new stuff
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '669118c2942b648dc19723f5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`, // randomly created the cities with the help of arrays in cities and seedHelpers
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit repellendus voluptatum quos cupiditate error, adipisci eaque atque sit expedita? Nihil, aperiam eius. Eveniet vero dicta alias tenetur dolore ab sed?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dotdmisz3/image/upload/v1721592584/YelpCamp/sv8owog7xngzmlyqs2xw.jpg',
                    filename: 'YelpCamp/sv8owog7xngzmlyqs2xw'
                }
            ],
        })
        await camp.save();// Then saved it
    }
}
// We will get 50 new campgrounds

seedDB().then(() => {
    mongoose.connection.close(); // Closes the database connection
    /*we cannot access data from the database after closing the connection.
    Colt closed the connection only in the seeds file when we are uploading data for the first time.
    But now colt is running the app.js file which again connects to the database 
    and now we can again access the data. */
})
