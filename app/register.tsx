import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [badgeId, setBadgeId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');

  const handleRegister = () => {
    // Add your registration logic here
    console.log('Register:', badgeId, email, password, department);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={require('../assets/images/police-background.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>POLICE CAD SYSTEM</Text>
              <Text style={styles.badgeSubText}>NEW USER REGISTRATION</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.title}>ACCOUNT REQUEST</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Badge ID"
                placeholderTextColor="#666"
                value={badgeId}
                onChangeText={setBadgeId}
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Department"
                placeholderTextColor="#666"
                value={department}
                onChangeText={setDepartment}
                autoCapitalize="words"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Official Email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Create Password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#666"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              <Text style={styles.disclaimer}>
                By submitting this request, you confirm that you are an authorized law enforcement officer.
              </Text>
              
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>SUBMIT REQUEST</Text>
              </TouchableOpacity>
              
              <Link href="/" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Return to Login Portal</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  badge: {
    alignItems: 'center',
    marginBottom: 30,
  },
  badgeText: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  badgeSubText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366',
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: '#003366',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#000',
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#003366',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#003366',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});