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
    if (!showMeeting) return;

    const script = document.createElement('script');
    script.src = 'https://8x8.vc/vpaas-magic-cookie-0830c11f8e634568bfc0482bb9ecf75f/external_api.js';
    script.onload = () => {
      const domain = '8x8.vc';

      const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InZwYWFzLW1hZ2ljLWNvb2tpZS0wODMwYzExZjhlNjM0NTY4YmZjMDQ4MmJiOWVjZjc1Zi80ZjYxZWIifQ.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtMDgzMGMxMWY4ZTYzNDU2OGJmYzA0ODJiYjllY2Y3NWYiLCJyb29tIjoidnBhYXMtbWFnaWMtY29va2llLTA4MzBjMTFmOGU2MzQ1NjhiZmMwNDgyYmI5ZWNmNzVmL0ZpeGFUZWFtUm9vbSIsImNvbnRleHQiOnsidXNlciI6eyJuYW1lIjoiRklYQSBIb3N0IiwiZW1haWwiOiJob3N0QGZpeGEudGVhbSIsIm1vZGVyYXRvciI6dHJ1ZX0sImZlYXR1cmVzIjp7InJlY29yZGluZyI6dHJ1ZSwibGl2ZXN0cmVhbWluZyI6dHJ1ZSwidHJhbnNjcmlwdGlvbiI6ZmFsc2V9fSwiaWF0IjoxNzQ1ODMwNTcyLCJleHAiOjE3NDU4MzQxNzJ9.T66OGyRFFNG5lOSDldArhK0kGXndGlmCP4tB7vtCyouoMdseWPmfgXKjc6yoAqUdemDTHKJtlAWLy8W_nj7SuNXcUzgaM-ulMHkU9-0ydTPZl3aPNKs4J8xXfzr4qvkMAf67Nd306qdUQLOpXAJuUN1kJztZRiGGkl4cAHK_K9McDeymaLr7iUDWjmpp6aLDfUD2EIOV7Uz31n4Zd2V5l75kkj_5eNCNMDMCRmJxxOrnfenJqI7T2vzNCMUCSsTygXCmIEdAScKSJUMvosTh7P-jAP65-QsUWdIscH0dfK0TIy-zQpEYyxnO-llAx6CoKAO1kkW-x-lv2dyKI5X2GA";

      const options = {
        roomName: 'vpaas-magic-cookie-0830c11f8e634568bfc0482bb9ecf75f/FixaTeamRoom',
        parentNode: document.getElementById('meet'),
        configOverwrite: {
          startWithAudioMuted: true,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_BRAND_WATERMARK: false,
        },
        jwt: token
      };

      new window.JitsiMeetExternalAPI(domain, options);
    };

    document.body.appendChild(script);
  }, [showMeeting]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!showMeeting ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">FIXA Team Meeting</h2>
          <input
            type="password"
            placeholder="Enter Password"
            value={enteredPass}
            onChange={(e) => setEnteredPass(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-3 text-gray-800 placeholder-gray-400"
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
