import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart, FaHeart, FaShare, FaArrowLeft } from 'react-icons/fa';
import Button from '../components/UI/Button';
import ProductCard from '../components/Product/ProductCard';

// Mock product data (same as in ProductsPage)
const mockProducts = [
  {
    id: 1,
    title: 'Smartphone X',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
    rating: 4.5,
    category: 'electronics',
    description: 'Latest smartphone with advanced features and high-quality camera.',
    details: [
      'Powerful A15 processor',
      '6.1-inch Super Retina XDR display',
      '128GB storage',
      'Dual camera system with Night mode',
      'Water and dust resistant',
      'All-day battery life',
    ],
  },
  {
    id: 2,
    title: 'Laptop Pro',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    rating: 4.8,
    category: 'electronics',
    description: 'Powerful laptop for professional use with high performance.',
    details: [
      'Intel Core i7 processor',
      '16GB RAM',
      '512GB SSD storage',
      '15.6-inch Full HD display',
      'NVIDIA GeForce RTX graphics',
      'Backlit keyboard',
    ],
  },
  {
    id: 3,
    title: 'Casual T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    rating: 4.2,
    category: 'clothing',
    description: 'Comfortable casual t-shirt made from premium cotton.',
    details: [
      '100% premium cotton',
      'Regular fit',
      'Crew neck',
      'Short sleeves',
      'Machine washable',
      'Available in multiple colors',
    ],
  },
  {
    id: 4,
    title: 'Running Shoes',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    rating: 4.7,
    category: 'clothing',
    description: 'Lightweight running shoes with excellent cushioning.',
    details: [
      'Breathable mesh upper',
      'Responsive cushioning',
      'Durable rubber outsole',
      'Lightweight design',
      'Reflective details for visibility',
      'Available in multiple sizes',
    ],
  },
  {
    id: 5,
    title: 'Wireless Headphones',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    rating: 4.6,
    category: 'electronics',
    description: 'High-quality wireless headphones with noise cancellation.',
    details: [
      'Active noise cancellation',
      'Up to 30 hours of battery life',
      'Bluetooth 5.0 connectivity',
      'Comfortable over-ear design',
      'Built-in microphone for calls',
      'Foldable design for easy storage',
    ],
  },
  {
    id: 6,
    title: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    rating: 4.4,
    category: 'electronics',
    description: 'Smart watch with fitness tracking and notifications.',
    details: [
      'Heart rate monitoring',
      'GPS tracking',
      'Water resistant up to 50m',
      'Sleep tracking',
      'Smartphone notifications',
      'Up to 7 days battery life',
    ],
  },
  {
    id: 7,
    title: 'Winter Jacket',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543',
    rating: 4.3,
    category: 'clothing',
    description: 'Warm winter jacket with water-resistant material.',
    details: [
      'Water-resistant outer shell',
      'Thermal insulation',
      'Adjustable hood',
      'Multiple pockets',
      'Windproof design',
      'Machine washable',
    ],
  },
  {
    id: 8,
    title: 'Backpack',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    rating: 4.5,
    category: 'accessories',
    description: 'Durable backpack with multiple compartments for everyday use.',
    details: [
      'Durable polyester material',
      'Padded laptop compartment',
      'Multiple storage pockets',
      'Adjustable shoulder straps',
      'Water bottle holder',
      'Reinforced bottom',
    ],
  },
];

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 500;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ProductCategory = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.8rem;
  }
`;

const ProductPrice = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  svg {
    color: #FFD700;
    margin-right: 2px;
    font-size: 1.8rem;
  }
  
  span {
    margin-left: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 1.6rem;
  }
`;

const ProductDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ProductDetails = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ProductDetailsTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const ProductDetailsList = styled.ul`
  list-style: disc;
  padding-left: ${({ theme }) => theme.spacing.lg};
  
  li {
    font-size: 1.6rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const ProductActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const QuantityButton = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme }) => theme.colors.backgroundDark};
  font-size: 1.8rem;
  
  &:first-child {
    border-radius: ${({ theme }) => theme.borderRadius.small} 0 0 ${({ theme }) => theme.borderRadius.small};
  }
  
  &:last-child {
    border-radius: 0 ${({ theme }) => theme.borderRadius.small} ${({ theme }) => theme.borderRadius.small} 0;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundDark};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 6rem;
  height: 4rem;
  border: 1px solid ${({ theme }) => theme.colors.backgroundDark};
  border-left: none;
  border-right: none;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  
  &:focus {
    outline: none;
  }
  
  /* Hide arrows for number input */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Firefox */
  -moz-appearance: textfield;
`;

const SocialActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.6rem;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const RelatedProductsSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const RelatedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
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

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
  useEffect(() => {
    // Find the product by ID
    const foundProduct = mockProducts.find(p => p.id === Number(id));
    setProduct(foundProduct || null);
    
    // Find related products (same category, excluding current product)
    if (foundProduct) {
      const related = mockProducts
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    // Handle adding product to cart
    alert(`Added ${quantity} ${product.title} to cart!`);
  };
  
  const handleAddToWishlist = () => {
    // Handle adding product to wishlist
    alert(`Added ${product.title} to wishlist!`);
  };
  
  const handleShare = () => {
    // Handle sharing product
    alert(`Sharing ${product.title}!`);
  };
  
  if (!product) {
    return (
      <PageContainer>
        <h2>Product not found</h2>
        <BackLink to="/products">
          <FaArrowLeft /> Back to Products
        </BackLink>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <BackLink to="/products">
        <FaArrowLeft /> Back to Products
      </BackLink>
      
      <ProductContainer>
        <ProductImageContainer>
          <ProductImage src={product.image} alt={product.title} />
          <ProductCategory>{product.category}</ProductCategory>
        </ProductImageContainer>
        
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          
          <ProductRating>
            {renderRatingStars(product.rating)}
            <span>({product.rating.toFixed(1)})</span>
          </ProductRating>
          
          <ProductDescription>{product.description}</ProductDescription>
          
          <ProductDetails>
            <ProductDetailsTitle>Product Details</ProductDetailsTitle>
            <ProductDetailsList>
              {product.details.map((detail: string, index: number) => (
                <li key={index}>{detail}</li>
              ))}
            </ProductDetailsList>
          </ProductDetails>
          
          <QuantitySelector>
            <QuantityButton onClick={decreaseQuantity} disabled={quantity <= 1}>-</QuantityButton>
            <QuantityInput
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
          </QuantitySelector>
          
          <ProductActions>
            <Button
              variant="primary"
              size="large"
              onClick={handleAddToCart}
              fullWidth
            >
              <FaShoppingCart style={{ marginRight: '8px' }} /> Add to Cart
            </Button>
            <Button
              variant="outline"
              size="large"
              onClick={handleAddToWishlist}
            >
              <FaHeart style={{ marginRight: '8px' }} /> Wishlist
            </Button>
          </ProductActions>
          
          <SocialActions>
            <SocialButton onClick={handleShare}>
              <FaShare /> Share
            </SocialButton>
          </SocialActions>
        </ProductInfo>
      </ProductContainer>
      
      {relatedProducts.length > 0 && (
        <RelatedProductsSection>
          <SectionTitle>Related Products</SectionTitle>
          <RelatedProductsGrid>
            {relatedProducts.map(relatedProduct => (
              <ProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                title={relatedProduct.title}
                price={relatedProduct.price}
                image={relatedProduct.image}
                rating={relatedProduct.rating}
                category={relatedProduct.category}
                onAddToCart={() => alert(`Product ${relatedProduct.id} added to cart!`)}
              />
            ))}
          </RelatedProductsGrid>
        </RelatedProductsSection>
      )}
    </PageContainer>
  );
};

export default ProductDetailPage; 