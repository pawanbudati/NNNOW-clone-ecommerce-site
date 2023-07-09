import ExtraTopHeader from './extra-header-features';
import DefaultHeader from './default-header';
import CarouselComponent from './carousel';
import { useContext } from "react";
import { AppContext } from "../App";

import bannerOfferImage from '../images/offer-card-banner.webp'
import UsefulLinks from './useful-links';
let imageOffer2 = ['https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/17DEC-HP-B1G1-Offer-Strip-Desk.jpg', 'https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/17DEC-HP-B1G1-Offer-Strip-Desk.jpg']
let couponsImage = 'https://logan.nnnow.com/content/dam/nnnow-project/06-dec-2022/hp/headers/dsk/7DEC-HP-Headers-Dsk-01.gif'




const AllOffers = (props) => {

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

    return (<>
        <div>
            <ExtraTopHeader />
            <DefaultHeader categoryList={props.categoryList} displayCart={() => props.displayCart()} />
            <div className='banner-offer-image' onClick={e => console.log('redirecting to offer page...')}>
                <center>
                    <img src={bannerOfferImage} width='99.5%' alt='offer' />
                </center>
            </div>

            <div className='carousel-and-links'>
                <CarouselComponent width={800} carouselOfferLinkes={props.carouselOfferLinkes} />
                <UsefulLinks usefulLinks={props.usefulLinks} />
            </div>

            <div className='banner-offer-2'>
                <center>
                    <a href={imageOffer2[1]}>
                        <img src={imageOffer2[0]} width='99.5%' alt='offer' />
                    </a>
                </center>
            </div>
            <div className='banner-offer-3'>
                <center>
                    <img src={couponsImage} width='99.5%' alt='offer' />
                </center>
                <div className='coupon-carsoul'>
                    <CarouselComponent defaultCarouselInterval={300} carouselOfferLinkes={props.coupons} width={400} />
                    <CarouselComponent defaultCarouselInterval={800} carouselOfferLinkes={props.coupons} width={400} />
                    <CarouselComponent defaultCarouselInterval={1300} carouselOfferLinkes={props.coupons} width={400} />
                </div>
            </div>
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
                        <div className='item-body' key={item.itemId}>
                            <div className='image-container'>
                                <img className='primary-image' src={(item.firstImage)} alt={'Image of ' + item.name} />
                                <div className='hover-image'>
                                    <img src={(item.secondImage)} alt={'Image of ' + item.name} />
                                </div>
                            </div>
                            <center className='details'>
                                <div className='item-title'>
                                    <i
                                        className={'like-icon fa fa-heart' + (wishList.find(wItem => wItem.itemId === item.itemId) ? "" : "-o")}
                                        title={wishList.find(wItem => wItem.itemId === item.itemId) ? "remove from wishlist" : 'add to wishlist'}
                                        id={item.itemId} onClick={e => handleLike(e)} aria-hidden='true'></i>
                                    {item.name}
                                    <i
                                        className={(cartItems.find(cItem => cItem.productDto.itemId === item.itemId) ? "bi bi-cart-check-fill" : "bi bi-cart")}
                                        title={(cartItems.find(cItem => cItem.productDto.itemId === item.itemId) ? "Remove from cart" : "add to cart")}
                                        id={item.itemId} onClick={e => addToCart(e)}></i>
                                </div>
                                <div className='details-description' title={item.description}>{item.description.substring(0, 55)}...</div>
                                <span><del>Rs.{item.actualPrice}</del></span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>Rs.{item.offerPrice}</span>
                            </center>
                        </div>)}
                </div>
            </div >
            <center>
                <a href='#' className='back-to-top'>Back To Top</a>
            </center>
        </div>
    </>);
}

export default AllOffers;