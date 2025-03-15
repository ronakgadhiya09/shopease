import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Button from '../components/UI/Button';

const HeroSection = styled.section`
  background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: white;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const HeroTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.6rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.8rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeaturesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

const SectionTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.8rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  text-align: center;
  transition: transform ${({ theme }) => theme.transition.medium};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }
`;

const FeatureIcon = styled.div`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FeatureTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
`;

const CategoriesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  position: relative;
  height: 200px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transition.medium};
`;

const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.md};
`;

const CategoryTitle = styled.h3`
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CategoryLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  font-weight: 500;
  
  svg {
    margin-left: ${({ theme }) => theme.spacing.xs};
    transition: transform ${({ theme }) => theme.transition.fast};
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

const NewsletterSection = styled.section`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  color: white;
`;

const NewsletterContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const NewsletterTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const NewsletterDescription = styled.p`
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const NewsletterForm = styled.form`
  display: flex;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small} 0 0 ${({ theme }) => theme.borderRadius.small};
  font-size: 1.6rem;
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: ${({ theme }) => theme.borderRadius.small};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const NewsletterButton = styled(Button)`
  border-radius: 0 ${({ theme }) => theme.borderRadius.small} ${({ theme }) => theme.borderRadius.small} 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

const ButtonLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: all ${({ theme }) => theme.transition.fast};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: 1.8rem;
  text-decoration: none;
  
  &.primary {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
      border-color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
  
  &.outline {
    background-color: transparent;
    color: white;
    border: 1px solid white;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const HomePage: React.FC = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
  };
  
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Welcome to ShopEase</HeroTitle>
          <HeroSubtitle>
            Your one-stop destination for all your shopping needs. Discover amazing products at competitive prices.
          </HeroSubtitle>
          <HeroButtons>
            <ButtonLink to="/products" className="primary">
              Shop Now
            </ButtonLink>
            <ButtonLink to="/categories" className="outline">
              Browse Categories
            </ButtonLink>
          </HeroButtons>
        </HeroContent>
      </HeroSection>
      
      <CategoriesSection>
        <SectionTitle>Shop by Category</SectionTitle>
        <CategoriesGrid>
          <CategoryCard>
            <CategoryImage src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Electronics" />
            <CategoryOverlay>
              <CategoryTitle>Electronics</CategoryTitle>
              <CategoryLink to="/products?category=electronics">
                Shop Now <FaArrowRight />
              </CategoryLink>
            </CategoryOverlay>
          </CategoryCard>
          <CategoryCard>
            <CategoryImage src="https://images.unsplash.com/photo-1560243563-062bfc001d68" alt="Clothing" />
            <CategoryOverlay>
              <CategoryTitle>Clothing</CategoryTitle>
              <CategoryLink to="/products?category=clothing">
                Shop Now <FaArrowRight />
              </CategoryLink>
            </CategoryOverlay>
          </CategoryCard>
          <CategoryCard>
            <CategoryImage src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" alt="Accessories" />
            <CategoryOverlay>
              <CategoryTitle>Accessories</CategoryTitle>
              <CategoryLink to="/products?category=accessories">
                Shop Now <FaArrowRight />
              </CategoryLink>
            </CategoryOverlay>
          </CategoryCard>
          <CategoryCard>
            <CategoryImage src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace" alt="Home & Kitchen" />
            <CategoryOverlay>
              <CategoryTitle>Home & Kitchen</CategoryTitle>
              <CategoryLink to="/products?category=home-kitchen">
                Shop Now <FaArrowRight />
              </CategoryLink>
            </CategoryOverlay>
          </CategoryCard>
        </CategoriesGrid>
      </CategoriesSection>
      
      <FeaturesSection>
        <SectionTitle>Why Choose Us</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🚚</FeatureIcon>
            <FeatureTitle>Fast Delivery</FeatureTitle>
            <FeatureDescription>
              Get your products delivered to your doorstep within 2-3 business days.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>💰</FeatureIcon>
            <FeatureTitle>Best Prices</FeatureTitle>
            <FeatureDescription>
              We offer competitive prices on all our products with regular discounts.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🔄</FeatureIcon>
            <FeatureTitle>Easy Returns</FeatureTitle>
            <FeatureDescription>
              Not satisfied with your purchase? Return it within 30 days for a full refund.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>Secure Payments</FeatureTitle>
            <FeatureDescription>
              All transactions are secure and encrypted for your peace of mind.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>👍</FeatureIcon>
            <FeatureTitle>Quality Products</FeatureTitle>
            <FeatureDescription>
              We ensure that all products meet our high-quality standards.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🎧</FeatureIcon>
            <FeatureTitle>24/7 Support</FeatureTitle>
            <FeatureDescription>
              Our customer support team is available 24/7 to assist you.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
      
      <NewsletterSection>
        <NewsletterContent>
          <NewsletterTitle>Subscribe to Our Newsletter</NewsletterTitle>
          <NewsletterDescription>
            Stay updated with our latest products, offers, and promotions.
          </NewsletterDescription>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Enter your email address"
              required
            />
            <NewsletterButton variant="secondary" size="medium" type="submit">
              Subscribe
            </NewsletterButton>
          </NewsletterForm>
        </NewsletterContent>
      </NewsletterSection>
    </>
  );
};

export default HomePage; 