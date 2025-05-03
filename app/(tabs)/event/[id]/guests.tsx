import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import { Search, Plus, ChevronLeft, Mail, X } from 'lucide-react-native';

const initialGuests = [
  {
    id: 1,
    name: 'Emma Thompson',
    email: 'emma.t@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    status: 'confirmed',
  },
  {
    id: 2,
    name: 'James Wilson',
    email: 'james.w@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    status: 'pending',
  },
];

export default function ManageGuests() {
  const { id } = useLocalSearchParams();
  const [guests, setGuests] = useState(initialGuests);
  const [searchQuery, setSearchQuery] = useState('');
  const [newGuest, setNewGuest] = useState({ name: '', email: '' });
  const [isAddingGuest, setIsAddingGuest] = useState(false);

  const handleAddGuest = () => {
    if (!newGuest.name || !newGuest.email) return;

    setGuests([
      ...guests,
      {
        id: Date.now(),
        ...newGuest,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        status: 'pending',
      },
    ]);
    setNewGuest({ name: '', email: '' });
    setIsAddingGuest(false);
  };

  const handleRemoveGuest = (guestId: number) => {
    setGuests(guests.filter(guest => guest.id !== guestId));
  };

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.title}>Manage Guests</Text>
        <Pressable 
          style={styles.addButton}
          onPress={() => setIsAddingGuest(true)}
        >
          <Plus size={24} color="#6366f1" />
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#94a3b8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search guests..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#94a3b8"
        />
      </View>

      {isAddingGuest && (
        <View style={styles.addGuestForm}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Add New Guest</Text>
            <Pressable onPress={() => setIsAddingGuest(false)}>
              <X size={20} color="#64748b" />
            </Pressable>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Guest Name"
            value={newGuest.name}
            onChangeText={name => setNewGuest({ ...newGuest, name })}
            placeholderTextColor="#94a3b8"
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={newGuest.email}
            onChangeText={email => setNewGuest({ ...newGuest, email })}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#94a3b8"
          />
          <Pressable 
            style={styles.addGuestButton}
            onPress={handleAddGuest}
          >
            <Text style={styles.addGuestButtonText}>Add Guest</Text>
          </Pressable>
        </View>
      )}

      <ScrollView style={styles.guestList}>
        {filteredGuests.map(guest => (
          <View key={guest.id} style={styles.guestCard}>
            <Image
              source={{ uri: guest.avatar }}
              style={styles.avatar}
            />
            <View style={styles.guestInfo}>
              <Text style={styles.guestName}>{guest.name}</Text>
              <View style={styles.emailContainer}>
                <Mail size={14} color="#64748b" />
                <Text style={styles.guestEmail}>{guest.email}</Text>
              </View>
            </View>
            <View style={styles.guestActions}>
              <Text style={[
                styles.statusBadge,
                guest.status === 'confirmed' ? styles.confirmedBadge : styles.pendingBadge
              ]}>
                {guest.status}
              </Text>
              <Pressable 
                style={styles.removeButton}
                onPress={() => handleRemoveGuest(guest.id)}
              >
                <X size={16} color="#ef4444" />
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 44,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#0f172a',
  },
  addButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
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
  addGuestForm: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#0f172a',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    marginBottom: 12,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#0f172a',
  },
  addGuestButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  addGuestButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#ffffff',
  },
  guestList: {
    flex: 1,
  },
  guestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestEmail: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  guestActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    marginRight: 8,
  },
  confirmedBadge: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  pendingBadge: {
    backgroundColor: '#fef9c3',
    color: '#854d0e',
  },
  removeButton: {
    padding: 8,
  },
});