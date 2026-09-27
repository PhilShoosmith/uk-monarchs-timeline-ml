/**
 * High-reliability Sound Effects Engine for UK Monarchs Timeline Game
 * 
 * Features:
 * - Real clapping hands (applause) for correct answers
 * - Classic game-show negative buzzer noise ("BZZT-BZZT") for incorrect answers
 * - Dual-layer playback (HTML5 Audio Blob + Web Audio API buffer) for 100% browser compatibility
 * - Global audio unlock on first user click/touch
 * - Respects user mute toggle & persists in localStorage
 */

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function createWavBlob(samples: Float32Array, sampleRate = 44100): Blob {
  const numChannels = 1;
  const bytesPerSample = 2; // 16-bit PCM
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    offset += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function generateClappingWaveform(sampleRate = 44100): Float32Array {
  const duration = 1.4;
  const totalSamples = Math.floor(sampleRate * duration);
  const out = new Float32Array(totalSamples);
  
  // Enthusiastic sequence of clapping hands (applause)
  const claps = [
    { t: 0.00, vol: 0.80 },
    { t: 0.09, vol: 0.90 },
    { t: 0.18, vol: 1.00 },
    { t: 0.28, vol: 0.95 },
    { t: 0.39, vol: 0.92 },
    { t: 0.51, vol: 0.88 },
    { t: 0.64, vol: 0.85 },
    { t: 0.78, vol: 0.82 },
    { t: 0.93, vol: 0.78 },
    { t: 1.10, vol: 0.70 },
    { t: 1.26, vol: 0.60 }
  ];

  for (const c of claps) {
    const start = Math.floor(c.t * sampleRate);
    const clapLen = Math.floor(0.09 * sampleRate);
    for (let i = 0; i < clapLen; i++) {
      const idx = start + i;
      if (idx >= totalSamples) break;
      const t = i / sampleRate;

      // Realistic skin-on-skin palm contact envelope with fingertip pre-bursts
      let env = 0;
      if (t < 0.004) {
        env = (t / 0.004) * 0.3;
      } else if (t < 0.006) {
        env = 0.08;
      } else if (t < 0.010) {
        env = ((t - 0.006) / 0.004) * 0.45;
      } else if (t < 0.012) {
        env = 0.12;
      } else {
        const bodyT = t - 0.012;
        env = Math.exp(-bodyT * 55);
      }

      // Air cavity palm pop (180-220Hz resonant thud) + hand acoustic noise
      const noise = (Math.random() * 2 - 1);
      const palmPop = Math.sin(2 * Math.PI * 195 * t) * Math.exp(-t * 85);
      const val = (noise * 0.75 + palmPop * 0.35) * env * c.vol;
      out[idx] += val;
    }
  }

  // Normalize
  let max = 0;
  for (let i = 0; i < totalSamples; i++) {
    if (Math.abs(out[i]) > max) max = Math.abs(out[i]);
  }
  if (max > 0) {
    for (let i = 0; i < totalSamples; i++) {
      out[i] = (out[i] / max) * 0.92;
    }
  }
  return out;
}

function generateBuzzerWaveform(sampleRate = 44100): Float32Array {
  const duration = 0.52;
  const totalSamples = Math.floor(sampleRate * duration);
  const out = new Float32Array(totalSamples);

  // Two distinct negative buzzer pulses ("BZZT - BZZT")
  const pulses = [
    { start: 0.00, end: 0.17, f1: 140, f2: 198, sub: 70, droop: 0 },
    { start: 0.23, end: 0.50, f1: 130, f2: 184, sub: 65, droop: 35 }
  ];

  for (const p of pulses) {
    const startIdx = Math.floor(p.start * sampleRate);
    const endIdx = Math.floor(p.end * sampleRate);
    const len = endIdx - startIdx;
    for (let i = 0; i < len; i++) {
      const idx = startIdx + i;
      if (idx >= totalSamples) break;
      const t = i / sampleRate;
      const progress = i / len;

      let env = 1.0;
      if (progress < 0.05) env = progress / 0.05;
      else if (progress > 0.85) env = (1.0 - progress) / 0.15;

      const fDrop = p.droop * (progress ** 1.5);
      const curF1 = p.f1 - fDrop;
      const curF2 = p.f2 - fDrop * 1.4;
      const curSub = p.sub - fDrop * 0.5;

      // Raspy television quiz buzzer timbre (sawtooth interval + sub square)
      const saw1 = (2 * ((t * curF1) % 1) - 1);
      const saw2 = (2 * ((t * curF2) % 1) - 1);
      const sq = (Math.sin(2 * Math.PI * curSub * t) >= 0 ? 0.35 : -0.35);

      out[idx] += (saw1 * 0.45 + saw2 * 0.35 + sq * 0.2) * env;
    }
  }

  // Normalize
  let max = 0;
  for (let i = 0; i < totalSamples; i++) {
    if (Math.abs(out[i]) > max) max = Math.abs(out[i]);
  }
  if (max > 0) {
    for (let i = 0; i < totalSamples; i++) {
      out[i] = (out[i] / max) * 0.88;
    }
  }
  return out;
}

class SoundEffectsEngine {
  private isMuted: boolean = false;
  private audioCtx: AudioContext | null = null;
  private clappingBlobUrl: string | null = null;
  private buzzerBlobUrl: string | null = null;
  private clappingAudioPool: HTMLAudioElement[] = [];
  private buzzerAudioPool: HTMLAudioElement[] = [];
  private clappingBuffer: AudioBuffer | null = null;
  private buzzerBuffer: AudioBuffer | null = null;
  private unlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('uk_monarchs_sound_muted');
      if (saved !== null) {
        this.isMuted = saved === 'true';
      }

      this.initWaveforms();
      this.attachUnlockListeners();
    }
  }

  private initWaveforms(): void {
    try {
      const sampleRate = 44100;
      const clappingSamples = generateClappingWaveform(sampleRate);
      const buzzerSamples = generateBuzzerWaveform(sampleRate);

      const clappingBlob = createWavBlob(clappingSamples, sampleRate);
      const buzzerBlob = createWavBlob(buzzerSamples, sampleRate);

      this.clappingBlobUrl = URL.createObjectURL(clappingBlob);
      this.buzzerBlobUrl = URL.createObjectURL(buzzerBlob);

      // Pre-warm audio elements
      for (let i = 0; i < 3; i++) {
        const cAudio = new Audio(this.clappingBlobUrl);
        cAudio.volume = 1.0;
        cAudio.preload = 'auto';
        this.clappingAudioPool.push(cAudio);

        const bAudio = new Audio(this.buzzerBlobUrl);
        bAudio.volume = 1.0;
        bAudio.preload = 'auto';
        this.buzzerAudioPool.push(bAudio);
      }
    } catch (e) {
      console.warn('[SoundEffects] Failed to pre-render WAV blobs:', e);
    }
  }

  private attachUnlockListeners(): void {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      this.unlockAudio();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
  }

  public unlockAudio(): void {
    if (this.unlocked && this.audioCtx?.state === 'running') return;
    try {
      if (!this.audioCtx) {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtxClass) {
          this.audioCtx = new AudioCtxClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
      this.unlocked = true;
    } catch {
      // Ignore
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('uk_monarchs_sound_muted', muted ? 'true' : 'false');
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  private playFromPool(pool: HTMLAudioElement[], fallbackUrl: string | null): boolean {
    if (pool.length > 0) {
      // Find idle audio element or cycle
      const audio = pool.find(a => a.paused || a.ended) || pool[0];
      try {
        audio.currentTime = 0;
        audio.volume = 1.0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log('[SoundEffects] HTML5 Audio autoplay restricted:', err);
          });
        }
        return true;
      } catch (e) {
        console.warn('[SoundEffects] Pool play failed:', e);
      }
    } else if (fallbackUrl) {
      try {
        const temp = new Audio(fallbackUrl);
        temp.volume = 1.0;
        temp.play().catch(() => {});
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  private playWebAudioBuffer(waveformFn: () => Float32Array): void {
    try {
      this.unlockAudio();
      if (!this.audioCtx) return;

      const samples = waveformFn();
      const buffer = this.audioCtx.createBuffer(1, samples.length, 44100);
      buffer.getChannelData(0).set(samples);

      const source = this.audioCtx.createBufferSource();
      source.buffer = buffer;
      const gain = this.audioCtx.createGain();
      gain.gain.value = 1.0;
      source.connect(gain);
      gain.connect(this.audioCtx.destination);
      source.start(0);
    } catch {
      // Web Audio fallback attempted
    }
  }

  /**
   * Plays clapping hands sound for correct answers
   */
  public playClappingSound(): void {
    if (this.isMuted) return;
    this.unlockAudio();

    // Primary: HTML5 Audio pool (instant, completely unaffected by AudioContext issues)
    const played = this.playFromPool(this.clappingAudioPool, this.clappingBlobUrl);

    // Secondary backup: Web Audio API
    if (!played || this.audioCtx?.state === 'running') {
      this.playWebAudioBuffer(generateClappingWaveform);
    }
  }

  /**
   * Plays negative buzzer sound for incorrect answers
   */
  public playNegativeSound(): void {
    if (this.isMuted) return;
    this.unlockAudio();

    // Primary: HTML5 Audio pool
    const played = this.playFromPool(this.buzzerAudioPool, this.buzzerBlobUrl);

    // Secondary backup: Web Audio API
    if (!played || this.audioCtx?.state === 'running') {
      this.playWebAudioBuffer(generateBuzzerWaveform);
    }
  }
}

export const soundEffects = new SoundEffectsEngine();
