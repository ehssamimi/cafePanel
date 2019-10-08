import React, {Component} from 'react';
import loader from "./new/loader.gif";

class LoaderComponent extends Component {
    render() {
        return (
            <div className='w-100 d-flex justify-content-center align-content-center '>
                <div className='d-flex ' ><img src={loader} alt={loader} className='loader objectFitContent'/></div>
            </div>
        );
    }
}

export default LoaderComponent;