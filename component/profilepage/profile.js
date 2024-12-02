import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MyAccountScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Ralph Edwards');
  const [email, setEmail] = useState('james.naismith@example.com');
  const [language, setLanguage] = useState('English');

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Profile Updated', `Name: ${name}\nEmail: ${email}\nLanguage: ${language}`);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        {isEditing ? (
          <TextInput
            style={styles.profileNameInput}
            value={name}
            onChangeText={setName}
          />
        ) : (
          <Text style={styles.profileName}>{name}</Text>
        )}
        <Text style={styles.profileEmail}>{email}</Text>
      </View>

      {/* Account Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Ionicons name="person" size={24} color="green" />
          <Text style={styles.detailText}>Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.detailValueInput}
              value={name}
              onChangeText={setName}
            />
          ) : (
            <Text style={styles.detailValue}>{name}</Text>
          )}
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="mail" size={24} color="green" />
          <Text style={styles.detailText}>Email</Text>
          {isEditing ? (
            <TextInput
              style={styles.detailValueInput}
              value={email}
              onChangeText={setEmail}
            />
          ) : (
            <Text style={styles.detailValue}>{email}</Text>
          )}
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="globe" size={24} color="green" />
          <Text style={styles.detailText}>Language</Text>
          {isEditing ? (
            <TextInput
              style={styles.detailValueInput}
              value={language}
              onChangeText={setLanguage}
            />
          ) : (
            <Text style={styles.detailValue}>{language}</Text>
          )}
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="notifications" size={24} color="green" />
          <Text style={styles.detailText}>Notification</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: 60, // Increased padding top
    backgroundColor: '#4CAF50',
  },
  editText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: 'gray',
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  detailText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
    color: 'gray',
  },
  detailValueInput: {
    fontSize: 16,
    color: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
  },
});

export default MyAccountScreen;