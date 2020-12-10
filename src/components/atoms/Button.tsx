import {
  ColorProps,
  createBox,
  useResponsiveProp,
  useTheme,
} from '@shopify/restyle';
import React, { ReactNode } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import Text from './Text';
import { Theme } from '../../lib/theme';

const BaseButton = createBox<
  Theme,
  TouchableOpacityProps & {
    children: ReactNode;
  }
>(TouchableOpacity);

type Props = React.ComponentProps<typeof BaseButton> &
  ColorProps<Theme> & {
    label: string;
    isLoading?: boolean;
  };

const Button = ({
  label,
  isLoading,
  color = 'dark',
  backgroundColor = 'primary',
  ...props
}: Props) => {
  const theme = useTheme<Theme>();
  const textColorProp = useResponsiveProp(color);
  return (
    <BaseButton
      flexDirection="row"
      padding="s"
      borderRadius={5}
      justifyContent="center"
      backgroundColor={backgroundColor}
      {...props}>
      <Text
        variant="buttonLabel"
        color={color}
        marginRight={isLoading ? 's' : undefined}>
        {label}
      </Text>
      {isLoading ? (
        <ActivityIndicator color={theme.colors[textColorProp!!]} />
      ) : null}
    </BaseButton>
  );
};

export default Button;
