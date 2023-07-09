import { useContext, useState, useMemo } from "react";
import { AppContext } from "../App";



const WishListView = () => {

    const [renderer2, setrenderer2] = useState(true);
    const [cartItems,
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
        removeItemFromWishList
    ] = useContext(AppContext)



    if (wishList.length === 0)
        return (
            <>
                <div className="wishlist-main fadein" onClick={e => setwishListToggle(!wishListToggle)}>
                    {
                        (loggedInUser)
                            ? <center>
                                <h4>Favourites</h4>
                                <div className="wishlist-item-container">
                                    no items present!!!
                                </div>
                            </center>
                            : <center>
                                <h4>Favourites</h4>
                                <div className="wishlist-item-container">
                                    Please Login to see favourite items!!!
                                </div>
                            </center>
                    }
                </div>
            </>
        )
    return (
        <div className="wishlist-main fadein">
            <div className='wishlist-item-row fadein'>
                <div className="wishlist-header">
                    <h4>Favourites</h4>
                    <i onClick={e => setwishListToggle(!wishListToggle)} className="bi bi-x-circle"></i>
                </div>
                <div className="wishlist-item-container">
                    {wishList.map(item =>
                        <div className='wishlist-item-body' key={item.itemId}>
                            <div className='image-container'>
                                <img className='primary-image' src={(item.firstImage)} alt={'Image of ' + item.name} />
                                <div className='hover-image'>
                                    <img src={(item.secondImage)} alt={'Image of ' + item.name} />
                                </div>
                            </div>
                            <center className='wishlist-details details'>
                                <div className='item-title'>
                                    {item.name}
                                </div>
                                <div className='details-description' title={item.description}>{item.description.substring(0, 55)}...</div>
                                <hr />
                                <span className="p-2"><del>Rs.{item.actualPrice}</del></span>
                                <span className="p-2">Rs.{item.offerPrice}</span>
                                <i className="bi bi-dash-circle" id={item.itemId} onClick={e => removeItemFromWishList(e.target.id)} style={{ color: "red" }}></i>
                            </center>
                        </div>)}
                </div>
            </div>
        </div>
    );
}

export default WishListView;