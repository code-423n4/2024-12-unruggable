import { testSelfEth } from './common.js';
import { CHAINS } from '../../src/chains.js';

testSelfEth(CHAINS.SEPOLIA, {
  // https://sepolia.etherscan.io/address/0x494d872430442EdB6c1e05BB5521084Ad50312b2#code
  slotDataContract: '0x494d872430442EdB6c1e05BB5521084Ad50312b2',
});
