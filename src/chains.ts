import type { Chain } from './types.js';

// https://chainlist.wtf
// https://www.superchain.eco/chains

export const CHAINS = {
  VOID: -1n,
  MAINNET: 1n,
  SEPOLIA: 11155111n,
  HOLESKY: 17000n,
  OP: 10n,
  OP_SEPOLIA: 11155420n,
  ZKSYNC: 324n,
  ZKSYNC_SEPOLIA: 300n,
  BASE: 8453n,
  BASE_SEPOLIA: 84532n,
  ARB1: 42161n,
  ARB_NOVA: 42170n,
  ARB_SEPOLIA: 421614n,
  TAIKO: 167000n,
  TAIKO_HEKLA: 167009n,
  SCROLL: 534352n,
  SCROLL_SEPOLIA: 534351n,
  ZKEVM: 1101n,
  ZKEVM_CARDONA: 2442n,
  POLYGON_POS: 137n,
  POLYGON_AMOY: 80002n,
  LINEA: 59144n,
  LINEA_SEPOLIA: 59141n,
  FRAXTAL: 252n,
  ZORA: 7777777n,
  BLAST: 81457n,
  MANTLE: 5000n,
  MANTLE_SEPOLIA: 5001n,
  MODE: 34443n,
  MODE_SEPOLIA: 919n,
  CYBER: 7560n,
  CYBER_SEPOLIA: 111557560n,
  REDSTONE: 690n,
  // GNOSIS: 100n, // L1: must verify against withdrawal signatures?
  SHAPE: 360n,
  BSC: 56n,
  OP_BNB: 204n,
  CELO_ALFAJORES: 44787n,
  WORLD: 480n,
  WORLD_SEPOLIA: 4801n,
  APE: 33139n,
  ZERO: 543210n,
  ZERO_SEPOLIA: 4457845n,
  INK_SEPOLIA: 763373n,
  UNICHAIN_SEPOLIA: 1301n,
  MORPH: 2818n,
  MORPH_HOLESKY: 2810n,
  SONEIUM_MINATO: 1946n,
} as const satisfies Record<string, Chain>;

export function chainName(chain: Chain): string {
  for (const [name, c] of Object.entries(CHAINS)) {
    if (c === chain) return name;
  }
  throw new TypeError(`unknown chain: ${chain}`);
}
