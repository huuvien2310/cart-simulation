async function main(){
    const response = await axios.get('http://localhost:3000/api/items')
    const items = response.data
    console.log(items)

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
        
        const html = items.map(item => `
            <li class="order-item">
                <span>${item.name}</span>

                <span class="quantity">
                <button class="dec">-</button>
                <input class="holder" readonly="true" type="number" value="${item.quantity}">
                <button class="inc">+</button>
                </span>

                <span class="price">
                    <span>$${(item.quantity * item.price)}</span>
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

    function add(index){
        items.push(items[index])
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

    render()
}

main()