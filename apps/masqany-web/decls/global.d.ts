type DistributiveOmit<T, TOmmited extends PropertyKey> = T extends any ? Omit<T, TOmmited> : never;
