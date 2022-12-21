const mongoose = require('mongoose');

// require('dotenv').config();

const cities = require('./cities')
const {descriptors, places} = require('./seedHelper');
const Campground = require('../models/campground');

// 'mongodb://127.0.0.1:27017/yelp-camp';
// const dbUrl = process.env.DB_URL;
// console.log(dbUrl);

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(()=>{
    console.log('db connected')
})
.catch(error => console.log(error))

const sample = array => array[Math.floor(Math.random() * array.length)];
// console.log(cities.length)

const seedDB= async()=>{
    // await Campground.deleteMany({}); // SEE THIS!
    for(let i=0; i < 50; i++){
        const random100 = Math.floor(Math.random() * 100);
        price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63a1ee3d9c046c7085262c46', // SEE THIS!
            location: `${cities[random100].city}, ${cities[random100].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi praesentium quasi consectetur voluptates ipsam quidem. Ducimus laboriosam nobis accusamus corporis nostrum quam fugiat. Neque nulla, quod saepe alias quas totam.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random100].longitude, cities[random100].latitude]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dfq4lcai3/image/upload/v1671082819/YelpCamp/dnduhuk91gxa1isatgvs.jpg',    
                  filename: 'YelpCamp/dnduhuk91gxa1isatgvs',
                },
                {
                  url: 'https://res.cloudinary.com/dfq4lcai3/image/upload/v1671082824/YelpCamp/ao3w7ukm3hgkusom9v0f.jpg',    
                  filename: 'YelpCamp/ao3w7ukm3hgkusom9v0f',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})