import React, {Component} from 'react';
import {Colxx} from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import {Field, Form, Formik} from "formik";
import SuggestCategoriesComponent from "../../../SuggestCategoriesComponent";
import CropComponent from "../../../CropComponent";
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,CustomInput,InputGroupAddon,InputGroup
} from "reactstrap";import ModalGallery from "../../twoStepAddItem/ModalGallery";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
    Title: Yup.string()
        .required("Title number is required!"),
    Description: Yup.string()
        .required("Description  is required!"),
    Price: Yup.number()
        .required("Price number is required!"),

});

class TopEditItem extends Component {

    render() {
        let{Title,Price,Description,handelCrop,handelCrop2,handelBack,GetSuggestValue,handleSubmit}=this.props;
        return (
            <Row className="mb-4" style={{fontSize:19+'px'}}  dir='rtl' >
                <div className='w100'>


                            <Formik
                                initialValues={{
                                    Title: Title,
                                    Price: Price,
                                    Description: Description
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={handleSubmit}
                            >
                                {({
                                      handleSubmit,
                                      setFieldValue,
                                      setFieldTouched,
                                      handleChange,
                                      handleBlur,
                                      values,
                                      errors,
                                      touched,
                                      isSubmitting
                                  }) => (
                                    <Form className="av-tooltip tooltip-label-bottom d-flex col-12 flex-column">
                                        <div className="w-100 d-flex ">
                                            <div className="col-sm-4 rowInput">
                                                <FormGroup className="form-group has-float-label position-relative ">
                                                    <Label  >
                                                        <IntlMessages id="عنوان"  />
                                                    </Label>
                                                    <Field className="form-control fontSizeInputText " name="Title"  />
                                                    {errors.Title && touched.Title ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.Title}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </div>
                                            <div className="col-sm-4 rowInput">
                                                <FormGroup className="form-group has-float-label position-relative">
                                                    <Label>
                                                        <IntlMessages id="قیمت" />
                                                    </Label>
                                                    <Field className="form-control fontSizeInputText " name="Price" type='number' />
                                                    {errors.Price && touched.Price ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.Price}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </div>
                                            <div className="col-sm-4 rowInput">
                                                <SuggestCategoriesComponent label='دسته بندی' GetSuggestValue={GetSuggestValue}/>
                                            </div>
                                        </div>
                                        <div className="w-100 d-flex ">
                                            <div className="col-sm-12 rowInput">
                                                <FormGroup className="form-group has-float-label position-relative">
                                                    <Label>
                                                        <IntlMessages id="توضیحات" />
                                                    </Label>
                                                    <Field className="form-control" name="Description" component="textarea" rows="6" />
                                                    {errors.Description && touched.Description ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.Description}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </div>

                                        </div>

                                        <div className="w-100  mt-3 ">
                                            <div className="col-12">
                                                <CropComponent label={'عکس'} onCropImg={handelCrop} aspect={3/2}/>
                                            </div>
                                            {/*<div  className="col-12">*/}
                                                {/*<CropComponent label={'عکس'} onCropImg={handelCrop2} aspect={3/2}/>*/}
                                            {/*</div>*/}
                                        </div>

                                        <div className='d-flex w-100 mt-3'>
                                            <Button color="primary" type="submit" className="col-3 rowInput">
                                                ارسال
                                            </Button>

                                            <Button  className="col-3  btn-warning mr-auto  br05 d-flex justify-content-center align-items-center" onClick={handelBack}>
                                                برگشت
                                            </Button>
                                        </div>
                                    </Form>

                                )}
                            </Formik>




                </div>

            </Row>
        );
    }
}

export default TopEditItem;