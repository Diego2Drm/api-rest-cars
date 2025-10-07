const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello expres' })
})

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
})