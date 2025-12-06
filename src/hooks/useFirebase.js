// src/hooks/useFirebase.js

import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

// Global Context Variables (Provided by Canvas Environment)
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

export const useFirebase = () => {
    const [db, setDb] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [logoUrl, setLogoUrl] = useState(null);

    // 5a. Initialize Firebase and Authenticate
    useEffect(() => {
        const initFirebase = async () => {
            try {
                const app = initializeApp(firebaseConfig);
                const firestore = getFirestore(app);
                const authInstance = getAuth(app);
                setDb(firestore);

                const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
                    if (!user) {
                        if (initialAuthToken) {
                            await signInWithCustomToken(authInstance, initialAuthToken);
                        } else {
                            await signInAnonymously(authInstance);
                        }
                    }
                    const currentUserId = authInstance.currentUser?.uid || crypto.randomUUID();
                    setUserId(currentUserId);
                    setIsAuthReady(true);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error("Firebase Initialization Error:", error);
                setIsAuthReady(true);
            }
        };
        initFirebase();
    }, []);

    // 5b. Listen for User Assets (Logo)
    useEffect(() => {
        if (!db || !userId) return;

        // Path: /artifacts/{appId}/users/{userId}/user_assets/current_logo
        const logoDocRef = doc(db, `artifacts/${appId}/users/${userId}/user_assets/current_logo`);
        
        const unsubscribe = onSnapshot(logoDocRef, (docSnap) => {
            if (docSnap.exists() && docSnap.data().logo_url) {
                setLogoUrl(docSnap.data().logo_url);
            } else {
                // Placeholder logo if none is found
                setLogoUrl("https://placehold.co/150x150/ffffff/4f46e5?text=LOGO");
            }
        }, (err) => {
            console.error("Error loading logo from Firestore:", err);
            setLogoUrl("https://placehold.co/150x150/ffffff/4f46e5?text=LOGO+ERROR");
        });

        return () => unsubscribe();
    }, [db, userId]);

    return { db, userId, isAuthReady, logoUrl };
};