import { Text } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import {Menu, TabBarIcon} from "@/components";

import { useSession } from '../ctx';
import {useTheme} from "react-native-paper";

export default function AppLayout() {
    const theme = useTheme();
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!session) {
        // @ts-ignore
        return <Redirect href="/sign-in" />;
    }

    // This layout can be deferred because it's not the root layout.
    return <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="rating-aeg"
                options={{
                    title: 'Avaliar',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'sparkles' : 'sparkles-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="my-aegs"
                options={{
                    title: 'Minhas Aegs',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'flame' : 'flame-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>;
}
