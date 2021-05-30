import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement,useTheme } from '@ui-kitten/components';

export const EyeIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='eye'/>
);

export const EyeOffIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='eye-off'/>
);

export const PersonIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='person'/>
);

export const MessageCircleIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='message-circle'/>
  );
  
  export const PersonAddIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='person-add'/>
  );
  
  export const PinIcon = (): IconElement => {
    const theme = useTheme();
    return (
      <Icon width={16} height={16} fill={theme['text-hint-color']} name='pin'/>
    );
  };

  export const PersonIconMini = () : IconElement => {
      const theme = useTheme();
      return (
        <Icon width={16} height={16} fill={theme['text-hint-color']} name='person'/>
      );
  }

