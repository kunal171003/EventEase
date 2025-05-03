import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Search, Plus } from 'lucide-react-native';

const guests = [
  {
    id: 1,
    name: 'Emma Thompson',
    email: 'emma.t@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    eventsAttended: 8,
  },
  {
    id: 2,
    name: 'James Wilson',
    email: 'james.w@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    eventsAttended: 12,
  },
  {
    id: 3,
    name: 'Sophie Chen',
    email: 'sophie.c@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    eventsAttended: 5,
  },
];

export default function GuestsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Guests</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#94a3b8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search guests..."
            placeholderTextColor="#94a3b8"
          />
        </View>
        <Pressable style={styles.addButton}>
          <Plus size={24} color="#ffffff" />
        </Pressable>
      </View>

      {guests.map((guest) => (
        <Pressable key={guest.id} style={styles.guestCard}>
          <Image
            source={{ uri: guest.avatar }}
            style={styles.avatar}
          />
          <View style={styles.guestInfo}>
            <Text style={styles.guestName}>{guest.name}</Text>
            <Text style={styles.guestEmail}>{guest.email}</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsNumber}>{guest.eventsAttended}</Text>
            <Text style={styles.statsLabel}>Events</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    color: '#0f172a',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#0f172a',
    paddingVertical: 12,
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#6366f1',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  guestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  guestName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 4,
  },
  guestEmail: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
  statsContainer: {
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statsNumber: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#6366f1',
  },
  statsLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#64748b',
  },
});