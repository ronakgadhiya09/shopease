import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaSort, FaTimes } from 'react-icons/fa';
import ProductCard from '../components/Product/ProductCard';
import Button from '../components/UI/Button';

// Mock product data
const mockProducts = [
  {
    id: 1,
    title: 'Smartphone X',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
    rating: 4.5,
    category: 'electronics',
    description: 'Latest smartphone with advanced features and high-quality camera.',
  },
  {
    id: 2,
    title: 'Laptop Pro',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    rating: 4.8,
    category: 'electronics',
    description: 'Powerful laptop for professional use with high performance.',
  },
  {
    id: 3,
    title: 'Casual T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    rating: 4.2,
    category: 'clothing',
    description: 'Comfortable casual t-shirt made from premium cotton.',
  },
  {
    id: 4,
    title: 'Running Shoes',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    rating: 4.7,
    category: 'clothing',
    description: 'Lightweight running shoes with excellent cushioning.',
  },
  {
    id: 5,
    title: 'Wireless Headphones',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    rating: 4.6,
    category: 'electronics',
    description: 'High-quality wireless headphones with noise cancellation.',
  },
  {
    id: 6,
    title: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    rating: 4.4,
    category: 'electronics',
    description: 'Smart watch with fitness tracking and notifications.',
  },
  {
    id: 7,
    title: 'Winter Jacket',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543',
    rating: 4.3,
    category: 'clothing',
    description: 'Warm winter jacket with water-resistant material.',
  },
  {
    id: 8,
    title: 'Backpack',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    rating: 4.5,
    category: 'accessories',
    description: 'Durable backpack with multiple compartments for everyday use.',
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
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const PageDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.6rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const FilterButton = styled(Button)`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const SortButton = styled(Button)`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const FilterPanel = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FilterTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const CloseButton = styled.button`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.8rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const FilterGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterGroupTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  
  input {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const PriceRange = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PriceInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.backgroundDark};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProductsGrid = styled.div`
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

const NoProducts = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.8rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.xs};
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.backgroundLight};
  color: ${({ active }) => active ? 'white' : 'inherit'};
  font-weight: ${({ active }) => active ? '600' : '400'};
  
  &:hover {
    background-color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.backgroundDark};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  
  useEffect(() => {
    let filtered = [...mockProducts];
    
    // Filter by category if provided
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [category, searchQuery]);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const handleAddToCart = (id: number) => {
    // Handle adding product to cart
    alert(`Product ${id} added to cart!`);
  };
  
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          {category 
            ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products`
            : searchQuery
              ? `Search Results for "${searchQuery}"`
              : 'All Products'
          }
        </PageTitle>
        <PageDescription>
          {filteredProducts.length} products found
        </PageDescription>
      </PageHeader>
      
      <FiltersContainer>
        <FilterButton variant="outline" onClick={toggleFilter}>
          <FaFilter /> Filters
        </FilterButton>
        <SortButton variant="outline">
          <FaSort /> Sort By
        </SortButton>
      </FiltersContainer>
      
      <FilterPanel isOpen={isFilterOpen}>
        <FilterHeader>
          <FilterTitle>Filters</FilterTitle>
          <CloseButton onClick={toggleFilter}>
            <FaTimes />
          </CloseButton>
        </FilterHeader>
        
        <FilterGroup>
          <FilterGroupTitle>Categories</FilterGroupTitle>
          <CheckboxGroup>
            <CheckboxLabel>
              <input type="checkbox" name="category" value="electronics" />
              Electronics
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" name="category" value="clothing" />
              Clothing
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" name="category" value="accessories" />
              Accessories
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" name="category" value="home-kitchen" />
              Home & Kitchen
            </CheckboxLabel>
          </CheckboxGroup>
        </FilterGroup>
        
        <FilterGroup>
          <FilterGroupTitle>Price Range</FilterGroupTitle>
          <PriceRange>
            <PriceInput type="number" placeholder="Min" min="0" />
            <PriceInput type="number" placeholder="Max" min="0" />
          </PriceRange>
        </FilterGroup>
        
        <FilterGroup>
          <FilterGroupTitle>Rating</FilterGroupTitle>
          <CheckboxGroup>
            <CheckboxLabel>
              <input type="checkbox" name="rating" value="4" />
              4★ & above
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" name="rating" value="3" />
              3★ & above
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" name="rating" value="2" />
              2★ & above
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" name="rating" value="1" />
              1★ & above
            </CheckboxLabel>
          </CheckboxGroup>
        </FilterGroup>
        
        <Button variant="primary" fullWidth>Apply Filters</Button>
      </FilterPanel>
      
      {currentProducts.length > 0 ? (
        <ProductsGrid>
          {currentProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              rating={product.rating}
              category={product.category}
              onAddToCart={handleAddToCart}
            />
          ))}
        </ProductsGrid>
      ) : (
        <NoProducts>
          No products found. Try adjusting your filters or search query.
        </NoProducts>
      )}
      
      {totalPages > 1 && (
        <Pagination>
          <PageButton 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </PageButton>
          
          {Array.from({ length: totalPages }).map((_, index) => (
            <PageButton
              key={index}
              active={currentPage === index + 1}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
          
          <PageButton
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </PageButton>
        </Pagination>
      )}
    </PageContainer>
  );
};

export default ProductsPage; 