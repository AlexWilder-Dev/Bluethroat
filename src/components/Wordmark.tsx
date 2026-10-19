const base = import.meta.env.BASE_URL;

/** The bird from their sign and the name, set as real text and tracked out in CSS. */
export function Wordmark() {
  return (
    <span className="wordmark">
      <img className="wordmark-bird" src={`${base}bird-ink.png`} alt="" width={160} height={123} />
      <span className="wordmark-text">Bluethroat</span>
    </span>
  );
}
