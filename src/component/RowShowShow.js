import React, {Component} from 'react';
import IntlMessages from "../helpers/IntlMessages";

class RowShowShow extends Component {
    render() {
        let{label,value}=this.props;

        return (
            <div className="w-100 d-flex justify-content-start pt-2 mb-2 ml-1 align-items-center">
                <span className="     fontFamily maxWidth paddingZero  d-flex justify-content-start fontSizeAuto align-items-center">
                    <IntlMessages id={`${label} :`}/>
                </span>
                <span className="   font-weight-bold  fontFamily  d-flex justify-content-end fontSizeAuto wordBreakAll align-items-center">
                    {value}
                </span>
            </div>
        );
    }
}

export default RowShowShow;