import React from 'react';
import {Composition, Still} from 'remotion';
import {CharacterSheet} from './dev/CharacterSheet';
import {TIMELINE, FPS} from './episode/timeline';
import {Reel} from './Reel';
import {Thumbnail} from './Thumbnail';
import {HighlightCover} from './brand/HighlightCover';
import {LogoStill} from './brand/LogoStill';
import {LogoReveal} from './brand/LogoReveal';
import {PortraitOptions} from './brand/PortraitOptions';
import {VIDEO} from './theme';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="AliIeltsReel" component={Reel} durationInFrames={TIMELINE.durationInFrames} fps={FPS} width={VIDEO.width} height={VIDEO.height} />
    <Still id="Thumbnail" component={Thumbnail} width={VIDEO.width} height={VIDEO.height} />
    <Still id="HighlightCover" component={HighlightCover} width={VIDEO.width} height={VIDEO.height} defaultProps={{icon: 'results' as const, monogram: 'BS'}} />
    <Still
      id="LogoStill"
      component={LogoStill}
      width={1254}
      height={1254}
      defaultProps={{monogram: 'YS', line1: 'YOUR NAME', line2: 'SCHOOL', tagline: 'YOUR TAGLINE', transparent: false}}
    />
    <Composition id="LogoRevealSquare" component={LogoReveal} durationInFrames={120} fps={30} width={1080} height={1080} defaultProps={{monogram: 'YS', line1: 'YOUR NAME', line2: 'SCHOOL', tagline: 'YOUR TAGLINE', transparent: false, sound: true}} />
    <Composition id="LogoRevealVertical" component={LogoReveal} durationInFrames={120} fps={30} width={1080} height={1920} defaultProps={{monogram: 'YS', line1: 'YOUR NAME', line2: 'SCHOOL', tagline: 'YOUR TAGLINE', transparent: false, sound: true}} />
    <Still id="Portrait4x5" component={PortraitOptions} width={1080} height={1350} defaultProps={{variant: 'studioCanvas' as const, photo: 'private/teacher_cutout.png', firstName: 'First', lastName: 'Last', title: 'IELTS teacher', subtitle: 'Online & offline lessons', handle: '@handle', monogram: 'YS', schoolLine1: 'YOUR NAME', schoolLine2: 'SCHOOL', tagline: 'YOUR TAGLINE'}} />
    <Still id="Portrait9x16" component={PortraitOptions} width={1080} height={1920} defaultProps={{...{variant: 'studioCanvas' as const, photo: 'private/teacher_cutout.png', firstName: 'First', lastName: 'Last', title: 'IELTS teacher', subtitle: 'Online & offline lessons', handle: '@handle', monogram: 'YS', schoolLine1: 'YOUR NAME', schoolLine2: 'SCHOOL', tagline: 'YOUR TAGLINE'}, variant: 'story' as const}} />
    <Still id="PortraitSquare" component={PortraitOptions} width={1080} height={1080} defaultProps={{...{variant: 'studioCanvas' as const, photo: 'private/teacher_cutout.png', firstName: 'First', lastName: 'Last', title: 'IELTS teacher', subtitle: 'Online & offline lessons', handle: '@handle', monogram: 'YS', schoolLine1: 'YOUR NAME', schoolLine2: 'SCHOOL', tagline: 'YOUR TAGLINE'}, variant: 'pfp' as const}} />
    <Still id="CharacterSheet" component={CharacterSheet} width={VIDEO.width} height={VIDEO.height} />
  </>
);
