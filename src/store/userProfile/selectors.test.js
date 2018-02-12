import { getUserProfile } from './selectors'

it('should return the userProfile state', () => {
  const fakeState = {
    userProfile: {
      id: '123456',
      first_name: "test_firstname"
    }
  }

  const expectedResult = {
    userProfile: {
      id: '123456',
      first_name: "test_firstname"
    }
  }

  expect(getUserProfile(fakeState)).toEqual(expectedResult)

})
