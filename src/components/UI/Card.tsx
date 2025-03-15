import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  padding?: string;
  elevation?: 'small' | 'medium' | 'large';
  className?: string;
}

const getElevation = (elevation: string, theme: any) => {
  switch (elevation) {
    case 'small':
      return theme.boxShadow.small;
    case 'medium':
      return theme.boxShadow.medium;
    case 'large':
      return theme.boxShadow.large;
    default:
      return theme.boxShadow.small;
  }
};

const StyledCard = styled.div<{ padding: string; elevation: string }>`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ padding }) => padding};
  box-shadow: ${({ elevation, theme }) => getElevation(elevation, theme)};
  transition: box-shadow ${({ theme }) => theme.transition.fast};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }
`;

const Card: React.FC<CardProps> = ({
  children,
  padding = '2rem',
  elevation = 'small',
  className,
}) => {
  return (
    <StyledCard padding={padding} elevation={elevation} className={className}>
      {children}
    </StyledCard>
  );
};

export default Card; 