/**
 * Whose a playlist is, which decides what "Only my playlists" and the Yours
 * chip leave in.
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { isMine } from '@/lib/playlistOwner';

const list = (owner?: string) => ({ id: 'p1', name: 'Rock', owner });

describe('Playlist ownership', () => {
  it('is yours when the owner is you', () => {
    assert.equal(isMine(list('Willyflam'), 'Willyflam'), true);
    assert.equal(isMine(list('Caroline'), 'Willyflam'), false);
  });

  it('is yours when the server does not say whose it is', () => {
    // A server with no owner field has one account's worth of lists.
    assert.equal(isMine(list(undefined), 'Willyflam'), true);
    assert.equal(isMine(list(''), 'Willyflam'), true);
  });

  it('ignores case, because the server logs you in however you typed your name', () => {
    assert.equal(isMine(list('Willyflam'), 'willyflam'), true);
    assert.equal(isMine(list('willyflam'), 'WILLYFLAM'), true);
    assert.equal(isMine(list('Caroline'), 'willyflam'), false);
  });

  it('is nobody\'s when you are not known and the list has an owner', () => {
    assert.equal(isMine(list('Caroline'), undefined), false);
    assert.equal(isMine(list(undefined), undefined), true);
  });
});
