import { BorderProps } from "@/types/style/BorderProps";
import { COLOR_STYLE_FORWARD_PROPS, ColorProps } from "../types/style/ColorProps";
import { styled } from "@mui/material";

interface ButtonProps 
  extends ColorProps, 
  BorderProps {}

export const BUTTON_STYLE_FORWARD_PROPS: (keyof ButtonProps)[] = [
  'background',
  'colorText',
  'backgroundHover',
  'colorHover',
  'borderRadius',
  'border',
  'boxShadow',
];  

export const NotificationButton = styled('button', 
  { shouldForwardProp: (prop) => !BUTTON_STYLE_FORWARD_PROPS.includes(prop as keyof ButtonProps), })
  <ButtonProps> (({ background, colorText, backgroundHover, colorHover, 
    borderRadius = '0', border = 'none', boxShadow = 'none' }) => ({
  
    backgroundColor: background,
    color: colorText,  
    padding: '8px 24px',
    border: border,  
    cursor: 'pointer',
    margin: '0 0 0 20px',
    borderRadius: borderRadius, 
    boxShadow: boxShadow,

    '&:hover': {
        backgroundColor: backgroundHover,    
        color: colorHover,
    },
}));


export const NotificationLink = styled('a', {
  shouldForwardProp: (prop) => !COLOR_STYLE_FORWARD_PROPS.includes(prop as keyof ColorProps),
})<ColorProps>(({ background, colorText, backgroundHover, colorHover}) => ({
  width: 'auto',
  cursor: 'pointer',
  textDecoration: 'none',
  textTransform: 'none',
  textAlign: 'center',
  boxShadow: 'none',
  backgroundColor: background,
  color: colorText,  
  padding: '0',
  margin: '0',

  '&:hover': {
    backgroundColor: backgroundHover,
    borderBottom: `1px solid ${colorHover}`,
    color: colorHover,
  },
}));