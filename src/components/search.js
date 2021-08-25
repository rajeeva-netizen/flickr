import React, { useState, useEffect } from 'react'
import MediaCard from './modal'
import axios from 'axios'


const Search=({val})=>{



const [searchVal, setSearchVal]=useState("")
const [searchres, setSearchres]= useState([])
const [searchurl, setSearchurl]= useState([])
const [clickbool, setClickbool]= useState(false)
const [open, setOpen] = React.useState(false);
const [getstr, setGetstr]= useState("")


    const searchdata=()=>{
        let geturl = []
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b14a77949513551f727ad7f2834e9db3&per_page=10&format=json&nojsoncallback=1&text=${val}`)
        .then(res=>{
          console.log(res.data.photos)
           setSearchres(res.data.photos.photo)
           console.log(searchres)
          // for(var i = 0 ; i<searchres.length;i++){
            
          //   var photoStaticURL = "https://live.staticflickr.com/" + searchres[i].server + "/" +  searchres[i].id + "_" + searchres[i].secret + "_w.jpg";
          //  geturl.push(photoStaticURL)
          // }
          // console.log(geturl)
          //  setSearchurl(geturl)
        }).catch(err=>console.log(err))
        
          
      }
    return(
        <>
          {
            searchdata()
          }
        </>
    )
}

export default Search