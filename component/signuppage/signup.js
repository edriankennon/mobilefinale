import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../src/config/firebase';

const auth = getAuth(app);

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState('');
  const [guidelines, setGuidelines] = useState('');
  const [prices, setPrices] = useState('');
  const [contactUs, setContactUs] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [businessImages, setBusinessImages] = useState([]);

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isRolePickerVisible, setRolePickerVisible] = useState(false);
  const [isBusinessTypePickerVisible, setBusinessTypePickerVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSignUp = () => {
    if (!username || !email || !password || !role) {
      alert("All fields must be completed.");
      return;
    }

    if (role === 'Business Owner' && (!businessName || !businessType || !location || !guidelines || !prices || !contactUs)) {
      alert("All fields must be completed.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed up:', user);
        alert("Sign up successful!");
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/invalid-email':
            alert("Please enter a valid email address.");
            break;
          case 'auth/email-already-in-use':
            alert("This email is already in use. Please use a different email.");
            break;
          case 'auth/weak-password':
            alert("Password should be at least 6 characters.");
            break;
          default:
            alert(errorMessage);
            break;
        }
      });
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setRolePickerVisible(false);
  };

  const handleBusinessTypeSelect = (selectedBusinessType) => {
    setBusinessType(selectedBusinessType);
    setBusinessTypePickerVisible(false);
  };

  // Function to pick single image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  // Function to pick multiple images (5-10)
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 1,
    });

    if (!result.canceled) {
      setBusinessImages(result.assets.map(asset => asset.uri));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Text style={styles.headerText}>Sign Up</Text>

      {/* Profile Photo */}
      <View style={styles.photoContainer}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          <Image source={{ uri: profilePhoto || 'https://via.placeholder.com/100' }} style={styles.image} />
          <FontAwesome name="camera" size={20} color="green" style={styles.cameraIcon} />
        </TouchableOpacity>
      </View>

      {/* Username */}
      <View style={styles.inputGroup}>
        <FontAwesome name="user" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Email */}
      <View style={styles.inputGroup}>
        <FontAwesome name="envelope" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password */}
      <View style={styles.inputGroup}>
        <FontAwesome name="lock" size={20} color="green" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Entypo name={isPasswordVisible ? 'eye-with-line' : 'eye'} size={20} color="grey" style={styles.iconRight} />
        </TouchableOpacity>
      </View>

      {/* Role */}
      <Text style={styles.label}>Role</Text>
      <TouchableOpacity style={styles.pickerContainer} onPress={() => setRolePickerVisible(true)}>
        <FontAwesome name="user" size={20} color="green" style={styles.icon} />
        <Text style={styles.pickerText}>{role || 'Select Role'}</Text>
        <Entypo name="chevron-down" size={20} color="grey" style={styles.iconRight} />
      </TouchableOpacity>

      {/* Role Picker Modal */}
      <Modal visible={isRolePickerVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalHeader}>Select Role</Text>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleRoleSelect('Visitor')}>
              <Text style={styles.modalText}>Visitor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleRoleSelect('Business Owner')}>
              <Text style={styles.modalText}>Business Owner</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRolePickerVisible(false)}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {role === 'Business Owner' && (
        <>
          {/* Business Name */}
          <Text style={styles.label}>Business Name</Text>
          <View style={styles.inputGroup}>
            <FontAwesome name="briefcase" size={20} color="green" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Business Name"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          {/* Business Type */}
          <Text style={styles.label}>Business Type</Text>
          <TouchableOpacity style={styles.pickerContainer} onPress={() => setBusinessTypePickerVisible(true)}>
            <FontAwesome name="industry" size={20} color="green" style={styles.icon} />
            <Text style={styles.pickerText}>{businessType || 'Select Business Type'}</Text>
            <Entypo name="chevron-down" size={20} color="grey" style={styles.iconRight} />
          </TouchableOpacity>

          {/* Business Type Picker Modal */}
          <Modal visible={isBusinessTypePickerVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text style={styles.modalHeader}>Select Business Type</Text>
                <TouchableOpacity style={styles.modalOption} onPress={() => handleBusinessTypeSelect('Hotels')}>
                  <Text style={styles.modalText}>Hotels</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption} onPress={() => handleBusinessTypeSelect('Attractions')}>
                  <Text style={styles.modalText}>Attractions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption} onPress={() => handleBusinessTypeSelect('Food')}>
                  <Text style={styles.modalText}>Food</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setBusinessTypePickerVisible(false)}>
                  <Text style={styles.modalClose}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Location */}
          <Text style={styles.label}>Location</Text>
          <View style={styles.inputGroup}>
            <FontAwesome name="map-marker" size={20} color="green" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Guidelines */}
          <Text style={styles.label}>Guidelines</Text>
          <View style={styles.inputGroup}>
            <FontAwesome name="book" size={20} color="green" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Guidelines"
              value={guidelines}
              onChangeText={setGuidelines}
            />
          </View>

          {/* Prices */}
          <Text style={styles.label}>Prices</Text>
          <View style={styles.inputGroup}>
            <FontAwesome name="money" size={20} color="green" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Prices"
              value={prices}
              onChangeText={setPrices}
            />
          </View>

          {/* Contact Us */}
          <Text style={styles.label}>Contact Us</Text>
          <View style={styles.inputGroup}>
            <FontAwesome name="phone" size={20} color="green" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Contact Us"
              value={contactUs}
              onChangeText={setContactUs}
            />
          </View>

          {/* Business Images */}
          <Text style={styles.label}>Business Images (5-10)</Text>
          <TouchableOpacity style={styles.imagePickerButton} onPress={pickImages}>
            <Text style={styles.imagePickerButtonText}>Upload Images</Text>
          </TouchableOpacity>

          <View style={styles.imagePreviewContainer}>
            {businessImages.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.imagePreview} />
            ))}
          </View>
        </>
      )}

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login Prompt */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginLink}> Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    height: 150,
    backgroundColor: 'green',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  iconRight: {
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 15,
  },
  pickerText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 15,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
  },
  modalClose: {
    fontSize: 16,
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginText: {
    fontSize: 16,
    color: '#333',
  },
  loginLink: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
  },
  imagePickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SignUpScreen;
