import {
  filter, find, map, some,
} from 'lodash-es';

const AddTileFourProbablility = 0.1;

export function nextTick() {
  return new Promise(requestAnimationFrame);
}

export enum TileState {
  New = 'new',
  Old = 'old',
  Moved = 'moved',
  Merged = 'merged',
  None = 'none',
}

export interface Tile {
  value: number;
  position: number;
  state: TileState;
}

// Left, Up, Right, Down
export type Direction = 0 | 1 | 2 | 3;

export default class Vue2048 {
  size;

  tiles: Tile[] = [];

  score = 0;

  moves = 0;

  constructor(size = 4) {
    this.size = size;
    this.addTiles(2);
  }

  private getAddablePositions() {
    const positions = map(Array(this.size ** 2), (v, i) => i);
    return filter(positions, (v) => !some(this.tiles, (e) => e.position === v));
  }

  private addTile() {
    const positions = this.getAddablePositions();

    if (positions.length) {
      this.tiles.push({
        value: Math.random() < AddTileFourProbablility ? 4 : 2,
        // eslint-disable-next-line no-bitwise
        position: positions[~~(Math.random() * positions.length)],
        state: TileState.New,
      });
    }
  }

  private addTiles(amount: number) {
    for (let i = 0; i < amount; i += 1) {
      this.addTile();
    }
  }

  private clearTiles() {
    this.tiles = filter(this.tiles, (e) => e.state !== TileState.Old);
    this.tiles = map(this.tiles, (e) => ({ ...e, state: TileState.None }));
  }

  private async moveTile(position: number, moveWeight: number, moveCount: number) {
    const tile = find(this.tiles, ['position', position]);
    const isEmptyTile = !tile || !tile.value;

    if (isEmptyTile) return;

    for (let i = 0; i < moveCount; i += 1) {
      const nextPosition = tile.position + moveWeight;
      const nextTiles = filter(this.tiles, ['position', nextPosition]);

      if (!nextTiles.length) {
        tile.position = nextPosition;
        tile.state = TileState.Moved;
      } else {
        const nextTile = nextTiles[0];
        const isMergeable = nextTiles.length === 1 && nextTile.value === tile.value;

        if (isMergeable) {
          tile.position = nextPosition;
          tile.state = TileState.Old;
          nextTile.value *= 2;
          nextTile.state = TileState.Merged;

          this.score += nextTile.value;
        }

        break;
      }
    }
  }

  private moveTiles(direction: Direction) {
    const { size } = this;
    const startPosition = [1, size, size - 2, size * (size - 2)][direction];
    const startPositionWeight = [4, 1, 4, 1][direction];
    const moveWeight = [-1, -size, 1, size][direction];

    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < size - 1; j += 1) {
        const position = startPosition + i * startPositionWeight - j * moveWeight;
        const moveCount = j + 1;

        this.moveTile(position, moveWeight, moveCount);
      }
    }

    return some(this.tiles, (e) => e.state === TileState.Moved
      || e.state === TileState.Merged);
  }

  async move(direction: Direction) {
    this.clearTiles();
    await nextTick();

    if (this.moveTiles(direction)) {
      this.addTile();
      this.moves += 1;
    }
  }
}
