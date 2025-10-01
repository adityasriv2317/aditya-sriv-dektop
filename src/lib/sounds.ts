// Subtle sound effects using Web Audio API
class SoundManager {
  private audioContext: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  private playTone(frequency: number, duration: number, volume: number = 0.1) {
    try {
      const ctx = this.getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      // Silently fail if audio context is not available
      console.debug('Audio playback failed:', error);
    }
  }

  windowOpen() {
    this.playTone(800, 0.1, 0.05);
    setTimeout(() => this.playTone(1000, 0.08, 0.03), 50);
  }

  windowClose() {
    this.playTone(600, 0.08, 0.05);
    setTimeout(() => this.playTone(400, 0.1, 0.03), 40);
  }

  windowMinimize() {
    this.playTone(700, 0.06, 0.04);
    setTimeout(() => this.playTone(500, 0.06, 0.02), 30);
  }

  click() {
    this.playTone(1200, 0.03, 0.02);
  }

  hover() {
    this.playTone(900, 0.02, 0.015);
  }
}

export const soundManager = new SoundManager();
