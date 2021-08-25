
import React, { useState, useEffect } from 'react'
import MediaCard from './modal'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const Display=()=>{
    const [val, setVal] = useState([])
    const [searchVal, setSearchVal]=useState("")
const [searchres, setSearchres]= useState([])
const [searchurl, setSearchurl]= useState([])
const [clickbool, setClickbool]= useState(false)
const [open, setOpen] = React.useState(false);
const [getstr, setGetstr]= useState("")


const handleOpen = () => {
    setOpen(true);
    console.log('clicked')
  
  //setGetstr(url)
  };

const handleClose = () => {
    setOpen(false);
  };
    useEffect(()=>{
        let geturl = []
        let data;
        axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=b14a77949513551f727ad7f2834e9db3&format=json&nojsoncallback=1')
        .then((res)=>{
          console.log(res.data.photos.photo)
          setVal(res.data.photos.photo)
        }).catch((err)=>{
          console.log(err)
        })
      }, [])

      console.log(val)

      const dispImages = ()=>{
      
        let geturl = []
        for(var i = 0 ; i<val.length;i++){
            
          var photoStaticURL = "https://live.staticflickr.com/" + val[i].server + "/" +  val[i].id + "_" + val[i].secret + "_w.jpg";
          
         geturl.push(photoStaticURL)
         
          
        }
        console.log(geturl)
      console.log(geturl.length)
return(
        <>
        {
          geturl.length? geturl.map(u=>
          <>
             <MediaCard img={u}/>
          </>
          ):null
        }
        
        </>
      )}


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
    return(
        <>
        
        {
            dispImages()
        }
        {
        open?dialog():null
      }
       
        </>
    )
}

export default Display