import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { api } from '../api/mutual-fund';
import type { SchemeDetails } from '../types/mutual-fund';

type RouteProps = RouteProp<RootStackParamList, 'FundDetails'>;

export const FundDetailsScreen = () => {
  const route = useRoute<RouteProps>();
  const { schemeCode } = route.params;
  
  const [details, setDetails] = useState<SchemeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDetails();
  }, [schemeCode]);

  const loadDetails = async () => {
    try {
      const data = await api.getSchemeDetails(schemeCode);
      setDetails(data);
    } catch (err) {
      setError('Failed to load fund details');
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

  if (error || !details) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error || 'Failed to load details'}</Text>
      </View>
    );
  }

  const latestNAV = details.data[0];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{details.meta.scheme_name}</Text>
        <Text style={styles.fundHouse}>{details.meta.fund_house}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Latest NAV</Text>
        <Text style={styles.navValue}>₹{parseFloat(latestNAV.nav).toFixed(2)}</Text>
        <Text style={styles.navDate}>as of {latestNAV.date}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Fund Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{details.meta.scheme_category}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Type</Text>
          <Text style={styles.value}>{details.meta.scheme_type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Scheme Code</Text>
          <Text style={styles.value}>{details.meta.scheme_code}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#1a73e8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  fundHouse: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  navValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  navDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  error: {
    color: '#dc2626',
    fontSize: 16,
  },
});