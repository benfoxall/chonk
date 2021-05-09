import humanFormat from 'https://cdn.skypack.dev/human-format';

const input = document.querySelector("input");


input.addEventListener("input", start);

async function start() {
  const [file] = input.files;

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

  document.querySelector(
    "#size output"
  ).innerText = `${_size}, over ${count} chunks, read in ${_time}`;
}
