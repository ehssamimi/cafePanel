import React, {Component} from 'react';
import SuggestionComponent from "../Items/SuggestionComponent";
import Chart from "./chart/Chart";

class CommentChart extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:'',itemName:''
        }
    }

    GetSuggestValue(id, value) {
        console.log('id' + id);
        // console.log('value' + value)
        this.setState({
            id:id,
            itemName:value
        })
    }
    render() {
        let {id,itemName}=this.state;

        console.log('a');
        console.log(id);
        return (
            <div>
                <div className='col-7 offset-3'>
                    <SuggestionComponent label='انتخاب قلم' GetSuggestValue={this.GetSuggestValue.bind(this)}/>
                </div>

                <div>

                   <Chart ID={id} Name={itemName}/>

                </div>



            </div>
        );
    }
}

export default CommentChart;