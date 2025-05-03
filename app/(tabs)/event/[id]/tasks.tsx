import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, Plus, CircleCheck as CheckCircle2, Circle, X, Calendar, Clock } from 'lucide-react-native';

const initialTasks = [
  {
    id: 1,
    title: 'Book venue',
    description: 'Contact venue and finalize booking details',
    dueDate: '2024-03-10',
    status: 'completed',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Send invitations',
    description: 'Design and send digital invitations to all guests',
    dueDate: '2024-03-12',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Arrange catering',
    description: 'Finalize menu and confirm with catering service',
    dueDate: '2024-03-13',
    status: 'pending',
    priority: 'high',
  },
];

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'pending';
  priority: 'high' | 'medium' | 'low';
};

export default function TasksScreen() {
  const { id } = useLocalSearchParams();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });

  const handleAddTask = () => {
    if (!newTask.title) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description || '',
        dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
        status: 'pending',
        priority: newTask.priority || 'medium',
      } as Task,
    ]);
    setNewTask({ title: '', description: '', dueDate: '', priority: 'medium' });
    setIsAddingTask(false);
  };

  const toggleTaskStatus = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.title}>Tasks</Text>
        <Pressable 
          style={styles.addButton}
          onPress={() => setIsAddingTask(true)}
        >
          <Plus size={24} color="#6366f1" />
        </Pressable>
      </View>

      {isAddingTask && (
        <View style={styles.addTaskForm}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Add New Task</Text>
            <Pressable onPress={() => setIsAddingTask(false)}>
              <X size={20} color="#64748b" />
            </Pressable>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={newTask.title}
            onChangeText={title => setNewTask({ ...newTask, title })}
            placeholderTextColor="#94a3b8"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={newTask.description}
            onChangeText={description => setNewTask({ ...newTask, description })}
            multiline
            numberOfLines={3}
            placeholderTextColor="#94a3b8"
          />
          <TextInput
            style={styles.input}
            placeholder="Due Date (YYYY-MM-DD)"
            value={newTask.dueDate}
            onChangeText={dueDate => setNewTask({ ...newTask, dueDate })}
            placeholderTextColor="#94a3b8"
          />
          <View style={styles.prioritySelector}>
            <Text style={styles.priorityLabel}>Priority:</Text>
            {['low', 'medium', 'high'].map((priority) => (
              <Pressable
                key={priority}
                style={[
                  styles.priorityButton,
                  newTask.priority === priority && styles.priorityButtonSelected,
                  { backgroundColor: getPriorityColor(priority) + '20' },
                ]}
                onPress={() => setNewTask({ ...newTask, priority: priority as Task['priority'] })}
              >
                <Text style={[
                  styles.priorityButtonText,
                  { color: getPriorityColor(priority) },
                ]}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
          <Pressable 
            style={styles.addTaskButton}
            onPress={handleAddTask}
          >
            <Text style={styles.addTaskButtonText}>Add Task</Text>
          </Pressable>
        </View>
      )}

      <ScrollView style={styles.taskList}>
        {tasks.map(task => (
          <Pressable
            key={task.id}
            style={styles.taskCard}
            onPress={() => toggleTaskStatus(task.id)}
          >
            <View style={styles.taskHeader}>
              <Pressable
                style={styles.checkbox}
                onPress={() => toggleTaskStatus(task.id)}
              >
                {task.status === 'completed' ? (
                  <CheckCircle2 size={24} color="#6366f1" />
                ) : (
                  <Circle size={24} color="#6366f1" />
                )}
              </Pressable>
              <View style={styles.taskTitleContainer}>
                <Text style={[
                  styles.taskTitle,
                  task.status === 'completed' && styles.taskTitleCompleted
                ]}>
                  {task.title}
                </Text>
                <View style={[
                  styles.priorityBadge,
                  { backgroundColor: getPriorityColor(task.priority) + '20' }
                ]}>
                  <Text style={[
                    styles.priorityBadgeText,
                    { color: getPriorityColor(task.priority) }
                  ]}>
                    {task.priority}
                  </Text>
                </View>
              </View>
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteTask(task.id)}
              >
                <X size={20} color="#ef4444" />
              </Pressable>
            </View>
            {task.description && (
              <Text style={[
                styles.taskDescription,
                task.status === 'completed' && styles.taskDescriptionCompleted
              ]}>
                {task.description}
              </Text>
            )}
            <View style={styles.taskFooter}>
              <View style={styles.taskMetadata}>
                <Calendar size={16} color="#64748b" />
                <Text style={styles.taskMetadataText}>{task.dueDate}</Text>
              </View>
            </View>
          </Pressable>
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
  addTaskForm: {
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  prioritySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priorityLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#0f172a',
    marginRight: 12,
  },
  priorityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  priorityButtonSelected: {
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  priorityButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
  },
  addTaskButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  addTaskButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#ffffff',
  },
  taskList: {
    flex: 1,
    padding: 16,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 12,
  },
  taskTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#0f172a',
    flex: 1,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  priorityBadgeText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  taskDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
    marginLeft: 36,
  },
  taskDescriptionCompleted: {
    color: '#94a3b8',
  },
  taskFooter: {
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 36,
  },
  taskMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMetadataText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
});