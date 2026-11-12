import React from 'react';
import {Composition, Still} from 'remotion';
import {CharacterSheet} from './dev/CharacterSheet';
import {TIMELINE, FPS} from './episode/timeline';
import {Reel} from './Reel';
import {Thumbnail} from './Thumbnail';
import {HighlightCover} from './brand/HighlightCover';
import {VIDEO} from './theme';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="AliIeltsReel" component={Reel} durationInFrames={TIMELINE.durationInFrames} fps={FPS} width={VIDEO.width} height={VIDEO.height} />
    <Still id="Thumbnail" component={Thumbnail} width={VIDEO.width} height={VIDEO.height} />
    <Still id="HighlightCover" component={HighlightCover} width={VIDEO.width} height={VIDEO.height} defaultProps={{icon: 'results' as const}} />
    <Still id="CharacterSheet" component={CharacterSheet} width={VIDEO.width} height={VIDEO.height} />
  </>
);
