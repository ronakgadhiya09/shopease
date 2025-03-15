export const theme = {
  colors: {
    primary: '#4361ee',
    primaryLight: '#4895ef',
    primaryDark: '#3f37c9',
    secondary: '#f72585',
    secondaryLight: '#ff4d6d',
    secondaryDark: '#b5179e',
    text: '#333333',
    textLight: '#555555',
    background: '#ffffff',
    backgroundLight: '#f8f9fa',
    backgroundDark: '#e9ecef',
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  spacing: {
    xs: '0.4rem',
    sm: '0.8rem',
    md: '1.6rem',
    lg: '2.4rem',
    xl: '3.2rem',
    xxl: '4.8rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%',
  },
  boxShadow: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.1)',
    large: '0 8px 24px rgba(0, 0, 0, 0.1)',
  },
  transition: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
} as const;

export type Theme = typeof theme;

// For TypeScript support with styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
} 