const express = require('express');
const app = express();
const port = 3001;

app.get('/api/generate-jwt', (req, res) => {
    const token = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        keyid: `${appID}/${keyID}`,
        expiresIn: '1h'
    });
    res.json({ token });
});

app.listen(port, () => {
    console.log(`JWT API server running at http://localhost:${port}`);
});
