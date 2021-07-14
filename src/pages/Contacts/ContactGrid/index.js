import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { NATIONALITIES_HUMAN_NAME } from '../../../constants/nationality';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  media: {
    height: 300,
  },
  info: {
    height: 180
  }

}));

const ContactGrid = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {data.map((contact) => (
          <Grid key={contact.cell} item xs={3}>
            <Card className={classes.root}>
              <CardActionArea >
                <CardMedia
                  className={classes.media}
                  image={contact.picture.large}
                  title={`${contact.name.first} ${contact.name.last}`}
                />
                <CardContent align="center" className={classes.info}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {contact.name.title} {contact.name.first} {contact.name.last}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    /{NATIONALITIES_HUMAN_NAME[contact.nat]}/
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Phone: {contact.phone}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Email: {contact.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Address: {contact.location.city}, {contact.location.street.name}{" "}
                    {contact.location.street.number}{" "}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default ContactGrid
