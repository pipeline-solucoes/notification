'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import ConfirmMessage from '../components/ConfirmMessage';

/**
 * As props do ConfirmMessage devem existir no arquivo ConfirmMessage.
 * Como o hook controla onCancel/onConfirm, nós omitimos essas duas props do "options".
 */
type ConfirmMessageComponentProps = React.ComponentProps<typeof ConfirmMessage>;

export interface ConfirmMessageOptions
  extends Omit<ConfirmMessageComponentProps, 'onCancel' | 'onConfirm'> {
  /**
   * Se clicar no backdrop (fora do card) fecha como "cancelar".
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Se pressionar ESC fecha como "cancelar".
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Controla se o overlay/backdrop aparece.
   * @default true
   */
  withBackdrop?: boolean;

  /**
   * zIndex do overlay.
   * @default 1300
   */
  zIndex?: number;

  /**
   * Opacidade do backdrop quando withBackdrop=true.
   * @default 0.4
   */
  backdropOpacity?: number;
}

interface ConfirmMessageState {
  open: boolean;
  resolve?: (value: boolean) => void;
  options?: ConfirmMessageOptions;
}

/**
 * Hook que expõe uma função `confirm(options)` que abre o ConfirmMessage
 * e retorna uma Promise<boolean>:
 * - true => usuário confirmou
 * - false => usuário cancelou/fechou
 *
 * Além disso, retorna `ConfirmMessagePortal` (um ReactNode) que você deve renderizar
 * uma vez no componente (normalmente no final do JSX).
 *
 * @example
 * ```tsx
 * const { confirm, ConfirmMessagePortal } = useConfirmMessage();
 *
 * const handleDelete = async () => {
 *   const ok = await confirm({ message: 'Deseja excluir?', confirmLabel: 'Excluir' });
 *   if (!ok) return;
 *   // ...deletar
 * };
 *
 * return (
 *   <>
 *     <button onClick={handleDelete}>Excluir</button>
 *     {ConfirmMessagePortal}
 *   </>
 * );
 * ```
 */
const useConfirmMessage = () => {
  const [state, setState] = useState<ConfirmMessageState>({ open: false });

  const close = useCallback((result: boolean) => {
    setState((prev) => {
      prev.resolve?.(result);
      return { open: false };
    });
  }, []);

  const confirm = useCallback((options: ConfirmMessageOptions) => {
    return new Promise<boolean>((resolve) => {
      setState({
        open: true,
        resolve,
        options,
      });
    });
  }, []);

  const ConfirmMessagePortal = useMemo(() => {
    if (!state.open || !state.options) return null;

    const {
      closeOnBackdropClick = true,
      closeOnEsc = true,
      withBackdrop = true,
      zIndex = 1300,
      backdropOpacity = 0.4,
      ...confirmMessageProps
    } = state.options;

    const handleBackdropClick = () => {
      if (closeOnBackdropClick) close(false);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      if (!closeOnEsc) return;
      if (e.key === 'Escape') close(false);
    };

    return (
      <Box
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(withBackdrop
            ? { backgroundColor: `rgba(0,0,0,${backdropOpacity})` }
            : {}),
        }}
      >
        {/* Backdrop click area */}
        <Box
          onClick={handleBackdropClick}
          sx={{
            position: 'absolute',
            inset: 0,
          }}
        />

        {/* Content (stop propagation to avoid closing when clicking inside) */}
        <Box
          sx={{ position: 'relative', maxWidth: 'calc(100vw - 32px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <ConfirmMessage
            {...(confirmMessageProps as ConfirmMessageComponentProps)}
            onCancel={() => close(false)}
            onConfirm={() => close(true)}
          />
        </Box>
      </Box>
    );
  }, [close, state.open, state.options]);

  return {
    confirm,
    close,
    isOpen: state.open,
    ConfirmMessagePortal,
  };
};

useConfirmMessage.displayName = 'useConfirmMessage';

export default useConfirmMessage;
