const chai = require('chai');
const drawer = require('../src/drawer');

const {expect} = chai;
describe('drawer', () => {
  it('should exist and be a function', () => {
    expect(drawer.C).to.be.a('function');
    expect(drawer.L).to.be.a('function');
    expect(drawer.R).to.be.a('function');
    expect(drawer.B).to.be.a('function');
  });
  it('C: should create canvas (w+2)x(h+2)', () => {
    const w = 10;
    const h = 4;
    const canvas = drawer.C([], w, h);
    expect(canvas.length).to.equal(h + 2);
    expect(canvas[canvas.length - 1].length).to.equal(w + 2);
  });
  it('L: should create horizontal line on canvas', () => {
    const canvasMock = [
      ['-', '-', '-', '-', '-'],
      ['|', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-']
    ];
    const expectedCanvas = [
      ['-', '-', '-', '-', '-'],
      ['|', ' ', ' ', ' ', '|'],
      ['|', 'x', 'x', 'x', '|'],
      ['-', '-', '-', '-', '-']
    ];
    const canvas = drawer.L(canvasMock, 1, 2, 3, 2);
    expect(canvas).to.deep.equal(expectedCanvas);
  });
  it('L: should create vertical line on canvas', () => {
    const canvasMock = [
      ['-', '-', '-', '-', '-'],
      ['|', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-']
    ];
    const expectedCanvas = [
      ['-', '-', '-', '-', '-'],
      ['|', 'x', ' ', ' ', '|'],
      ['|', 'x', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-']
    ];
    const canvas = drawer.L(canvasMock, 1, 1, 1, 2);
    expect(canvas).to.deep.equal(expectedCanvas);
  });
  it('L: should create vertical line on canvas', () => {
    const canvasMock = [
      ['-', '-', '-', '-', '-'],
      ['|', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-']
    ];
    try {
      const canvas = drawer.L(canvasMock, 1, 1, 2, 2);
      throw Error('drawer.L should throw Error!');
    } catch (e) {
      expect(e.message).to.equal('Lines should be only horizontal or vertical!');
    }
  });
  it('R: should create rectangle on canvas', () => {
    const canvasMock = [
      ['-', '-', '-', '-', '-'],
      ['|', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', '|'],
      ['|', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-']
    ];
    const expectedCanvas = [
      ['-', '-', '-', '-', '-'],
      ['|', 'x', 'x', 'x', '|'],
      ['|', 'x', ' ', 'x', '|'],
      ['|', 'x', 'x', 'x', '|'],
      ['|', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-']
    ];
    const canvas = drawer.R(canvasMock, 1, 1, 3, 3);
    expect(canvas).to.deep.equal(expectedCanvas);
  });
  it('B: should fill fields inside rectangle', () => {
    const canvasMock = [
      ['-', '-', '-', '-', '-'],
      ['|', 'x', 'x', 'x', '|'],
      ['|', 'x', ' ', 'x', '|'],
      ['|', 'x', 'x', 'x', '|'],
      ['|', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-']
    ];
    const expectedCanvas = [
      ['-', '-', '-', '-', '-'],
      ['|', 'x', 'x', 'x', '|'],
      ['|', 'x', 'o', 'x', '|'],
      ['|', 'x', 'x', 'x', '|'],
      ['|', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-']
    ];
    const canvas = drawer.B(canvasMock, 2, 2, 'o');
    expect(canvas).to.deep.equal(expectedCanvas);
  });
  it('B: should fill rectangle border', () => {
    const canvasMock = [
      ['-', '-', '-', '-', '-'],
      ['|', 'x', 'x', 'x', '|'],
      ['|', 'x', ' ', 'x', '|'],
      ['|', 'x', 'x', 'x', '|'],
      ['|', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-']
    ];
    const expectedCanvas = [
      ['-', '-', '-', '-', '-'],
      ['|', 'o', 'o', 'o', '|'],
      ['|', 'o', ' ', 'o', '|'],
      ['|', 'o', 'o', 'o', '|'],
      ['|', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-']
    ];
    const canvas = drawer.B(canvasMock, 1, 1, 'o');
    expect(canvas).to.deep.equal(expectedCanvas);
  });
  it('B: should fill fields outside of rectangle', () => {
    const canvasMock = [
      ['-', '-', '-', '-', '-'],
      ['|', 'x', 'x', 'x', '|'],
      ['|', 'x', ' ', 'x', '|'],
      ['|', 'x', 'x', 'x', '|'],
      ['|', ' ', ' ', ' ', '|'],
      ['-', '-', '-', '-', '-']
    ];
    const expectedCanvas = [
      ['-', '-', '-', '-', '-'],
      ['|', 'x', 'x', 'x', '|'],
      ['|', 'x', ' ', 'x', '|'],
      ['|', 'x', 'x', 'x', '|'],
      ['|', 'o', 'o', 'o', '|'],
      ['-', '-', '-', '-', '-']
    ];
    const canvas = drawer.B(canvasMock, 1, 4, 'o');
    expect(canvas).to.deep.equal(expectedCanvas);
  });
});
