const express = require('express');
const path = require('path');
const { getWeather } = require('./weatherApiClient');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/weather', async (req, res) => {
    const { location } = req.query;
    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    try {
        const weatherData = await getWeather(location);
        // Advice based on temperature
        let advice = '';
        const tempC = weatherData.current.temp_c;

        if (tempC > 40) {
            advice = 'Dangerously hot. Limit your time outdoors, stay hydrated, and avoid strenuous activities.';
        } else if (tempC > 35) {
            advice = 'Very hot. Stay in air-conditioned environments if possible, drink plenty of water, and wear lightweight clothing.';
        } else if (tempC > 30) {
            advice = 'Hot weather. Try to stay cool, avoid direct sunlight, and hydrate regularly.';
        } else if (tempC > 25) {
            advice = 'Warm. Enjoy the weather but be cautious of potential heat, especially during midday.';
        } else {
            advice = 'Temperature is mild. No extreme precautions necessary.';
        }

        res.json({
            location: weatherData.location.name,
            temperature: weatherData.current.temp_c,
            condition: weatherData.current.condition.text,
            advice
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
