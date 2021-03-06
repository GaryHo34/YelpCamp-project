const mongoose = require('mongoose');
const seedHelpers = require('./seedHelpers');
const cities = require('./cities');
const Campground = require('../models/campground')

const dbUrl = process.env.MONGO_ALTAS_URL || 'mongodb://localhost:27017/yelp-camp';
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connetion error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => Math.floor(Math.random() * array.length);

const seedDB = async () => {
    await Campground.deleteMany();
    for (let i = 0; i < 200; i++) {
        const seedSampleNum = sample(seedHelpers.descriptors);
        const citySampleNum = sample(cities);
        const randomprice = Math.floor(Math.random() * 20) + 10;
        const c = new Campground({
            author: process.env.MONGO_ALTAS_URL || '627e188d885c6d624b19b547',
            title: `${seedHelpers.descriptors[seedSampleNum]} ${seedHelpers.places[seedSampleNum]}`,
            location: `${cities[citySampleNum].city}, ${cities[citySampleNum].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[citySampleNum].longitude,
                    cities[citySampleNum].latitude
                ]
            },
            images: {
                url: 'https://source.unsplash.com/collection/483251',
                filename: 'none'
            },
            description: 'Lorem ipsum',
            price: randomprice
        });
        await c.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })
