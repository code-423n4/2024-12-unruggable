# Unruggable audit details
- Total Prize Pool: $38,000 in USDC
  - HM awards: $30,500 in USDC
  - QA awards: $1,300 in USDC
  - Judge awards: $5,700 in USDC
  - Scout awards: $500 in USDC
- [Read our guidelines for more details](https://docs.code4rena.com/roles/wardens)
- Starts December 6, 2024 20:00 UTC
- Ends December 20, 2024 20:00 UTC

**Note re: risk level upgrades/downgrades**

Two important notes about judging phase risk adjustments: 
- High- or Medium-risk submissions downgraded to Low-risk (QA)) will be ineligible for awards.
- Upgrading a Low-risk finding from a QA report to a Medium- or High-risk finding is not supported.

As such, wardens are encouraged to select the appropriate risk level carefully during the submission phase.

## This is a Private audit

This audit repo and its Discord channel are accessible to **certified wardens only.** Participation in private audits is bound by:

1. Code4rena's [Certified Contributor Terms and Conditions](https://github.com/code-423n4/code423n4.com/blob/main/_data/pages/certified-contributor-terms-and-conditions.md)
2. C4's [Certified Contributor Code of Professional Conduct](https://code4rena.notion.site/Code-of-Professional-Conduct-657c7d80d34045f19eee510ae06fef55)

*All discussions regarding private audits should be considered private and confidential, unless otherwise indicated.*

Please review the following confidentiality requirements carefully, and if anything is unclear, ask questions in the private audit channel in the C4 Discord.

## Automated Findings / Publicly Known Issues

_Note for C4 wardens: Anything included in this `Automated Findings / Publicly Known Issues` section is considered a publicly known issue and is ineligible for awards._

- [Zenith Audit Report](./Zenith%20Audit%20Report%20-%20Unruggable.pdf)

## Links

- **Previous audits:** [Zenith Audit Report](./Zenith%20Audit%20Report%20-%20Unruggable.pdf)
- **Documentation:** [Link](https://gateway-docs.unruggable.com/)

## Scoping Q &amp; A

- [Final commit hash](https://github.com/unruggable-labs/unruggable-gateways/commit/67d92e12ece1a1d849ac671fc62db465ee4cae94)

| Question                                | Answer                                                                                            |
| --------------------------------------- | ------------------------------------------------------------------------------------------------- |
| ERC20 used by the protocol              | No                                                                                                |
| ERC721 used  by the protocol            | No                                                                                                |
| ERC777 used by the protocol             | Yes/No                                                                                            |
| ERC1155 used by the protocol            | No                                                                                                |
| Chains the protocol will be deployed on | Ethereum, Arbitrum, Base, Optimism, Other                                                         |

## Files in Scope

Let me extract just Table 2's SLOC numbers for these files:

Let me compare the files that appear in both lists:

| File | SLOC |
|------|------|
| GatewayVM.sol | 515 |
| GatewayFetcher.sol | 481 |
| scroll/ScrollVerifierHooks.sol | 200 |
| op/OPFaultGameFinder.sol | 106 |
| op/OPFaultVerifier.sol | 111 |
| linea/LineaVerifierHooks.sol | 109 |
| nitro/NitroVerifier.sol | 91 |
| GatewayRequest.sol | 89 |
| op/OPVerifier.sol | 72 |
| GatewayFetchTarget.sol | 68 |
| eth/EthVerifierHooks.sol | 45 |
| scroll/ScrollVerifier.sol | 45 |
| AbstractVerifier.sol | 37 |
| RLPReaderExt.sol | 30 |
| nitro/IRollupCore.sol | 24 |
| IVerifierHooks.sol | 18 |
| linea/ILineaRollup.sol | 14 |
| IGatewayVerifier.sol | 14 |
| ReadBytesAt.sol | 12 |
| IGatewayProtocol.sol | 9 |

### External integrations (e.g., Uniswap) behavior in scope:

| Question                                                  | Answer |
| --------------------------------------------------------- | ------ |
| Enabling/disabling fees (e.g. Blur disables/enables fees) | No |
| Pausability (e.g. Uniswap pool gets paused)               | Yes|
| Upgradeability (e.g. Uniswap gets upgraded)               | Yes |

# Additional context

### Please list all the other chains you plan on deploying to:


Iteratively over time, numerous. Verifiers for these chains will be covered in later audits.

For this audit, we are covering Arbitrum, Base, Linea, Optimism, and Scroll. There are no explicit deployments on these chains in the code scope but i've highlighted them given the nature of the codebase.

### Are there contracts that are required to comply with any EIPs?
- contracts/GatewayFetchTarget.sol - ERC-3668

## Areas of concern

1. Correctness of the verification path for each of the five in-scope chains.
2. Confirmation that the Virtual Machine OP codes result in expected outputs.
3. Confirmation that the non-existence of data is appropriately verified/handled.
4. Verification of the trustless-ness of the solution.

## All trusted roles of the protocol
1. Verifier contract owner can modify the Gateway URLs.


## Main invariants
1. Only correct proofs are accepted. Invalid or unproven inputs are rejected.
2. No control by any party can allow for modifications that negate other invariants.

## Miscellaneous
Employees of Unruggable and employees' family members are ineligible to participate in this audit.

Code4rena's rules cannot be overridden by the contents of this README. In case of doubt, please check with C4 staff.


# Scope

*See [scope.txt](https://github.com/code-423n4/2024-12-unruggable/blob/main/scope.txt)*

### Files in scope


| File   | Logic Contracts | Interfaces | nSLOC | Purpose | Libraries used |
| ------ | --------------- | ---------- | ----- | -----   | ------------ |
| /contracts/eth/EthVerifierHooks.sol | 1| **** | 25 | ||
| /contracts/linea/ILineaRollup.sol | ****| 1 | 3 | ||
| /contracts/linea/LineaVerifier.sol | 1| **** | 31 | ||
| /contracts/linea/LineaVerifierHooks.sol | 1| **** | 48 | ||
| /contracts/nitro/IRollupCore.sol | ****| 1 | 17 | ||
| /contracts/nitro/NitroVerifier.sol | 1| **** | 69 | ||
| /contracts/op/OPFaultGameFinder.sol | 1| 3 | 43 | ||
| /contracts/op/OPFaultVerifier.sol | 1| 2 | 62 | ||
| /contracts/op/OPVerifier.sol | 1| 1 | 50 | ||
| /contracts/scroll/ScrollVerifier.sol | 1| 1 | 31 | ||
| /contracts/scroll/ScrollVerifierHooks.sol | 1| 1 | 108 | ||
| /contracts/AbstractVerifier.sol | 1| **** | 32 | |@openzeppelin/contracts/access/Ownable.sol|
| /contracts/GatewayFetchTarget.sol | 1| **** | 44 | ||
| /contracts/GatewayFetcher.sol | 1| **** | 293 | ||
| /contracts/GatewayRequest.sol | 2| **** | 88 | ||
| /contracts/GatewayVM.sol | 1| **** | 442 | |forge-std/console.sol|
| /contracts/IGatewayProtocol.sol | ****| 1 | 4 | ||
| /contracts/IGatewayVerifier.sol | ****| 1 | 6 | ||
| /contracts/IVerifierHooks.sol | ****| 1 | 6 | ||
| /contracts/RLPReaderExt.sol | 1| **** | 21 | ||
| /contracts/ReadBytesAt.sol | 1| **** | 10 | ||
| **Totals** | **17** | **13** | **1433** | | |

### Files out of scope

*See [out_of_scope.txt](https://github.com/code-423n4/2024-12-unruggable/blob/main/out_of_scope.txt)*

| File         |
| ------------ |
| ./contracts/SelfVerifier.sol |
| ./contracts/TrustedVerifier.sol |
| ./contracts/eth/MerkleTrie.sol |
| ./contracts/eth/SecureMerkleTrie.sol |
| ./contracts/linea/Mimc.sol |
| ./contracts/linea/SparseMerkleProof.sol |
| ./contracts/linea/UnfinalizedLineaVerifier.sol |
| ./contracts/nitro/DoubleNitroVerifier.sol |
| ./contracts/op/ReverseOPVerifier.sol |
| ./contracts/polygon/PolygonPoSVerifier.sol |
| ./contracts/taiko/TaikoVerifier.sol |
| ./contracts/zksync/Blake2S.sol |
| ./contracts/zksync/IZKSyncSMT.sol |
| ./contracts/zksync/ZKSyncSMT.sol |
| ./contracts/zksync/ZKSyncVerifier.sol |
| ./contracts/zksync/ZKSyncVerifierHooks.sol |
| ./lib/optimism/packages/contracts-bedrock/src/dispute/interfaces/IDisputeGame.sol |
| ./lib/optimism/packages/contracts-bedrock/src/dispute/interfaces/IDisputeGameFactory.sol |
| ./lib/optimism/packages/contracts-bedrock/src/dispute/interfaces/IInitializable.sol |
| ./lib/optimism/packages/contracts-bedrock/src/dispute/lib/LibPosition.sol |
| ./lib/optimism/packages/contracts-bedrock/src/dispute/lib/LibUDT.sol |
| ./lib/optimism/packages/contracts-bedrock/src/dispute/lib/Types.sol |
| ./lib/optimism/packages/contracts-bedrock/src/libraries/Bytes.sol |
| ./lib/optimism/packages/contracts-bedrock/src/libraries/Encoding.sol |
| ./lib/optimism/packages/contracts-bedrock/src/libraries/Hashing.sol |
| ./lib/optimism/packages/contracts-bedrock/src/libraries/Types.sol |
| ./lib/optimism/packages/contracts-bedrock/src/libraries/rlp/RLPErrors.sol |
| ./lib/optimism/packages/contracts-bedrock/src/libraries/rlp/RLPReader.sol |
| ./lib/optimism/packages/contracts-bedrock/src/libraries/rlp/RLPWriter.sol |
| ./test/components/GatewayFetcher.t.sol |
| ./test/components/GatewayVM.t.sol |
| ./test/examples/ens/L1Resolver.sol |
| ./test/examples/ens/L2Storage.sol |
| ./test/examples/self/Backend.sol |
| ./test/examples/self/Frontend.sol |
| ./test/gateway/FixedOPFaultGameFinder.sol |
| ./test/gateway/SlotDataContract.sol |
| ./test/gateway/SlotDataPointer.sol |
| ./test/gateway/SlotDataReader.sol |
| Totals: 39 |

