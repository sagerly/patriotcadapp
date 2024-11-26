import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginUser } from '../src/api';
import { router} from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


const handleLogin = async () => {
  try {
    setIsLoading(true); // Add this state if you haven't already
    const response = await loginUser(email, password);
    console.log('Login successful:', response);
    router.replace('/home');
  } catch (error) {
    console.error('Login failed:', error);
    Alert.alert(
      'Login Failed', 
      typeof error === 'string' ? error : 'Please check your credentials and try again'
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={require('../assets/images/police-background.jpg')} // You'll need to add this image
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>POLICE CAD SYSTEM</Text>
              <Text style={styles.badgeSubText}>AUTHORIZED PERSONNEL ONLY</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.title}>LOGIN PORTAL</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Badge ID / Email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>SECURE LOGIN</Text>
              </TouchableOpacity>
              
              <Link href="/register" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Request New Account Access</Text>
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
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.3)',
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