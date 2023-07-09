import { useContext } from "react";
import { AppContext } from "../App";


const Category = (props) => {

    const [cartItems, setCartItems, menuItems, setMenuItems, wishList, setWishList, loggedInUser, setLoggedInUser, renderer, setRenderer, displayLoginForm, navigateToCategory, reload, cartToggle, setcartToggle, wishListToggle, setwishListToggle, removeItemFromWishList, addOrRemoveItemToCart, addItemToWishList, categoryList,] = useContext(AppContext);

    const onCategorySelect = (e) => {
        setcartToggle(false);
        setwishListToggle(false);
        props.onNavigate(e.target.className)
    }
    return (<>
        <ul className='category-list'>
            {props.categoryList.map(category => (
                <li className={category} key={category} onClick={e => onCategorySelect(e)}>
                    {category}
                </li>
            ))}
        </ul></>);
}

export default Category;