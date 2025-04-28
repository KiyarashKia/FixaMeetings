'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [enteredPass, setEnteredPass] = useState('');
  const [error, setError] = useState('');
  const [showMeeting, setShowMeeting] = useState(false);

  const correctPass = process.env.NEXT_PUBLIC_TEAM_PASS;

  const handleJoin = () => {
    if (enteredPass === correctPass) {
      setShowMeeting(true);
      setError('');
    } else {
      setError('❌ Wrong password!');
    }
  };

  useEffect(() => {
    if (showMeeting) {
      const script = document.createElement('script');
      script.src = 'https://8x8.vc/vpaas-magic-cookie-0830c11f8e634568bfc0482bb9ecf75f/external_api.js';
      script.onload = () => {
        new window.JitsiMeetExternalAPI('8x8.vc', {
          roomName: 'vpaas-magic-cookie-0830c11f8e634568bfc0482bb9ecf75f/FixaTeamRoom',
          parentNode: document.getElementById('meet'),
          configOverwrite: {
            startWithAudioMuted: true,
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_BRAND_WATERMARK: false,
          },
          // Optional: if you're ready to use JWT features
          // jwt: "your.jwt.token"
        });
      };
      document.body.appendChild(script);
    }
  }, [showMeeting]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray p-4">
      {!showMeeting ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">FIXA Team Meeting</h2>
          <input 
            type="password"
            placeholder="Enter Password"
            value={enteredPass}
            onChange={(e) => setEnteredPass(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-3 text-gray-800" 
          />
          <button
            onClick={handleJoin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Join Meeting
          </button>
          <p className="text-red-600 mt-2">{error}</p>
        </div>
      ) : (
        <div id="meet" className="w-full h-screen"></div>
      )}
    </div>
  );
}
