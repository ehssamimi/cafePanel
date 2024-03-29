import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import IntlMessages from "../../helpers/IntlMessages";
import {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale
} from "../../redux/actions";

import {
  menuHiddenBreakpoint,
  searchPath,
  localeOptions
} from "../../constants/defaultValues";

import { MobileMenuIcon, MenuIcon } from "../../components/svg";
import TopnavEasyAccess from "./Topnav.EasyAccess";
import TopnavNotifications from "./Topnav.Notifications";
import * as Const from "../../component/Const";
import axios from "axios";
import NotificationManager from "../../components/common/react-notifications/NotificationManager";

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: "",LName:'',FName:''
    };
  }
    componentDidMount(){
        let headers = {
            'Token':`${Const.Token}`,
            'Id': `${Const.ID}`
        };
        // console.log(headers)
        axios.get(`${Const.Amin_URL}admin/info` , {headers:headers}).then(responsive=>
        {
            const {Description}=responsive.data;
            // console.log(Description);
            let DES=JSON.parse(Description);
            // console.log(DES);

            this.setState({
                LName:DES.LastName,
                FName:DES.FirstName,
                UName:DES.UserName,
            });

        }).catch(error=>{console.log(error)});
    }


  handleChangeLocale = locale => {
    this.props.changeLocale(locale);
  };
  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  handleSearchIconClick = e => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  addEventsSearch = () => {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  };
  removeEventsSearch = () => {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = e => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      this.removeEventsSearch();
      this.setState({
        searchKeyword: ""
      });
    }
  };
  handleSearchInputChange = e => {
    this.setState({
      searchKeyword: e.target.value
    });
  };
  handleSearchInputKeyPress = e => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    this.props.history.push(searchPath + "/" + this.state.searchKeyword);
    this.setState({
      searchKeyword: ""
    });
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    //logout
      let headers = {
          // 'ID':`${Const.Token}`,
          // 'Token': `${Const.ID}`

          'Token':`${Const.Token}`,
          'ID': `${Const.ID}`
      };
      console.log(headers);
      async function deleteItems(){
          await localStorage.removeItem('user_id');
          await localStorage.removeItem('user_Token');
          return true
      }
      axios.post(`${Const.Amin_URL}admin/logout` , null,{headers:headers}).then(responsive=>
      {
          // this.setState({
          //     loaderActive:false
          // });
          const {Description,State}=responsive.data;
          if(Description === "d"){
              let data=deleteItems();
              console.log(data);
              if (data){
                  this.props.history.push("/login");
              }
              NotificationManager.success(
                  "congratulation",
                  "your exit",
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
          console.log(Description)
      }).catch(error=>{
          // this.setState({
          //     loaderActive:false
          // });
          console.log(error)});
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  render() {
      const { LName ,FName} = this.state;

      const { containerClassnames, menuClickCount, locale } = this.props;
    const { messages } = this.props.intl;
    return (
      <nav className="navbar fixed-top">
        <NavLink
          to="#"
          className="menu-button d-none d-md-block"
          onClick={e =>
            this.menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to="#"
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>

        {/*<div className="search" data-search-path="/app/pages/search">*/}
          {/*<Input*/}
            {/*name="searchKeyword"*/}
            {/*id="searchKeyword"*/}
            {/*placeholder={messages["menu.search"]}*/}
            {/*value={this.state.searchKeyword}*/}
            {/*onChange={e => this.handleSearchInputChange(e)}*/}
            {/*onKeyPress={e => this.handleSearchInputKeyPress(e)}*/}
          {/*/>*/}
          {/*<span*/}
            {/*className="search-icon"*/}
            {/*onClick={e => this.handleSearchIconClick(e)}*/}
          {/*>*/}
            {/*<i className="simple-icon-magnifier" />*/}
          {/*</span>*/}
        {/*</div>*/}

        {/*<div className="d-inline-block">*/}
          {/*<UncontrolledDropdown className="ml-2">*/}
            {/*<DropdownToggle*/}
              {/*caret*/}
              {/*color="light"*/}
              {/*size="sm"*/}
              {/*className="language-button"*/}
            {/*>*/}
              {/*<span className="name">{locale.toUpperCase()}</span>*/}
            {/*</DropdownToggle>*/}
            {/*<DropdownMenu className="mt-3" right>*/}
              {/*{localeOptions.map(l => {*/}
                {/*return (*/}
                  {/*<DropdownItem*/}
                    {/*onClick={() => this.handleChangeLocale(l.id)}*/}
                    {/*key={l.id}*/}
                  {/*>*/}
                    {/*{l.name}*/}
                  {/*</DropdownItem>*/}
                {/*);*/}
              {/*})}*/}
            {/*</DropdownMenu>*/}
          {/*</UncontrolledDropdown>*/}
        {/*</div>*/}

        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>

        <div className="ml-auto">
          <div className="header-icons d-inline-block align-middle">
            {/*<div className="position-relative d-none d-none d-lg-inline-block">*/}
              {/*<a*/}
                {/*className="btn btn-outline-primary btn-sm mb-2 mr-3"*/}
                {/*target="_top"*/}
                {/*href="https://themeforest.net/cart/configure_before_adding/22544383?license=regular&ref=ColoredStrategies&size=source"*/}
              {/*>*/}
                {/*<IntlMessages id="user.buy" />*/}
              {/*</a>*/}
            {/*</div>*/}
            <TopnavEasyAccess />
            {/*<TopnavNotifications />*/}
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                  <span className="name mr-1">{`${FName} ${LName}`}</span>
                {/*<span>*/}
                  {/*<img alt="Profile" src="/assets/img/profile-pic-l.jpg" />*/}
                {/*</span>*/}
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                {/*<DropdownItem>Account</DropdownItem>*/}
                {/*<DropdownItem>Features</DropdownItem>*/}
                {/*<DropdownItem>History</DropdownItem>*/}
                {/*<DropdownItem>Support</DropdownItem>*/}
                {/*<DropdownItem divider />*/}
                <DropdownItem onClick={() => this.handleLogout()}>
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale
  };
};
export default injectIntl(
  connect(
    mapStateToProps,
    { setContainerClassnames, clickOnMobileMenu, changeLocale }
  )(TopNav)
);
