import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const [selectedSizes, setSelectedSizes] = useState({});

  // Function to handle size selection
  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [itemId]: size,
    }));
  };

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <div key={item.id || item._id} className="border-b pb-4">
                {/* Cart Item Component */}
                <UserCartItemsContent cartItem={item} />

                {/* Size Selection Dropdown */}
                <div className="mt-2">
                  <span className="text-sm">Select Size:</span>
                  <Select
                    onValueChange={(size) => handleSizeChange(item.id || item._id, size)}
                    defaultValue={selectedSizes[item.id || item._id] || "39"}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="36">36</SelectItem>
                      <SelectItem value="39">39</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="42">42</SelectItem>
                      <SelectItem value="44">44</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))
          : <p className="text-center text-gray-500">Your cart is empty</p>}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">₹{totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
