/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useMemo } from "react";
import { AppContext } from "../App";

const Cart = (props) => {

    const [cartItems, setCartItems, menuItems, setMenuItems, wishList, setWishList, loggedInUser, setLoggedInUser, renderer, setRenderer, displayLoginForm, navigateToCategory, reload, cartToggle, setcartToggle, wishListToggle, setwishListToggle, removeItemFromWishList, addItemToWishList,] = useContext(AppContext);
    const obj = document.getElementById("cart-icon")

    let cartIconClass = "bi bi-bag-check fa"

    useMemo(() => {
        if (cartItems.length === 0)
            cartIconClass = "bi bi-bag-check fa"
        else cartIconClass = "bi bi-bag-check-fill fa"
        if (obj) {
            obj.className = cartIconClass + " shake";
            setTimeout(() => {
                obj.className = cartIconClass;
            }, 3000);
        }
    }, [cartItems]);



    return (
        <>
            <i className='bi bi-bag-check fa' id="cart-icon" onClick={e => setcartToggle(!cartToggle)}></i>

        </>
    );
}

export default Cart;
























































































































































