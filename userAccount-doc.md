POST  Request OTP Confirmation
Method	POST
Function	client.account.requestOTP()
Parameters
Parameter Name	Value Type	Description
email	String	Required
Request

Direct Function


    var formData = {
        'email':'client@gmail.com'
    }
    
    client.account.requestOTP({
      formData: formData,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "verification code has been sent to client@gmail.com. It expires in 15 minutes"
    }


POST  Create An Account
Method	POST
Function	client.account.createAccount()
Parameters
Parameter Name	Value Type	Description
first_name	String	Required
last_name	String	Required
email	String	Required; Email used to receive OTP
code	String	Required; OTP sent to the email provided above
phone_number	String	Required; must be 11 digits (e.g 070XXXXXXXX)
username	String	Required; must not contain spaces
password	String	Required; must be at least 8 characters long consisting alphanumeric characters. can contain special characters
institution	String	Required; Institution attended (e.g University of Ilorin)
department	String	Required; user department (e.g Mechanical Engineering)
level	String	Required; User level in institution (e.g 200L)
Request

Direct Function


    var formData = {
        email: "client@gmail.com",
        first_name: "John",
        last_name: "Doe",
        code: "12345678",
        phone_number: "08011223344",
        username: "johndoe",
        password: "password123",
        insititution: "Unilorin",
        department: "Computer Science",
        level: "100L"
    }

    client.account.createAccount({
      formData: formData,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "Account created successfully"
    }


POST  Forgot Password
Method	POST
Function	client.account.forgotPassword()
Parameters
Parameter Name	Value Type	Description
email	String	Required; User registered email
Request

Direct Function


    var formData = {
        "email": "client@gmail.com"
    }

    // make request
    client.account.forgotPassword({
      formData: formData,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "Password reset instructions has been sent to your email"
    }


GET  Check Login Status
Method	GET
Function	client.account.loginStatus()
Parameters
Parameter Name	Value Type	Description
Request

Direct Function


    // make request
    client.account.loginStatus({
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    // if logged in
    {
      "status": "success",
      "authenticated": true
    }
      // if logged out
    {
      "status": "success",
      "authenticated": false
    }


POST  Client Login Authentication
Method	POST
Function	client.account.login()
Parameters
Parameter Name	Value Type	Description
username	String	Required
password	String	Required
Request

Direct Function


    var formData = {
        "username": "johndoe",
        "password": "password123"
    }

    // make request
    client.account.login({
      formData: formData,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "Login successful"
    }


GET  Get User Profile
Method	GET
Function	client.account.getProfile()
Parameters
Parameter Name	Value Type	Description
Request

Direct Function


    // make request
    client.account.getProfile({
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "data fetched successfully",
      "data": {
          "id": 4,
          "user": {
              "username": "WhizzyDoc"
          },
          "first_name": "First",
          "last_name": "User",
          "email": "techrigan@gmail.com",
          "phone_number": "07011223344",
          "verified": false,
          "image": null,
          "institution": "Universiy of Ilorin",
          "agreement": null,
          "uploaded_agreement": null,
          "department": "Mass Communication",
          "level": "200L",
          "identity": null
      }
    }


POST  User Logout
Method	POST
Function	client.account.logout()
Parameters
Parameter Name	Value Type	Description
Request

Direct Function



    // make request
    client.account.logout({
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "Logout successful"
    }


POST  Change Password
Method	POST
Function	client.account.changePassword()
Parameters
Parameter Name	Value Type	Description
old_password	String	Required
new_password	String	Required; must be at least 8 alphanumeric characters long
Request

Direct Function


    var formData = {
        old_password: "password123",
        new_password: "newpassword223"
    }
    
    // make request
    client.account.changePassword({
      formData: formData,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "password changed successfully."
    }


POST  Update User Profile
Method	POST
Function	client.account.updateProfile()
Parameters
Parameter Name	Value Type	Description
phone_number	String	Optional
institution	String	Optional
department	String	Optional
level	String	Optional;
Request

Direct Function


    var formData = {
        phone_number: "08076543218",
    }
    
    // make request
    client.account.updateProfile({
      formData: formData,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "profile updated successfully."
    }


POST  Upload User ID & Passport Image
Method	POST
Function	client.account.uploadIdentity()
Parameters
Parameter Name	Value Type	Description
image	data:image	Required; passport sized image; must not exceed 2MB (jpg, jpeg, png allowed)
identity	data:image	Required; image of school ID card/Course Form; must not exceed 2MB (jpg, jpeg, png allowed)
Request

Direct Function


    let image = document.querySelector('.image')[0].files[0];
    let id = document.querySelector('.identity')[0].files[0];

    var formData = new FormData();

    formData.append('image', image);
    formData.append('identity', id);
    
    // make request
    client.account.uploadIdentity({
      formData: formData,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "ID uploaded successfully."
    }


POST  Upload User Signed Agreement
Method	POST
Function	client.account.uploadAgreement()
Parameters
Parameter Name	Value Type	Description
document	data:file	Required; Signed agreement document; must not exceed 10MB (pdf allowed)
Request

Direct Function


    let doc = document.querySelector('.document')[0].files[0];

    var formData = new FormData();

    formData.append('document', doc);
    
    // make request
    client.account.uploadAgreement({
      formData: formData,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "Document uploaded successfully."
    }

