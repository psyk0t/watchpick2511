import { useState, useEffect } from 'react';
import { MediaAPI } from '../services/api';
import type { MovieResult, TvResult, TMDBConfiguration, AccountDetails } from '../types/api';

export function useConfiguration() {
  const [config, setConfig] = useState<TMDBConfiguration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const data = await MediaAPI.getConfiguration();
        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch configuration');
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { config, loading, error };
}

export function useAccount() {
  const [account, setAccount] = useState<AccountDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccount() {
      try {
        const data = await MediaAPI.getAccountDetails();
        setAccount(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch account details');
      } finally {
        setLoading(false);
      }
    }

    fetchAccount();
  }, []);

  return { account, loading, error };
}

export function useMediaRecommendations(preferences: Record<string, boolean>) {
  const [recommendations, setRecommendations] = useState<(MovieResult | TvResult)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        setError(null);
        const response = await MediaAPI.getRecommendations(preferences);
        setRecommendations(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recommendations');
      } finally {
        setLoading(false);
      }
    }

    if (Object.keys(preferences).length > 0) {
      fetchRecommendations();
    }
  }, [preferences]);

  return { recommendations, loading, error };
}

export function useGroupRecommendations(groupPreferences: Record<string, boolean>[]) {
  const [recommendations, setRecommendations] = useState<(MovieResult | TvResult)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGroupRecommendations() {
      try {
        setLoading(true);
        setError(null);
        const response = await MediaAPI.getGroupRecommendations(groupPreferences);
        setRecommendations(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch group recommendations');
      } finally {
        setLoading(false);
      }
    }

    if (groupPreferences.length > 0) {
      fetchGroupRecommendations();
    }
  }, [groupPreferences]);

  return { recommendations, loading, error };
}