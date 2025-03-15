import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const getButtonStyles = (variant: ButtonVariant, theme: any) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary};
        color: white;
        border: 1px solid ${theme.colors.primary};
        
        &:hover {
          background-color: ${theme.colors.primaryDark};
          border-color: ${theme.colors.primaryDark};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary};
        color: white;
        border: 1px solid ${theme.colors.secondary};
        
        &:hover {
          background-color: ${theme.colors.secondaryDark};
          border-color: ${theme.colors.secondaryDark};
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        
        &:hover {
          background-color: ${theme.colors.primaryLight};
          color: white;
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: none;
        padding-left: 0;
        padding-right: 0;
        
        &:hover {
          color: ${theme.colors.primaryDark};
          text-decoration: underline;
        }
      `;
    default:
      return '';
  }
};

const getButtonSize = (size: ButtonSize, theme: any) => {
  switch (size) {
    case 'small':
      return css`
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: 1.4rem;
      `;
    case 'medium':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: 1.6rem;
      `;
    case 'large':
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        font-size: 1.8rem;
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: all ${({ theme }) => theme.transition.fast};
  cursor: pointer;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  ${({ variant, theme }) => getButtonStyles(variant, theme)}
  ${({ size, theme }) => getButtonSize(size, theme)}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 