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

    componentWillMount() {
        axios.get('http://localhost:8080/image/getAllImagePaths')
            .then(res=>{
                this.setState({imageUrl: [...res.data]})
            })
            .catch(function(error){
            console.log(error)
        })


    }

    render() {

        let theArray = this.state.imageUrl
        const images = theArray.map((image, index)=> {
            return (
                <img className='singleImage' src={image} alt="some words" key= {index}/>)

        })



        return (
            <div>
                {images}
            </div>
        );
    }
}
export default Image;
