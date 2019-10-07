import React, {Component} from 'react';
import * as Const from "../../Const";
import axios from "axios";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";
import {Colxx} from "../../../components/common/CustomBootstrap";
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,CustomInput,InputGroupAddon,InputGroup
} from "reactstrap";
import CropComponent from "../../CropComponent";
import ShowGalleryItem from "../ShowGallery/ShowGalleryItem";
import CafeShowGallery from "./CafeShowGallery";


class CafeAddGallery extends Component {
    constructor(props) {
        super(props);
        this.state={
            src: null, crop: '', imgIcon: null
        }
    }
    handelCrop = (src,crop,imgIcon) => {
        this.setState({
            src,crop,imgIcon
        },()=>{
            // console.log(crop)
        });
    };

    handelSubmit(e){
        e.preventDefault();
        // console.log('submit');

        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let{crop}=this.state;
        // console.log('id'+id);


        let BODY={
            'Image': crop
        };
        // console.log(BODY);
        //
        axios.post(`${Const.Amin_URL}admin/cafe/image/add` ,BODY, {headers:headers}).then(responsive=>
        {

            // this.setState({
            //     loaderActive:false
            // });
            const {Description,State}=responsive.data;
            if(State){
                NotificationManager.success(
                    "congratulation",
                    "your categories added",
                    3000,
                    null,
                    null,
                    "success"
                );

            }else {
                NotificationManager.error(
                    " new game currency didnt add",
                    Description,
                    3000,
                    null,
                    null,
                    "success"
                );
            }

            // let DES=JSON.parse(Description);
            // this.props.inprogress(DES);x
            // console.log(Description)
        }).catch(error=>{
            this.setState({
                loaderActive:false
            });
            console.log(error)});

    }


    render() {
        let{id,itemName}=this.state;
        return (


            <div>
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <form>
                                {/*<div className='col-7 offset-3 fontFamimily13vw'>*/}
                                {/*<SuggestionComponent label='نوع ایتم را انتخاب کنید'*/}
                                {/*GetSuggestValue={this.GetSuggestValue.bind(this)}/>*/}
                                {/*</div>*/}
                                <div className="w-100 d-flex mt-3">
                                    <div className="col-12">
                                        <CropComponent label={'اضافه کردن  گالری'} onCropImg={this.handelCrop} aspect={2/3}/>
                                    </div>
                                </div>
                                <Button color="primary" type="submit" className="col-2 rowInput mt-2"
                                        onClick={this.handelSubmit.bind(this)}>
                                    ارسال
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </Colxx>


                {/*<Colxx xxs="12">*/}
                    {/*<Card>*/}
                        {/*<CardBody>*/}
                            {/*<div>*/}
                                {/*/!*<ShowGalleryItem ID={id} Name={itemName}/>*!/*/}
                                {/*<CafeShowGallery/>*/}
                            {/*</div>*/}
                        {/*</CardBody>*/}
                    {/*</Card>*/}
                {/*</Colxx>*/}




            </div>




        );
    }
}

export default CafeAddGallery;