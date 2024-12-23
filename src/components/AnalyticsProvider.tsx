// Create React Context for Analytics
import React, { createContext, useContext, ReactNode } from "react";
import { Pirsch } from "pirsch-sdk/web";

// Define a generic interface for analytics providers.
interface AnalyticsProvider {
  hit(): Promise<void>;
  event(
    name: string,
    duration?: number,
    metadata?: Record<string, unknown>,
  ): Promise<void>;
}

// Define the AnalyticsModule class to abstract the provider.
class AnalyticsModule {
  private provider: AnalyticsProvider;

  constructor(provider: AnalyticsProvider) {
    this.provider = provider;
  }

  // Delegate hit tracking to the current provider.
  async trackHit(): Promise<void> {
    await this.provider.hit();
  }

  // Delegate event tracking to the current provider.
  async trackEvent(
    name: string,
    duration?: number,
    metadata?: Record<string, unknown>,
  ): Promise<void> {
    await this.provider.event(name, duration, metadata);
  }
}

// Example implementation for the Pirsch provider.
class PirschProvider implements AnalyticsProvider {
  private client: typeof Pirsch;

  constructor(identificationCode: string) {
    this.client = new Pirsch({ identificationCode });
  }

  async hit(): Promise<void> {
    await this.client.hit();
  }

  async event(
    name: string,
    duration?: number,
    metadata?: Record<string, unknown>,
  ): Promise<void> {
    await this.client.event(name, duration, metadata);
  }
}

interface AnalyticsContextValue {
  analytics: AnalyticsModule;
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(
  undefined,
);

interface AnalyticsProviderProps {
  children: ReactNode;
  provider: AnalyticsProvider;
}

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
  provider,
}) => {
  const analytics = new AnalyticsModule(provider);
  return (
    <AnalyticsContext.Provider value={{ analytics }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

const useAnalytics = (): AnalyticsModule => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context.analytics;
};

// Example usage:
// const pirschProvider = new PirschProvider("<identification_code>");
// <AnalyticsProvider provider={pirschProvider}>
//     <App />
// </AnalyticsProvider>

export {
  AnalyticsModule,
  PirschProvider,
  AnalyticsProvider,
  AnalyticsProvider as AnalyticsContextProvider,
  useAnalytics,
};
