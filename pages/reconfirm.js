import {useState} from "react";
import {confirmSignUp, recieveOTP} from "../function/checkAuth";
import Reconfirm from "../components/Reconfirm";

const Forgot=({token, location, setToken})=>{
    const [email, setemail] = useState("")
    const [otp, setOtp] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [error, setError] = useState("")

    async function recieveOTPF(){
        const err = await recieveOTP({email})
        if (err === null){
            setOtpSent(true)
        }
        setError(err)
    }

    async function confirmOTPF(){
        
            console.log("confirm otp funtion reached",token)
            const err = await confirmSignUp({email, otp, token, setToken})
            if (err === null){
                setError("Account confirmed. Login now to proceed.")
            }
            setError("Account confirmed. Login now to proceed.")
        
    }

    return(
        <Reconfirm email={email} setemail={setemail}
                            recieveOTP={recieveOTPF} otp={otp} setOtp={setOtp} otpSent={otpSent} error={error} confirmOTP={confirmOTPF}/>
    )
}

export default Forgot;
