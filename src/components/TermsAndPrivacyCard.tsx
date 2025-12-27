'use client';

import { useEffect, useState } from 'react';
import { styled, Typography } from '@mui/material';
import { parseCookies, setCookie } from 'nookies';
import { TermsAndPrivacyProps } from '../types/TermsAndPrivacyProps';
import { NotificationButton, NotificationLink } from './NotificationStyled';

const Container = styled('div', {
  shouldForwardProp: (prop) => !['show', 'background', 'borderRadius', 'border'].includes(prop as string),
})<{ show: boolean; background: string; borderRadius: string; border: string;
}>(({ show, background, borderRadius, border }) => ({
  position: 'fixed',
  bottom: '35px',
  left: '35px',
  background,
  display: show ? 'block' : 'none',
  zIndex: 4000,
  maxWidth: '280px',
  height: 'fit-content',
  borderRadius,
  border: border,
  boxSizing: 'border-box',
}));

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  width: '100%',
  boxSizing: 'border-box',
});

const ContentButton = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  width: '100%',
  boxSizing: 'border-box',
});

const getScrollTop = (): number => {
  if (typeof window === 'undefined') return 0;
  return (
    window.pageYOffset ||
    document.documentElement?.scrollTop ||
    document.body?.scrollTop ||
    0
  );
};

type CookieConsentValue = 'true' | 'false' | null;

const readConsentCookie = (): CookieConsentValue => {
  const cookies = parseCookies();
  const value = cookies.cookieConsent;
  if (value === 'true' || value === 'false') return value;
  return null;
};

/**
 * Componente que renderiza um card flutuante (fixed) para consentimento de cookies,
 * exibindo links para **Termos de Uso** e **Política de Privacidade** e dois botões:
 * **Cancelar** (define cookieConsent como "false") e **Ok** (define cookieConsent como "true").
 *
 * O card é exibido somente quando o cookie `cookieConsent` ainda **não** foi definido como "true" ou "false"
 * e o usuário já rolou a página (scrollTop > 0), evitando sobreposição no banner inicial.
 * Ao clicar em "Ok" ou "Cancelar", o cookie é persistido por 1 ano e o card é ocultado.
 *
 * @param {string} url_termo_uso URL para a página de Termos de Uso. Obrigatório.
 * @param {string} url_politica_privacidade URL para a página de Política de Privacidade. Obrigatório.
 * @param {string} [background_color='transparent'] Cor de fundo do container do card.
 * @param {string} [color='#000000'] Cor do texto principal.
 * @param {string} [border_radius='0'] Border Radius do card.
 * @param {string} [border='none'] Border do card.
 * @param {string} [background_color_button_ok='transparent'] Cor de fundo do botão "Ok".
 * @param {string} [color_button_ok='#000000'] Cor do texto do botão "Ok".
 * @param {string} [border_radius_button_ok='0'] Border Radius do botão "Ok".
 * @param {string} [background_color_button_cancel='transparent'] Cor de fundo do botão "Cancelar".
 * @param {string} [color_button_cancel='#000000'] Cor do texto do botão "Cancelar".
 * @param {string} [border_radius_button_cancel='0'] Border Radius do botão "Cancelar".
 * @param {string} [background_color_link='transparent'] Cor de fundo dos links ("Termos de Uso" e "Política de Privacidade").
 * @param {string} [color_link='#000000'] Cor do texto dos links.
 * @param {string} [background_color_hover_link='transparent'] Cor de fundo dos links no hover.
 * @param {string} [color_hover_link='#000000'] Cor do texto dos links no hover (e também da borda inferior).
 * @param {import('@mui/material').TypographyProps['variant']} [variantTexto='caption'] Variant do texto principal (Typography).
 * @param {import('@mui/material').TypographyProps['variant']} [variantButton='caption'] Variant do texto dentro dos botões (Typography).
 *
 * @example
 * ```tsx
 * import { TermsAndPrivacyCard } from '@/components/TermsAndPrivacyCard';
 *
 * export default function Example() {
 *   return (
 *     <TermsAndPrivacyCard
 *       url_termo_uso="/termos"
 *       url_politica_privacidade="/privacidade"
 *       background_color="#ffffff"
 *       color="#111111"
 *       background_color_button_cancel="#f5f5f5"
 *       color_button_cancel="#111111"
 *       background_color_button_ok="#1976d2"
 *       color_button_ok="#ffffff"
 *       background_color_link="transparent"
 *       color_link="#1976d2"
 *       background_color_hover_link="transparent"
 *       color_hover_link="#0d47a1"
 *       variantTexto="body2"
 *       variantButton="button"
 *     />
 *   );
 * }
 * ```
 */
const TermsAndPrivacyCard: React.FC<TermsAndPrivacyProps> = (props) => {

  const {
    url_termo_uso,
    url_politica_privacidade,

    background_color = 'transparent',
    color = '#000000',
    border_radius = '0',
    border = "none",

    background_color_button_ok = 'transparent',
    color_button_ok = '#000000',
    border_radius_button_ok = '0',

    background_color_button_cancel = 'transparent',
    color_button_cancel = '#000000',
    border_radius_button_cancel = '0',

    background_color_link = 'transparent',
    color_link = '#000000',
    background_color_hover_link = 'transparent',
    color_hover_link = '#000000',

    variantTexto = 'caption',
    variantButton = 'caption',
  } = props;

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [cookieConsent, setCookieConsent] = useState<CookieConsentValue>(null);

  // Lê o cookie assim que o componente monta
  useEffect(() => {
    setCookieConsent(readConsentCookie());
  }, []);

  useEffect(() => {
    const consentIsNotDefined = cookieConsent === null;

    // Se já existe consentimento, garante que não aparece e não adiciona listeners
    if (!consentIsNotDefined) {
      setShowNotification(false);
      return;
    }

    let rafId: number | null = null;

    const updateVisibility = (): void => {
      const scrollTop = getScrollTop();
      // Só mostra se ainda não tiver consentimento e rolou para baixo
      setShowNotification(consentIsNotDefined && scrollTop > 0);
    };

    const handleScroll = (): void => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateVisibility();
      });
    };

    updateVisibility();

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll, { capture: true } as any);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  }, [cookieConsent]);

  const handleAccept = (): void => {
    setCookie(null, 'cookieConsent', 'true', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    setCookieConsent('true');
    setShowNotification(false);
  };

  const handleReject = (): void => {
    setCookie(null, 'cookieConsent', 'false', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    setCookieConsent('false');
    setShowNotification(false);
  };

  return (
    <Container show={showNotification} background={background_color} borderRadius={border_radius} border={border}>
      <Content>
        <Typography component="div" variant={variantTexto} color={color} sx={{ width: '100%' }}>
          Este site usa cookies e dados pessoais de acordo com os nossos{' '}
          <NotificationLink
            href={url_termo_uso}
            background={background_color_link}
            backgroundHover={background_color_hover_link}
            colorText={color_link}
            colorHover={color_hover_link}
          >
            Termos de Uso
          </NotificationLink>{' '}
          e{' '}
          <NotificationLink
            href={url_politica_privacidade}
            background={background_color_link}
            backgroundHover={background_color_hover_link}
            colorText={color_link}
            colorHover={color_hover_link}
          >
            Política de Privacidade
          </NotificationLink>
          . Ao continuar navegando neste site, você declara estar ciente dessas condições.
        </Typography>

        <ContentButton>
          <NotificationButton
            background={background_color_button_cancel}
            backgroundHover={background_color_button_cancel}
            colorText={color_button_cancel}
            colorHover={color_button_cancel}
            borderRadius={border_radius_button_cancel}
            onClick={handleReject}
          >
            <Typography variant={variantButton} component="span">
              Cancelar
            </Typography>
          </NotificationButton>

          <NotificationButton
            background={background_color_button_ok}
            backgroundHover={background_color_button_ok}
            colorText={color_button_ok}
            colorHover={color_button_ok}
            borderRadius={border_radius_button_ok}
            onClick={handleAccept}
          >
            <Typography variant={variantButton} component="span">
              Ok
            </Typography>
          </NotificationButton>
        </ContentButton>
      </Content>
    </Container>
  );
};

TermsAndPrivacyCard.displayName = 'TermsAndPrivacyCard';

export default TermsAndPrivacyCard;
