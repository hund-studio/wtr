import cliSpinners from 'cli-spinners';
import logUpdate from 'log-update';

export interface LoaderActions {
  start(): void;
  stop(): void;
}

export interface LoaderOptions {
  spinner?: Spinner;
  clearOnEnd?: boolean;
}

export interface Spinner {
  frames: string[];
  interval: number;
}

const DEFAULT_CONFIG: LoaderOptions = {
  spinner: cliSpinners.dots as Spinner,
  clearOnEnd: true,
};

export const loading = (message: string, options?: LoaderOptions): LoaderActions => {
  let intervalId: NodeJS.Timeout;
  const spinner = options?.spinner || DEFAULT_CONFIG.spinner;
  const clearOnEnd = options?.clearOnEnd !== undefined ? options.clearOnEnd : DEFAULT_CONFIG.clearOnEnd;

  const start = () => {
    const { interval, frames } = spinner as Spinner;
    let index: number = 0;

    intervalId = setInterval(() => {
      logUpdate(`${frames[(index = ++index % frames.length)]} ${message}`.trim());
    }, interval);
  };

  const stop = () => {
    clearInterval(intervalId);
    if (clearOnEnd) {
      logUpdate.clear();
    }
    logUpdate.done();
  };

  return { start, stop };
};
