import {add} from '../src/add.js';
import assert from'assert';

describe('add', function () {
  it('should return -1 when the value is not present', function () {
    assert.equal(add(12,1), 13);
  });
});