import React from "react";

// Material-ui
import Link from "@material-ui/core/Link";

export default function AttributionToNewsAPI() {
  return (
    <p>
      Powered by&nbsp;
      <Link
        href='https://newsapi.org/'
        onClick={event => event.preventDefault()}
      >
        NewsAPI.org
      </Link>
    </p>
  );
}
