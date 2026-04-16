import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
/*daskdakdakdasd */


/*oi estou testando */

<<<<<<< HEAD
/*dawjibgdaiuhd augd */
=======
/*oi estou testando 2*/

/*oi estou testando 3
*/
>>>>>>> 610af4a62ddf8e356249ded8c9b5cd532db69384
