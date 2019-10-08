import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

// import {loginUser, registerUserSuccess} from "../redux/actions";
import { Colxx } from "../components/common/CustomBootstrap";
import IntlMessages from "../helpers/IntlMessages";
import { withRouter } from "react-router-dom";
import axios from "axios";
import * as Const from "../component/Const";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    // async gotohome(Description,userphone,history,Clickabel,Clickabel2) {
    //     console .log('step2');
    //     // let data= await setitem(Description,userphone);
    //     if (data) {
    //         console.log('we are in ');
    //         await history.push("/");
    //         await Clickabel.click();
    //         await Clickabel2.click();
    //     }else {
    //         console.log('fuck!!')
    //     }
    //
    // }



    async getData(BODY){
        console.log('we are in get data');
        const data = await axios.post(`${Const.Amin_URL}admin/login`,BODY );
        console.log(data);
        const Description = await JSON.parse(data.data.Description) ;
        await localStorage.setItem('user_id',Description.Id);
        await localStorage.setItem('user_Token',Description.Token);
        if (localStorage.getItem('user_Token').length>1) {
            console.log('we are in');
            // console.log(this.props.history);
            let Clickabel=document.getElementById('redirect2');
            let Clickabel2=document.getElementById('redirect');
            await Clickabel.click();
            await Clickabel2.click();
            await this.props.history.push("/");
            // history.push('/');
            console.log('after push');

            // window.location.reload();
        }else {
            console.log('fuck!!')
        }
    }
    onUserLogin() {
        if (this.state.email !== "" && this.state.password !== "") {
            // this.props.loginUser(this.state, this.props.history);
            const {email, password} = this.state;
            let BODY = {
                'UserName': email,
                'Password': password,
            };
            this.getData(BODY);
        }
    }
    handelClickRedirect(){
        console.log('click to redirect');
        this.props.history.push('/');
    }

    handelChange(event){
        let {name,value}=event.target;
        this.setState({
            [name]:value
        })
    }

    render() {
        return (
            <div className='w-100 h-100'>
                <div className='bgBlur  '>
aa
                </div>
                <Row className="loginForm ">

                    <Colxx xxs="12" md="10" className="mx-auto my-auto height80vh ">
                        {/*<Colxx xxs="12" md="10" className="d-flex align-items-center">*/}
                        <Card className="auth-card">
                            <div className="position-relative image-side ">
                                {/*<p className=" h2">کافه آرت </p>*/}
                                {/*<p className=" mb-0" dir='rtl'>*/}
                                {/*وارد شوید*/}
                                {/*<br />*/}
                                {/*</p>*/}
                            </div>
                            <div className="form-side">
                                <NavLink to="/" className='d-none' id='redirect2' onClick={this.handelClickRedirect.bind(this)}><button id='redirect' onClick={this.handelClickRedirect.bind(this)} > !انتقال</button></NavLink>
                                {/*<NavLink to={`/`} className="white">*/}
                                {/*<span className="logo-single" />*/}
                                {/*</NavLink>*/}
                                <CardTitle className="mb-4 d-flex justify-content-center">
                                    <IntlMessages id="ورود به پنل" />
                                </CardTitle>
                                <Form>
                                    <Label className="form-group has-float-label mb-4">
                                        <Input type="text" name='email' value={this.state.email} onChange={this.handelChange.bind(this)}/>
                                        <IntlMessages id="نام کاربری" />
                                    </Label>
                                    <Label className="form-group has-float-label mb-4">
                                        <Input type="password"  name='password' onChange={this.handelChange.bind(this)} value={this.state.password}/>
                                        <IntlMessages
                                            id="رمز عبور"
                                            // defaultValue={this.state.password}
                                        />
                                    </Label>
                                    <div className="d-flex justify-content-center align-items-center">
                                        {/*<NavLink to={`/forgot-password`}>*/}
                                        {/*<IntlMessages id="user.forgot-password-question" />*/}
                                        {/*</NavLink>*/}
                                        <Button
                                            color="primary"
                                            className="btn-shadow"
                                            size="lg"
                                            onClick={() => this.onUserLogin()}
                                        >
                                            <IntlMessages id="ورورد" />
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Card>
                    </Colxx>
                </Row>
            </div>

        );
    }
}
const mapStateToProps = ({ authUser }) => {
    const { user, loading } = authUser;
    return { user, loading };
};

// export default withRouter(connect(
//     mapStateToProps,
//     {
//         loginUser
//     }
// )(Login));
export default withRouter(Login);