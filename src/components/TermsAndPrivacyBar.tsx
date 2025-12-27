'use client';

import { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { parseCookies, setCookie } from 'nookies';

const Container = styled('div', 
  {
    shouldForwardProp: (prop) =>
    ![
       'background_color',
       'show'
    ].includes(prop as string) 
  })
  <{
    show: boolean; 
    background_color: string;
  }>
  (({ show, background_color }) => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: background_color,
  display: show ? 'block' : 'none',
  zIndex: 4000,
}));

const BotaoNotificationBar = styled('button', 
  {
    shouldForwardProp: (prop) =>
    ![
       'background_color',
       'color',
    ].includes(prop as string),
  })
  <{
    background_color: string;
    color: string;
  }>
  (({ theme, background_color, color }) => ({
  
  backgroundColor: background_color,
  color: color,  
  padding: '8px 24px',
  border: 'none',  
  cursor: 'pointer',
  margin: '0 0 0 20px',
  borderRadius: theme.shape.borderRadius,
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  fontStyle: theme.typography.body1?.fontStyle,
  lineHeight: theme.typography.body1?.lineHeight,
  letterSpacing: theme.typography.body1?.letterSpacing,
  fontSize: theme.typography.body1?.fontSize,
}));

const LinkStyled = styled('a', {
  shouldForwardProp: (prop) =>
    ![
      'background_color',
      'background_color_hover',
      'color',
      'color_hover'      
    ].includes(prop as string),
})<{
  background_color: string;
  background_color_hover: string;
  color: string;
  color_hover: string;  
}>(({
  background_color,
  background_color_hover,
  color,
  color_hover,  
}) => ({
  width: 'auto',
  cursor: 'pointer',
  textDecoration: 'none',
  textTransform: 'none',
  textAlign: 'center',
  boxShadow: 'none',
  backgroundColor: background_color,
  color: color,  
  padding: '0',
  margin: '0',

  '&:hover': {
    backgroundColor: background_color_hover,
    borderBottom: `1px solid ${color_hover}`,
    color: color_hover,
  },
}));

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  width: '100%',
  boxSizing: 'border-box',
  flexWrap: 'wrap',
});

const AreaTexto = styled('div', {
  shouldForwardProp: (prop) =>
    ![
       'color',       
    ].includes(prop as string),
  })
  <{ color: string; }>
  (({ theme, color}) => ({

  color: color,
  flexGrow: 1,   
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.body1?.fontWeight,
  fontStyle: theme.typography.body1?.fontStyle,
  lineHeight: theme.typography.body1?.lineHeight,
  letterSpacing: theme.typography.body1?.letterSpacing,
  fontSize: theme.typography.body1?.fontSize,
  margin: theme.typography.body1?.margin,

  // Breakpoints para diferentes larguras de tela
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  },
  [theme.breakpoints.up('sm')]: {
    width: '100%'
  },
  [theme.breakpoints.up('md')]: {
    width: 'calc(100% - 290px)'
  },
  [theme.breakpoints.up('lg')]: {
    width: 'calc(100% - 290px)'
  },
  [theme.breakpoints.up('xl')]: {
    width: 'calc(100% - 290px)'
  },

}));

interface TermsAndPrivacyBarProps {  
  url_termo_uso: string;
  url_politica_privacidade: string;
  background_color?: string;  
  color?: string;
  background_color_button_ok?: string;  
  color_button_ok?: string;  
  background_color_button_cancel?: string;  
  color_button_cancel?: string;  
  background_color_link?: string;  
  color_link?: string;  
  background_color_hover_link?: string;  
  color_hover_link?: string;
}

const TermsAndPrivacyBar: React.FC<TermsAndPrivacyBarProps> = (props) => {
  const {
    url_termo_uso,
    url_politica_privacidade,
    background_color = 'transparent',
    color = "#000000",
    background_color_button_ok = 'transparent',
    color_button_ok = "#000000",
    background_color_button_cancel = 'transparent',
    color_button_cancel = "#000000",
    background_color_link = 'transparent',
    color_link = "#000000",
    background_color_hover_link = 'transparent',
    color_hover_link = "#000000",
  } = props;

  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    const cookies = parseCookies();
    const consent =
      cookies.cookieConsent !== 'true' && cookies.cookieConsent !== 'false';
    setShowNotification(consent);
  }, []);

  const handleAccept = (): void => {
    setCookie(null, 'cookieConsent', 'true', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    setShowNotification(false);
  };

  const handleReject = (): void => {
    setCookie(null, 'cookieConsent', 'false', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    setShowNotification(false);
  };

  return (
    <Container show={showNotification} background_color={background_color}>
      <Content>
        <AreaTexto color={color}>
          Este site usa cookies e dados pessoais de acordo com os nossos{' '}
          <LinkStyled href={url_termo_uso} 
            background_color={background_color_link} 
            background_color_hover={background_color_hover_link}
            color={color_link} color_hover={color_hover_link}
          >
            Termos de Uso
          </LinkStyled> e{' '}
          <LinkStyled href={url_politica_privacidade}
            background_color={background_color_link} 
            background_color_hover={background_color_hover_link}
            color={color_link} color_hover={color_hover_link}
          >
            Política de Privacidade
          </LinkStyled>. 
          Ao continuar navegando neste site, você declara estar ciente dessas condições.
        </AreaTexto>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          sx={{ padding: '16px' }}
        >
          <BotaoNotificationBar background_color={background_color_button_cancel} 
            color={color_button_cancel} onClick={handleReject}>
            Cancelar
          </BotaoNotificationBar>
          <BotaoNotificationBar background_color={background_color_button_ok} 
            color={color_button_ok} onClick={handleAccept}>
            Ok
          </BotaoNotificationBar>
        </Box>
      </Content>
    </Container>
  );
};

export default TermsAndPrivacyBar;
