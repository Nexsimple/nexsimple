import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteSettings {
  [key: string]: any;
}

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('site_settings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_settings',
        },
        () => {
          loadSettings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      // Transform array to object
      const settingsObj = data?.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as SiteSettings);

      setSettings(settingsObj || {});
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSetting = (key: string, defaultValue: any = '') => {
    try {
      return settings[key] ? JSON.parse(settings[key]) : defaultValue;
    } catch {
      return settings[key] || defaultValue;
    }
  };

  // Return all settings as properties
  const parsedSettings = Object.keys(settings).reduce((acc, key) => {
    try {
      acc[key] = JSON.parse(settings[key]);
    } catch {
      acc[key] = settings[key];
    }
    return acc;
  }, {} as any);

  return { ...parsedSettings, isLoading, getSetting };
};
