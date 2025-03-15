import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaSearch } from 'react-icons/fa';
import Button from '../components/UI/Button';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 12rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 8rem;
  }
`;

const ErrorTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.4rem;
  }
`;

const ErrorDescription = styled.p`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.6rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const SearchContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.backgroundDark};
  border-radius: ${({ theme }) => theme.borderRadius.small} 0 0 ${({ theme }) => theme.borderRadius.small};
  font-size: 1.6rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchButton = styled(Button)`
  border-radius: 0 ${({ theme }) => theme.borderRadius.small} ${({ theme }) => theme.borderRadius.small} 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const NotFoundPage: React.FC = () => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchInput = form.elements.namedItem('search') as HTMLInputElement;
    
    if (searchInput.value.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchInput.value.trim())}`;
    }
  };
  
  return (
    <PageContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Page Not Found</ErrorTitle>
      <ErrorDescription>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </ErrorDescription>
      
      <ButtonContainer>
        <Button as={Link} to="/" variant="primary" size="large">
          <FaHome style={{ marginRight: '8px' }} /> Go to Homepage
        </Button>
        <Button as={Link} to="/products" variant="outline" size="large">
          Browse Products
        </Button>
      </ButtonContainer>
      
      <SearchContainer>
        <ErrorDescription>
          Or try searching for what you're looking for:
        </ErrorDescription>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            name="search"
            placeholder="Search products..."
            required
          />
          <SearchButton variant="primary" type="submit">
            <FaSearch /> Search
          </SearchButton>
        </SearchForm>
      </SearchContainer>
    </PageContainer>
  );
};

export default NotFoundPage; 