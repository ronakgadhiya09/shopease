import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const FooterLink = styled(Link)`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textLight};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterText = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textLight};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ theme }) => theme.spacing.lg};
  padding-right: ${({ theme }) => theme.spacing.lg};
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>ShopEase</FooterTitle>
          <FooterText>
            Your one-stop destination for all your shopping needs. Quality products, competitive prices, and excellent customer service.
          </FooterText>
          <SocialLinks>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/products">Products</FooterLink>
          <FooterLink to="/cart">Cart</FooterLink>
          <FooterLink to="/checkout">Checkout</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Customer Service</FooterTitle>
          <FooterLink to="/contact">Contact Us</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/shipping">Shipping & Returns</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms & Conditions</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact Info</FooterTitle>
          <ContactItem>
            <FaMapMarkerAlt />
            <span>123 Shopping Street, Retail City, RC 12345</span>
          </ContactItem>
          <ContactItem>
            <FaPhone />
            <span>+1 (555) 123-4567</span>
          </ContactItem>
          <ContactItem>
            <FaEnvelope />
            <span>support@shopease.com</span>
          </ContactItem>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 