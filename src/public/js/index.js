const socket = io();
const product_list = document.getElementById('product_list');


socket.on('updateProducts', products=>{
    product_list.innerText = '';

    products.forEach(pokemon => {
        let pokemon_html = document.createElement('div');
        pokemon_html.innerHTML = `
            <div>
                <h4>${pokemon.title}</h4>
                <p>${pokemon.description}</p>
            </div>
        `;

        product_list.append(pokemon_html);
    });
})

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
    data.forEach(message => {
        messages = messages+ `${message.user} dice: ${message.message}</br>`
    })
    log.innerHTML = messages;
})