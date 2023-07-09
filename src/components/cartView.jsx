
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

import React, { useContext } from "react";
import { AppContext } from "../App";
import AfterScrollHeader from "./afterscroll-header";


const CartView = () => {

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
        removeItemFromWishList,
        addOrRemoveItemToCart,
        addItemToWishList,
        categoryList,] = useContext(AppContext);

    let discount = 0.0
    let price = 0.0

    cartItems.forEach(element => {
        discount += (parseFloat(element.productDto.actualPrice) - parseFloat(element.productDto.offerPrice)) * parseInt(element.quantity);
        price += parseFloat(element.productDto.offerPrice) * parseInt(element.quantity)
    });



    return (
        <div className="cart-view fadein">
            <AfterScrollHeader categoryList={categoryList} />
            <section className="" style={{ backgroundColor: "#eee", width: "113%" }}>
                <MDBContainer className="h-100" style={{ backgroundColor: "#eee", width: "100%", transform: "scale(0.75) translateY(-4rem) scaleY(0.975)" }}>
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol>
                            <MDBCard className="shopping-cart" style={{ borderRadius: "15px" }}>
                                <MDBCardBody className="text-black">
                                    <MDBRow>
                                        <MDBCol lg="7" className="px-5 py-4">
                                            <MDBTypography
                                                tag="h3"
                                                className="mb-5 pt-2 text-center fw-bold text-uppercase"
                                            >
                                                Your products
                                            </MDBTypography>

                                            <div className="cart-items-container">
                                                {
                                                    cartItems.map(item => (
                                                        <div className="d-flex align-items-center mb-5" key={item.productDto.itemId} >
                                                            <div className="flex-shrink-0">
                                                                <img style={{ height: "100px" }} src={item.productDto.firstImage} alt={item.productDto.name} />
                                                            </div>

                                                            <div className="flex-grow-1 ms-3 p-3">
                                                                <a href="#!" className="text-black float-end">
                                                                    <i className="bi bi-x-circle" title="remove item from cart" id={item.productDto.itemId} onClick={e => addOrRemoveItemToCart(e.target.id, "remove")}></i>
                                                                </a>
                                                                <MDBTypography tag="h5" className="text-primary">
                                                                    {item.productDto.name}
                                                                </MDBTypography>
                                                                <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                                                                    Brand: {item.productDto.brand}
                                                                </MDBTypography>

                                                                <div className="d-flex align-items-center">

                                                                    <div className="def-number-input number-input safari_only">
                                                                        <i className="bi bi-dash-circle" title="decreasse item quantity" id={item.productDto.itemId} onClick={e => addOrRemoveItemToCart(e.target.id, "decrement")}></i>
                                                                        <span className="quantity fw-bold text-black">{" " + item.quantity + " "}</span>
                                                                        <i className="bi bi-plus-circle" title="increase item quantity" id={item.productDto.itemId} onClick={e => addOrRemoveItemToCart(e.target.id, "add")}></i>
                                                                    </div>
                                                                    <p className="fw-bold mb-0 me-5 pe-3">
                                                                        <i className="bi bi-currency-rupee"></i>{item.productDto.offerPrice + " x " + item.quantity + " = "}
                                                                        <i className="bi bi-currency-rupee"></i>
                                                                        {(parseFloat(item.productDto.offerPrice) * parseFloat(item.quantity)).toFixed(2)}
                                                                    </p>

                                                                </div>
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            </div>


                                            <hr
                                                className="mb-4"
                                                style={{
                                                    height: "2px",
                                                    backgroundColor: "#1266f1",
                                                    opacity: 1,
                                                }}
                                            />

                                            <div className="d-flex justify-content-between px-x">
                                                <p className="fw-bold">Discount:</p>
                                                <p className="fw-bold"><i className="bi bi-currency-rupee"></i>{discount}</p>
                                            </div>
                                            <div
                                                className="d-flex justify-content-between p-2 mb-2"
                                                style={{ backgroundColor: "#e1f5fe" }}
                                            >
                                                <MDBTypography tag="h5" className="fw-bold mb-0">
                                                    Total:
                                                </MDBTypography>
                                                <MDBTypography tag="h5" className="fw-bold mb-0">
                                                    <i className="bi bi-currency-rupee"></i>
                                                    {price}
                                                </MDBTypography>
                                            </div>
                                        </MDBCol>
                                        <MDBCol lg="5" className="px-5 py-4">
                                            <MDBTypography
                                                tag="h3"
                                                className="mb-5 pt-2 text-center fw-bold text-uppercase"
                                            >
                                                Payment
                                            </MDBTypography>

                                            <form className="mb-5">
                                                <MDBInput
                                                    className="mb-5"
                                                    label="Card number"
                                                    type="text"
                                                    size="lg"
                                                    defaultValue="1234 5678 9012 3457"
                                                />

                                                <MDBInput
                                                    className="mb-5"
                                                    label="Name on card"
                                                    type="text"
                                                    size="lg"
                                                    defaultValue="John Smith"
                                                />

                                                <MDBRow>
                                                    <MDBCol md="6" className="mb-5">
                                                        <MDBInput
                                                            className="mb-4"
                                                            label="Expiration"
                                                            type="text"
                                                            size="lg"
                                                            minLength="7"
                                                            maxLength="7"
                                                            defaultValue="01/22"
                                                            placeholder="MM/YYYY"
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="6" className="mb-5">
                                                        <MDBInput
                                                            className="mb-4"
                                                            label="Cvv"
                                                            type="text"
                                                            size="lg"
                                                            minLength="3"
                                                            maxLength="3"
                                                            placeholder="&#9679;&#9679;&#9679;"
                                                            defaultValue="&#9679;&#9679;&#9679;"
                                                        />
                                                    </MDBCol>
                                                </MDBRow>

                                                <p className="mb-5">
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit
                                                    <a href="#!"> obcaecati sapiente</a>.
                                                </p>

                                                <button className="btn btn-primary">Buy now</button>

                                                <MDBTypography
                                                    tag="h5"
                                                    className="fw-bold mb-5"
                                                    style={{ position: "absolute", bottom: "0" }}
                                                >
                                                    <i className="bi bi-arrow-left-circle" onClick={e => setcartToggle(!cartToggle)}>Back to shop</i>
                                                </MDBTypography>
                                            </form>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </div>

    );
}

export default CartView;


// return (
//     <section className="cart-view-container fadein" >
//         <div onClick={e => setcartToggle(!cartToggle)} className="cart-bg" style={{ height: "100%", width: "100%", backgroundColor: "blue" }}></div>
//         {/* <MDBContainer className="cart-body-container">

//         </MDBContainer> */}
//         <MDBRow className=" cart-body-container justify-content-center align-items-center">
//             <MDBCol size="12">
//                 <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
//                     <MDBCardBody className="p-0">
//                         <MDBRow className="g-0">
//                             <MDBCol lg="8">
//                                 <div className="p-5">
//                                     <div className="d-flex justify-content-between align-items-center mb-5">
//                                         <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
//                                             Shopping Cart
//                                         </MDBTypography>
//                                         <MDBTypography className="mb-0 text-muted">
//                                             3 items
//                                         </MDBTypography>
//                                     </div>

//                                     <hr className="my-4" />
//                                     <div className="cart-items-display">
//                                         {
//                                             cartItems.map(item => (
//                                                 <div key={item.productDto.itemId}>
//                                                     <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
//                                                         <MDBCol md="2" lg="2" xl="2">
//                                                             <MDBCardImage
//                                                                 src={item.productDto.firstImage}
//                                                                 fluid className="rounded-3" alt="Cotton T-shirt" />
//                                                         </MDBCol>
//                                                         <MDBCol md="3" lg="3" xl="3">
//                                                             <MDBTypography tag="h6" className="text-muted">
//                                                                 Shirt
//                                                             </MDBTypography>
//                                                             <MDBTypography tag="h6" className="text-black mb-0">
//                                                                 Cotton T-shirt
//                                                             </MDBTypography>
//                                                         </MDBCol>
//                                                         <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
//                                                             <MDBBtn color="link" className="px-2">
//                                                                 <MDBIcon fas icon="minus" />
//                                                             </MDBBtn>

//                                                             <MDBInput type="number" min="0" defaultValue={1} size="sm" />

//                                                             <MDBBtn color="link" className="px-2">
//                                                                 <MDBIcon fas icon="plus" />
//                                                             </MDBBtn>
//                                                         </MDBCol>
//                                                         <MDBCol md="3" lg="2" xl="2" className="text-end">
//                                                             <MDBTypography tag="h6" className="mb-0">
//                                                                 € 44.00
//                                                             </MDBTypography>
//                                                         </MDBCol>
//                                                         <MDBCol md="1" lg="1" xl="1" className="text-end">
//                                                             <a href="#!" className="text-muted">
//                                                                 <MDBIcon fas icon="times" />
//                                                             </a>
//                                                         </MDBCol>
//                                                     </MDBRow>
//                                                     <hr className="my-4" />
//                                                 </div>
//                                             ))
//                                         }
//                                     </div>





//                                     <div className="pt-5">
//                                         <MDBTypography tag="h6" className="mb-0">
//                                             <MDBCardText tag="a" href="#!" className="text-body">
//                                                 <i className="bi bi-arrow-left-circle" onClick={e => setcartToggle(!cartToggle)}>Back to shop</i>
//                                             </MDBCardText>
//                                         </MDBTypography>
//                                     </div>
//                                 </div>
//                             </MDBCol>
//                             <MDBCol lg="4" className="bg-grey">
//                                 <div className="p-5">
//                                     <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
//                                         Summary
//                                     </MDBTypography>

//                                     <hr className="my-4" />

//                                     <div className="d-flex justify-content-between mb-4">
//                                         <MDBTypography tag="h5" className="text-uppercase">
//                                             items 3
//                                         </MDBTypography>
//                                         <MDBTypography tag="h5">€ 132.00</MDBTypography>
//                                     </div>

//                                     <MDBTypography tag="h5" className="text-uppercase mb-3">
//                                         Shipping
//                                     </MDBTypography>

//                                     <div className="mb-4 pb-2">
//                                         <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}>
//                                             <option value="1">Standard-Delivery- €5.00</option>
//                                             <option value="2">Two</option>
//                                             <option value="3">Three</option>
//                                             <option value="4">Four</option>
//                                         </select>
//                                     </div>

//                                     <MDBTypography tag="h5" className="text-uppercase mb-3">
//                                         Give code
//                                     </MDBTypography>

//                                     <div className="mb-5">
//                                         <MDBInput size="lg" label="Enter your code" />
//                                     </div>

//                                     <hr className="my-4" />

//                                     <div className="d-flex justify-content-between mb-5">
//                                         <MDBTypography tag="h5" className="text-uppercase">
//                                             Total price
//                                         </MDBTypography>
//                                         <MDBTypography tag="h5">€ 137.00</MDBTypography>
//                                     </div>

//                                     {/* <MDBBtn color="dark" block size="lg">
//                                             Register
//                                         </MDBBtn> */}
//                                     <button className="btn  btn-secondary" >
//                                         Proceed to payment!
//                                     </button>
//                                 </div>
//                             </MDBCol>
//                         </MDBRow>
//                     </MDBCardBody>
//                 </MDBCard>
//             </MDBCol>
//         </MDBRow>
//     </section>

// );

