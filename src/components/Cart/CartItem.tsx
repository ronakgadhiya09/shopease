import React from 'react';
import styled from 'styled-components';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  onRemove: (id: number) => void;
  onIncreaseQuantity: (id: number) => void;
  onDecreaseQuantity: (id: number) => void;
}

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundDark};
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CartItemImage = styled.div`
  width: 100px;
  height: 100px;
  margin-right: ${({ theme }) => theme.spacing.md};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const CartItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CartItemTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const CartItemPrice = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CartItemActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
    margin-top: ${({ theme }) => theme.spacing.sm};
    width: 100%;
    justify-content: space-between;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.md};
  
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    border: 1px solid ${({ theme }) => theme.colors.backgroundDark};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.backgroundDark};
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  span {
    margin: 0 ${({ theme }) => theme.spacing.sm};
    font-size: 1.6rem;
    font-weight: 600;
    min-width: 3rem;
    text-align: center;
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.6rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondaryDark};
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  image,
  quantity,
  onRemove,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  return (
    <CartItemContainer>
      <CartItemImage>
        <img src={image} alt={title} />
      </CartItemImage>
      <CartItemDetails>
        <CartItemTitle>
          <Link to={`/products/${id}`}>{title}</Link>
        </CartItemTitle>
        <CartItemPrice>${price.toFixed(2)}</CartItemPrice>
      </CartItemDetails>
      <CartItemActions>
        <QuantityControl>
          <button 
            onClick={() => onDecreaseQuantity(id)} 
            disabled={quantity <= 1}
          >
            <FaMinus />
          </button>
          <span>{quantity}</span>
          <button onClick={() => onIncreaseQuantity(id)}>
            <FaPlus />
          </button>
        </QuantityControl>
        <RemoveButton onClick={() => onRemove(id)}>
          <FaTrash /> Remove
        </RemoveButton>
      </CartItemActions>
    </CartItemContainer>
  );
};

export default CartItem; 