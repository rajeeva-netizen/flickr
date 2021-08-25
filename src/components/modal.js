import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin:'10px 15px 10px 10px',
    display:'inline-block',
    alignItems: 'center',
    
  },
  media: {
    
    width: '290px',
    height:'300px',
  },
});

export default function MediaCard({img}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [getstr, setGetstr]= React.useState("")
  console.log(img)
  const handleOpen = (img) => {
    setOpen(true);
    console.log('clicked')
    console.log('url',img)
  //setGetstr(url)
  };

const handleClose = () => {
    setOpen(false);
    
  };
  const dialog=()=>{
    return(
      <>
  
  <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <img src= {getstr}></img>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
  
            <Button onClick={handleClose} color="primary" autoFocus>
              ok
            </Button>
          </DialogActions>
        </Dialog>
        </>
    )
  
  }
  return (
    <>
    <Card className={classes.root} >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title="Contemplative Reptile"
          display="flex"
          flexDirection="row"
          onClick = {()=>{
            setOpen(true);
            console.log('url',img)
            setGetstr(img)
          }}
        />
        </CardActionArea>
    </Card>
    {
        open?dialog():null
      }
</>
  );
}
