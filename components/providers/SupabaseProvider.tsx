'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase/client';

const SupabaseContext = createContext(supabaseClient);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => supabaseClient);

  useEffect(() => {
    const { data: { subscription } } = client.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          window.location.reload();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [client]);

  return (
    <SupabaseContext.Provider value={client}>
      {children}
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => useContext(SupabaseContext);
