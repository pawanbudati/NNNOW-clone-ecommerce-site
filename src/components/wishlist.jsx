import WishListView from "./wishlistView";
import { useState, useMemo } from "react";
import { useContext } from "react";
import { AppContext } from "../App";

const WishList = (props) => {



    const [
        cartItems,
        setCartItems,
        menuItems,
        setMenuItems,
        wishList,
        setWishList,
        loggedInUser,
        setLoggedInUser,
        renderer,
        setRenderer,
        displayLoginForm,
        navigateToCategory,
        reload,
        cartToggle,
        setcartToggle,
        wishListToggle,
        setwishListToggle,
    ] = useContext(AppContext)

    const obj = document.getElementById("wishlist-icon")
    useMemo(() => {
        if (obj) {
            if (wishList.length == 0) {
                obj.className = "fa fa-heart-o shake";
                setTimeout(() => {
                    obj.className = "fa fa-heart-o";
                }, 3000);
            }
            else {
                obj.className = "fa fa-heart shake";
                setTimeout(() => {
                    obj.className = "fa fa-heart";
                }, 3000);

            }
        }
    }, [wishList]);

    return (
        <>

            <i className='fa fa-heart-o' id="wishlist-icon" onClick={e => setwishListToggle(!wishListToggle)}></i>
        </>
    );
}

export default WishList;