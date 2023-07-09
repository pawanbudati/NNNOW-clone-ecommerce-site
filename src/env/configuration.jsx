const baseUrl = 'http://localhost:8080/nnnow'
const requestOtpUrl = `${baseUrl}/user/send-otp`
const validateOtpUrl = `${baseUrl}/user/check-otp`
const addItemToCartUrl = `${baseUrl}/cart/add-item-cart`
const decrementItemFromCartUrl = `${baseUrl}/cart/decrement-item-cart`
const removeItemFromCartUrl = `${baseUrl}/cart/remove-item-cart`
const getCartUrl = `${baseUrl}/cart/get-cart`
const addItemToWishListUrl = `${baseUrl}/wishlist/add-item-wishlist`
const removeItemFromWishListUrl = `${baseUrl}/wishlist/remove-item-wishlist`
const getWishListUrl = `${baseUrl}/wishlist/get-wishlist`
const getAllItemsUrl = `${baseUrl}/product/all`
const getAllItemsByCategoryUrl = `${baseUrl}/product/all-category`
const searchItemsUrl = `${baseUrl}/product/search`

export { baseUrl, requestOtpUrl, validateOtpUrl, addItemToCartUrl, addItemToWishListUrl, getAllItemsUrl, getAllItemsByCategoryUrl, searchItemsUrl, getCartUrl, decrementItemFromCartUrl, removeItemFromCartUrl, removeItemFromWishListUrl, getWishListUrl }

