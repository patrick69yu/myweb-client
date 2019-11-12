import React, { useState, useEffect } from "react";
import axios from "axios";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "25rem",
    margin: "0 auto"
  },
  flex: {
    display: "flex",
    padding: theme.spacing(1)
  },
  newsNumber: {
    color: theme.palette.secondary.main,
    fontSize: "2.2rem",
    borderRight: "3px solid " + theme.palette.secondary.main,
    flex: "1 1 20%"
  },
  rightCol: {
    textAlign: "start",
    flex: "1 1 80%"
  },
  title: {
    padding: theme.spacing(1),
    fontSize: "1.5rem",
    borderBottom: "3px solid " + theme.palette.primary.main,
    lineHeight: "1.2"
  },
  subtitle: {
    padding: theme.spacing(1),
    lineHeight: "1",
    fontSize: "1.1rem"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  content: {
    padding: theme.spacing(2),
    lineHeight: "1.2",
    fontSize: "1.3rem",
    textAlign: "start"
  }
}));

export default function NewsCard(props) {
  const classes = useStyles();
  const { number, title, author, date, imgUrl, description, newsUrl } = props;

  // const [isImgValid, setIsImgValid] = useState(false);

  // useEffect(() => {
  //   if (imgUrl) {
  //     axios
  //       .get(imgUrl, {
  //         headers: {
  //           "Access-Control-Allow-Origin": "*"
  //         }
  //       })
  //       .then(response => {
  //         // Handle success response
  //         setIsImgValid(true);
  //       })
  //       .catch(error => {
  //         // Handle error message
  //         console.log("X => ", error);
  //         setIsImgValid(false);
  //       });
  //   }
  // }, [imgUrl]);

  return (
    <Card className={classes.card}>
      <div className={classes.flex}>
        {number ? (
          <Typography className={classes.newsNumber}>{number}</Typography>
        ) : null}

        <div className={classes.rightCol}>
          {title ? (
            <Typography component='h3' className={classes.title}>
              {title}
            </Typography>
          ) : null}

          {author ? (
            <Typography className={classes.subtitle}>{author}</Typography>
          ) : null}

          {date ? (
            <Typography className={classes.subtitle}>
              {date.trim().slice(0, 10)}
            </Typography>
          ) : null}
        </div>
      </div>

      {
        <CardMedia
          className={classes.media}
          image={
            imgUrl
              ? imgUrl
              : "https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg"
          }
          title='news article image'
        />
      }

      {description ? (
        <Typography className={classes.content}>{description}</Typography>
      ) : null}

      {newsUrl ? (
        <Typography className={classes.content}>
          <Link
            href={newsUrl}
            aria-label='click to read the news article in a new window'
            target='_blank'
          >
            Read more
          </Link>
        </Typography>
      ) : null}
    </Card>
  );
}
