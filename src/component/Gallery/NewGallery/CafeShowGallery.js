import React, {Component} from 'react';
import * as Const from "../../Const";
import axios from "axios";
import LiShowGallery from "../ShowGallery/LiShowGallery";
import loader from "../../new/loader.gif";

class CafeShowGallery extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:'',Description:''
        }
    }

    // componentWillReceiveProps(props){
    componentDidMount(){

        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };

        axios.get(`${Const.Amin_URL}cafe/images` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            console.log(Description);
            this.setState({
                Description:JSON.parse(Description)
            })
            // let categories=JSON.parse(Description);
            // let index;
            //
            //
            // let  option=[];
            // categories.map(item => {
            //     option.push({name: item.Title})
            // });
            // console.log(option);
            //
            // let categoriesList = {};
            //
            // for (index in categories){
            //     let id =categories[index].Title;
            //     let Value =categories[index]._id;
            //     // dict[id] = Value;
            //     categoriesList[Value] = id;
            // }
            //
            // this.setState({
            //     categoriesList,categories,option
            // })
            // console.log(categoriesList);

        }).catch(error=>{console.log(error)});
        // console.log(this.state.categories)
    }
    render() {
        let{Description,id}=this.state;

        console.log(Description);
        return (
            <div>

                <div className='br05 ' >
                    {Description?Description.Images.map((todo ,index)=><LiShowGallery id={todo.ImageId} key={index} index={index} src={todo.Image}  classname=' col-sm-12 col-md-4 col-lg-3 mt-3 float-left mr-2'/>  ):<div className='d-flex' ><img src={loader} alt={loader} className='loader'/></div>}
                    {/*{Description?Description.map((todo ,index)=><LiShowGallery id={todo.Id} key={index} index={index} src={todo.ImageUrl}  itemId={id} classname='  mt-3 float-left mr-2'/>  ):""}*/}
                </div>


            </div>

        );
    }
}

export default CafeShowGallery;