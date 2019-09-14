import React, {Component} from 'react';
import { Row, Card  } from "reactstrap";
import * as Const from "../../Const";
import axios from "axios";
import ax from "../../new/loader.gif";

class LiItemGallery extends Component {
    constructor(props) {
        super(props);
        this.state={
            Img:ax
        }
    }

    componentDidMount(){
        let headers = {
            'Token': `${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let{item}=this.props;
        axios.get(item, {headers: headers}).then(responsive => {
            this.setState({
                Img:responsive.data
            })

        }).catch(error => {
            console.log(error)
        });
    }
    render() {
        let{item}=this.props;
        let{Img}=this.state;
        // console.log(item)
        return (
            <div className="pr-3 pl-3 ">
                <Card className="flex-row">
                    <div className="w-100 position-relative imagheight40vh">
                        <img className="card-img-left br05" src={Img} alt={item} />
                    </div>
                </Card>
            </div>
        );
    }
}

export default LiItemGallery;