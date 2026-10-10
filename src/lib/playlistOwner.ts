import type { Playlist } from '@/api/subsonic';

/**
 * Yours, both for the server that says so and for the one that says nothing.
 *
 * Compared without regard to case: Navidrome logs you in whichever way you
 * typed your name, but reports the owner as it is stored. Typing "willyflam"
 * for "Willyflam" would otherwise leave you owning nothing.
 */
export function isMine(playlist: Playlist, username: string | undefined): boolean {
  if (!playlist.owner) return true;
  return playlist.owner.toLowerCase() === (username ?? '').toLowerCase();
}
