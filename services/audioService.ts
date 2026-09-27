class AudioService {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private lastTickSecond: number = -1;

  constructor() {
    if (typeof window !== 'undefined') {
      const storedMute = localStorage.getItem('royal_timeline_sound_muted');
      if (storedMute !== null) {
        this.muted = storedMute === 'true';
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public init() {
    this.getAudioContext();
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(mute: boolean) {
    this.muted = mute;
    if (typeof window !== 'undefined') {
      localStorage.setItem('royal_timeline_sound_muted', String(mute));
    }
  }

  public toggleMute(): boolean {
    const nextState = !this.muted;
    this.setMuted(nextState);
    return nextState;
  }

  public stopTimerAudio() {
    this.lastTickSecond = -1;
  }

  /**
   * Eventuates the 30-second timer progressing to zero:
   * - 30s to 11s: steady clock/pendulum tick with low resonance and subtle tension
   * - 10s to 6s: escalating tension ticks with climbing pitch
   * - 5s to 1s: critical countdown pips with rising pitch and urgent double pulses
   */
  public onTimerTick(timeLeft: number) {
    if (this.muted) return;
    if (timeLeft < 0 || timeLeft > 30) return;
    if (this.lastTickSecond === timeLeft) return;
    this.lastTickSecond = timeLeft;

    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (timeLeft > 10) {
      // Steady clock tick (alternating tick / tock)
      const isEven = timeLeft % 2 === 0;
      const baseFreq = isEven ? 680 : 540;

      // Resonant click/tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(baseFreq, now);
      filter.Q.setValueAtTime(3, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);

      // Subtle sub-thud for clock weight
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(isEven ? 90 : 80, now);
      subGain.gain.setValueAtTime(0.06, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.05);

      // Subtle tension pulse as time passes below 18 seconds
      if (timeLeft <= 18) {
        const tensionOsc = ctx.createOscillator();
        const tensionGain = ctx.createGain();
        tensionOsc.type = 'sine';
        tensionOsc.frequency.setValueAtTime(220 + (18 - timeLeft) * 12, now);
        tensionGain.gain.setValueAtTime(0.02, now);
        tensionGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        tensionOsc.connect(tensionGain);
        tensionGain.connect(ctx.destination);
        tensionOsc.start(now);
        tensionOsc.stop(now + 0.2);
      }
    } else if (timeLeft > 5) {
      // 10 to 6 seconds: Escalating tension ticks
      const freq = 750 + (10 - timeLeft) * 40; // 750Hz -> 910Hz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);

      // Woodblock resonance
      const tap = ctx.createOscillator();
      const tapGain = ctx.createGain();
      tap.type = 'triangle';
      tap.frequency.setValueAtTime(freq * 1.5, now);
      tapGain.gain.setValueAtTime(0.06, now);
      tapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      tap.connect(tapGain);
      tapGain.connect(ctx.destination);
      tap.start(now);
      tap.stop(now + 0.05);
    } else if (timeLeft >= 1) {
      // 5 to 1 seconds: Critical countdown pips!
      const pipsFreqs: { [key: number]: number } = {
        5: 880,   // A5
        4: 932,   // Bb5
        3: 988,   // B5
        2: 1046,  // C6
        1: 1175,  // D6
      };
      const freq = pipsFreqs[timeLeft] || 1000;

      // Primary pip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);

      // Urgent harmonic
      const harm = ctx.createOscillator();
      const harmGain = ctx.createGain();
      harm.type = 'triangle';
      harm.frequency.setValueAtTime(freq * 2, now);
      harmGain.gain.setValueAtTime(0.05, now);
      harmGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      harm.connect(harmGain);
      harmGain.connect(ctx.destination);
      harm.start(now);
      harm.stop(now + 0.09);

      // In the final 3 seconds (3, 2, 1), play a rapid follow-up pip for tension
      if (timeLeft <= 3) {
        const subTime = now + 0.15;
        const subPip = ctx.createOscillator();
        const subPipGain = ctx.createGain();
        subPip.type = 'sine';
        subPip.frequency.setValueAtTime(freq * 1.05, subTime);
        subPipGain.gain.setValueAtTime(0.12, subTime);
        subPipGain.gain.exponentialRampToValueAtTime(0.0001, subTime + 0.09);
        subPip.connect(subPipGain);
        subPipGain.connect(ctx.destination);
        subPip.start(subTime);
        subPip.stop(subTime + 0.1);
      }
    }
  }

  /**
   * Positive sound when answer is correct:
   * Sparkling royal fanfare arpeggio (C5 -> E5 -> G5 -> C6) with sustained harmonic chime!
   */
  public playCorrectSound() {
    if (this.muted) return;
    this.stopTimerAudio();

    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { freq: 523.25, time: 0.00, dur: 0.25 }, // C5
      { freq: 659.25, time: 0.08, dur: 0.25 }, // E5
      { freq: 783.99, time: 0.16, dur: 0.30 }, // G5
      { freq: 1046.50, time: 0.24, dur: 0.65 }, // C6 (held)
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);

      // Bell-like envelope
      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.linearRampToValueAtTime(0.2, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur + 0.02);

      // Shimmer overtone
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmer.type = 'triangle';
      shimmer.frequency.setValueAtTime(freq * 2, now + time);

      shimmerGain.gain.setValueAtTime(0.0001, now + time);
      shimmerGain.gain.linearRampToValueAtTime(0.05, now + time + 0.02);
      shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur * 0.7);

      shimmer.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);

      shimmer.start(now + time);
      shimmer.stop(now + time + dur + 0.02);
    });

    // Sustained high chord sparkle at the peak
    const chordTime = now + 0.24;
    const chordFreqs = [1318.51, 1567.98]; // E6, G6
    chordFreqs.forEach(freq => {
      const cOsc = ctx.createOscillator();
      const cGain = ctx.createGain();
      cOsc.type = 'sine';
      cOsc.frequency.setValueAtTime(freq, chordTime);
      cGain.gain.setValueAtTime(0.0001, chordTime);
      cGain.gain.linearRampToValueAtTime(0.04, chordTime + 0.03);
      cGain.gain.exponentialRampToValueAtTime(0.0001, chordTime + 0.6);
      cOsc.connect(cGain);
      cGain.connect(ctx.destination);
      cOsc.start(chordTime);
      cOsc.stop(chordTime + 0.65);
    });
  }

  /**
   * Negative sound when answer is incorrect or times out:
   * Recognizable descending gameshow buzzer tone
   */
  public playIncorrectSound() {
    if (this.muted) return;
    this.stopTimerAudio();

    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Two-tone descending buzzer
    // First buzz tone: 220Hz + 208Hz dissonant beat
    const tone1Duration = 0.16;
    const osc1a = ctx.createOscillator();
    const osc1b = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();

    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(750, now);

    osc1a.type = 'sawtooth';
    osc1a.frequency.setValueAtTime(220, now);
    osc1b.type = 'triangle';
    osc1b.frequency.setValueAtTime(208, now);

    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + tone1Duration);

    osc1a.connect(filter1);
    osc1b.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1a.start(now);
    osc1b.start(now);
    osc1a.stop(now + tone1Duration + 0.02);
    osc1b.stop(now + tone1Duration + 0.02);

    // Second buzz tone: deeper drop 147Hz + 138Hz
    const tone2Start = now + 0.18;
    const tone2Duration = 0.35;
    const osc2a = ctx.createOscillator();
    const osc2b = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const filter2 = ctx.createBiquadFilter();

    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(600, tone2Start);
    filter2.frequency.linearRampToValueAtTime(350, tone2Start + tone2Duration);

    osc2a.type = 'sawtooth';
    osc2a.frequency.setValueAtTime(147, tone2Start);
    osc2a.frequency.exponentialRampToValueAtTime(110, tone2Start + tone2Duration);

    osc2b.type = 'triangle';
    osc2b.frequency.setValueAtTime(138, tone2Start);
    osc2b.frequency.exponentialRampToValueAtTime(104, tone2Start + tone2Duration);

    gain2.gain.setValueAtTime(0.0001, tone2Start);
    gain2.gain.linearRampToValueAtTime(0.20, tone2Start + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.0001, tone2Start + tone2Duration);

    osc2a.connect(filter2);
    osc2b.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2a.start(tone2Start);
    osc2b.start(tone2Start);
    osc2a.stop(tone2Start + tone2Duration + 0.02);
    osc2b.stop(tone2Start + tone2Duration + 0.02);
  }
}

export const audioService = new AudioService();
