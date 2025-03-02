import styles from './Seminar.module.css';

function Seminar() {
  return (
    <>
      <li className={styles.item}>
        <a href="#">
          <img
            src="https://picsum.photos/id/1/750/730"
            alt="Новинки Kosmoteros"
          />
        </a>

        <div className={styles.info}>
          <div className={styles.description}>
            <h2>
              <a href="#">Новинки Kosmoteros</a>
            </h2>
            <p>Обзор новых средств и методик от Kosmoteros.</p>
          </div>

          <time dateTime="2025-02-01 10:00">01.02.2025</time>
        </div>
      </li>

      <li className={styles.item}>
        <a href="#">
          <img
            src="https://picsum.photos/id/1/750/730"
            alt="Новинки Kosmoteros"
          />
        </a>

        <div className={styles.info}>
          <div className={styles.description}>
            <h2>
              <a href="#">Новинки Kosmoteros</a>
            </h2>
            <p>Обзор новых средств и методик от Kosmoteros.</p>
          </div>

          <time dateTime="2025-02-01 10:00">01.02.2025</time>
        </div>
      </li>
    </>
  );
}

export default Seminar;
