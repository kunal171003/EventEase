import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import { Calendar, Clock, MapPin, Users, ChevronLeft, CreditCard as Edit, CircleCheck as CheckCircle2 } from 'lucide-react-native';

const events = {
  1: {
    id: 1,
    title: 'Tech Conference 2024',
    date: 'Mar 15, 2024',
    time: '9:00 AM',
    location: 'Convention Center',
    guests: 120,
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    description: 'Annual technology conference featuring the latest innovations and industry leaders.',
    tasks: {
      total: 8,
      completed: 3,
    },
  },
  2: {
    id: 2,
    title: 'Team Building Workshop',
    date: 'Mar 20, 2024',
    time: '2:00 PM',
    location: 'Adventure Park',
    guests: 45,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    description: 'A day of team-building activities and outdoor adventures.',
    tasks: {
      total: 5,
      completed: 2,
    },
  },
};

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const event = events[id as keyof typeof events];

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: event.image }}
          style={styles.coverImage}
          contentFit="cover"
        />
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#ffffff" />
        </Pressable>
        <Pressable 
          style={styles.editButton}
          onPress={() => router.push(`/event/${id}/edit`)}
        >
          <Edit size={20} color="#ffffff" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Calendar size={20} color="#6366f1" />
            <Text style={styles.detailText}>{event.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={20} color="#6366f1" />
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <MapPin size={20} color="#6366f1" />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <CheckCircle2 size={20} color="#0f172a" />
              <Text style={styles.sectionTitle}>Tasks</Text>
            </View>
            <Pressable 
              style={styles.sectionButton}
              onPress={() => router.push(`/event/${id}/tasks`)}
            >
              <Text style={styles.sectionButtonText}>View Tasks</Text>
            </Pressable>
          </View>
          <View style={styles.taskProgress}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(event.tasks.completed / event.tasks.total) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {event.tasks.completed} of {event.tasks.total} tasks completed
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Users size={20} color="#0f172a" />
              <Text style={styles.sectionTitle}>Guests</Text>
            </View>
            <Pressable 
              style={styles.sectionButton}
              onPress={() => router.push(`/event/${id}/guests`)}
            >
              <Text style={styles.sectionButtonText}>Manage Guests</Text>
            </Pressable>
          </View>
          <Text style={styles.guestsCount}>{event.guests} people attending</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    position: 'relative',
    height: 300,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 44,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  editButton: {
    position: 'absolute',
    top: 44,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    color: '#0f172a',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
    lineHeight: 24,
  },
  detailsContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 12,
  },
  section: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#0f172a',
    marginLeft: 8,
  },
  sectionButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  sectionButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#ffffff',
  },
  taskProgress: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
  guestsCount: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 24,
  },
});