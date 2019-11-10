import React from "react";

// Material-ui
import Typography from "@material-ui/core/Typography";

// Import components
import HeadingH1 from "../HeadingH1";

export default function PageNotFound() {
  const h1Title = "Page Not Found";

  return (
    <section>
      <HeadingH1 title={h1Title} />
      <Typography className='text-center' color='primary' variant='body1'>
        Sorry, the page is not found.
      </Typography>
    </section>
  );
}
