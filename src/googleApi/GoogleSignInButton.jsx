//{"web":{"client_id":"47346625529-shu0lr32hkdd152nad21k1b603ughti4.apps.googleusercontent.com","project_id":"incudash-meets","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:5173"],"javascript_origins":["https://incudash.com"]}}
import React, { useEffect } from 'react';
import { OAuth2Client } from 'google-auth-library';

const GoogleSignInButton = ({ onSignIn }) => {
  const clientId = '47346625529-shu0lr32hkdd152nad21k1b603ughti4.apps.googleusercontent.com'; // Replace with your actual client ID

  useEffect(() => {
    const handleSignIn = async () => {
      const auth = new OAuth2Client({
        clientId,
      });

      try {
        const { tokens } = await auth.getToken();
        onSignIn(tokens);
      } catch (error) {
        console.error('Google Sign-In Failed:', error);
      }
    };

    const renderSignInButton = () => {
      window.gapi.signin2.render('google-signin-button', {
        scope: 'https://www.googleapis.com/auth/calendar', // Add necessary scopes
        width: 200,
        height: 40,
        longtitle: true,
        theme: 'dark',
        onsuccess: handleSignIn,
        onfailure: (error) => console.error('Google Sign-In Failed:', error),
      });
    };

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = renderSignInButton;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [onSignIn, clientId]);

  return <div id="google-signin-button" />;
};

export default GoogleSignInButton;
