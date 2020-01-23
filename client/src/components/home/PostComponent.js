import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: '10px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PostComponent({post}) {
      const styles = useStyles()
      return (
        <Card className={styles.card}>
           <CardHeader
             avatar={
               <Avatar aria-label="recipe" className={styles.avatar}>
                 R
               </Avatar>
             }
             action={
               <IconButton aria-label="settings">
                 <MoreVertIcon />
               </IconButton>
             }
             title={post.title}
             subheader={post.date}
           />
           <CardMedia
             className={styles.media}
             image={post.image}
             title="Paella dish"
           />
           <CardContent>
             <Typography variant="body2" color="textSecondary" component="p">
               This impressive paella is a perfect party dish and a fun meal to cook together with your
               guests. Add 1 cup of frozen peas along with the mussels, if you like.
             </Typography>
           </CardContent>
           <CardActions disableSpacing>
             <IconButton aria-label="add to favorites">
               <FavoriteIcon />
             </IconButton>
             <IconButton aria-label="share">
               <ShareIcon />
             </IconButton>
           </CardActions>
         </Card>
      )
}
