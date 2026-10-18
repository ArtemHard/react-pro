import {
  ClickTimer,
  PreviousInput,
  FocusTracker,
  DebouncedLogger,
  WebSocketLogger,
} from 'features/refExamples';
import styles from './TimerPage.module.css';

export function TimerPage() {
  return (
    <div className={styles.page}>

      <section>
        <h2>ClickTimer</h2>
        <ClickTimer />
      </section>

      <section>
        <h2>PreviousInput</h2>
        <PreviousInput />
      </section>

      <section>
        <h2>FocusTracker</h2>
        <FocusTracker />
      </section>

      <section>
        <h2>DebouncedLogger</h2>
        <DebouncedLogger />
      </section>

      <section>
        <h2>WebSocketLogger</h2>
        <WebSocketLogger />
      </section>
    </div>
  );
}
