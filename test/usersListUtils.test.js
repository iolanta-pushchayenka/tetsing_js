import { expect } from 'chai';
import {
  filterUsersByAge,
  sortUsersByName,
  findUserById,
  isEmailTaken
} from '../utils/usersListUtils.js'; 

describe('User Utils', () => {

  const users = [
    { id: 101, name: 'Sophia', age: 28, email: 'sophia@domain.com' },
    { id: 102, name: 'Liam', age: 33, email: 'liam@domain.com' },
    { id: 103, name: 'Olivia', age: 24, email: 'olivia@domain.com' },
    { id: 104, name: 'Ethan', age: 29, email: 'ethan@domain.com' }
  ];

  describe('filterUsersByAge', () => {
    it('should filter users within the age range', () => {
      const result = filterUsersByAge(users, 23, 32);
      expect(result).to.deep.equal([
        { id: 101, name: 'Sophia', age: 28, email: 'sophia@domain.com' },
        { id: 103, name: 'Olivia', age: 24, email: 'olivia@domain.com' },
        { id: 104, name: 'Ethan', age: 29, email: 'ethan@domain.com' }
      ]);
    });

    it('should return an empty array if no users match', () => {
      const result = filterUsersByAge(users, 40, 50);
      expect(result).to.deep.equal([]);
    });

    it('should throw an error if users is not an array', () => {
      expect(() => filterUsersByAge(null, 20, 30)).to.throw('Users must be an array');
    });
  });

  describe('sortUsersByName', () => {
    it('should return users sorted by name alphabetically', () => {
      const result = sortUsersByName(users);
      expect(result.map(u => u.name)).to.deep.equal(['Ethan', 'Liam', 'Olivia', 'Sophia']);
    });

    it('should not mutate the original array', () => {
      const original = [...users];
      sortUsersByName(users);
      expect(users).to.deep.equal(original);
    });

    it('should throw an error if users is not an array', () => {
      expect(() => sortUsersByName('not array')).to.throw('Users must be an array');
    });
  });

  describe('findUserById', () => {
    it('should find and return the user by ID', () => {
      const result = findUserById(users, 103);
      expect(result).to.deep.equal({ id: 103, name: 'Olivia', age: 24, email: 'olivia@domain.com' });
    });

    it('should return null if user not found', () => {
      const result = findUserById(users, 999);
      expect(result).to.be.null;
    });

    it('should throw an error if users is not an array', () => {
      expect(() => findUserById({}, 1)).to.throw('Users must be an array');
    });
  });

  describe('isEmailTaken', () => {
    it('should return true if email exists', () => {
      expect(isEmailTaken(users, 'liam@domain.com')).to.be.true;
    });

    it('should return false if email does not exist', () => {
      expect(isEmailTaken(users, 'unknown@domain.com')).to.be.false;
    });

    it('should throw an error if users is not an array', () => {
      expect(() => isEmailTaken('not an array', 'test@test.com')).to.throw('Users must be an array');
    });
  });

});