site endpoints

(1. ````
GET  Get Featured Images
Method	GET
Function	client.site.featuredImages()
Parameters
Parameter Name	Value Type	Description
per_page	Integer	Optional; no of items to return for each pages (default is 10)
page	Integer	Optional; page to return; default is 1 (first page)
Request

Direct Function


    
    client.site.featuredImages({
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "data fetched successfully",
      "data": [
          {
              "id": 3,
              "image": "/media/gallery/star_2PChkxK.png",
              "description": "Common room area with Plasma TV and Tennis table"
          },
          {
              "id": 1,
              "image": "/media/gallery/c.png",
              "description": "Sitting room area"
          }
      ],
      "page_number": 1,
      "items_per_page": 10,
      "total_pages": 1,
      "total_items": 2
    }

Response

error



      // server error
    {
      "status": "error",
      "message": "Error occurred: {error_details"
    }



2. ````

GET  Get Available Room List/Single Item
Method	GET
Function	client.site.roomList()
Parameters
Parameter Name	Value Type	Description
sort_by	String	Optional; sorting method (default is "title"; options are "title, -title, price, -price"
NOTE: Options with the "-" sign signifies descending order
per_page	Integer	Optional; no of items to return for each pages (default is 20)
page	Integer	Optional; page to return; default is 1 (first page)
search	String	Optional; search string is matched against room title
room_id	Integer	Optional; if fetching a single room, this parameter is required and does not need other parameters
Request

Direct Function


    // for a list
    admin.room.roomList({
      params: { sort_by: "price" }
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })

    // for a single item
    admin.room.roomList({
      params: { room_id: 2 }
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "data fetched successfully",
      "data": [
          {
              "id": 1,
              "title": "Room 1",
              "thumbnail": "/media/room/thumbnails/cofee.png",
              "available": true,
              "expiration_date": null,
              "price": "150000.00",
              "images": [
                  {
                      "id": 1,
                      "image": "/media/gallery/c.png",
                      "description": "sitting room",
                      "featured": true
                  }
              ],
              "features": "",
              "student": null
          }
      ],
      "page_number": 1,
      "list_per_page": 20,
      "total_pages": 1,
      "total_items": 1,
      "search_query": ""
    }
      
    
    // for a single room
    {
      "status": "success",
      "message": "data fetched successfully",
      "data": {
          "id": 2,
          "title": "Room 2",
          "thumbnail": "/media/room/thumbnails/bch.png",
          "available": false,
          "expiration_date": null,
          "price": "230000.00",
          "images": [
                {
                    "id": 1,
                    "image": "/media/gallery/c.png",
                    "description": "Sitting room area"
                }
          ],
          "features": "a",
          "student": null
      }
    }
Response

error



    // server error
    {
      "status": "error",
      "message": "Error occured: {error details}"
    }


3. ````

POST  Send Contact Message
Method	POST
Function	client.site.sendMessage()
Parameters
Parameter Name	Value Type	Description
email	String	Required; Email address of sender
name	String	Required; Name of sender
subject	String	Required; Subject/title of message
message	String	Required; Content of message
Request

Direct Function


    // No login required
    
    let formData = {
      email: "user@gmail.com",
      name: "John Doe",
      subject: "Test Subject",
      message: "Message goes here..."
    }
    
    // make request
    client.site.sendMessage({
      formData: formData,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "Message sent successfully."
    }

Response

error



    // invalid email
    {
      "status": "error",
      "message": "Invalid email address"
    }
      // invalid name/subject/message
    {
      "status": "error",
      "message": "Invalid name/subject/message"
    }
    // server error
    {
      "status": "error",
      "message": "Error occurred: {error_details}"
    }
)




Room Endpoints
(

1. POST  Book A Room
Method	POST
Function	client.room.book()
Parameters
Parameter Name	Value Type	Description
room_id	Integer	Required; ID of room to book
Request

Direct Function


    let formData = {
      room_id: 1
    }

    // make request
    client.room.book({
      formData: formData,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    // the 'data' object is what will be passed into the makePayment API function
    
    {
      "status": "success",
      "transaction": {
          "reference": "trx-2025080408380757225",
          "description": "House rent payment for Room 1",
          "duration": 12,
          "amount": 150000,
          "status": "unpaid",
          "date": "2025-08-04",
          "expiration_date": "2026-08-04",
          "receipt": null,
          "room": {
              "id": 1,
              "title": "Room 1",
              "thumbnail": "/media/room/thumbnails/cofee.png",
              "available": true,
              "price": "150000.00",
              "features": ""
          }
      },
      "data": {
          "paystack_public_key": "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxx",
          "email": "techrigan@gmail.com",
          "amount": 15000000,
          "reference": "trx-2025080408380757225"
      }
    }
Response

error



    // invalid room selection
    {
      "status": "error",
      "message": "Invalid  room ID"
    }
      // unavailable room
    {
      "status": "error",
      "message": "Room 1 not available for booking"
    }
    // server error
    {
      "status": "error",
      "message": "Error occured: {error details}"
    }

````

2. POST  Make Payment
Method	POST
Function	client.room.makePayment()
Parameters
Parameter Name	Value Type	Description
data	object	Required; the data object gotten from the booking API call
Request

Direct Function


    var formData = {
      "paystack_public_key": "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxx",
      "email": "techrigan@gmail.com",
      "amount": 15000000,
      "reference": "trx-2025080408380757225"
    }

    // make request - making this request will open the paystack payment modal

    client.room.makePayment({
      formData: formData,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    // the reference can then be used to call the verify payment function
    
    {
      "reference": "trx-2025080408380757225",
      "trans": "5207492102",
      "status": "success",
      "message": "Approved",
      "transaction": "5207492102",
      "trxref": "trx-2025080408380757225",
      "redirecturl": ""
    }
Response

error



    {
      "type": "popup",
      "message": "Error message"
    }

    ````

    3. GET  Verify Payment
Method	GET
Function	client.room.verifyPayment()
Parameters
Parameter Name	Value Type	Description
reference	string	Required; transaction reference
Request

Direct Function


    var params = {
      "reference": "trx-2025080408380757225"
    }

    // make request

    client.room.verifyPayment({
      params: params,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "transaction_status": "success"
    }

Response

error



    // invalid reference
    {
      "status": "error",
      "message": "Invalid transaction reference"
    }
      // paystack error
    {
      "status": "error",
      "message": "{Error message}"
    }
      // server error
    {
      "status": "error",
      "message": "Error occred: {error_details}"
    }

)



Rent Endpoints
(
    1. GET  Get Rent History List/Single Item
Method	GET
Function	client.rent.history()
Parameters
Parameter Name	Value Type	Description
reference	String	Optional; if fetching a single rent transaction, this parameter is required and does not need other parameters
Request

Direct Function


    // for a list
    client.rent.history({
      params: { status: "success" }
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })

    // for a single item
    client.rent.history({
      params: { reference: "trx-2025080408380757225" }
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })
    



Response

success


    {
      "status": "success",
      "message": "data fetched successfully",
      "data": [
          {
              "reference": "trx-2025080408380757225",
              "description": "House rent payment for Room 1",
              "duration": 12,
              "amount": 150000,
              "status": "success",
              "date": "2025-08-04",
              "expiration_date": "2026-08-04",
              "receipt": null,
              "room": {
                  "id": 1,
                  "title": "Room 1",
                  "thumbnail": "/media/room/thumbnails/cofee.png",
                  "available": true,
                  "price": "150000.00",
                  "features": ""
              }
          }
      ]
    }
      
    
    // for a single transaction
    {
      "status": "success",
      "message": "data fetched successfully",
      "data": {
          "reference": "trx-2025080408380757225",
          "description": "House rent payment for Room 1",
          "duration": 12,
          "amount": 150000,
          "status": "success",
          "date": "2025-08-04",
          "expiration_date": "2026-08-04",
          "receipt": null,
          "room": {
              "id": 1,
              "title": "Room 1",
              "thumbnail": "/media/room/thumbnails/cofee.png",
              "available": true,
              "price": "150000.00",
              "features": ""
          }
      }
    }

    Response

error



    // invalid reference
    {
      "status": "error",
      "message": "Invalid transaction reference"
    }
      // server error
    {
      "status": "error",
      "message": "Error occured: {error details}"
    }

`````
2. GET  Generate Agreement Document
Method	GET
Function	client.rent.generateAgreement()
Parameters
Parameter Name	Value Type	Description
Request

Direct Function


    client.rent.generateAgreement({
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error)
    })



Response

success


    // you can fetch the profile to show agreement document after successful generation
    {
      "status": "success",
      "message": "Agreement document generated successfully."
    }

Response

error



    // if user did not rent a room or has paid but transaction is not successful yet
    {
      "status": "error",
      "message": "You do not have any current rent tenancy"
    }
      // Already generated agreement
    {
      "status": "error",
      "message": "Agreement document has already been generated"
    }
      // server error
    {
      "status": "error",
      "message": "Error occured: {error details}"
    }

)