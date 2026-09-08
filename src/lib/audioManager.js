/**
 * Web Audio API procedural Ambient Music & Sound Engine
 * Generates continuous smooth, atmospheric, luxury chillout chords, sub-bass, and melodic tones.
 * 100% self-contained — plays instantly without relying on external network mp3s or CORS.
 */

// Chord definitions in Hz (Warm, uplifting, cinematic progression)
const CHORDS = [
  // F# minor 9 (F#2, C#3, A3, C#4, E4, G#4)
  [92.5, 138.59, 220.0, 277.18, 329.63, 415.3],
  // D Major 9 (D2, A2, F#3, A3, C#4, E4)
  [73.42, 110.0, 185.0, 220.0, 277.18, 329.63],
  // B minor 11 (B1, F#2, D3, A3, C#4, F#4)
  [61.74, 92.5, 146.83, 220.0, 277.18, 369.99],
  // E dominant 9 sus4 (E2, B2, E3, A3, B3, F#4)
  [82.41, 123.47, 164.81, 220.0, 246.94, 369.99],
];

// Melodic arpeggio notes (pentatonic scale for dreamy sparkles)
const SPARKLE_NOTES = [440, 493.88, 554.37, 659.25, 739.99, 880, 987.77];

class AmbientMusicEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.musicGain = null;
    this.filter = null;
    this.loopTimer = null;
    this.arpeggioTimer = null;
    this.currentChordIndex = 0;
    this.activeNodes = [];
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  startAmbient() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    this.isPlaying = true;
    const now = this.ctx.currentTime;

    // Master Output & Music Submix Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, now + 1.8);
    this.masterGain.connect(this.ctx.destination);

    // Warm Stereo Lowpass Filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(450, now);
    this.filter.Q.setValueAtTime(2.5, now);
    this.filter.connect(this.masterGain);

    // Filter LFO for breathing warmth
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, now); // ~8-second cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(160, now);
    lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    lfo.start(now);
    this.activeNodes.push(lfo);

    // Play initial chord and start chord loop
    this.currentChordIndex = 0;
    this.scheduleNextChord();

    // Start subtle generative sparkles
    this.startSparkleArpeggiator();

    // Play soft welcome confirmation chime
    this.playActivateTone();
  }

  scheduleNextChord() {
    if (!this.isPlaying || !this.ctx) return;

    const chord = CHORDS[this.currentChordIndex];
    const duration = 6.0; // Each chord plays for 6 seconds
    const now = this.ctx.currentTime;

    // Play pad voices for the chord
    chord.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Alternate waveforms for rich lush textures
      osc.type = i === 0 ? 'sine' : i % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Add gentle detuning for chorus/warmth
      const detune = (i - 2) * 4;
      osc.detune.setValueAtTime(detune, now);

      // Volume envelope: slow attack (1.8s), sustained body, gentle release (2.5s)
      const baseGain = i === 0 ? 0.28 : 0.08 / Math.sqrt(i + 1);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(baseGain, now + 1.8);
      gain.gain.setValueAtTime(baseGain, now + duration - 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 2.0);

      osc.connect(gain);
      gain.connect(this.filter);

      osc.start(now);
      osc.stop(now + duration + 2.5);
    });

    // Advance to next chord
    this.currentChordIndex = (this.currentChordIndex + 1) % CHORDS.length;

    // Schedule next chord change slightly overlapping
    this.loopTimer = setTimeout(() => {
      if (this.isPlaying) {
        this.scheduleNextChord();
      }
    }, (duration - 0.8) * 1000);
  }

  // Generates dreamy, organic melodic micro-tones in key
  startSparkleArpeggiator() {
    const playNextSparkle = () => {
      if (!this.isPlaying || !this.ctx) return;

      const now = this.ctx.currentTime;
      const freq = SPARKLE_NOTES[Math.floor(Math.random() * SPARKLE_NOTES.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.025, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.5);

      const nextDelay = 1200 + Math.random() * 2400; // 1.2s to 3.6s random intervals
      this.arpeggioTimer = setTimeout(playNextSparkle, nextDelay);
    };

    this.arpeggioTimer = setTimeout(playNextSparkle, 1500);
  }

  stopAmbient() {
    if (!this.ctx || !this.isPlaying) return;

    try {
      const now = this.ctx.currentTime;
      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
      }

      if (this.loopTimer) clearTimeout(this.loopTimer);
      if (this.arpeggioTimer) clearTimeout(this.arpeggioTimer);

      setTimeout(() => {
        this.activeNodes.forEach((node) => {
          try {
            node.stop();
          } catch (e) {}
        });
        this.activeNodes = [];
        this.isPlaying = false;
      }, 1100);
    } catch (err) {
      this.isPlaying = false;
    }
  }

  // Futuristic activation chime
  playActivateTone() {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {}
  }

  // Subtle UI click / interaction tone
  playClickTone() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.08);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }
}

export const soundEngine = new AmbientMusicEngine();
