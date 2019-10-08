import React, {Component} from 'react';
import * as Const from "../../../Const";
import axios from "axios";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import {Field, Form, Formik} from "formik";
import AutoSuggestEdit from "../../AutoSuggestEdit";
import CropComponent from "../../../CropComponent";

import {
    Row,
    Card,
    CardBody,Modal,ModalHeader,ModalBody,
    FormGroup,
    Label,
    Button,
    CardTitle,CustomInput,InputGroupAddon,InputGroup
} from "reactstrap";
import * as Yup from "yup";
import SuggestCategoriesComponent from "../../../SuggestCategoriesComponent";
import ModalGallery from "../../twoStepAddItem/ModalGallery";
import TopEditItem from "./TopEditItem";
import AddGalleryItem from "../../twoStepAddItem/AddGalleryItem";
const SignupSchema = Yup.object().shape({
    Title: Yup.string()
        .required("Title number is required!"),
    Description: Yup.string()
        .required("Description  is required!"),
    Price: Yup.number()
        .required("Price number is required!"),

});

class RowEditItem extends Component {
    constructor(props) {
        super(props);

        this.state={
            src: null, crop:null, imgIcon: null,
            src2: null, crop2: null, imgIcon2: null,suggest:null,fileName:null,
            categories:[],option:[],files:[],categoriesList:{}, categoriesId:null,
            categoriesName:null,itemId:null,isEdit:false,modalLarge:false,galleryEdit:false

        }
    }
    componentDidMount(){
        this.setState({
            itemId:this.props.id
        })
        // console.log("id"+this.props.id)
    }

    handelCrop = (src,crop,imgIcon) => {

        // console.log(crop);

        this.setState({
            src,crop,imgIcon
        });

    };
    handelCrop2 = (src2,crop2,imgIcon2) => {

        // console.log(crop2);

        this.setState({
            src2,crop2,imgIcon2
        });


    };

    GetSuggestValue(id, value) {
        console.log('id' + id)
        // console.log('value' + value)
        this.setState({
            categoriesId:id,
            categoriesName:value
        })
    }

    handleSubmit = (values, { setSubmitting }) => {

        // console.log('submit')
        // this.setState({
        //     loaderActive:true
        // });
        const payload = {
            ...values,

        };

        // console.log(payload);
        let {crop2,crop,files,suggest,categoriesId,categoriesName,itemId}=this.state;
        let ItemId=this.props.id;

        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };

        // console.log('payload.Title:'+payload.Title+'payload.Price:'+payload.Price);

        let BODY={'Title': payload.Title,
            'RowId': categoriesId,
            'CategoryName':categoriesName,
            'Price':payload.Price,
            'MenuImageUrl': crop,
            'Description':payload.Description,
            'ItemId': itemId,
            'ItemImageUrl': crop2
        };
        console.log(BODY)

        axios.post(`${Const.Amin_URL}admin/item/modify` ,BODY, {headers:headers}).then(responsive=>
        {
            // this.setState({
            //     loaderActive:false
            // });
            const {Description,State}=responsive.data;
            // let DES=JSON.parse(Description);

            if(State){
                NotificationManager.success(
                    "موفق شدید!",
                    "به روز رسانی آیتم با موفقیت ثبت شد",
                    3000,
                    null,
                    null,
                    "success"
                );
                this.setState({
                    isEdit:true
                })

                // this.props.handelGoTwoStep2(DES._id,DES.name);
            }else {
                NotificationManager.error(
                    " عملیات ناموفق!",
                    Description,
                    3000,
                    null,
                    null,
                    "error"
                );
            }

            // let DES=JSON.parse(Description);
            // this.props.inprogress(DES);x
            console.log(Description)
        }).catch(error=>{
            // this.setState({
            //     loaderActive:false
            // });
            console.log(error)});
    };
    handelBack(){
        let {isEdit}=this.state;
        this.props.GetBackToMain(isEdit)
    }
    // handelSetEdit(value){
    //     let {galleryEdit}=this.state;
    //     this.setState({
    //         galleryEdit:value
    //     });
    //     this.props.GetBackToMain(galleryEdit)
    //
    // }
    toggleLarge = () => {
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));
    };
    render() {
        const { crop, croppedImageUrl, src,crop2, croppedImageUrl2, src2 ,option,isEdit} = this.state;
        // const option=[{'name':'breakfast'},{'name':'dinner'},{'name':'lunch'},{'name':'hot drink'},{'name':'cold Drink'}];
        return (

            // this.state.loaderActive? <div className="d-flex justify-content-center loaderImg "><img src={loader} alt={loader}/></div>:
            <Row className="mb-4" style={{fontSize:19+'px'}}  dir='rtl' >
                <Colxx xxs="12">
                    <Card>
                        <CardBody>

                            <div>
                                <Button
                                    className="mr-2 mb-2"
                                    color="primary"
                                    outline
                                    onClick={this.toggleLarge}
                                >
                                    <IntlMessages id="تعییر اطلاعات اصلی" />
                                </Button>

                                <Modal
                                    isOpen={this.state.modalLarge}
                                    size="lg"
                                    toggle={this.toggleLarge}
                                >
                                    <ModalHeader toggle={this.toggleLarge}>
                                       اضافه کردن عکس به گالری
                                    </ModalHeader>
                                    <ModalBody>
                                        <TopEditItem Title={this.props.Title} Price={this.props.price}
                                                     Description={this.props.Description}
                                                     handelCrop={this.handelCrop.bind(this)}
                                                     handelCrop2={this.handelCrop2.bind(this)}
                                                     handelBack={this.handelBack.bind(this)}
                                                     GetSuggestValue={this.GetSuggestValue.bind(this)}
                                                     handleSubmit={this.handleSubmit.bind(this)}/>
                                    </ModalBody>
                                </Modal>
                            </div>


                            <ModalGallery id={this.props.id} itemName={this.props.Title}  handelBack={this.handelBack.bind(this)}/>

                        </CardBody>


                    </Card>

                </Colxx>

            </Row>


        );
    }
}

export default RowEditItem;