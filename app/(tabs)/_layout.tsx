import { Tabs } from 'expo-router';
import { Calendar, Home, PlusCircle, Users, Settings } from 'lucide-react-native';
import { View, Pressable } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e5e5',
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 12,
          marginTop: 4,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          tabBarButton: (props) => (
            <Pressable
              {...props}
              style={[props.style, { flex: 1 }]}
              android_ripple={{ color: '#e2e8f0' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
          tabBarButton: (props) => (
            <Pressable
              {...props}
              style={[props.style, { flex: 1 }]}
              android_ripple={{ color: '#e2e8f0' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <View style={{ 
              marginTop: -32,
              backgroundColor: '#6366f1',
              borderRadius: 32,
              padding: 16,
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
            }}>
              <PlusCircle size={size + 4} color="#ffffff" />
            </View>
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              style={[props.style, { flex: 1 }]}
              android_ripple={{ color: '#e2e8f0' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="guests"
        options={{
          title: 'Guests',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
          tabBarButton: (props) => (
            <Pressable
              {...props}
              style={[props.style, { flex: 1 }]}
              android_ripple={{ color: '#e2e8f0' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
          tabBarButton: (props) => (
            <Pressable
              {...props}
              style={[props.style, { flex: 1 }]}
              android_ripple={{ color: '#e2e8f0' }}
            />
          ),
        }}
      />
    </Tabs>
  );
}