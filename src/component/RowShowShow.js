import React, {Component} from 'react';
import IntlMessages from "../helpers/IntlMessages";

class RowShowShow extends Component {
    render() {
        let{label,value}=this.props;

        return (
            <div className="w-100 d-flex justify-content-start mt-2 mb-2 ml-1 ">
                <p className="     fontFamily maxWidth paddingZero  d-flex justify-content-start fontSizeAuto">
                    <IntlMessages id={`${label} :`}/>
                </p>
                <p className="   font-weight-bold  fontFamily  d-flex justify-content-end fontSizeAuto wordBreakAll">
                    {value}
                </p>
            </div>
        );
    }
}

export default RowShowShow;