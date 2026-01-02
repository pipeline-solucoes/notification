
import { PipelineSolucoesTypographyTokens } from "@pipelinesolucoes/theme";
import { fbborderRadius, fbboxShadow, fbcolor } from "../constant";
import { Button, CSSObject, styled } from "@mui/material";

export interface ButtonProps {
  textButton?: string;

  backgroundButton?: string;
  backgroundHoverButton?: string;
  colorButton?: string;
  colorHoverButton?: string;  

  borderRadiusButton?: string;
  borderButton?: string;  
  boxShadowButton?: string;

  widthButton?: string;  
  heightButton?: string;
  paddingButton?: string;
  marginButton?: string;

  typo?: CSSObject | PipelineSolucoesTypographyTokens;
}

const BUTTON_STYLE_FORWARD_PROPS = [
  "textButton",
  "variantButton",
  "backgroundButton",
  "backgroundHoverButton",
  "colorButton",
  "colorHoverButton", 
  "borderRadiusButton",
  "borderButton",
  "boxShadowButton",
  "widthButton", 
  "heightButton",
  "paddingButton",
  "marginButton",
  "typo",
] as const;

export const ButtonStyled = styled(Button, {  
    shouldForwardProp: (prop) => !BUTTON_STYLE_FORWARD_PROPS.includes(prop as keyof ButtonProps),
})<ButtonProps>(
  ({
    backgroundButton,
    backgroundHoverButton,
    colorButton,
    colorHoverButton,
    borderRadiusButton,
    borderButton,
    boxShadowButton,
    widthButton,
    heightButton,
    paddingButton,
    marginButton,
    typo,
  }) => ({

    color: colorButton ?? fbcolor,
    background: backgroundButton ?? 'transparent',
    borderRadius: borderRadiusButton ?? fbborderRadius,
    textTransform: "none",
    cursor: "pointer",

    padding: paddingButton ?? '4px 24px',
    boxShadow: boxShadowButton ?? fbboxShadow,
    width: widthButton,
    height: heightButton,
    border: borderButton,
    margin: marginButton,

    ...(typo ?? {}),

    "&:hover": {
      background: backgroundHoverButton ?? 'transparent',
      color: colorHoverButton ?? fbcolor,
    },
  })
);