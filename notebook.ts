export class Notebook {
  private _index = 0;
  private _cells = {};

  cell(definition) {
    const index = this._index++;
    const cell = {
      ...definition,
      index,
      async compute() {
        if (this.info.generator) {
          const value = this.source().next().value;
          return { value };
        }
        const value = await this.source();
        return { value };
      },
    };
    this._cells[cell.index] = cell;
    return cell;
  }
}
