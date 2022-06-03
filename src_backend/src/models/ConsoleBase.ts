interface ConsoleBase {


  /**
   * Set all fader states to 100%
   */
  assumeAll100(): void

  /**
   * Sets a fader to a specific rough percent
   * @param fader fader to set, 0-indexed
   * @param percent percent to set
   */
  commandFader(fader: number, percent: number): void;

  /**
   * Determine if a fader's stack is played or not
   * @param fader fader to set, 0-indexed
   */
  isFaderPlayed(fader: number): Promise<boolean> ;

  /**
   * Reset All Faders to 100
   */
  resetAllFaders(): void;

}