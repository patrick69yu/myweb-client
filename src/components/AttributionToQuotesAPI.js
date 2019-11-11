import React from "react";

function addReferenceToQuote() {
  return {
    __html:
      '<span style="z-index:50;font-size:0.9em;"><img src="https://theysaidso.com/branding/theysaidso.png" height="20" width="20" alt="theysaidso.com"/><a href="https://theysaidso.com" title="Powered by quotes from theysaidso.com" style="color: #9fcc25; margin-left: 4px; vertical-align: middle;">theysaidso.com</a></span>'
  };
}

export default function AttributionToQuotesAPI() {
  return <div dangerouslySetInnerHTML={addReferenceToQuote()} />;
}
