const or = (a, b) => a | b;
const and = (a, b) => a & b;
const not = (a) => a === 1 ? 0 : 1;
const xor = (a, b) => and(or(a, b), not(and(a, b)));

const halfAdder = (a, b) => [and(a, b), xor(a,b)];

const fullAdder = (a, b, c) => {
  const [carry1, out1] = halfAdder(a, b);
  const [carry2, out2] = halfAdder(out1, c);
  return [or(carry1, carry2), out2];
}

const sum = (bitA, bitB) => {
  const [c1, v1] = halfAdder(bitA[7], bitB[7]);
  const [c2, v2] = fullAdder(c1, bitA[6], bitB[6]);
  const [c3, v3] = fullAdder(c2, bitA[5], bitB[5]);
  const [c4, v4] = fullAdder(c3, bitA[4], bitB[4]);
  const [c5, v5] = fullAdder(c4, bitA[3], bitB[3]);
  const [c6, v6] = fullAdder(c5, bitA[2], bitB[2]);
  const [c7, v7] = fullAdder(c6, bitA[1], bitB[1]);
  const [c8, v8] = fullAdder(c7, bitA[0], bitB[0]); // ?
  // if last carry is 1 the 8-bit ALU overflowed
  return [v8, v7, v6, v5, v4, v3, v2, v1];
};

// playground ↓

sum([1,0,0,1,1,0,1,1], [0,1,1,0,0,1,0,0]); //?