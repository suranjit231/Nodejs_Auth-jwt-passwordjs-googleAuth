//------- methods for toggling OTP form ----------//

function toggleOtpForm(){
    let otpFormContainer = document.querySelector(".otpFormContainer");
    let otpFormWrapper = document.querySelector(".otpFormWrapper");
    let otpFormToggleButton = document.querySelector(".otpFormToggle");
    let hideMsg = document.querySelector(".hideMsg");


    if(otpFormContainer.classList.contains("otpFormContainer-show")){
        otpFormContainer.classList.add("otpFormContainer-hide");
        otpFormContainer.classList.remove("otpFormContainer-show");
        otpFormToggleButton.style.display="block";
       // hideMsg.style.display = (hideMsg.style.display === 'block') ? 'none' : 'block';
       hideMsg.style.display="none";

    }else{
        otpFormContainer.classList.remove("otpFormContainer-hide");
        otpFormContainer.classList.add("otpFormContainer-show");
        otpFormToggleButton.style.display="none";
       // hideMsg.innerHTML="";
      // hideMsg.style.display = (hideMsg.style.display === 'block') ? 'none' : 'block';
       hideMsg.style.display="none";
    }


}



// -----otp show sucessMsg
function OtpshowSuccessMessage(){
    let otpSuccess = document.querySelector(".otp-success");
    otpSuccess.classList.add("otp-success-show");
    otpSuccess.classList.remove("otp-success-hide");

    setTimeout(() => {
        // Remove animation class
        otpSuccess.classList.remove("otp-success-show");
        otpSuccess.classList.add("otp-success-hide");
        
    }, 8000);
   

}

document.addEventListener("DOMContentLoaded", function() {
 
    OtpshowSuccessMessage();



  });
 