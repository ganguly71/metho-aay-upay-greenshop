
import React, { useState } from "react";
import { useCart } from "@/components/CartContext";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Check, CreditCard, Truck, Wallet, ArrowLeft } from "lucide-react";

type PaymentMethod = "cod" | "upi" | "card";

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: PaymentMethod;
  upiId?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<CheckoutForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });
  
  const [formStep, setFormStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (items.length === 0) {
    navigate("/cart");
    return null;
  }
  
  // Calculate shipping based on cart total
  const shippingCost = subtotal >= 500 ? 0 : 40;
  const total = subtotal + shippingCost;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Move to payment step
    setFormStep("payment");
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate based on payment method
    if (formData.paymentMethod === "upi" && !formData.upiId) {
      toast({
        title: "Missing UPI ID",
        description: "Please enter your UPI ID",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv) {
        toast({
          title: "Missing Card Information",
          description: "Please enter all card details",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Process payment (in a real app, this would call a payment gateway)
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setFormStep("confirmation");
      window.scrollTo(0, 0);
    }, 2000);
  };
  
  const handleOrderCompletion = () => {
    // Clear cart and navigate to home
    clearCart();
    navigate("/");
    
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for shopping with METHO AAY-UPAY.",
    });
  };
  
  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            <div className="flex-1 text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${formStep === "shipping" ? "bg-veggie-500 text-white" : "bg-veggie-100 text-veggie-700"}`}>
                <Truck className="h-5 w-5" />
              </div>
              <p className={`mt-2 text-sm ${formStep === "shipping" ? "text-veggie-600 font-medium" : "text-gray-500"}`}>
                Shipping
              </p>
            </div>
            
            <div className="flex-1 text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${formStep === "payment" ? "bg-veggie-500 text-white" : formStep === "confirmation" ? "bg-veggie-100 text-veggie-700" : "bg-gray-100 text-gray-400"}`}>
                <Wallet className="h-5 w-5" />
              </div>
              <p className={`mt-2 text-sm ${formStep === "payment" ? "text-veggie-600 font-medium" : formStep === "confirmation" ? "text-gray-500" : "text-gray-400"}`}>
                Payment
              </p>
            </div>
            
            <div className="flex-1 text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${formStep === "confirmation" ? "bg-veggie-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                <Check className="h-5 w-5" />
              </div>
              <p className={`mt-2 text-sm ${formStep === "confirmation" ? "text-veggie-600 font-medium" : "text-gray-400"}`}>
                Confirmation
              </p>
            </div>
          </div>
          
          <div className="mt-2 relative">
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gray-200">
              <div 
                className="h-full bg-veggie-500 transition-all duration-300" 
                style={{ 
                  width: formStep === "shipping" ? "0%" : formStep === "payment" ? "50%" : "100%" 
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Shipping Information Step */}
        {formStep === "shipping" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Enter your delivery address</CardDescription>
                </CardHeader>
                
                <form onSubmit={handleShippingSubmit}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Textarea 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleInputChange} 
                        placeholder="Street address, apartment, etc."
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input 
                          id="city" 
                          name="city" 
                          value={formData.city} 
                          onChange={handleInputChange} 
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input 
                          id="state" 
                          name="state" 
                          value={formData.state} 
                          onChange={handleInputChange} 
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code *</Label>
                        <Input 
                          id="pincode" 
                          name="pincode" 
                          value={formData.pincode} 
                          onChange={handleInputChange} 
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="justify-between">
                    <Button 
                      variant="outline" 
                      type="button" 
                      onClick={() => navigate("/cart")}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cart
                    </Button>
                    
                    <Button type="submit" className="bg-veggie-500 hover:bg-veggie-600">
                      Continue to Payment
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Items ({items.length})</span>
                      <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Shipping</span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        <span className="font-medium">₹{shippingCost.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">Included</span>
                    </div>
                    
                    <div className="flex justify-between pt-3 border-t border-gray-200 text-base">
                      <span className="font-bold text-veggie-800">Total</span>
                      <span className="font-bold text-veggie-800">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {/* Payment Method Step */}
        {formStep === "payment" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose your preferred payment option</CardDescription>
                </CardHeader>
                
                <form onSubmit={handlePaymentSubmit}>
                  <CardContent>
                    <RadioGroup 
                      value={formData.paymentMethod} 
                      onValueChange={(value) => handlePaymentMethodChange(value as PaymentMethod)}
                      className="space-y-4"
                    >
                      {/* Cash on Delivery Option */}
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50" onClick={() => handlePaymentMethodChange("cod")}>
                        <RadioGroupItem value="cod" id="cod" className="text-veggie-500" />
                        <div className="flex-1">
                          <Label htmlFor="cod" className="font-medium text-veggie-800 mb-1 cursor-pointer">Cash on Delivery</Label>
                          <p className="text-sm text-gray-500">Pay when your order arrives</p>
                        </div>
                      </div>
                      
                      {/* UPI Option */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50" onClick={() => handlePaymentMethodChange("upi")}>
                          <RadioGroupItem value="upi" id="upi" className="text-veggie-500" />
                          <div className="flex-1">
                            <Label htmlFor="upi" className="font-medium text-veggie-800 mb-1 cursor-pointer">UPI Payment</Label>
                            <p className="text-sm text-gray-500">Pay using UPI apps like Google Pay, PhonePe, etc.</p>
                          </div>
                        </div>
                        
                        {formData.paymentMethod === "upi" && (
                          <div className="pl-7 ml-3">
                            <div className="space-y-2">
                              <Label htmlFor="upiId">UPI ID *</Label>
                              <Input 
                                id="upiId" 
                                name="upiId" 
                                value={formData.upiId || ""} 
                                onChange={handleInputChange} 
                                placeholder="yourname@upi"
                                required={formData.paymentMethod === "upi"}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Card Option */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50" onClick={() => handlePaymentMethodChange("card")}>
                          <RadioGroupItem value="card" id="card" className="text-veggie-500" />
                          <div className="flex-1">
                            <Label htmlFor="card" className="font-medium text-veggie-800 mb-1 cursor-pointer">Credit/Debit Card</Label>
                            <p className="text-sm text-gray-500">Pay securely with your card</p>
                          </div>
                          <CreditCard className="h-5 w-5 text-gray-400" />
                        </div>
                        
                        {formData.paymentMethod === "card" && (
                          <div className="pl-7 ml-3 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number *</Label>
                              <Input 
                                id="cardNumber" 
                                name="cardNumber" 
                                value={formData.cardNumber || ""} 
                                onChange={handleInputChange} 
                                placeholder="1234 5678 9012 3456"
                                required={formData.paymentMethod === "card"}
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="cardExpiry">Expiry Date *</Label>
                                <Input 
                                  id="cardExpiry" 
                                  name="cardExpiry" 
                                  value={formData.cardExpiry || ""} 
                                  onChange={handleInputChange} 
                                  placeholder="MM/YY"
                                  required={formData.paymentMethod === "card"}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="cardCvv">CVV *</Label>
                                <Input 
                                  id="cardCvv" 
                                  name="cardCvv" 
                                  value={formData.cardCvv || ""} 
                                  onChange={handleInputChange} 
                                  placeholder="123"
                                  required={formData.paymentMethod === "card"}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </RadioGroup>
                  </CardContent>
                  
                  <CardFooter className="justify-between">
                    <Button 
                      variant="outline" 
                      type="button" 
                      onClick={() => setFormStep("shipping")}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                    
                    <Button 
                      type="submit" 
                      className="bg-veggie-500 hover:bg-veggie-600"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Items ({items.length})</span>
                      <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Shipping</span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        <span className="font-medium">₹{shippingCost.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">Included</span>
                    </div>
                    
                    <div className="flex justify-between pt-3 border-t border-gray-200 text-base">
                      <span className="font-bold text-veggie-800">Total</span>
                      <span className="font-bold text-veggie-800">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Shipping Address</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="font-medium">{formData.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{formData.address}</p>
                    <p className="text-sm text-gray-600">{formData.city}, {formData.state} {formData.pincode}</p>
                    <p className="text-sm text-gray-600 mt-1">{formData.phone}</p>
                    <p className="text-sm text-gray-600">{formData.email}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
        
        {/* Order Confirmation Step */}
        {formStep === "confirmation" && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6 px-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-veggie-800 mb-2">Thank You for Your Order!</h2>
                  <p className="text-gray-600">
                    Your order has been placed successfully.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-veggie-800 mb-3">Order Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-medium">ORD{Math.floor(Math.random() * 100000)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium">
                          {formData.paymentMethod === "cod" ? "Cash on Delivery" : 
                            formData.paymentMethod === "upi" ? "UPI Payment" : "Credit/Debit Card"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-medium">₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-veggie-800 mb-3">Delivery Information</h3>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <p className="font-medium">{formData.name}</p>
                        <p className="text-gray-600 mt-1">{formData.address}</p>
                        <p className="text-gray-600">{formData.city}, {formData.state} {formData.pincode}</p>
                        <p className="text-gray-600 mt-1">{formData.phone}</p>
                        <p className="text-gray-600">{formData.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-veggie-800 mb-3">Estimated Delivery</h3>
                    <p className="text-sm text-gray-600">
                      Your order will be delivered within 2-4 hours.
                    </p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex-col space-y-3">
                <Button 
                  onClick={handleOrderCompletion}
                  className="w-full bg-veggie-500 hover:bg-veggie-600"
                >
                  Continue Shopping
                </Button>
                <p className="text-xs text-center text-gray-500">
                  A confirmation email has been sent to {formData.email}.
                </p>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
