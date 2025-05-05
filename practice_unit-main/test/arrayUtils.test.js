import { expect } from 'chai';
import { findMax, findMin, removeDuplicates } from '../utils/arrayUtils.js'; 

describe('Utility Functions', () => {

  describe('findMax', () => {
    it('should return the maximum number in the array', () => {
      expect(findMax([1, 5, 3, 9, 2])).to.equal(9);
    });

    it('should throw an error if input is not an array', () => {
      expect(() => findMax("not an array")).to.throw("Input must be an array");
    });

    it('should return -Infinity for an empty array', () => {
      expect(findMax([])).to.equal(-Infinity);
    });
  });

  describe('findMin', () => {
    it('should return the minimum number in the array', () => {
      expect(findMin([1, 5, 3, -2, 9])).to.equal(-2);
    });

    it('should throw an error if input is not an array', () => {
      expect(() => findMin(null)).to.throw("Input must be an array");
    });

    it('should return Infinity for an empty array', () => {
      expect(findMin([])).to.equal(Infinity);
    });
  });

  describe('removeDuplicates', () => {
    it('should remove duplicate elements from an array', () => {
      expect(removeDuplicates([1, 2, 2, 3, 4, 4, 5])).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should handle an array with all unique values', () => {
      expect(removeDuplicates([1, 2, 3])).to.deep.equal([1, 2, 3]);
    });

    it('should return an empty array when given an empty array', () => {
      expect(removeDuplicates([])).to.deep.equal([]);
    });

    it('should throw an error if input is not an array', () => {
      expect(() => removeDuplicates(123)).to.throw("Input must be an array");
    });
  });

});
