import reducer from '../reducer/client-photo.js';

describe('clientPhoto reducer', () => {
  test('the intial state shuld be null', () => {
    let state = reducer(undefined, {type: ''});
    expect(null).toEqual(null);
  });

  test('should create the photo', () => {
    let action  = {
      type: 'CLIENT_PHOTO_CREATE',
      payload: {
        account: '5a0401d086f4a6053e0ef617',
        firstName: 'Usagi',
        lastName: 'Tsukino',
        city: 'Seattle',
        state: 'WA',
        donationGoal: 200,
        moneySpent: 100,
        bio: 'In the name of the moon',
        photo: 'https://charity-choice.s3-us-west-1.amazonaws.com/db30e2a68ca17a4e763391a802428927.kitten.jpg',
      },
    };
    let state = reducer(undefined, action);
    expect(state).toEqual(action.payload);
  });

  test('should set the photo', () => {
    let action  = {
      type: 'CLIENT_PHOTO_SET',
      payload: {
        account: '5a0401d086f4a6053e0ef617',
        firstName: 'Usagi',
        lastName: 'Tsukino',
        city: 'Seattle',
        state: 'WA',
        donationGoal: 200,
        moneySpent: 100,
        bio: 'In the name of the moon',
        photo: 'https://charity-choice.s3-us-west-1.amazonaws.com/db30e2a68ca17a4e763391a802428927.kitten.jpg',
      },
    };
    let state = reducer(undefined, action);
    expect(state).toEqual(action.payload);
  });

  test('should fail with no payload', () => {
    let shouldFail = () => {
      reducer(undefined, {type: 'CLIENT_PHOTO_CREATE'});
    };
    expect(shouldFail).toThrow('a photo was required');
  });

  test('should fail with no payload', () => {
    let shouldFail = () => {
      reducer(undefined, {type: 'CLIENT_PHOTO_SET'});
    };
    expect(shouldFail).toThrow('a photo was required');
  });

  test('should fail with invalid payload', () => {
    let shouldFail = () => {
      reducer(undefined, {
        type: 'CLIENT_PHOTO_CREATE',
        payload: {},
      });
    };
    expect(shouldFail).toThrow('photo was not valid');
  });

  test('should fail with invalid payload', () => {
    let shouldFail = () => {
      reducer(undefined, {
        type: 'CLIENT_PHOTO_SET',
        payload: {},
      });
    };
    expect(shouldFail).toThrow('photo was not valid');
  });

  test('should return null on TOKEN_REMOVE', () => {
    let state = reducer('hello world', {type: 'TOKEN_REMOVE'});
    expect(state).toEqual(null);
  });

  test('should return the state', () => {
    let state = reducer('hello world', {type: ''});
    expect(state).toEqual('hello world');
  });
});
