import React, {Component} from 'react';
import Rating from "../../../../../components/common/Rating";
import * as Const from "../../../../Const";
import axios from "axios";
import ax from './../../../../new/loader.gif'


class ShowRowTopRateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image:ax
        }
    }


    componentDidMount(){
        let headers = {
            'Token': `${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let{Image}=this.props;
        axios.get(Image, {headers: headers}).then(responsive => {
            this.setState({
                image:responsive.data
            })

        }).catch(error => {
            console.log(error)
        });
    }
    render() {
        let {  Title, AverageRate, Total ,index}=this.props
        let{image}=this.state;
        return (
            <div className="pr-2 pl-2">
                <img src={image} alt={Title} className="mb-4 bg-light" />
                <h6 className="mb-1">
                    <span className="mr-2">{index+1}.</span>
                    {Title}
                </h6>
                <Rating total={5} rating={AverageRate} interactive={false} />
                <p className="text-small text-muted mb-0 d-inline-block">({Total})</p>
            </div>
        );
    }
}

export default ShowRowTopRateItem;