const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const LAMIX_API_URL = 'https://panel.lamix.org/api/test-cdrs';
const LAMIX_HEADERS = {
    'authority': 'panel.lamix.org',
    'accept': '*/*',
    'accept-language': 'en-IN,en-US;q=0.9,en-GB;q=0.8,en;q=0.7',
    'cache-control': 'no-cache',
    'cookie': 'smspanel_lb=56c3aaa19bfa2b3a9e253230269ab5e0bb69003f2396a7fc893279709a93c428',
    'pragma': 'no-cache',
    'referer': 'https://panel.lamix.org/public/test-panel',
    'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
    'x-csrf-token': 'MTc5MzU0MjY3NDAyNHxkd08waldwWnBMamo4bjRwZVh6QXpnfGI3ZDhkZjFmYWZjZDM0NWIzZGJkMDJlODFlMjlmODU4Y2M0NDAzYjhkODAwNmZjNjc2YjljNTA5NTZiYjk1M2Q=',
    'x-requested-with': 'XMLHttpRequest'
};

app.get('/api/get-cdrs', async (req, res) => {
    try {
        const { limit = 25, offset = 0 } = req.query;
        const response = await axios.get(`${LAMIX_API_URL}?limit=${limit}&offset=${offset}`, { 
            headers: LAMIX_HEADERS 
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Lamix panel data:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from panel' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
