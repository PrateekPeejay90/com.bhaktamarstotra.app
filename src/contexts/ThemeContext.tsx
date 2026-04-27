import React, { createContext, useContext, ReactNode } from 'react';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';

export type ThemeMode = 'light';

interface ThemeColors {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  error: string;
  onError: string;
  card: string;
  text: string;
  textSecondary: string;
  accent: string;
  border: string;
  shadow: string;
  button: string;
  buttonText: string;
  spiritual: string;
  spiritualLight: string;
  spiritualDark: string;
}

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  roundness: number;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  paperTheme: typeof bhaktamarPaperTheme;
}

const materialColors = {
  primary: '#8B4513',
  onPrimary: '#FFFFFF',
  primaryContainer: '#F4DCC8',
  onPrimaryContainer: '#3A1F0B',
  secondary: '#B26A2E',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#F4E0C8',
  onSecondaryContainer: '#40220A',
  tertiary: '#7A5C2E',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#E8DFC7',
  onTertiaryContainer: '#2B2110',
  background: '#FFF8F1',
  onBackground: '#2C2318',
  surface: '#FFF8F1',
  onSurface: '#2C2318',
  surfaceVariant: '#F2E6D8',
  onSurfaceVariant: '#5F5245',
  outline: '#C7B8A7',
  outlineVariant: '#E2D4C4',
  error: '#BA1A1A',
  onError: '#FFFFFF',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#410002',
};

const bhaktamarPaperTheme = {
  ...MD3LightTheme,
  roundness: 18,
  colors: {
    ...MD3LightTheme.colors,
    ...materialColors,
  },
};

const lightTheme: ThemeColors = {
  ...materialColors,
  card: materialColors.surface,
  text: materialColors.onSurface,
  textSecondary: materialColors.onSurfaceVariant,
  accent: materialColors.secondaryContainer,
  border: materialColors.outlineVariant,
  shadow: '#000000',
  button: materialColors.primary,
  buttonText: materialColors.onPrimary,
  spiritual: materialColors.primary,
  spiritualLight: materialColors.secondary,
  spiritualDark: materialColors.onPrimaryContainer,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const value: ThemeContextType = {
    theme: 'light',
    colors: lightTheme,
    roundness: bhaktamarPaperTheme.roundness,
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
      xxl: 32,
    },
    paperTheme: bhaktamarPaperTheme,
  };

  return (
    <PaperProvider theme={bhaktamarPaperTheme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </PaperProvider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
