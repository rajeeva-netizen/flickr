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
const [val, setVal] = useState([])
const [url, setUrl] = useState([])
const [searchVal, setSearchVal]=useState("")
const [searchres, setSearchres]= useState([])
const [searchurl, setSearchurl]= useState([])
//useEffect using for displaying the images
useEffect(()=>{
  let geturl = []
  axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=b14a77949513551f727ad7f2834e9db3&per_page=10&format=json&nojsoncallback=1')
  .then((res)=>{
    console.log(res.data.photos.photo)
    setVal(res.data.photos.photo)
    console.log(val)
    for(var i = 0 ; i<val.length;i++){
      
      var photoStaticURL = "https://live.staticflickr.com/" + val[i].server + "/" +  val[i].id + "_" + val[i].secret + "_w.jpg";
      console.log(photoStaticURL)
     geturl.push(photoStaticURL)
      
    }
    console.log(geturl)
    setUrl(geturl)
  }).catch((err)=>{
    console.log(err)
  })
}, [])
console.log('data',val)
console.log('url', url)


const display = ()=>{
  console.log(url.length)

return(
  <>
  {
    url.length? url.map(u=>
    <>
       <img src = {u}></img>
    </>
    ):null
  }
  </>
)

}



const handleInput=(e)=>{
console.log(e.target.value)
setSearchVal(e.target.value)
searchdata()
}

console.log('search', searchVal)

//function for searching and displaying the images
const searchdata=()=>{
  let geturl = []
  axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b14a77949513551f727ad7f2834e9db3&per_page=10&format=json&nojsoncallback=1&text=${searchVal}`)
  .then(res=>{
    console.log(res.data.photos.photo)
     setSearchres(res.data.photos.photo)
     console.log(searchurl)
    for(var i = 0 ; i<res.data.photos.photo.length;i++){
      
      var photoStaticURL = "https://live.staticflickr.com/" + res.data.photos.photo[i].server + "/" +  res.data.photos.photo[i].id + "_" + res.data.photos.photo[i].secret + "_w.jpg";
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
              <img src = {url}></img>
      {/* {display()}  */}
      {/* {searchdata()} */}
{
  searchurl.length? searchurl.map(i=>
  <>
  <img src = {i}></img>
  </>
      ):display()
    
}
      
    </div>
  );
}
