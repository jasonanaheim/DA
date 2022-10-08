document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e){
    e.preventDefault();

    // Get input values
    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    let message = document.querySelector(".message").value;
    let contactNumber = document.querySelector(".contactNumber").value;
    let hearAbout = document.querySelector(".hearAbout").value;

    let carDetails = document.querySelector(".carDetails").value;
    document.querySelector(".contact-form").reset();

    sendEmail(name, email, message, contactNumber, carDetails,hearAbout, );

}

// Send Email Info
// https://www.youtube.com/watch?v=i2eXkSKjl0A&ab_channel=RajsuthanOfficial

function sendEmail(name, email, message, contactNumber, carDetails, hearAbout){
    Email.send({
        Host: "smtp.gmail.com",
        Username: 'jason.almaraz808@gmail.com',
        Password: "bcrwgnfcmxufumgv",
        To: 'jason.almaraz808@gmail.com',
        From: `${email}`,
        Subject: `${name} sent you a message`, 
        Body: `Name: ${name} <br/> Email: ${email} <br/> Contact Number: ${contactNumber} <br/> Car Details: ${carDetails} <br/> hearAbout: ${hearAbout} <br/> Message: ${message}`,
    }).then((message) => alert("mail sent successfully") )
}