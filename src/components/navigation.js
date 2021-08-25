import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MediaCard from './modal'
import Display from './display'
import Search from './search'
//import { useSpring, animated } from 'react-spring/web.cjs';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));




export default function NavBar() {
  const classes = useStyles();
const [val, setVal] = useState(false)
const [url, setUrl] = useState([])
const [searchVal, setSearchVal]=useState("")
const [searchres, setSearchres]= useState([])
const [searchurl, setSearchurl]= useState([])
const [clickbool, setClickbool]= useState(false)
const [open, setOpen] = React.useState(false);
const [getstr, setGetstr]= useState("")

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const handleInput=(e)=>{
console.log(e.target.value)
setSearchVal(e.target.value)
searchdata()
setVal(true)
}

console.log('search', searchVal)

//function for searching and displaying the images
const searchdata=()=>{
  let geturl = []
  axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b14a77949513551f727ad7f2834e9db3&format=json&nojsoncallback=1&text=${searchVal}`)
  .then(res=>{
    //console.log(res.data.photos.photo)
     setSearchres(res.data.photos.photo)
     console.log(searchres)
    for(var i = 0 ; i<searchres.length;i++){
      
      var photoStaticURL = "https://live.staticflickr.com/" + searchres[i].server + "/" +  searchres[i].id + "_" + searchres[i].secret + "_w.jpg";
     geturl.push(photoStaticURL)
    }
    console.log(geturl)
     setSearchurl(geturl)
  }).catch(err=>console.log(err))
  
    
}

console.log(searchurl.length)
console.log('search',searchurl)




  return (

    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography className={classes.title} variant="h6" noWrap>
            Flickr
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={handleInput}
            />
          </div>
        </Toolbar>
      </AppBar>

      
      
      {/* <Search val={searchVal}/> */}
              {
                val?searchurl.map(u=>
          <>
             <MediaCard img={u}/>
          </>
          ):<Display/>
              }
    </div>
  );
}
