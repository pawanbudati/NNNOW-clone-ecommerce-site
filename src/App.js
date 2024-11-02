/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "./components/footer";
import AllOffers from "./components/offers-page";
import "./styles/main-styles.css";
import "./styles/style-configs.css";
import "./styles/cardComponent.css";
import LoginForm from "./components/login-form";
import { Routes, Route, useNavigate } from "react-router-dom";
import Items from "./components/items-page";
import CartView from "./components/cartView.jsx";
import WishListView from "./components/wishlistView.jsx";

import { createContext, useState, useMemo } from "react";
import axios from "axios";
import {
    getAllItemsByCategoryUrl,
    getCartUrl,
    getWishListUrl,
    addItemToCartUrl,
    decrementItemFromCartUrl,
    removeItemFromCartUrl,
    removeItemFromWishListUrl,
    addItemToWishListUrl,
} from "./env/configuration";

let categoryListdummy = [
    "Men",
    "Women",
    "Kids",
    "Sephora",
    "Online Exclusives",
    "Footwear",
    "Brands",
];

let topBrands = [
    "U.S.Polo",
    "Aeropostale",
    "Ed Hardy",
    "Flying Machine",
    "Sephora",
    "Arrow",
    "Tommy Hilfiger",
    "Calvin Klein",
];

let carouselOfferLinkes = [
    [
        "https://logan.nnnow.com/content/dam/nnnow-project/14-dec-2022/hp/15DEC22-DressLayers-FashionStory-HP-DSK.jpg",
        "https://logan.nnnow.com/content/dam/nnnow-project/14-dec-2022/hp/15DEC22-DressLayers-FashionStory-HP-DSK.jpg",
    ],
    [
        "https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/hp/18DEC22-SUITSBLAZERS-HP-DSK.jpg",
        "https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/hp/18DEC22-SUITSBLAZERS-HP-DSK.jpg",
    ],
    [
        "https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/hp/18DEC22-HP-ARROW-BRANDDAY-TB-DSK-re.jpg",
        "https://logan.nnnow.com/content/dam/nnnow-project/16-dec-2022/hp/18DEC22-HP-ARROW-BRANDDAY-TB-DSK-re.jpg",
    ],
    [
        "https://logan.nnnow.com/content/dam/nnnow-project/15-dec-2022/hp/16DEC22-Santa-Weekend-PopUp-Banner-DSK-re.gif",
        "https://logan.nnnow.com/content/dam/nnnow-project/15-dec-2022/hp/16DEC22-Santa-Weekend-PopUp-Banner-DSK-re.gif",
    ],
];

let usefulLinks = [
    ["Tommy Hilfiger : upto 10% off", "#"],
    ["U.S. Polo Assn. : min 40% off", "#"],
    ["Flying Machine  : upto 60% off", "#"],
];

let coupons = [
    [
        "https://logan.nnnow.com/content/dam/nnnow-project/04-nov-2022/hp/7th/ATV2.jpg",
        "#",
    ],
    [
        "https://logan.nnnow.com/content/dam/nnnow-project/14-nov-2022/hp/15NOV22-ATV-3.jpg",
        "#",
    ],
    [
        "https://logan.nnnow.com/content/dam/nnnow-project/04-nov-2022/hp/7th/ATV1.jpg",
        "#",
    ],
];

let randomMenuItems = [];
axios
    .get(getAllItemsByCategoryUrl, {
        params: { category: "random" },
    })
    .then((response) => (randomMenuItems = response.data))
    .catch((error) => console.log("Axios error : " + error));

export const AppContext = createContext();

const App = () => {
    const [categoryList, setcategoryList] = useState(categoryListdummy);
    const [cartToggle, setcartToggle] = useState(false);
    const [wishListToggle, setwishListToggle] = useState(false);
    const [menuItems, setMenuItems] = useState(randomMenuItems);
    const [wishList, setWishList] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [renderer, setRenderer] = useState(true);
    const navigate = useNavigate();
    let [currentCategory, setCurrentCategory] = useState("");

    const [loggedInUser, setLoggedInUser] = useState(
        localStorage.getItem("user") || null
    );

    const reload = (reload) => {
        navigate("/");
        reload && window.location.reload();
    };

    const loadItems = (category) => {
        // console.log(category);
        axios
            .get(getAllItemsByCategoryUrl, {
                params: { category: category },
            })
            .then((response) => setMenuItems(response.data))
            .catch(
                (error) => console.log("Axios error : " + error),
                setMenuItems([])
            );
    };

    const navigateToCategory = (category) => {
        if (currentCategory != category) {
            //console.log(currentCategory, category);
            setCurrentCategory(category);
            loadItems(category);
            navigate("/items", { state: { selectedCategory: category } });
        } else {
            loadItems(category);
        }
    };

    const closeLoginForm = () => {
        const object = document.getElementById("email-input");
        if (object) object.value = null;
        let objects = document.getElementsByClassName("otp");
        if (objects)
            Array.from(objects).forEach((obj) => (obj.style.display = "none"));
        objects = document.getElementsByClassName("otp-input");
        const e = document.getElementById("login-form");
        if (e.style.display != "none") e.style.display = "none";
        else e.style.display = "block";
    };

    const displayLoginForm = () => {
        console.log("displayLoginForm() is called ffrom app");
        let objects = document.getElementsByClassName("logout");
        if (objects)
            Array.from(objects).forEach(
                (object) => (object.style.display = "block")
            );
    };
    const closeLogoutForm = () => {
        let objects = document.getElementsByClassName("logout");
        if (objects)
            Array.from(objects).forEach(
                (object) => (object.style.display = "none")
            );
    };

    const logout = () => {
        let objects = document.getElementsByClassName("logout");
        if (objects)
            Array.from(objects).forEach(
                (object) => (object.style.display = "none")
            );
        setLoggedInUser(null);
        localStorage.removeItem("user");
        window.location.reload();
    };

    const removeItemFromWishList = (itemId) => {
        //console.log("removing ", itemId);
        axios
            .delete(removeItemFromWishListUrl, {
                data: { userName: loggedInUser, productId: itemId },
            })
            .then((response) =>
                response.status === 200
                    ? setWishList(
                          wishList.filter((item) => item.itemId != itemId)
                      )
                    : console.log("Unable to delete from wishlist")
            );
    };

    const addItemToWishList = (itemId) => {
        //console.log("adding ", itemId);
        axios
            .post(addItemToWishListUrl, {
                userName: loggedInUser,
                productId: itemId,
            })
            .then((response) =>
                response.status === 200
                    ? setWishList([
                          ...wishList,
                          menuItems.filter((item) => item.itemId == itemId)[0],
                      ])
                    : console.log("Unable to add to wishlist")
            );
    };
    const loadCartItems = () => {
        axios
            .get(getCartUrl, { params: { username: loggedInUser } })
            .then((response) => setCartItems(response.data));
    };
    const loadWishListItems = () => {
        axios
            .get(getWishListUrl, { params: { username: loggedInUser } })
            .then((response) => setWishList(response.data));
    };

    useMemo(() => {
        if (loggedInUser) {
            loadCartItems();
            loadWishListItems();
        }
    }, [loggedInUser]);

    const addOrRemoveItemToCart = (itemId, operation) => {
        if (operation === "add") {
            axios
                .post(addItemToCartUrl, {
                    userName: loggedInUser,
                    productId: itemId,
                })
                .then((response) =>
                    response.status == 200
                        ? loadCartItems()
                        : console.log("unable to add item to cart!")
                );
            //console.log("decrementing ", itemId);
        } else if (operation === "remove") {
            //console.log("removing ", itemId);
            axios
                .delete(removeItemFromCartUrl, {
                    data: { userName: loggedInUser, productId: itemId },
                })
                .then((response) =>
                    response.status == 200
                        ? loadCartItems()
                        : console.log("Unable to remove!")
                );
        } else if (operation === "decrement") {
            //console.log("decrementing ", itemId);
            axios
                .put(decrementItemFromCartUrl, {
                    userName: loggedInUser,
                    productId: itemId,
                })
                .then((response) =>
                    response.status == 200
                        ? loadCartItems()
                        : console.log("Unable to decrement")
                );
        }
    };

    return (
        <AppContext.Provider
            value={[
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
                removeItemFromWishList,
                addOrRemoveItemToCart,
                addItemToWishList,
                categoryList,
            ]}
        >
            {loggedInUser == null && (
                <div
                    className='login-form'
                    id='login-form'
                    style={{ display: "none" }}
                >
                    <div className='login-area'>
                        <span
                            className='login-exit'
                            onClick={(e) => closeLoginForm()}
                        >
                            x
                        </span>
                        <LoginForm />
                    </div>
                </div>
            )}

            {loggedInUser != null && (
                <>
                    <div
                        className='logout logout-bg'
                        onClick={(e) => closeLogoutForm()}
                        style={{ display: "none" }}
                    ></div>
                    <div
                        className='logout logout-area'
                        style={{ display: "none" }}
                    >
                        <p>Logged in as : {loggedInUser}</p>
                        <button
                            className='btn btn-danger btn-sm'
                            onClick={(e) => logout()}
                        >
                            Logout
                        </button>
                    </div>
                </>
            )}

            {cartToggle && <CartView />}

            {wishListToggle && <WishListView />}

            <Routes>
                <Route
                    path='/offers'
                    element={
                        <AllOffers
                            categoryList={categoryList}
                            coupons={coupons}
                            usefulLinks={usefulLinks}
                            carouselOfferLinkes={carouselOfferLinkes}
                        />
                    }
                />
                <Route
                    path='/'
                    element={
                        <AllOffers
                            categoryList={categoryList}
                            coupons={coupons}
                            usefulLinks={usefulLinks}
                            carouselOfferLinkes={carouselOfferLinkes}
                        />
                    }
                />
                <Route
                    path='/items'
                    element={<Items categoryList={categoryList} />}
                />
            </Routes>

            <Footer categoryList={categoryList} topBrandsList={topBrands} />
        </AppContext.Provider>
    );
};
export default App;
