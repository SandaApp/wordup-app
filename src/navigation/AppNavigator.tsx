import React from 'react';
import { Pressable, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import TodayScreen from '../screens/TodayScreen';
import PrayerScreen from '../screens/PrayerScreen';
import BibleScreen from '../screens/BibleScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MemoryVerseScreen from '../screens/MemoryVerseScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../theme/colors';

export type RootTabParamList = {
  Home: undefined;
  Today: undefined;
  Bible: undefined;
  Saved: undefined;
  Prayer: undefined;
  Memory: undefined;
  Progress: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function TabIcon({ emoji }: { emoji: string }) {
  return <Text style={{ fontSize: 20 }}>{emoji}</Text>;
}

function SettingsHeaderButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: colors.border,
        opacity: pressed ? 0.75 : 1,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3
      })}
    >
      <Text style={{ fontSize: 20 }}>⚙️</Text>
    </Pressable>
  );
}

export default function AppNavigator() {
  const insets = useSafeAreaInsets();
  const tabPadBottom = Math.max(insets.bottom, 8);
  const tabHeight = 56 + tabPadBottom;

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerShadowVisible: false,
        headerRight: () => <SettingsHeaderButton onPress={() => navigation.navigate('Settings')} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: colors.border,
          height: tabHeight,
          paddingBottom: tabPadBottom,
          paddingTop: 6
        },
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 11
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <TabIcon emoji="🏠" /> }} />
      <Tab.Screen name="Today" component={TodayScreen} options={{ tabBarIcon: () => <TabIcon emoji="📖" /> }} />
      <Tab.Screen name="Bible" component={BibleScreen} options={{ tabBarIcon: () => <TabIcon emoji="⚔️" /> }} />
      <Tab.Screen name="Saved" component={FavoritesScreen} options={{ tabBarIcon: () => <TabIcon emoji="💙" /> }} />
      <Tab.Screen name="Prayer" component={PrayerScreen} options={{ tabBarIcon: () => <TabIcon emoji="🙏" /> }} />
      <Tab.Screen name="Memory" component={MemoryVerseScreen} options={{ tabBarIcon: () => <TabIcon emoji="✨" /> }} />
      <Tab.Screen name="Progress" component={ProgressScreen} options={{ tabBarIcon: () => <TabIcon emoji="🔥" /> }} />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: 'none' }
        }}
      />
    </Tab.Navigator>
  );
}
