const base = import.meta.env.BASE_URL;

/** The bird from their sign plus the name, set as real text and tracked out in CSS. */
export function Wordmark({ size = 'sm', bird = true }: { size?: 'sm' | 'lg'; bird?: boolean }) {
  return (
    <span className={`wordmark wordmark--${size}`}>
      {bird && <img className="wordmark-bird" src={`${base}bird-gold.png`} alt="" width={160} height={123} />}
      <span className="wordmark-text">Bluethroat</span>
    </span>
  );
}
