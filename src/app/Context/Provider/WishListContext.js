const { useState, useEffect, useContext, createContext } = require("react");

const WishContext = createContext();

export const WishProvider = ({ children }) => {
    const [wish, setWish] = useState([])

    useEffect(() => {
        setToState();
    }, []);

    const setToState = () => {
        setWish(
            localStorage.getItem("wish")
                ? JSON.parse(localStorage.getItem("wish"))
                : []
        );
    };

    const addToWishList = async ({
        productId,
        name,
        price,
        image,
        category,
    }) => {
        const item = { productId, name, price, image, category };

        let existingWish = localStorage.getItem("wish")
            ? JSON.parse(localStorage.getItem("wish"))
            : { wishItems: [] };
        setWish(existingWish);

        const wishItemsArray = existingWish.wishItems || [];

        const isExistIndex = wishItemsArray.findIndex(
            (i) => i.productId === item.productId
        );

        if (isExistIndex !== -1) {
            // newCartProduct=cart?.cartItems?.map(i=>i.productId==isExist.productId?item:i)
            // If the item already exists, update its quantity
            wishItemsArray[isExistIndex].quantity += 1;
        } else {
            wishItemsArray.push(item);
        }

        localStorage.setItem("wish", JSON.stringify(existingWish));

        setWish(existingWish);
    };

    const deleteProductFromLocalWishList = (productId) => {
        const updatedWishItems = {
            wishItems: wish?.wishItems?.filter(
                (item) => item.productId !== productId
            ),
        };

        localStorage.setItem("wish", JSON.stringify(updatedWishItems));
        setWish(updatedWishItems);
    };


    return (
        <WishContext.Provider
            value={{
                wish,
                addToWishList,
                deleteProductFromLocalWishList
            }}
        >
            {children}
        </WishContext.Provider>
    );

}

export default WishContext

