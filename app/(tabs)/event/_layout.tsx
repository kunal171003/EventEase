import { Stack } from 'expo-router';

export default function EventLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[id]" 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="[id]/guests" 
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}