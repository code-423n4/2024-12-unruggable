import { Interface } from 'ethers/abi';

// https://github.com/morph-l2/morph/blob/main/contracts/contracts/l1/rollup/Rollup.sol
export const ROLLUP_ABI = new Interface([
  `function lastFinalizedBatchIndex() view returns (uint256)`,
  `function finalizedStateRoots(uint256 batchIndex) view returns (bytes32)`,
  `event FinalizeBatch(
     uint256 indexed batchIndex,
     bytes32 indexed batchHash,
     bytes32 stateRoot,
     bytes32 withdrawRoot
   )`,
  `event CommitBatch(
     uint256 indexed batchIndex,
     bytes32 indexed batchHash
   )`,
  `function commitBatch(
     (
       uint8 version,
       bytes parentBatchHeader,
       bytes blockContexts,
	   bytes skippedL1MessageBitmap,
       bytes32 prevStateRoot,
       bytes32 postStateRoot,
       bytes32 withdrawalRoot
     ) batchDataInput,
     (
       uint256 signedSequencersBitmap,
       bytes sequencerSets,
       bytes signature
     ) batchSignatureInput 
   )`,
]);
