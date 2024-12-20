'use client';
import { makeStore } from '@/lib/store/store';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';

const StoreProvider = ({ children }) => {
    const storeRef = useRef();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();

        // Add initial state
        // storeRef.current.dispatch(add('testproductid'));
    }
    return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
