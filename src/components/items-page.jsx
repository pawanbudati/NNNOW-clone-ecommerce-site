/* eslint-disable react/jsx-no-duplicate-props */
import AfterScrollHeader from './afterscroll-header';
import CarouselComponent from './carousel';
import { useContext } from 'react'
import { AppContext } from '../App.js'


let carouselOfferLinkeMen = [
    ['https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/19DEC22-CK-MLP-Topbanner-desk.jpg', 'https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/19DEC22-CK-MLP-Topbanner-desk.jpg'],
    ['https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/19DEC22-USPA-MLP-TB-DSK-re.jpg', 'https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/19DEC22-USPA-MLP-TB-DSK-re.jpg'],
    ['https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/18DEC22-SUITSBLAZERS-MLP-DSK.jpg', 'https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/18DEC22-SUITSBLAZERS-MLP-DSK.jpg'],
    ['https://logan.nnnow.com/content/dam/nnnow-project/12-dec-2022/13DEC22-Winterwear-MLP-Banner-DSK.jpg', 'https://logan.nnnow.com/content/dam/nnnow-project/12-dec-2022/13DEC22-Winterwear-MLP-Banner-DSK.jpg']
]









const Items = (props) => {

    const [cartItems, setCartItems, menuItems, setMenuItems, wishList, setWishList, loggedInUser, setLoggedInUser, renderer, setRenderer, displayLoginForm, navigateToCategory, reload, cartToggle, setcartToggle, wishListToggle, setwishListToggle, removeItemFromWishList, addOrRemoveItemToCart, addItemToWishList, categoryList,] = useContext(AppContext);





    const handleSort = (property) => {
        console.log('sorting by ' + property);
        switch (property) {
            case ('price:LtoH'): {
                let temp = menuItems
                temp.sort((a, b) => a.offerPrice - b.offerPrice);
                setMenuItems(temp)
                break;
            }
            case ('price:HtoL'): {
                let temp = menuItems
                temp.sort((a, b) => b.offerPrice - a.offerPrice);
                setMenuItems(temp)
                break;
            }

        }
    }

    const displayForm = () => {
        if (loggedInUser)
            displayLoginForm()
        const object = document.getElementById('email-input')
        if (object)
            object.value = null;
        let objects = document.getElementsByClassName('otp')
        if (objects)
            Array.from(objects).forEach(obj => obj.style.display = 'none')

        const e = document.getElementById('login-form')
        if (e) {
            if (e.style.display != 'none')
                e.style.display = 'none'
            else
                e.style.display = 'block'
        }
    }

    const handleLike = (e) => {
        if (loggedInUser) {

            const itemId = e.target.id
            if (itemId) {
                if (e.target.className === 'like-icon fa fa-heart') {
                    removeItemFromWishList(itemId)
                    e.target.className = 'like-icon fa fa-heart-o'
                    e.target.title = 'add to wishlist'
                }
                else {
                    addItemToWishList(itemId)
                    e.target.title = 'Remove from wishlist'
                    e.target.className = 'like-icon fa fa-heart'
                }
            }
        }
        else {
            displayForm()
            console.log('display login form for like');
        }
    }

    const addToCart = (e) => {
        if (loggedInUser) {

            const itemId = e.target.id
            if (itemId) {
                if (e.target.className === 'bi bi-cart-check-fill') {
                    addOrRemoveItemToCart(itemId, 'remove')
                    e.target.className = 'bi bi-cart'
                    e.target.title = 'add to Cart'
                }
                else {
                    addOrRemoveItemToCart(itemId, 'add')
                    e.target.title = 'Remove from Cart'
                    e.target.className = 'bi bi-cart-check-fill'
                }
            }

        }
        else {
            console.log('display login form for cart');
            displayForm()
        }
    }

    return (
        <>

            <AfterScrollHeader categoryList={props.categoryList} />
            <br />
            <br />
            <CarouselComponent carouselOfferLinkes={carouselOfferLinkeMen} width={'100%'} />
            <div className='item-container'>
                <div className='item-filter'>
                    <select onSelect={e => handleSort(e.target.value)} className='item-sorting-select' id='item-sorting-select'>
                        <option value='date'>Newest</option>
                        <option value='price:LtoH'>Price: Low to High</option>
                        <option value='price:HtoL'>Price: High to Low</option>
                        <option value='discount'>Discount</option>
                    </select>
                    <label className='item-sorting-select' htmlFor='item-sorting-select'><b>SORT:</b> </label>
                </div>
                <div className='item-row'>
                    {menuItems.map(item =>
                        <div className='item-body p-2' key={item.itemId}>
                            <div className='image-container'>
                                <img className='primary-image' src={(item.firstImage)} alt={'Image of ' + item.name} />
                                <div className='hover-image'>
                                    <img src={(item.secondImage)} alt={'Image of ' + item.name} />
                                </div>
                            </div>
                            <center className='details'>
                                <div className='item-title'>
                                    <i
                                        style={{ scale: "2", margin: "0.25rem" }}
                                        className={'like-icon fa fa-heart' + (wishList.find(wItem => wItem.itemId === item.itemId) ? "" : "-o")}
                                        title={wishList.find(wItem => wItem.itemId === item.itemId) ? "remove from wishlist" : 'add to wishlist'}
                                        id={item.itemId} onClick={e => handleLike(e)} aria-hidden='true'></i>

                                    {item.name}
                                    <i
                                        style={{ scale: "2", margin: "0.25rem" }}
                                        className={(cartItems.find(cItem => cItem.productDto.itemId === item.itemId) ? "bi bi-cart-check-fill" : "bi bi-cart")}
                                        title={(cartItems.find(cItem => cItem.productDto.itemId === item.itemId) ? "Remove from cart" : "add to cart")}
                                        id={item.itemId} onClick={e => addToCart(e)}></i>

                                </div>
                                <div className='details-description' title={item.description}>{item.description.substring(0, 55)}...</div>

                                <hr />
                                <span><del>Rs.{item.actualPrice}</del></span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>Rs.{item.offerPrice}</span>
                            </center>
                        </div>)}
                </div>
            </div >
        </>
    );
}

export default Items;