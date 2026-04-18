import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../../store/slices/authSlice';
import axiosInstance from '../../api/axiosInstance';
import { getAuth, onAuthStateChanged, signOut, getIdToken } from '@react-native-firebase/auth';

export const AuthSync: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            dispatch(setLoading(true));
            try {
                if (!firebaseUser) {
                    await AsyncStorage.removeItem('authToken');
                    dispatch(setUser({ user: null, idToken: null }));
                    return;
                }

                // Modular API: getIdToken(user) instead of user.getIdToken()
                const idToken = await getIdToken(firebaseUser);
                await AsyncStorage.setItem('authToken', idToken);

                const response = await axiosInstance.get('/customers/profile');
                const user = response.data;

                dispatch(
                    setUser({
                        user: {
                            uid: user.id,
                            email: user.email,
                            displayName: user.name,
                            photoURL: user.photoUrl,
                        },
                        idToken,
                    })
                );
            } catch (error) {
                await signOut(auth);
                await AsyncStorage.removeItem('authToken');
                dispatch(setUser({ user: null, idToken: null }));
            } finally {
                dispatch(setLoading(false));
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return null;
};
