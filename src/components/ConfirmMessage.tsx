'use client';

import React from 'react';
import { CSSObject, styled, TypographyVariant, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { BorderProps, ColorProps, LayoutProps, PipelineSolucoesTypographyTokens } from '@pipelinesolucoes/theme';
import { ButtonStyled } from '../style/ButtonFormStyled';
import { fbmargin } from '../constant';

interface ConfirmMessageProps  extends Pick<ColorProps, 'background' | 'color'>,
  BorderProps,
  LayoutProps
{
  icon?: React.ReactElement;
  message: string;
  variantMessage?: TypographyVariant;

  variantButton?: TypographyVariant;

  backgroundCancelButton?: string;
  backgroundHoverCancelButton?: string;
  colorCancelButton?: string;
  colorHoverCancelButton?: string;  
  borderRadiusCancelButton?: string;
  borderCancelButton?: string;  
  boxShadowCancelButton?: string;
  widthCancelButton?: string;  
  heightCancelButton?: string;
  paddingCancelButton?: string;
  marginCancelButton?: string;

  backgroundConfirmButton?: string;
  backgroundHoverConfirmButton?: string;
  colorConfirmButton?: string;
  colorHoverConfirmButton?: string;  
  borderRadiusConfirmButton?: string;
  borderConfirmButton?: string;  
  boxShadowConfirmButton?: string;
  widthConfirmButton?: string;  
  heightConfirmButton?: string;
  paddingConfirmButton?: string;
  marginConfirmButton?: string;

  onCancel?: () => void;
  onConfirm?: () => void;

  cancelLabel?: string;
  confirmLabel?: string;
}

const StyledRoot = styled(Box, {
  shouldForwardProp: (prop) =>
    ![
      'width',
      'height',
      'padding',
      'margin',
      'background',
      'color',
      'borderRadius',
      'boxShadow',
    ].includes(prop as string),
})<Pick<
  ConfirmMessageProps,
  'width' | 'height' | 'padding' | 'margin' | 'background' | 'color' | 'borderRadius' | 'boxShadow'
>>(({ width, height, padding, margin, background, color, borderRadius, boxShadow }) => ({
  
  width: width ?? '100%',
  height: height ?? 'auto',
  padding: padding ?? 16,
  margin: margin ?? 0,
  background: background ?? '#ffffff',
  color: color ?? 'inherit',
  borderRadius: borderRadius ?? 12,
  boxShadow: boxShadow ?? 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '32px',
}));

const LeftContent = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  minWidth: 0,
}));

const IconWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}));

const MessageWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
}));

const ActionsWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 8,
  width: '100%',
}));


export const MessageStyle = styled('div', {
  shouldForwardProp: (prop) =>
    !['typo'].includes(prop as string),
})<{ typo?: CSSObject | PipelineSolucoesTypographyTokens}>
(({ typo }) => ({

  color: 'inherit',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  ...(typo ?? {}),
}));


/**
 * Componente que exibe uma mensagem com um ícone opcional e ações de confirmação,
 * renderizando dois botões: "Cancelar" e "OK".
 *
 * @param {string | number} [width='100%'] Largura do container principal.
 * @param {string | number} [height='auto'] Altura do container principal.
 * @param {string | number} [padding=16] Espaçamento interno do container principal.
 * @param {string | number} [margin=0] Margem externa do container principal.
 * @param {string} [background='#ffffff'] Cor de fundo do container principal.
 * @param {string} [color='inherit'] Cor do texto do container principal.
 * @param {string | number} [borderRadius=12] Raio da borda do container principal.
 * @param {string} [boxShadow='none'] Sombra do container principal.
 * @param {React.ReactElement} [icon] Ícone do Material UI exibido à esquerda da mensagem.
 * @param {string} message Texto da mensagem exibida. Obrigatório.
 * @param {() => void} [onCancel] Callback disparado ao clicar em "Cancelar".
 * @param {() => void} [onConfirm] Callback disparado ao clicar em "OK".
 * @param {string} [cancelLabel='Cancelar'] Texto do botão "Cancelar".
 * @param {string} [confirmLabel='OK'] Texto do botão "OK".
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import WarningAmberIcon from '@mui/icons-material/WarningAmber';
 * import { ConfirmMessage } from '@/components/ConfirmMessage';
 *
 * const Example = () => {
 *   return (
 *     <ConfirmMessage
 *       icon={<WarningAmberIcon />}
 *       message="Tem certeza que deseja remover este item?"
 *       onCancel={() => console.log('Cancelou')}
 *       onConfirm={() => console.log('Confirmou')}
 *       width={520}
 *       padding={20}
 *       background="#fff8e1"
 *       borderRadius={14}
 *       boxShadow="0 6px 20px rgba(0,0,0,0.08)"
 *       cancelLabel="Não"
 *       confirmLabel="Sim"
 *     />
 *   );
 * };
 * ```
 */
const ConfirmMessage: React.FC<ConfirmMessageProps> = ({
  width,
  height,
  padding,
  margin,
  background,
  color,
  borderRadius,
  boxShadow,

  icon,
  message,
  variantMessage,

  variantButton,

  backgroundCancelButton,
  backgroundHoverCancelButton,
  colorCancelButton,
  colorHoverCancelButton,  
  borderRadiusCancelButton,
  borderCancelButton,  
  boxShadowCancelButton,
  widthCancelButton,  
  heightCancelButton,
  paddingCancelButton,
  marginCancelButton,

  backgroundConfirmButton,
  backgroundHoverConfirmButton,
  colorConfirmButton,
  colorHoverConfirmButton,  
  borderRadiusConfirmButton,
  borderConfirmButton,  
  boxShadowConfirmButton,
  widthConfirmButton,  
  heightConfirmButton,
  paddingConfirmButton,
  marginConfirmButton,

  onCancel,
  onConfirm,
  cancelLabel = 'Cancelar',
  confirmLabel = 'OK',
}) => {
  
  const cancelDisabled = !onCancel;
  const confirmDisabled = !onConfirm;

  const theme = useTheme();
  const themeNotification = theme.pipelinesolucoes?.notification;

  const wnotific = themeNotification?.width ?? width ?? '100%';
  const hnotific = themeNotification?.height ?? height ?? 'auto';
  const pnotific = themeNotification?.padding ?? padding ?? '16px';
  const mnotific = themeNotification?.margin ?? margin ?? '0';
  const bnotific = themeNotification?.background ?? background ?? '#ffffff';
  const clnotific = themeNotification?.color ?? color ?? 'inherit';
  const brnotific = themeNotification?.borderRadius ?? borderRadius ?? 'inherit';
  const bsnotific = themeNotification?.boxShadow ?? boxShadow ?? 'none';

  const typoMessage =
    (variantMessage && theme.typography[variantMessage]) ??
    themeNotification?.typography ??
    theme.typography.body1;

  const bgButtonConfirm = backgroundConfirmButton ?? themeNotification?.buttons?.primary?.background ?? undefined;
  const bgHoverButtonConfirm = backgroundHoverConfirmButton ?? themeNotification?.buttons?.primary?.backgroundHover ?? undefined;
  const cButtonConfirm = colorConfirmButton ?? themeNotification?.buttons?.primary?.color ?? undefined;
  const cHoverButtonConfirm = colorHoverConfirmButton ?? themeNotification?.buttons?.primary?.colorHover ?? undefined;
  const brButtonConfirm = borderRadiusConfirmButton ?? themeNotification?.buttons?.primary?.borderRadius ?? undefined;
  const bdButtonConfirm = borderConfirmButton ?? themeNotification?.buttons?.primary?.border ?? undefined;
  const bsButtonConfirm = boxShadowConfirmButton ?? themeNotification?.buttons?.primary?.boxShadow ?? undefined;  
  const pButtonConfirm = paddingConfirmButton ?? themeNotification?.buttons?.primary?.padding ?? undefined;
  const mButtonConfirm = marginConfirmButton ?? themeNotification?.buttons?.primary?.padding ?? fbmargin;
  const wButtonConfirm = widthConfirmButton ?? themeNotification?.buttons?.primary?.padding ?? undefined;
  const hButtonConfirm = heightConfirmButton ?? themeNotification?.buttons?.primary?.padding ?? undefined;

  const typoConfirm =
    (variantButton && theme.typography[variantButton]) ??
    themeNotification?.buttons?.primary?.typography ??
    theme.typography.body1;

  const bgButtonCancel = backgroundCancelButton ?? themeNotification?.buttons?.secondary?.background ?? undefined;
  const bgHoverButtonCancel = backgroundHoverCancelButton ?? themeNotification?.buttons?.secondary?.backgroundHover ?? undefined;
  const cButtonCancel = colorCancelButton ?? themeNotification?.buttons?.secondary?.color ?? undefined;
  const cHoverButtonCancel = colorHoverCancelButton ?? themeNotification?.buttons?.secondary?.colorHover ?? undefined;
  const brButtonCancel = borderRadiusCancelButton ?? themeNotification?.buttons?.secondary?.borderRadius ?? undefined;
  const bdButtonCancel = borderCancelButton ?? themeNotification?.buttons?.secondary?.border ?? undefined;
  const bsButtonCancel = boxShadowCancelButton ?? themeNotification?.buttons?.secondary?.boxShadow ?? undefined;  
  const pButtonCancel = paddingCancelButton ?? themeNotification?.buttons?.secondary?.padding ?? undefined;
  const mButtonCancel = marginCancelButton ?? themeNotification?.buttons?.secondary?.padding ?? fbmargin;
  const wButtonCancel = widthCancelButton ?? themeNotification?.buttons?.secondary?.padding ?? undefined;
  const hButtonCancel = heightCancelButton ?? themeNotification?.buttons?.secondary?.padding ?? undefined;

  const typoCancel =
    (variantButton && theme.typography[variantButton]) ??
    themeNotification?.buttons?.secondary?.typography ??
    theme.typography.body1;

  return (
    <StyledRoot
      width={wnotific}
      height={hnotific}
      padding={pnotific}
      margin={mnotific}
      background={bnotific}
      color={clnotific}
      borderRadius={brnotific}
      boxShadow={bsnotific}
      role="status"
      aria-live="polite"
    >
      <LeftContent>
        {icon ? <IconWrapper aria-hidden="true">{icon}</IconWrapper> : null}

        <MessageWrapper>
          <MessageStyle typo={typoMessage}>
            {message}
          </MessageStyle>
        </MessageWrapper>
      </LeftContent>
  
      <ActionsWrapper>
        <ButtonStyled  
          backgroundButton={bgButtonCancel}
          backgroundHoverButton={bgHoverButtonCancel}
          colorButton={cButtonCancel}
          colorHoverButton={cHoverButtonCancel}
          borderRadiusButton={brButtonCancel}
          borderButton={bdButtonCancel}
          boxShadowButton={bsButtonCancel}
          widthButton={wButtonCancel}
          heightButton={hButtonCancel}
          paddingButton={pButtonCancel}
          marginButton={mButtonCancel}  
          typo={typoCancel}     
          onClick={onCancel}
          disabled={cancelDisabled}
          aria-disabled={cancelDisabled}
        >
          {cancelLabel}
        </ButtonStyled>

        <ButtonStyled  
          backgroundButton={bgButtonConfirm}
          backgroundHoverButton={bgHoverButtonConfirm}
          colorButton={cButtonConfirm}
          colorHoverButton={cHoverButtonConfirm}
          borderRadiusButton={brButtonConfirm}
          borderButton={bdButtonConfirm}
          boxShadowButton={bsButtonConfirm}
          widthButton={wButtonConfirm}
          heightButton={hButtonConfirm}
          paddingButton={pButtonConfirm}
          marginButton={mButtonConfirm}  
          typo={typoConfirm}  
          onClick={onConfirm}
          disabled={confirmDisabled}
          aria-disabled={confirmDisabled}
        >
          {confirmLabel}
        </ButtonStyled>
      </ActionsWrapper>

    </StyledRoot>
  );
};

ConfirmMessage.displayName = 'ConfirmMessage';

export default ConfirmMessage;
