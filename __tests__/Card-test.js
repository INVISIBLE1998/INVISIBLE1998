/* eslint-disable prettier/prettier */
import 'react-native';
import React from 'react';
import Cards from '../Components/Card/Cards';
import {screen,render,fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../State/store';

describe('Card Component', () => {
    jest.mock('@react-navigation/native');
    test('Card UI', () => {
        render(
            <Provider store={store}>
                <NavigationContainer>
                    <Cards/>
                </NavigationContainer>
            </Provider>
        );
        expect(screen.getByTestId('dashboardCard')).toBeTruthy();
    });

    test('Card press navigation', () => {
        const fakeNavigation = {
            navigate: jest.fn().mockImplementation(query =>({
                id: 1,
                title: 'hello',
                startDate: 'date',
                type: 'type',
                machine: 'machine1',
                description: 'Some instructions',
                duration: '5 Days',
                endDate: '22-10-2022',
                instruction: 'Some Instructions',
                comments: 'comments1',
            })),
        };

        render(
            <Provider store={store}>
                <NavigationContainer>
                    <Cards/>
                </NavigationContainer>
            </Provider>
        );
        const touchableop =  screen.getByTestId('dashboardCard');
        fireEvent.press(touchableop);
        expect(fakeNavigation.navigate).toBeCalledTimes(0);
    });
});
