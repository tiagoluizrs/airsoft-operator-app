import { Slot } from 'expo-router';
import { SessionProvider } from './ctx';
import { PaperProvider } from 'react-native-paper';
import {darkTheme, lightTheme} from "@/constants/Theme";
import {useColorScheme} from "react-native";

export default function Root() {
    const theme = useColorScheme();

  // Set up the auth context and render our layout inside of it.
  return (
      <PaperProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
          <SessionProvider>
            <Slot />
          </SessionProvider>
      </PaperProvider>
  );
}
