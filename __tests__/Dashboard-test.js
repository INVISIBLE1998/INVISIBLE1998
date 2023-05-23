/* eslint-disable prettier/prettier */
import * as React from 'react';
import {screen, render, fireEvent} from '@testing-library/react-native';
import Dashboard from '../Pages/Dashboard/Dashboard';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../State/store';

describe('Dashboard Component', () => {
    test('Dashboard UI', () => {
        render(
            <Provider store={store}>
                <NavigationContainer>
                    <Dashboard/>
                </NavigationContainer>
            </Provider>
        );
        expect(screen.findByPlaceholderText('Search Filter')).toBeTruthy();
    });

    test('Search Filter', () => {
        const searchFilter = {
            search : jest.fn(),
        };

        render(
            <Provider store={store}>
                <NavigationContainer>
                    <Dashboard searchFilter={searchFilter}/>
                </NavigationContainer>
            </Provider>
        );
        const searchInput = screen.getByTestId('searchFilter');
        fireEvent.changeText(searchInput, 'Motor');
        expect(searchFilter.search).toBeCalledTimes(0);
    });
});
