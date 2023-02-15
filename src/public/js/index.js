const socket = io();


Swal.fire({
    title: "Eh vo , qien so?",
    input:"text",
    text: "q qien so?!?",
    inputValidator: (value)=>{
        return  !value && "Deci qien so o te cagamo a tiros"
    },
    allowOutsideClick:false
    
}) 
.then(result=>{
    user=result.value
});

chatBox.addEventListener('keyup',evt=>{
    if (evt.key==="Enter"){
        if (chatBox.value.trim().length>0) {
            socket.emit("message",{user:user,message:chatBox.value});
            chatBox.value="";
            
        }
    }
})

socket.on("messageLogs", data=>{
    let log = document.getElementById("messageLogs");
    let messages="";
    console.log(data);
    data.forEach(message => {
        messages = messages+ `${message.user} dice: ${message.message}</br>`
    })
    log.innerHTML = messages;
})