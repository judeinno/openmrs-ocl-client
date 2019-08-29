import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import { notify } from 'react-notify-toast';
import instance from '../../../config/axiosConfig';
import { FETCH_CONCEPTS, IS_FETCHING } from '../../../redux/actions/types';
import fetchConceptsActionTypes from '../../../redux/actions/concepts/specificConceptAction';
import concepts from '../../__mocks__/concepts';

const mockStore = configureStore([thunk]);
jest.mock('react-notify-toast');

describe('Test suite for specific concepts actions', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('should return an array of concepts', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [concepts],
      });
    });

    const expectedActions = [
      { type: IS_FETCHING, payload: true },
      { type: FETCH_CONCEPTS, payload: [concepts] },
      { type: IS_FETCHING, payload: false },
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(fetchConceptsActionTypes('malaria', 10, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an array of concepts when ownerType is organization', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [concepts],
      });
    });

    const expectedActions = [
      { type: IS_FETCHING, payload: true },
      { type: FETCH_CONCEPTS, payload: [concepts] },
      { type: IS_FETCHING, payload: false },
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(
      fetchConceptsActionTypes('hadijah', 'malaria', 'Organization', 10, 1),
    ).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an notify error message', () => {
    const notifyMock = jest.fn();
    notify.show = notifyMock;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
      });
    });

    const store = mockStore({ payload: {} });

    return store.dispatch(fetchConceptsActionTypes('malaria', 10, 1)).then(() => {
      expect(notifyMock).toHaveBeenCalledTimes(1);
      expect(notifyMock).toHaveBeenCalledWith('Request can\'t be made', 'error', 3000);
    });
  });

  it('should return an notify error from data message', () => {
    const notifyMock = jest.fn();
    notify.show = notifyMock;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        response: { data: 'Request failed' },
      });
    });

    const store = mockStore({ payload: {} });

    return store.dispatch(fetchConceptsActionTypes()).catch(() => {
      expect(notifyMock).toHaveBeenCalledTimes(1);
      expect(notifyMock).toHaveBeenCalledWith('Request failed', 'error', 3000);
    });
  });

  it('should return an notify error from detail message', () => {
    const notifyMock = jest.fn();
    notify.show = notifyMock;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        response: { data: { detail: 'Request failed' } },
      });
    });

    const store = mockStore({ payload: {} });

    return store.dispatch(fetchConceptsActionTypes()).catch(() => {
      expect(notifyMock).toHaveBeenCalledTimes(1);
      expect(notifyMock).toHaveBeenCalledWith('Request failed', 'error', 3000);
    });
  });

  it('should return an error message if request fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({});
    });

    const expectedActions = [
      { type: IS_FETCHING, payload: true },
      { type: IS_FETCHING, payload: false },
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(fetchConceptsActionTypes('malaria', 10, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
