//{"web":{"client_id":"47346625529-shu0lr32hkdd152nad21k1b603ughti4.apps.googleusercontent.com","project_id":"incudash-meets","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:5173"],"javascript_origins":["https://incudash.com"]}}
import React, { useState } from 'react';
import { google } from 'googleapis';
import GoogleSignInButton from './GoogleSignInButton';

const CreateMeetEvent = () => {
  const [api, setApi] = useState(null);

  const handleSignIn = (tokens) => {
    const auth = new google.auth.OAuth2();
    auth.setCredentials(tokens);
    const calendarApi = google.calendar({ version: 'v3', auth });
    setApi(calendarApi);
  };

  const createEvent = async () => {
    try {
      const event = {
        summary: 'New Google Meet',
        start: {
          dateTime: new Date().toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: new Date(Date.now() + 3600000).toISOString(), // One hour later
          timeZone: 'UTC',
        },
        conferenceData: {
          createRequest: { requestId: 'your-unique-request-id' },
        },
      };

      const response = await api.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
      });

      console.log('Event created:', response.data.htmlLink);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      {api ? (
        <button onClick={createEvent}>Create Google Meet Event</button>
      ) : (
        <GoogleSignInButton onSignIn={handleSignIn} />
      )}
    </div>
  );
};

export default CreateMeetEvent;
