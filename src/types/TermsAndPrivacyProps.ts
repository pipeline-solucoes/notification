import { TypographyVariant } from "@mui/material/styles";

export interface TermsAndPrivacyProps {  
  url_termo_uso: string;
  url_politica_privacidade: string;

  background_color?: string;  
  color?: string;
  border_radius?: string;
  border?: string;

  background_color_button_ok?: string;  
  color_button_ok?: string;  
  border_radius_button_ok?: string;

  background_color_button_cancel?: string;  
  color_button_cancel?: string;
  border_radius_button_cancel?: string; 

  background_color_link?: string;  
  color_link?: string;  
  background_color_hover_link?: string;  
  color_hover_link?: string;  

  variantTexto?: TypographyVariant;
  variantButton?: TypographyVariant;
}