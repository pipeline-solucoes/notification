import { createTheme } from '@mui/material/styles';

// src/@types/mui.d.ts (por exemplo)
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface ButtonOptions {
    background: string;
    backgroundHover: string;
    color: string;
    colorHover: string;
    borderRadius: string;
    boxShadow?: string;
  }

  interface Palette {
    custom: {
      primaryButton: ButtonOptions;
      secondaryButton: ButtonOptions;
      borderColor?: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      primaryButton?: ButtonOptions;
      secondaryButton?: ButtonOptions;
      borderColor?: string;
    };
  }
}


// Definindo o tema personalizado
const theme = createTheme({
  breakpoints: { 
    values: { 
      xs: 0, // Extra small devices (phones) 
      sm: 600, // Small devices (tablets) 
      md: 960, // Medium devices (desktops) 
      lg: 1280, // Large devices (large desktops) 
      xl: 1920, // Extra large devices (extra large desktops) 
    }, 
  },  
  shape: { 
    borderRadius: 12,  
  },  
  palette: {
    background:{
      default: '#f5f5f5', //#f1f0ec
      paper: '#ffffff',    
    },
    primary: {
      main: "#000000",
      dark: "#000000",
      light: "white",
    },
    secondary: {
      main: '#c3a86b', 
      light: '#c3a86b',      
    },    
    text: {
      primary: '#000000',
      secondary: '#FEFEFE',
      disabled: '#A9A9A9',
    },          
    custom: {
      primaryButton:{
        background: "#000000",
        backgroundHover: '#000000',
        color: '#FEFEFE',
        colorHover: '#FEFEFE',
        borderRadius: "0",   
      },
        secondaryButton: {
        background: '#FEFEFE', 
        backgroundHover: '#FEFEFE',
        color: "#000000",
        colorHover: '#000000',
        borderRadius: "0",
      },
      borderColor: '#8c8c8c',
    },
    info: {
      main: '#555f56',
    },
    error: {
      main: '#F44336',
    },
    success: {
      main: '#4CAF50',
    },
    grey: {
      "100": '#F2F4F6',
      "200": '#edf3fa',  
      "300": '#e2e3e4',  
      "400": '#edf3fa',   
      '700': '#b9b9b9',          
      "900": '#334866', 
    },
  },
  typography: {
    fontFamily: "var(--font-inter), Arial, sans-serif",
    
    h1: {     
      fontFamily: "var(--font-cormorant), serif",            
      fontStyle: 'normal',
      lineHeight: '1.0',            
      margin: 0,
                  
      // *** Semibold Versalete
      fontWeight: 600,
      textTransform: 'uppercase',
      fontVariantCaps: "small-caps",
      fontFeatureSettings: "'smcp' 1, 'c2sc' 1",
      letterSpacing: "0.5px",
      // ***

      // ***
      // 32px → tamanho mínimo no mobile
      // 40px → tamanho máximo no desktop
      // 2.8vw + 0.5rem → crescimento suave e natural no meio do caminho
      // ***
      fontSize: "clamp(30px, 2.8vw + 0.5rem, 42px)",
    },
    h2: {      
      fontSize: '18px',            
      lineHeight: '1.5',            
      margin: 0,              
      
      // *** Ligth Capitular (all caps)
      fontWeight: 300,
      textTransform: "uppercase",
      letterSpacing: "0.14em",      
      // ***      
    },
    h3: {
      fontFamily: "var(--font-cormorant), serif", 
      fontStyle: 'normal',       
      lineHeight: '1.5',
      margin: 0,
      
      // *** Semibold Versalete
      fontWeight: 600,
      textTransform: 'uppercase',
      fontVariantCaps: "small-caps",
      fontFeatureSettings: "'smcp' 1, 'c2sc' 1",
      letterSpacing: "0.2px",
      // ***         
      
      // ***
      // 20px → tamanho mínimo (tablet e mobile)
      // 32px → tamanho máximo (desktop 1281px+)
      // 1.5vw + 1rem → valor fluido que gera os 24px e 28px naturalmente entre 600 e 1280px
      // ***
      fontSize: "clamp(20px, 1.5vw + 1rem, 32px)",
    },
    h4: {
      fontStyle: 'normal',
      lineHeight: '1.5',            
      margin: 0, 
      fontSize: '20px',                     
      
      // *** Semibold Capitular (all caps)
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0",      
      // ***             
    },     
    body1: {      
      lineHeight: '1.5',
      fontStyle: 'normal',      
      
      // *** Ligth
      fontWeight: 300,     
      letterSpacing: "0",      
      // ***

      // ***
      // 12px → tamanho mínimo
      // 16px → tamanho máximo
      // 1.2vw + 10px → valor fluido entre esses limites (pode ajustar se quiser mais ou menos responsividade)       
      // *** 
      fontSize: "clamp(12px, 1.2vw + 10px, 16px)"
    }, 
    body2: {      
      lineHeight: '1.5',
      fontStyle: 'normal',      
      
      // *** Ligth
      fontWeight: 500,     
      letterSpacing: "0",      
      // ***

      // ***
      // 12px → tamanho mínimo
      // 16px → tamanho máximo
      // 1.2vw + 10px → valor fluido entre esses limites (pode ajustar se quiser mais ou menos responsividade)       
      // *** 
      fontSize: "clamp(12px, 1.2vw + 10px, 16px)"
    },    
    caption: {
      /* tipografia pensada para textos de apoio ou legendas pequenas, normalmente usados abaixo de imagens, gráficos, tabelas ou ícones */
      fontStyle: 'normal',
      lineHeight: '1.5',       
      margin: 0,      
      fontSize: '12px',
      
      // *** Ligth Capitular (all caps)
      fontWeight: 300,
      textTransform: "uppercase",
      letterSpacing: "0.14em",      
      // ***
    }, 
    subtitle1: {
      /* tipografia pensada para textos secundários, geralmente usados em legendas, descrições curtas ou suporte visual para títulos.*/
      fontSize: '14px', // Desktop
      lineHeight: '1.5',            
      margin: 0,
      fontStyle: 'normal',  
      
      // *** Ligth Capitular (all caps)
      fontWeight: 300,
      textTransform: "uppercase",
      letterSpacing: "0.14em",      
      // ***   
    },
    subtitle2: {
      fontSize: '18px', // Desktop
      lineHeight: '1.5',
      letterSpacing: '0.08em', /* dá um refinamento capitular */
      fontWeight: 300, /* Light */
      textTransform: 'uppercase', 
      margin: 0,
      fontStyle: 'normal',      
      '@media (min-width:1281px) and (max-width:1920px)': {
        fontSize: '18px', // Tablet
      },   
      '@media (min-width:961px) and (max-width:1280px)': {
        fontSize: '18px', // Tablet
      },   
      '@media (min-width:601px) and (max-width:960px)': {
        fontSize: '18px', // Tablet
      },
      '@media (max-width:600px)': {
        fontSize: '18px', // Mobile
      }
    },    
    overline: {
      /* para rótulos, categorias, ou textos auxiliares curtos, nunca para parágrafos ou longos blocos de texto. */
      fontFamily: "var(--font-cormorant), serif",            
      fontStyle: 'normal',
      lineHeight: '1.0',          
      margin: 0,
      
      // *** Semibold Versalete
      fontWeight: 600,
      textTransform: 'uppercase',
      fontVariantCaps: "small-caps",
      fontFeatureSettings: "'smcp' 1, 'c2sc' 1",
      letterSpacing: "0.5px",
      // ***      

      // ***
      // 24px é fixo do mobile até ~1280px      
      // Entre 1280–1440px ele deve crescer até ~36px
      // Depois, até 1920px ele precisa chegar a 40px
      // ***
      fontSize: "clamp(24px, 2.5vw, 40px)",     
    }
  },
  spacing: 8,
});

export { theme };