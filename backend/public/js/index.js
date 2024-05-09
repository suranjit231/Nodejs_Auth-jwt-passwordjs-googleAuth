// ----------methods for signup form toggling

function toggleSignupForm(){
    let toggleSignupFormButton= document.querySelector(".toggleSignupForm");
   let signupFormContainer = document.querySelector(".signup-formContainer");
   let signupFormwrapper = document.querySelector(".signup-formWrapper");

   if(signupFormContainer.classList.contains("signup-formContainer-show")){
   
    signupFormContainer.classList.add(".signup-formContainer-hide");
    signupFormContainer.classList.remove("signup-formContainer-show");
   // signupFormwrapper.style.display = "none";
    toggleSignupFormButton.style.display="block";
   

   }else{
    signupFormContainer.classList.add("signup-formContainer-show");
    signupFormContainer.classList.remove(".signup-formContainer-hide");
   // signupFormwrapper.style.display = "flex";
   
    toggleSignupFormButton.style.display="none";

   }
}

// ----------methods for hide and show of password input-----
function hideAndShowPasswordSignup(){
    const togglePassword = document.getElementById('togglePasswordSignup');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Change icon
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
    });

}


document.addEventListener("DOMContentLoaded", function() {
    toggleSignupForm();
    hideAndShowPasswordSignup();
    showSuccessMessage();
 });


// ---------- handling signup form submit events------
// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("signup-form").addEventListener("submit", function(event) {
//         event.preventDefault(); // Prevent default form submission

//         // Get form data
//         let formData = new FormData(this);

//         // Convert form data to JSON
//         let jsonData = {};
//         formData.forEach(function(value, key) {
//             jsonData[key] = value;
//         });

//          // Validate input fields
//          if (!validateFormData(jsonData)) {
//             // If validation fails, display an error message
//             const flashDiv = document.querySelector(".flash-sucess");
//             const errorMessage = document.createElement("h2");
//             errorMessage.innerHTML = "All fields are required.";
//             errorMessage.style.color = "red";
//             flashDiv.innerHTML = "";
//             flashDiv.appendChild(errorMessage);
//             showSuccessMessage(); 
//             return; 
//         }




//         this.reset();

//         console.log("jsonData: ", jsonData);

        // Send AJAX request to backend
//         fetch("http://localhost:3200/api/user/signup", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(jsonData)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Handle response from backend
//             console.log(data);
//             // For example, display a success message or redirect the user
//             let flashDiv = document.querySelector(".flash-sucess");
//             if(data.success){
//                 toggleSignupForm();
//                 const flashMessage=document.createElement("h2");
//                 flashMessage.innerHTML=data.msg;
//                 flashMessage.style.color="aliceblue";
//                 flashDiv.innerHTML="";
//                 flashDiv.appendChild(flashMessage);
//                 showSuccessMessage()
//                 let errorMessageDiv= document.querySelector(".error-message");
//                 errorMessageDiv.innerHTML="";

//             }else{
//                 let errorMessageDiv= document.querySelector(".error-message");
//                 errorMessageDiv.innerHTML="";
//                 errorMessageDiv.innerHTML = data.error;

//             }


//         })
//         .catch(error => {
//             // Handle errors
//             console.error("Error:", error);
//             // For example, display an error message to the user
//         });
//     });
// });



// Function to validate form data
function validateFormData(formData) {
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            if (!formData[key]) {
                // If any field is empty, return false
                return false;
            }
        }
    }
    return true;
}


// ---------- flash sucess animation controll-------//
function showSuccessMessage() {
    const successDiv = document.querySelector('.flash-sucess');
    successDiv.classList.add('flash-sucess-animation');
    // Show success message for 3 seconds
    setTimeout(() => {
        // Remove animation class
        successDiv.classList.remove('flash-sucess-animation');
    }, 10000);
}

