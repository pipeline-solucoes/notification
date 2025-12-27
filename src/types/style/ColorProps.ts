export interface ColorProps {
  background?: string;
  backgroundHover?: string;
  colorText?: string;
  colorHover?: string;
}

export const COLOR_STYLE_FORWARD_PROPS: (keyof ColorProps)[] = [
  'background',
  'colorText',
  'backgroundHover',
  'colorHover',
];
