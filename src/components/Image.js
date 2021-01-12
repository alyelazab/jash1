import React from 'react'
import axios from 'axios'
import './Image.css'

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: [],
            changeOrder: false,
            text: ''
        }
    }

    componentWillMount() {
        axios.get('http://localhost:8080/image/getAllImageIdsAndPaths')
            .then(res=>{
                this.setState({imageUrl: [...res.data]})
            })
            .catch(function(error){
            console.log(error)
        })


    }

    handleClick = (e) =>{
        this.setState({
            changeOrder: !this.state.changeOrder
        })
    }

    handleTyping = (e) =>{
        this.setState({
            text: e.target.value
        })
    }

    handleNewOrder = (e) => {
        var formData = new FormData();
        formData.append('id', e.key)
        formData.append('newOrder', this.state.text)
        axios({
            method: 'post',
            url: 'http://localhost:8080/image/editOrderById',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(function (response) {
            //handle success
            console.log(response);
        }).catch(function (response) {
            //handle error
            console.log(response);
            // }).then(
            //     console.log('before'),
            //     console.log(this.state),
            //     axios.get('http://localhost:8080/image/getAllImageIdsAndPaths')
            //         .then(function(res) {
            //             this.setState({imageUrl: [...res.data]});
            //             console.log('after')
            //             console.log(this.state)
            //         })
            //         // .catch(function(error){
            //         //     console.log(error)
            //         // })
            //
            // );

            // axios.post('http://localhost:8080/image/editOrderById', null,{id: 5, newOrder: 1 })
            //     .then(console.log(this.props.key))
            //     .catch(function(error){
            //         console.log(error)
            //     })
            // axios.get('http://localhost:8080/image/getAllImageIdsAndPaths')
            //     .then(res=>{
            //         this.setState({imageUrl: [...res.data]})
            //     })
            //     .catch(function(error){
            //         console.log(error)
            //     })
            // this.setState({
            //     changeOrder: !this.state.changeOrder
            // })


        })
    }

    render() {

        let theArray = this.state.imageUrl
        const images = theArray.map((image)=> {
            return (
                <div>
                    <img className='singleImage' src={image.second} alt="some words" key= {image.first}/>

                    {this.state.changeOrder ?
                        <div>
                            <input type='text' onChange={this.handleTyping} value={this.state.text}></input>
                            <button type="btn-block" onClick={this.handleNewOrder(image)}>Confirm new order</button>
                        </div>
                        :
                        <button type="btn-block" onClick={this.handleClick}>Change Position</button>
                    }
                </div>

            )})



        return (
            <div>
                {images}
            </div>
        );
    }
}
export default Image;
