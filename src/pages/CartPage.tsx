import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart, FaArrowLeft, FaTrash } from 'react-icons/fa';
import Button from '../components/UI/Button';
import CartItem from '../components/Cart/CartItem';

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    title: 'Smartphone X',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
    quantity: 1,
  },
  {
    id: 5,
    title: 'Wireless Headphones',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    quantity: 2,
  },
];

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const PageTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.8rem;
  }
`;

const CartContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const CartItemsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  overflow: hidden;
`;

const CartItemsHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundDark};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartItemsTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const CartItemCount = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const EmptyCart = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

const EmptyCartIcon = styled.div`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.backgroundDark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const EmptyCartMessage = styled.p`
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const OrderSummary = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  padding: ${({ theme }) => theme.spacing.lg};
  position: sticky;
  top: ${({ theme }) => theme.spacing.xl};
`;

const OrderSummaryTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.textLight};
  
  &:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.backgroundDark};
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const PromoCode = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const PromoCodeTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PromoCodeForm = styled.form`
  display: flex;
`;

const PromoCodeInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.backgroundDark};
  border-radius: ${({ theme }) => theme.borderRadius.small} 0 0 ${({ theme }) => theme.borderRadius.small};
  font-size: 1.4rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const PromoCodeButton = styled(Button)`
  border-radius: 0 ${({ theme }) => theme.borderRadius.small} ${({ theme }) => theme.borderRadius.small} 0;
`;

const ClearCartButton = styled(Button)`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const BackToShoppingLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const handleIncreaseQuantity = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const handleDecreaseQuantity = (id: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
    }
  };
  
  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple promo code logic
    if (promoCode.toUpperCase() === 'DISCOUNT20') {
      setDiscount(20);
      alert('Promo code applied successfully!');
    } else {
      setDiscount(0);
      alert('Invalid promo code.');
    }
  };
  
  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shipping - discountAmount;
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <FaShoppingCart /> Shopping Cart
        </PageTitle>
        {cartItems.length > 0 && (
          <ClearCartButton variant="outline" onClick={handleClearCart}>
            <FaTrash /> Clear Cart
          </ClearCartButton>
        )}
      </PageHeader>
      
      {cartItems.length > 0 ? (
        <CartContainer>
          <CartItemsContainer>
            <CartItemsHeader>
              <CartItemsTitle>Cart Items</CartItemsTitle>
              <CartItemCount>{cartItems.length}</CartItemCount>
            </CartItemsHeader>
            
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                onRemove={handleRemoveItem}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            ))}
          </CartItemsContainer>
          
          <OrderSummary>
            <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
            
            <SummaryItem>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </SummaryItem>
            
            <SummaryItem>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </SummaryItem>
            
            {discount > 0 && (
              <SummaryItem>
                <span>Discount ({discount}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </SummaryItem>
            )}
            
            <SummaryTotal>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </SummaryTotal>
            
            <PromoCode>
              <PromoCodeTitle>Promo Code</PromoCodeTitle>
              <PromoCodeForm onSubmit={handleApplyPromoCode}>
                <PromoCodeInput
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <PromoCodeButton variant="outline" type="submit">
                  Apply
                </PromoCodeButton>
              </PromoCodeForm>
            </PromoCode>
            
            <Button
              as={Link}
              to="/checkout"
              variant="primary"
              size="large"
              fullWidth
            >
              Proceed to Checkout
            </Button>
            
            <div style={{ marginTop: '1.6rem', textAlign: 'center' }}>
              <BackToShoppingLink to="/products">
                <FaArrowLeft /> Continue Shopping
              </BackToShoppingLink>
            </div>
          </OrderSummary>
        </CartContainer>
      ) : (
        <EmptyCart>
          <EmptyCartIcon>
            <FaShoppingCart />
          </EmptyCartIcon>
          <EmptyCartMessage>Your cart is empty</EmptyCartMessage>
          <Button as={Link} to="/products" variant="primary" size="large">
            Start Shopping
          </Button>
        </EmptyCart>
      )}
    </PageContainer>
  );
};

export default CartPage; 