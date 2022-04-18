async function main(){
    const response = await axios.get('http://localhost:3000/api/items')
    const items = response.data

    const order_items = []

    function defaultItems(){
        const html = items.map(item => `
            <div class="item">
                <img class="fit-picture"
                src="https://media-cldnry.s-nbcnews.com/image/upload/t_focal-758x379,f_auto,q_auto:best/rockcms/2022-03/plant-based-food-mc-220323-02-273c7b.jpg"
                alt="Grapefruit slice atop a pile of other slices">
                <div class="info">
                <div class="left">
                    <p class="name">${item.name}</p>
                    <button id="add-button" class="add">Add</button>
                </div>
                <p class="price"><span>$${item.price}</span></p>
                </div>
            </div>
        `).join('')
        document.getElementById('items').innerHTML = html
        const addButton = [...document.getElementsByClassName('add')]
        for(let i = 0; i < items.length; i++){
            addButton[i].addEventListener('click', () => {
                add(i);
                addButton[i].classList.toggle('hide-add');
            })
        }
    }

    defaultItems();

    const SHIPPING = 1

    function render(){
        let subTotal = 0;
        order_items.forEach(order_item => {
            subTotal += order_item.quantity * order_item.price
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
                updateQuantity(i, order_items[i].quantity - 1)
            })
            incButton[i].addEventListener('click', () => {
                updateQuantity(i, order_items[i].quantity + 1)
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
        order_items.splice(index, 1)
        document.getElementsByClassName('add')[index].classList.toggle('hide-add')
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
            console.log(order_item)
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
                // console.log(hideAddButton)
                // hideAddButton.forEach(button => {
                //     button.classList.toggle('add')
                //     console.log(button)
                // })
                render()
                console.log('Thank you for your order')
            })
            .catch(error => {
                console.error(error);
        })
    }

    render()
}

main()

// const hideAddButton = [...document.getElementsByClassName('hide-add')]

// for(let i = 0; i < hideAddButton.length; i++){
//     console.log(hideAddButton[i])
//     hideAddButton[i].classList.toggle('add');
//     console.log(hideAddButton[i])
// }