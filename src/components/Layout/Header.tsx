import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaUser } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  
  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const NavLinks = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 70%;
    max-width: 300px;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    align-items: flex-start;
    padding: ${({ theme }) => theme.spacing.xl};
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    box-shadow: ${({ theme }) => theme.boxShadow.large};
    z-index: 200;
  }
`;

const NavLink = styled(Link)`
  margin: 0 ${({ theme }) => theme.spacing.md};
  font-weight: 500;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) => theme.spacing.md} 0;
    font-size: 1.8rem;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  margin: 0 ${({ theme }) => theme.spacing.sm};
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  font-size: 1.2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileMenuButton = styled.button`
  display: none;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  z-index: 150;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
`;

const SearchInput = styled.input`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.backgroundDark};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-right: ${({ theme }) => theme.spacing.xs};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
      setSearchTerm('');
      closeMenu();
    }
  };
  
  return (
    <HeaderContainer>
      <NavContainer>
        <Logo to="/">Shop<span>Ease</span></Logo>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        
        <Overlay isOpen={isMenuOpen} onClick={closeMenu} />
        
        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
          
          <SearchContainer>
            <form onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchButton type="submit">
                <FaSearch />
              </SearchButton>
            </form>
          </SearchContainer>
        </NavLinks>
        
        <NavIcons>
          <IconButton as={Link} to="/cart">
            <FaShoppingCart />
            <CartCount>0</CartCount>
          </IconButton>
          <IconButton as={Link} to="/account">
            <FaUser />
          </IconButton>
        </NavIcons>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header; 