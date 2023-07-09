import nnnowLogo from '../images/nnnow-logo.webp'
import SearchBar from './search';
import { useState } from 'react';
import Category from './Category-display';
import { useContext } from 'react';
import { AppContext } from '../App';
import Cart from './cart';
import WishList from './wishlist';


const AfterScrollHeader = ({ categoryList }) => {


    const [cartItems, setCartItems, menuItems, setMenuItems, wishList, setWishList, loggedInUser, setLoggedInUser, renderer, setRenderer, displayLoginForm, navigateToCategory, reload] = useContext(AppContext)





    const [searchToggle, setSearchToggle] = useState(false);

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


    return (
        <>
            <div className='ash-main'>
                <div className='ash-logo'>
                    <img src={nnnowLogo} onClick={e => reload(true)} alt='nnnow logo' />
                </div>
                {
                    searchToggle &&
                    <div className='ash-search-container'>
                        <SearchBar categoryList={categoryList} />
                        <span className='exit-btn' onClick={e => setSearchToggle(!searchToggle)}>x</span>
                    </div>
                }
                {
                    (!searchToggle) &&
                    <div className='ash-category-container'>
                        <i onClick={e => setSearchToggle(!searchToggle)} className='fa fa-search'></i>
                        <Category categoryList={categoryList} onNavigate={(category) => navigateToCategory(category)} />
                    </div>
                }

                <div className='ash-profile'>
                    <WishList displayWishList={e => console.log("displaying wishlist")} />
                    <Cart displayCart={e => console.log("displaying cart")} />
                    <i onClick={e => displayForm()} className='fa fa-user-o' aria-hidden='true'>&nbsp;{loggedInUser}</i>
                </div>
            </div>
        </>
    );
}

export default AfterScrollHeader;