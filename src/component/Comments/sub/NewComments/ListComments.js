import React, {Component, Fragment} from 'react';
import {
    Collapse,
    Button,
    Row,
    Card,
    CardSubtitle,
    CardBody,
    CardTitle
} from "reactstrap";
import CommentsRow from "./sub/CommentsRow";

class ListComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            accordion: [true],Description:null
        };
    }
    // componentDidMount(){
    componentWillReceiveProps(props){
        let {Description}=props;
        // console.log(Description);
        let i;let list=[];
        // console.log(Description.length);
        for(i in Description){
            // console.log(Description[i]);
            list.push(false)
        }
        this.setState({
            Description:Description
        });


        // console.log(list);


        this.setState(state => {
            const accordion = state.accordion.concat(list);
            return {
                accordion
            };
        },()=>{
            console.log(this.state.accordion)
        });
    }

    toggleAccordion = tab => {
        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => (tab === index ? !x : false));
        this.setState({
            accordion: state
        });
    };

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    };
    render() {
        let{Description,accordion}=this.state
        return (
            <div>
                <Fragment>
                    {Description?Description.map((todo ,index)=><CommentsRow key={index} accordion={accordion[index]} toggleAccordion={this.toggleAccordion.bind(this)} index={index}  input={todo} Name={this.props.Name || todo['Title']}/>):""}
                </Fragment>
            </div>
        );
    }
}

export default ListComments;