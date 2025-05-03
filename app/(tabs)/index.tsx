import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { Calendar, MapPin, Users, Search, Plus, Clock } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useUser } from '../../contexts/UserContext';

const upcomingEvents = [
  {
    id: 1,
    title: 'Tech Conference 2024',
    date: 'Mar 15, 2024',
    time: '9:00 AM',
    location: 'Convention Center',
    guests: 120,
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    description: 'Annual technology conference featuring the latest innovations and industry leaders.',
  },
  {
    id: 2,
    title: 'Team Building Workshop',
    date: 'Mar 20, 2024',
    time: '2:00 PM',
    location: 'Adventure Park',
    guests: 45,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    description: 'A day of team-building activities and outdoor adventures.',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Welcome back!</Text>
              <Text style={styles.name}>{user?.name}</Text>
            </View>
            <Image
              source={{ uri: user?.avatar }}
              style={styles.avatar}
            />
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color="#94a3b8" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search events..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <Link href="/create" asChild>
              <Pressable style={styles.createButton}>
                <Plus size={24} color="#ffffff" />
              </Pressable>
            </Link>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Total Events</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>350</Text>
              <Text style={styles.statLabel}>Guests</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          
          {upcomingEvents.length === 0 ? (
            <View style={styles.emptyState}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg' }}
                style={styles.emptyStateImage}
              />
              <Text style={styles.emptyStateTitle}>No Events Yet</Text>
              <Text style={styles.emptyStateText}>
                Create your first event by tapping the + button above
              </Text>
            </View>
          ) : (
            upcomingEvents.map((event) => (
              <Link key={event.id} href={`/event/${event.id}`} asChild>
                <Pressable style={styles.eventCard}>
                  <Image
                    source={{ uri: event.image }}
                    style={styles.eventImage}
                    contentFit="cover"
                  />
                  <View style={styles.eventContent}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDescription} numberOfLines={2}>
                      {event.description}
                    </Text>
                    
                    <View style={styles.eventDetails}>
                      <View style={styles.eventDetailItem}>
                        <Calendar size={16} color="#6b7280" />
                        <Text style={styles.eventDetailText}>{event.date}</Text>
                      </View>
                      <View style={styles.eventDetailItem}>
                        <Clock size={16} color="#6b7280" />
                        <Text style={styles.eventDetailText}>{event.time}</Text>
                      </View>
                      <View style={styles.eventDetailItem}>
                        <MapPin size={16} color="#6b7280" />
                        <Text style={styles.eventDetailText}>{event.location}</Text>
                      </View>
                      <View style={styles.eventDetailItem}>
                        <Users size={16} color="#6b7280" />
                        <Text style={styles.eventDetailText}>{event.guests} guests</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              </Link>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    color: '#0f172a',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
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
  createButton: {
    backgroundColor: '#6366f1',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#64748b',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#0f172a',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#0f172a',
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#0f172a',
    marginBottom: 8,
  },
  eventDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  eventDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  eventDetailText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
});