import { expect } from 'chai';
import { add, subtract, multiply, divide } from '../utils/mathUtils.js';

describe('Math Functions', () => {
  describe('add()', () => {
    it('should return 5 for add(2, 3)', () => {
      expect(add(2, 3)).to.equal(5);
    });

    it('should return 1 for add(-2, 3)', () => {
      expect(add(-2, 3)).to.equal(1);
    });

    it('should return 0 for add(0, 0)', () => {
      expect(add(0, 0)).to.equal(0);
    });
  });

  describe('subtract()', () => {
    it('should return 2 for subtract(5, 3)', () => {
      expect(subtract(5, 3)).to.equal(2);
    });

    it('should return -2 for subtract(3, 5)', () => {
      expect(subtract(3, 5)).to.equal(-2);
    });

    it('should return 0 for subtract(0, 0)', () => {
      expect(subtract(0, 0)).to.equal(0);
    });
  });

  describe('multiply()', () => {
    it('should return 12 for multiply(4, 3)', () => {
      expect(multiply(4, 3)).to.equal(12);
    });

    it('should return -6 for multiply(-2, 3)', () => {
      expect(multiply(-2, 3)).to.equal(-6);
    });

    it('should return 0 for multiply(0, 5)', () => {
      expect(multiply(0, 5)).to.equal(0);
    });
  });

  describe('divide()', () => {
    it('should return 2 for divide(6, 3)', () => {
      expect(divide(6, 3)).to.equal(2);
    });

    it('should return -3 for divide(-6, 2)', () => {
      expect(divide(-6, 2)).to.equal(-3);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() => divide(5, 0)).to.throw('Cannot divide by zero');
    });
  });
});
