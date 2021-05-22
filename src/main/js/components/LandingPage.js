import React from "react";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button"
;
export default function LandingPage() {
    const history = useHistory();
    const onLogin = () => {
        history.push("/login");
        window.location.reload();
    }
    const onRegister = () => {
        history.push("/registration");
        window.location.reload();
    }
    return(
    <div className="mywrapper" >
        <div style={{marginTop: "80px"}}>
            <Typography variant="h1">
                Welcome to FashionX
            </Typography>
            <Typography variant="h5" style={{marginTop:"50px"}}>
                Life is not perfect but your outfit can be
            </Typography>
            <div style={{marginTop:"100px"}}>

            <button type="button" className="btn btn-lg btn-default btn-notify" style={{marginRight:"40px"}} onClick={onLogin}>
            LOGIN
            </button>
            <button type="button" className="btn btn-lg btn-default btn-notify" onClick={onRegister}>
            REGISTER
            </button>
            </div>
        </div>
    </div>
    )

}