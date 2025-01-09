import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { api } from '../api/mutual-fund';
import type { MutualFundScheme } from '../types/mutual-fund';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'FundList'>;

export const FundListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [funds, setFunds] = useState<MutualFundScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFunds();
  }, []);

  const loadFunds = async () => {
    try {
      const data = await api.getAllSchemes();
      setFunds(data);
    } catch (err) {
      setError('Failed to load funds');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={funds}
      keyExtractor={(item) => item.schemeCode.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('FundDetails', { schemeCode: item.schemeCode })}
        >
          <Text style={styles.schemeName}>{item.schemeName}</Text>
          <Text style={styles.schemeCode}>Scheme Code: {item.schemeCode}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  schemeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  schemeCode: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#dc2626',
    fontSize: 16,
  },
});