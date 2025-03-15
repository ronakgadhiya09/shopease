import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart } from 'react-icons/fa';
import Card from '../UI/Card';
import Button from '../UI/Button';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  onAddToCart: (id: number) => void;
}

const ProductCardWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform ${({ theme }) => theme.transition.fast};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.medium} ${({ theme }) => theme.borderRadius.medium} 0 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transition.medium};
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ProductCategory = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.md};
`;

const ProductTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  svg {
    color: #FFD700;
    margin-right: 2px;
  }
  
  span {
    margin-left: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const ProductActions = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const renderRatingStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} />);
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" />);
  }
  
  // Add empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} />);
  }
  
  return stars;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  rating,
  category,
  onAddToCart,
}) => {
  return (
    <ProductCardWrapper>
      <ProductImage>
        <img src={image} alt={title} />
        <ProductCategory>{category}</ProductCategory>
      </ProductImage>
      <ProductContent>
        <ProductTitle>
          <Link to={`/products/${id}`}>{title}</Link>
        </ProductTitle>
        <ProductPrice>${price.toFixed(2)}</ProductPrice>
        <ProductRating>
          {renderRatingStars(rating)}
          <span>({rating.toFixed(1)})</span>
        </ProductRating>
        <ProductActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => onAddToCart(id)}
          >
            <FaShoppingCart style={{ marginRight: '8px' }} /> Add to Cart
          </Button>
          <Button
            variant="outline"
            size="small"
            as={Link}
            to={`/products/${id}`}
          >
            View Details
          </Button>
        </ProductActions>
      </ProductContent>
    </ProductCardWrapper>
  );
};

export default ProductCard; 