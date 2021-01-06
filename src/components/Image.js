import React from 'react'
import axios from 'axios'
import './Image.css'

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: []
        }
    }
    UNSAFE_componentWillMount() {

        let theArray = this.state.imageUrl
        axios.get('http://localhost:8080/image/getAllImagePaths', console.log("sending the get all request"))
            .then(res=>{
             console.log(res)
             theArray.push(res)
        })
            .catch(function(error){
            console.log(error)
        })
        theArray.map((image)=>{
            return (
            this.state.imageUrl.push(image))
        })

    }

    render() {


        console.log('the image array',this.state.imageUrl)
        let theArray = this.state.imageUrl
        const images = theArray.map((image, index)=> {
            console.log('Every images url',{image})
            return (
                <img className='singleImage' src={image} alt="some words" key= {index}/>)

        })
        console.log('After storing image source and index')


        return (
            <div>
                {images}
            </div>
        );
    }
}
export default Image;
