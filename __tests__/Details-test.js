/* eslint-disable prettier/prettier */
import * as React from 'react';
import {screen, render} from '@testing-library/react-native';
import Details from '../Pages/Details/Details';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../State/store';

describe('Details Component' , () => {
    test('Details', () => {
        const fakeroute = {
            params: {
                id: 1,
            },
        };
        render(
            <Provider store={store}>
                <NavigationContainer>
                    <Details route={fakeroute} />
                </NavigationContainer>
            </Provider>
        );
        expect(screen.getByTestId('title')).toBeTruthy();
    });
});
