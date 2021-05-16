import humanFormat from 'https://cdn.skypack.dev/human-format';

class SizeDemo extends HTMLFormElement {
  constructor() {
    super();

    const input = this.querySelector('input')
    input.addEventListener("input", () => this.handle(input.files));
  }


  /**
   * @param {FileList} files 
   */
  async handle(files) {
    const [file] = files;

    const stream = file.stream();
    const reader = stream.getReader();

    const start = performance.now();

    let count = 0;
    let size = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      size += value.byteLength;
      count++;
    }

    const end = performance.now();


    const _size = humanFormat(size);

    const _time = new Intl.NumberFormat("en", {
      style: "unit",
      unit: "millisecond",
    }).format(end - start);

    this.querySelector(
      "output"
    ).innerText = `${_size}, over ${count} chunks, read in ${_time}`;


    console.log(start, end, count, size)

  }
}

customElements.define('size-demo', SizeDemo, { extends: 'form' });
