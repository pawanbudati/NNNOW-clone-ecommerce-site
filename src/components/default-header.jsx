
import nnnowLogo from '../images/nnnow-logo.webp'
import Cart from './cart';
import Category from './Category-display';
import SearchBar from './search';
import { useContext } from 'react';
import { AppContext } from '../App';
import WishList from './wishlist';



const DefaultHeader = (props) => {

    const [cartItems, setCartItems, menuItems, setMenuItems, wishList, setWishList, loggedInUser, setLoggedInUser, renderer, setRenderer, displayLoginForm, navigateToCategory, reload] = useContext(AppContext)
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
            <div className='dh-main' >
                <div className='dh-top'>
                    <SearchBar categoryList={props.categoryList} />
                    <div className='site-name'>
                        <img src={nnnowLogo} onClick={e => reload(true)} alt='nnnow logo and title will be displayed' />
                    </div>
                    <div className='dh-top-right' >
                        <i onClick={e => displayForm()} className='fa fa-user-o' aria-hidden='true'>&nbsp;{loggedInUser}</i>
                        <span className='fa dh-separator'>|</span>
                        <Cart displayCart={e => console.log(cartItems)} />
                        <span className='fa dh-separator'>|</span>
                        <WishList displayWishList={e => console.log("displaying wishlist")} />
                    </div>
                </div>
                <div className='dh-categories'>
                    <Category categoryList={props.categoryList} onNavigate={(category) => navigateToCategory(category)} />
                </div>
            </div>
        </>
    );
}

export default DefaultHeader;