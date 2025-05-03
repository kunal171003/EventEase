import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { format, addMonths, subMonths, eachDayOfInterval, startOfMonth, endOfMonth, isToday, isSameMonth } from 'date-fns';

const events = [
  { id: 1, date: '2024-03-15', title: 'Tech Conference', time: '9:00 AM', type: 'Conference' },
  { id: 2, date: '2024-03-20', title: 'Team Meeting', time: '2:00 PM', type: 'Meeting' },
  { id: 3, date: '2024-03-25', title: 'Product Launch', time: '10:00 AM', type: 'Business' },
];

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const getDayEvents = (date: Date) => {
    return events.filter(event => event.date === format(date, 'yyyy-MM-dd'));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
      </View>

      <View style={styles.calendarHeader}>
        <Pressable onPress={previousMonth} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>Previous</Text>
        </Pressable>
        <Text style={styles.monthYear}>{format(currentDate, 'MMMM yyyy')}</Text>
        <Pressable onPress={nextMonth} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>Next</Text>
        </Pressable>
      </View>

      <View style={styles.weekDays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={styles.weekDay}>{day}</Text>
        ))}
      </View>

      <View style={styles.calendar}>
        {days.map((date) => {
          const dayEvents = getDayEvents(date);
          const isCurrentMonth = isSameMonth(date, currentDate);
          
          return (
            <View
              key={date.toString()}
              style={[
                styles.day,
                isToday(date) && styles.today,
                !isCurrentMonth && styles.otherMonth,
              ]}
            >
              <Text style={[
                styles.dayNumber,
                isToday(date) && styles.todayText,
                !isCurrentMonth && styles.otherMonthText,
              ]}>
                {format(date, 'd')}
              </Text>
              {dayEvents.map((event) => (
                <View key={event.id} style={styles.eventIndicator}>
                  <Text style={styles.eventTitle} numberOfLines={1}>
                    {event.title}
                  </Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
              ))}
            </View>
          );
        })}
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
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navigationButton: {
    padding: 8,
  },
  navigationButtonText: {
    fontFamily: 'Inter_500Medium',
    color: '#6366f1',
    fontSize: 14,
  },
  monthYear: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#0f172a',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: '#64748b',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  day: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  today: {
    backgroundColor: '#f0f9ff',
    borderColor: '#6366f1',
  },
  otherMonth: {
    backgroundColor: '#f8fafc',
  },
  dayNumber: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#0f172a',
    marginBottom: 2,
  },
  todayText: {
    color: '#6366f1',
    fontFamily: 'Inter_600SemiBold',
  },
  otherMonthText: {
    color: '#94a3b8',
  },
  eventIndicator: {
    backgroundColor: '#6366f1',
    borderRadius: 4,
    padding: 2,
    marginBottom: 1,
  },
  eventTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 8,
    color: '#ffffff',
  },
  eventTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: 7,
    color: '#ffffff',
    opacity: 0.8,
  },
});