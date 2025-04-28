const jwt = require('jsonwebtoken');
const fs = require('fs');

const appID = 'vpaas-magic-cookie-0830c11f8e634568bfc0482bb9ecf75f';
const keyID = '4f61eb';
const privateKey = fs.readFileSync('./private_key.pem', 'utf8');

const payload = {
  aud: 'jitsi',
  iss: 'chat',
  sub: appID,
  room: 'vpaas-magic-cookie-0830c11f8e634568bfc0482bb9ecf75f/FixaTeamRoom',
  context: {
    user: {
      name: 'FIXA Host',
      email: 'host@fixa.team',
      moderator: true
    },
    features: {
      recording: true,
      livestreaming: true,
      transcription: false
    }
  }
};

const token = jwt.sign(payload, privateKey, {
  algorithm: 'RS256',
  keyid: `${appID}/${keyID}`,
  expiresIn: '1h'
});

console.log('\n✅ Your JWT Token:\n');
console.log(token);
