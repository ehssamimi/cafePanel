import React, {Component} from 'react';
import IntlMessages from "../../../helpers/IntlMessages";
import {  Card, CardBody , Button, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";
import {TweenMax} from "gsap/TweenMax";
import RowShowShow from "../../RowShowShow";
import * as Const from "../../Const";
import axios from "axios";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";
import {gregorian_to_jalali
} from './../../functions/Functions';
import ax from './../../new/loader.gif'
import DeleteModal from "../../DeleteModal";
import RoweditCategories from "./RoweditCategories";
import AddGalleryItem from "../../Items/twoStepAddItem/AddGalleryItem";

var classNames = require('classnames');

class RowShowCategories extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"title",
            Rank: 1,
            newDateCreate:null,edit:true,
                   modal:false,
            imgHover:false,
            liClasses:classNames({
                'col-5': true,
            }),
            Icon:ax,
            Image:ax
        }
    }
    toggle = () => {
        // console.log("toggel");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    componentDidMount() {
        // console.log(this.props.input);
        let headers = {
            'Token': `${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let{IconUrl,ImageUrl}=this.props.input;
        axios.get(IconUrl, {headers: headers}).then(responsive => {
            this.setState({
                Icon:responsive.data
            })

        }).catch(error => {
            console.log(error)
        });

        axios.get(ImageUrl, {headers: headers}).then(responsive => {
            this.setState({
                Image:responsive.data
            })
          }).catch(error => {

            console.log(error)
        });

        let {Created_at}=this.props.input;
        let Date=Created_at.slice(0,10);
        let array = Date.split("-");
        let ss=gregorian_to_jalali(array[0],array[1],array[2]);
        let newDateCreate=ss.join("-");
        this.setState({
            newDateCreate
        })
    }
    handleDelete(){


        let RowId=this.props.input.RowId;
        let headers = {
            'Token': `${Const.Token}`,
            'Id': `${Const.ID}`
        };
        let BODY = {
            'RowId': RowId,
        };

        // form.append('SKU', payload.SKU);
        // form.append('Name', payload.Name);
        axios.post(`${Const.Amin_URL}admin/categories/delete` ,BODY, {headers:headers}).then(responsive=>
        {
            // this.setState({
            //     loaderActive:false
            // });
            const {Description}=responsive.data;

            if(Description === "d"){
                NotificationManager.success(
                    "congratulation",
                    "your categories added",
                    3000,
                    null,
                    null,
                    "success"
                );
                const $el = document.getElementById(`${RowId}`);
                const duration = 2;
                const from = { opacity: 0};
                TweenMax.to($el, duration, from);
                this.toggle()
                // setTimeout(function(){ window.location.reload(); }, 3000);

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
            console.log(Description)
        }).catch(error=>{
            // this.setState({
            //     loaderActive:false
            // });
            console.log(error)});
        // console.log();
    }
    handelEdit(){
        this.setState(prevState => ({
            edit:!prevState.edit
        }))
        let id='editComponent';
        const $el = document.getElementById(`${id}`);
        // console.log($el)
        const duration = 2;
        const from = { opacity: 0};
        TweenMax.to($el, duration, from);
        // setTimeout(() => {
        //     $el.remove();
        // }, 2000)

    }
    toggleLarge = () => {
        this.setState(prevState => ({
            edit: !prevState.edit
        }));
    };

    GetBackToMain(value){
        console.log('value:  '+value)
        if (value === true){
            console.log('we edit some fechture');
            window.location.reload()

        } else {
            this.setState({
                edit:true
            })
            console.log('we didnt edit some fechture');
        }
    }

    render() {

        let { Title, RowId,IconUrl,ImageUrl,Created_at}=this.props.input;
        let{newDateCreate,edit}=this.state;
        console.log('edit: '+edit)
        // console.log(this.props.input.RowId);
        // console.log(this.props.input._id);

        let {index}=this.props;
        return (
            <div>
                {
                    edit === true ?
                        <div className='w-100' id={RowId} dir='rtl'>
                            <Card>
                                <div className='d-flex justify-content-around mt-2 col-12'>
                                    {/*<div className='col-12'>*/}
                                        {/*<div className='d-flex justify-content-center mt-3'>*/}
                                            {/*<IntlMessages id='عکس'/>*/}
                                        {/*</div>*/}
                                        {/*<div className='imgHeight20vh '>*/}
                                            {/*<img*/}
                                                {/*src={this.state.Icon}*/}
                                                {/*alt={index}*/}
                                                {/*className='w-100 br05 m-2 h-100 bg-light'*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    <div className='col-12'>
                                        <div className='d-flex justify-content-center mt-3'>
                                            <IntlMessages id='عکس'/>
                                        </div>
                                        <div className='imgHeight20vh '>
                                        <img
                                            src={this.state.Image}
                                            alt={index}
                                            className='w-100 br05 m-2 h-100 bg-light'
                                        />
                                        </div>

                                    </div>
                                </div>
                                <div className='clearfix'></div>
                                <CardBody>
                                    <div className="col-12 ">
                                        <div className="col-12">
                                            <RowShowShow label={"عنوان"} value={Title}/>
                                        </div>
                                        <div className="col-12">
                                            <RowShowShow label={"الویت نمایش"} value={RowId}/>
                                        </div>
                                        <div className="col-12">
                                            <RowShowShow label={"تاریخ"} value={newDateCreate}/>
                                        </div>
                                    </div>

                                    {/*<footer>*/}
                                    {/*<p className="text-muted text-small mb-0 font-weight-light float-right ">*/}
                                    {/*{Created_at}*/}
                                    {/*</p>*/}
                                    {/*</footer>*/}
                                </CardBody>
                                <span className=' badge-danger deleteBadge btn-shadow' onClick={this.toggle}>حذف</span>
                                <span className=' badge-warning editBadgeCategories btn-shadow' onClick={this.handelEdit.bind(this)}>
                                         ویرایش
                                    </span>
                            </Card>
                            <DeleteModal modal={this.state.modal} toggle={this.toggle}
                                         handleDelete={this.handleDelete.bind(this)} header={'حذف دسته بندی'}/>

                        </div>
                        :
                        <div className='w-100' id='editComponent'>
                            <Modal
                                isOpen={!this.state.edit}
                                size="lg"
                                toggle={this.toggleLarge}
                            >
                                <ModalHeader toggle={this.toggleLarge}>
                                    ویرایش دسته بندی
                                </ModalHeader>
                                <ModalBody>
                                    <RoweditCategories Title={Title} Rank={RowId} id={this.props.input._id} GetBackToMain={this.GetBackToMain.bind(this)}/>
                                </ModalBody>
                            </Modal>
                        </div>
                }
            </div>




        );
    }
}

export default RowShowCategories;