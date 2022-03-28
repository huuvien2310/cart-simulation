async function main(){
    const response = await axios.get('http://localhost:3000/api/items')
    const items = response.data

    const order_items = []

    function defaultItems(){
        const html = items.map(item => `
            <div class="item">
                <p>${item.name}</p>
                <p>Price <span>$${item.price}</span></p>
                <button class="add">Add</button>
            </div>
        `).join('')
        document.getElementById('items').innerHTML = html

        const addButton = [...document.getElementsByClassName('add')]
        for(let i = 0; i < items.length; i++){
            addButton[i].addEventListener('click', () => {
                add(i)
            })
        }
    }

    defaultItems();

    const SHIPPING = 1

    function render(){
        let subTotal = 0;
        items.forEach(item => {
            subTotal += item.quantity * item.price
        })
        const total = subTotal + SHIPPING;
        
        const html = order_items.map(order_item => `
            <li class="order-order_item">
                <span>${order_item.name}</span>

                <span class="quantity">
                <button class="dec">-</button>
                <input class="holder" readonly="true" type="number" value="${order_item.quantity}">
                <button class="inc">+</button>
                </span>

                <span class="price">
                    <span>$${(order_item.quantity * order_item.price)}</span>
                    <button class="delete">X</button>
                </span>
            </li>
        `).join('')
        document.getElementById('orders').innerHTML = html

        const deleteButtons = [...document.getElementsByClassName('delete')]
        const decButton = [...document.getElementsByClassName('dec')]
        const incButton = [...document.getElementsByClassName('inc')]

        for(let i = 0; i < deleteButtons.length; i++){
            decButton[i].addEventListener('click', () => {
                updateQuantity(i, items[i].quantity - 1)
            })
            incButton[i].addEventListener('click', () => {
                updateQuantity(i, items[i].quantity + 1)
            })
            deleteButtons[i].addEventListener('click', () => {
                remove(i)
            })
        }

        document.getElementById('sub-total').innerText = `$${subTotal}`
        document.getElementById('shipping').innerText = `$${SHIPPING}`
        document.getElementById('total').innerText = `$${total}`
    }

    document.getElementById('checkout').addEventListener('click', () => {
        checkOut()
    })

    function add(index){
        order_items.push(items[index])
        render()
    }

    function remove(index){
        items.splice(index, 1)
        render()
    }

    function updateQuantity(index, quantity){
        if(quantity < 1){
            return
        }

        items[index].quantity = quantity
        render()
    }

    function checkOut(){
        const order = {
            items: []
        }
        order_items.forEach(order_item => {
            order.items.push(order_item)
        })
        axios.post("http://localhost:3000/api/order", order)
            .then(() => {
                for (const order_item in order){
                    delete order[order_item]
                }
                order_items.length = 0
                const html = order_items.map(order_item => `
                    <li class="order-order_item">
                        <span>${order_item.name}</span>

                        <span class="quantity">
                        <button class="dec">-</button>
                        <input class="holder" readonly="true" type="number" value="${order_item.quantity}">
                        <button class="inc">+</button>
                        </span>

                        <span class="price">
                            <span>$${(order_item.quantity * order_item.price)}</span>
                            <button class="delete">X</button>
                        </span>
                    </li>
                `).join('')
                document.getElementById('orders').innerHTML = html
                console.log('Thank you for your order')
                console.log(order)
                console.log(order_items)
            })
            .catch(error => {
                console.error(error);
        })
        render()
    }

    render()
}

main()