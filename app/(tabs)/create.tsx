import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Calendar, Clock, MapPin, Users, Upload, X, Plus } from 'lucide-react-native';

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState<string[]>([]);
  const [newGuest, setNewGuest] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleAddGuest = () => {
    if (newGuest.trim()) {
      setGuests([...guests, newGuest.trim()]);
      setNewGuest('');
    }
  };

  const handleRemoveGuest = (index: number) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!title || !description || !date || !time || !location) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // TODO: Implement event creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.back();
    } catch (err) {
      setError('Failed to create event');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create New Event</Text>
      </View>

      <View style={styles.form}>
        <Pressable 
          style={[styles.imageUpload, image && styles.imageUploadWithPreview]}
          onPress={() => setImage('https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg')}
        >
          {image ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <Pressable 
                style={styles.removeImageButton}
                onPress={() => setImage(null)}
              >
                <X size={20} color="#ffffff" />
              </Pressable>
            </View>
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Upload size={32} color="#6366f1" />
              <Text style={styles.uploadText}>Upload Event Cover</Text>
              <Text style={styles.uploadSubtext}>Tap to choose an image</Text>
            </View>
          )}
        </Pressable>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter event title"
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your event"
            placeholderTextColor="#94a3b8"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Date</Text>
            <Pressable style={styles.dateTimeInput}>
              <Calendar size={20} color="#6366f1" />
              <TextInput
                style={styles.dateTimeText}
                value={date}
                onChangeText={setDate}
                placeholder="Select Date"
                placeholderTextColor="#94a3b8"
              />
            </Pressable>
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Time</Text>
            <Pressable style={styles.dateTimeInput}>
              <Clock size={20} color="#6366f1" />
              <TextInput
                style={styles.dateTimeText}
                value={time}
                onChangeText={setTime}
                placeholder="Select Time"
                placeholderTextColor="#94a3b8"
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.locationInput}>
            <MapPin size={20} color="#6366f1" />
            <TextInput
              style={styles.dateTimeText}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter location"
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Guests</Text>
          <View style={styles.guestsInput}>
            <Users size={20} color="#6366f1" />
            <TextInput
              style={styles.dateTimeText}
              value={newGuest}
              onChangeText={setNewGuest}
              placeholder="Add guest email"
              placeholderTextColor="#94a3b8"
              onSubmitEditing={handleAddGuest}
            />
            <Pressable onPress={handleAddGuest} style={styles.addGuestButton}>
              <Plus size={20} color="#6366f1" />
            </Pressable>
          </View>
          
          <View style={styles.guestList}>
            {guests.map((guest, index) => (
              <View key={index} style={styles.guestTag}>
                <Text style={styles.guestTagText}>{guest}</Text>
                <Pressable onPress={() => handleRemoveGuest(index)}>
                  <X size={16} color="#ffffff" />
                </Pressable>
              </View>
            ))}
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.buttonContainer}>
          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Create Event</Text>
          </Pressable>
        </View>
      </View>
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
  form: {
    padding: 20,
  },
  imageUpload: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    height: 200,
    marginBottom: 24,
    overflow: 'hidden',
  },
  imageUploadWithPreview: {
    borderStyle: 'solid',
    borderColor: '#6366f1',
  },
  uploadPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#6366f1',
    marginTop: 12,
  },
  uploadSubtext: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  imagePreviewContainer: {
    flex: 1,
  },
  imagePreview: {
    flex: 1,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#0f172a',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
  },
  dateTimeInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 8,
  },
  locationInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestsInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addGuestButton: {
    padding: 4,
  },
  guestList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  guestTag: {
    backgroundColor: '#6366f1',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  guestTagText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#ffffff',
    marginRight: 8,
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#ef4444',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#64748b',
  },
  saveButton: {
    flex: 2,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
});