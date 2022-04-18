async function main(){
    const response = await axios.get('http://localhost:3000/api/orders')
    const orders = response.data

    function render(){
        // const html = orders.map(order => `
        // <li class="order">
        //     <p>${order.items[0].name}</p>
        //     <p class="quantity">${order.items[0].quantity}</p>
        //     <p>${order.items[0].price}</p>
        // </li>
        // `).join('')
        // const items = [...orders.items]
        const items = []
        const html = orders.map(order => {
            order.items.forEach(item => `
                <p>${item.name}</p>
                <p>${item.price}</p>
                <p>${item.quantity}</p>
            `)
        }).join('')
        console.log(html)
                // for(let i = 0; i < order.items.length; i++){
        //     items.push(order.items[i]);
        // }
        // console.log(items);
        // const html = orders.map(order => {
        //    order.items.forEach(item => `
        //         <li class="order">
        //             <p>${item.name}</p>
        //             <p class="quantity">${item.quantity}</p>
        //             <p>${item.price}</p>
        //         </li>
        //    `)}).join('')
        document.getElementById('orders').innerHTML = html
    }

    render()
}

main()