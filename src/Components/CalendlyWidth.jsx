import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const CalendlyWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Helmet>
        <script type="text/javascript">
          {`
            Calendly.initInlineWidget({
              url: 'YOUR_CALENDLY_SCHEDULING_LINK',
              parentElement: document.getElementById('calendly-widget'),
            });
          `}
        </script>
      </Helmet>
      <div id="calendly-widget"></div>
    </div>
  );
};

export default CalendlyWidget;
