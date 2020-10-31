import {connect} from "react-redux";

export default connect(state=>({router:state.router}))(props=>{
    const propsToString=JSON.stringify(props)
    return<p>{propsToString}</p>
})