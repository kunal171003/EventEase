import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, TextInput, Modal } from 'react-native';
import { Image } from 'expo-image';
import { Bell, Moon, Globe, Shield, HelpCircle, LogOut, X, Check } from 'lucide-react-native';
import { useUser } from '../../contexts/UserContext';

const settingsSections = [
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', type: 'switch', value: true },
      { icon: Moon, label: 'Dark Mode', type: 'switch', value: false },
      { icon: Globe, label: 'Language', type: 'select', value: 'English' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: Shield,  label: 'Privacy', type: 'link' },
      { icon: HelpCircle, label: 'Help & Support', type: 'link' },
      { icon: LogOut, label: 'Log Out', type: 'button', color: '#ef4444' },
    ],
  },
];

export default function SettingsScreen() {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!editedName.trim() || !editedEmail.trim()) {
      setError('Name and email are required');
      return;
    }

    if (!editedEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setUser({
      ...user!,
      name: editedName.trim(),
      email: editedEmail.trim(),
    });
    setIsEditing(false);
    setError('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: user?.avatar }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
        <Pressable 
          style={styles.editButton}
          onPress={() => {
            setEditedName(user?.name || '');
            setEditedEmail(user?.email || '');
            setError('');
            setIsEditing(true);
          }}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </Pressable>
      </View>

      {settingsSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
            <Pressable
              key={itemIndex}
              style={styles.settingItem}
            >
              <View style={styles.settingItemLeft}>
                <item.icon size={20} color={item.color || '#64748b'} />
                <Text style={[
                  styles.settingItemLabel,
                  item.color && { color: item.color }
                ]}>
                  {item.label}
                </Text>
              </View>
              {item.type === 'switch' && (
                <Switch
                  value={item.value}
                  onValueChange={() => {}}
                  trackColor={{ false: '#e2e8f0', true: '#818cf8' }}
                  thumbColor={item.value ? '#6366f1' : '#ffffff'}
                />
              )}
              {item.type === 'select' && (
                <Text style={styles.settingItemValue}>{item.value}</Text>
              )}
            </Pressable>
          ))}
        </View>
      ))}

      <Text style={styles.version}>Version 1.0.0</Text>

      <Modal
        visible={isEditing}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <Pressable 
                style={styles.modalCloseButton}
                onPress={() => setIsEditing(false)}
              >
                <X size={24} color="#64748b" />
              </Pressable>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={editedName}
                  onChangeText={setEditedName}
                  placeholder="Enter your name"
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={editedEmail}
                  onChangeText={setEditedEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <View style={styles.modalActions}>
                <Pressable 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable 
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSave}
                >
                  <Check size={20} color="#ffffff" />
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#0f172a',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
  editButton: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#6366f1',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#64748b',
    marginLeft: 20,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 12,
  },
  settingItemValue: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
  },
  version: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: '#0f172a',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#0f172a',
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#ef4444',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
  },
  cancelButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#64748b',
  },
  saveButton: {
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  saveButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#ffffff',
  },
});