import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReadMore = ({ route, navigation }) => {
  const { description, placeName, location, rating, image } = route.params || {};
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Debugging to confirm the image is passed correctly
  console.log('Image passed to ReadMore:', image);

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={image} style={styles.mainImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Image not available</Text>
          </View>
        )}
        <View style={styles.headerOverlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.placeName}>{placeName || 'No name available'}</Text>
        <Text style={styles.subtitle}>{location || 'No location available'}</Text>

        {/* Star Rating */}
        <View style={styles.ratingContainer}>
          {[...Array(rating || 0)].map((_, index) => (
            <Ionicons key={index} name="star" size={20} color="gold" />
          ))}
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#4CAF50" />
          <Text style={styles.locationDetail}>{location || 'No location available'}</Text>
        </View>

        <View style={styles.divider} />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Description */}
        <Text style={styles.description}>
          {expanded ? description : `${description.substring(0, 200)}...`}
        </Text>

        {/* See More/See Less Button */}
        <TouchableOpacity style={styles.toggleButton} onPress={toggleExpanded}>
          <Text style={styles.toggleButtonText}>
            {expanded ? 'See Less' : 'See More'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 280,
    backgroundColor: '#ddd',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  headerOverlay: {
    position: 'absolute',
    top: 60,
    left: 15,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    borderRadius: 50,
  },
  infoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  placeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'left',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  locationDetail: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#4CAF50',
    alignSelf: 'center',
    marginVertical: 15,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  toggleButton: {
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReadMore;
