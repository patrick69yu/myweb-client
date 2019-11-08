import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";

export default function PageNotFound() {
  return (
    <Fragment>
      <Typography className='text-center' color='primary' variant='h1'>
        Sorry, the page is not found.
      </Typography>
    </Fragment>
  );
}
