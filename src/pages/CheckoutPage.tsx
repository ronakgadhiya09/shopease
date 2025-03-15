import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaCreditCard, FaLock } from 'react-icons/fa';
import Button from '../components/UI/Button';

// Mock cart data (same as in CartPage)
const cartItems = [
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
`;

const PageTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.8rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const CheckoutContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutForm = styled.form`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const FormSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FormLabel = styled.label`
  display: block;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.backgroundDark};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1.6rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.backgroundDark};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1.6rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
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

const OrderItems = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const OrderItem = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const OrderItemImage = styled.div`
  width: 6rem;
  height: 6rem;
  margin-right: ${({ theme }) => theme.spacing.sm};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

const OrderItemDetails = styled.div`
  flex: 1;
`;

const OrderItemTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const OrderItemPrice = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const OrderItemQuantity = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textLight};
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

const SecureCheckout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.4rem;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.success};
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PaymentMethod = styled.div`
  width: 4rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
`;

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process checkout
    alert('Order placed successfully!');
    navigate('/');
  };
  
  // Calculate order totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;
  
  return (
    <PageContainer>
      <PageHeader>
        <BackLink to="/cart">
          <FaArrowLeft /> Back to Cart
        </BackLink>
        <PageTitle>Checkout</PageTitle>
      </PageHeader>
      
      <CheckoutContainer>
        <CheckoutForm onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Contact Information</SectionTitle>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <FormInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <FormInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <FormInput
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Shipping Address</SectionTitle>
            <FormGroup>
              <FormLabel htmlFor="address">Address</FormLabel>
              <FormInput
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="city">City</FormLabel>
                <FormInput
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="state">State/Province</FormLabel>
                <FormInput
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="zipCode">ZIP/Postal Code</FormLabel>
                <FormInput
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="country">Country</FormLabel>
                <FormSelect
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </FormSelect>
              </FormGroup>
            </FormRow>
          </FormSection>
          
          <FormSection>
            <SectionTitle>
              <FaCreditCard /> Payment Information
            </SectionTitle>
            <FormGroup>
              <FormLabel htmlFor="cardName">Name on Card</FormLabel>
              <FormInput
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="cardNumber">Card Number</FormLabel>
              <FormInput
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                required
              />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="expiryMonth">Expiry Month</FormLabel>
                <FormSelect
                  id="expiryMonth"
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  required
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month.toString().padStart(2, '0')}>
                      {month.toString().padStart(2, '0')}
                    </option>
                  ))}
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="expiryYear">Expiry Year</FormLabel>
                <FormSelect
                  id="expiryYear"
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleChange}
                  required
                >
                  <option value="">Year</option>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="cvv">CVV</FormLabel>
                <FormInput
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="XXX"
                  required
                />
              </FormGroup>
            </FormRow>
          </FormSection>
          
          <Button type="submit" variant="primary" size="large" fullWidth>
            Place Order
          </Button>
        </CheckoutForm>
        
        <OrderSummary>
          <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
          
          <OrderItems>
            {cartItems.map(item => (
              <OrderItem key={item.id}>
                <OrderItemImage>
                  <img src={item.image} alt={item.title} />
                </OrderItemImage>
                <OrderItemDetails>
                  <OrderItemTitle>{item.title}</OrderItemTitle>
                  <OrderItemPrice>${item.price.toFixed(2)}</OrderItemPrice>
                  <OrderItemQuantity>Qty: {item.quantity}</OrderItemQuantity>
                </OrderItemDetails>
              </OrderItem>
            ))}
          </OrderItems>
          
          <SummaryItem>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </SummaryItem>
          
          <SummaryItem>
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </SummaryItem>
          
          <SummaryItem>
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </SummaryItem>
          
          <SummaryTotal>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </SummaryTotal>
          
          <SecureCheckout>
            <FaLock /> Secure Checkout
          </SecureCheckout>
          
          <PaymentMethods>
            <PaymentMethod>Visa</PaymentMethod>
            <PaymentMethod>MC</PaymentMethod>
            <PaymentMethod>Amex</PaymentMethod>
            <PaymentMethod>PayPal</PaymentMethod>
          </PaymentMethods>
        </OrderSummary>
      </CheckoutContainer>
    </PageContainer>
  );
};

export default CheckoutPage; 