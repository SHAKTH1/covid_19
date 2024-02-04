const express = require('express');
const axios = require('axios');
const apps = express();
const PORT = 3001;

apps.use(express.json());

apps.get('/api', async (req, res) => {
  try {
    const response = await axios.get('https://api.covid19india.org/data.json');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

apps.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});