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