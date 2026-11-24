import { useEffect, useState } from 'react';
import { AudioControl } from './components/AudioControl.jsx';
import { Navbar } from './components/Navbar.jsx';
import { invitationConfig } from './data/invitation.js';
import { useBackgroundAudio } from './hooks/useBackgroundAudio.js';
import { CoupleSection } from './sections/CoupleSection.jsx';
import { CoverSection } from './sections/CoverSection.jsx';
import { EventSection } from './sections/EventSection.jsx';
import { FooterSection } from './sections/FooterSection.jsx';
import { GallerySection } from './sections/GallerySection.jsx';
import { GiftSection } from './sections/GiftSection.jsx';
import { GuestbookSection } from './sections/GuestbookSection.jsx';
import { RsvpSection } from './sections/RsvpSection.jsx';
import { StorySection } from './sections/StorySection.jsx';
import { getGuestNameFromUrl, resolveGuestPronoun } from './utils/url.js';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [urlGuestName] = useState(() => getGuestNameFromUrl(''));
  const coverGuestName =
    urlGuestName || invitationConfig.cover.defaultGuestName;
  const guestPronoun = resolveGuestPronoun(
    urlGuestName,
    invitationConfig.cover.defaultGuestName
  );
  const audio = useBackgroundAudio(invitationConfig.audio);

  useEffect(() => {
    document.title = invitationConfig.meta.title;
  }, []);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    audio.play();
  };

  if (!isOpened) {
    return (
      <main>
        <CoverSection
          cover={invitationConfig.cover}
          guestName={coverGuestName}
          onOpen={handleOpenInvitation}
        />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-rose focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:text-white"
      >
        Lewati ke konten utama
      </a>

      <Navbar
        monogram={invitationConfig.cover.monogram}
        items={invitationConfig.navigation}
      />

      <main id="main-content">
        <CoupleSection
          intro={invitationConfig.intro}
          couple={invitationConfig.couple}
          event={invitationConfig.event}
          guestPronoun={guestPronoun}
        />
        <EventSection event={invitationConfig.event} />
        <StorySection story={invitationConfig.story} />
        <GallerySection gallery={invitationConfig.gallery} />
        <RsvpSection
          rsvp={invitationConfig.rsvp}
          initialGuestName={urlGuestName}
        />
        <GuestbookSection
          guestbook={invitationConfig.guestbook}
          timezone={invitationConfig.event.timezone}
        />
        <GiftSection gift={invitationConfig.gift} />
      </main>

      <FooterSection
        footer={invitationConfig.footer}
        guestPronoun={guestPronoun}
      />
      <AudioControl
        audioConfig={invitationConfig.audio}
        status={audio.status}
        notice={audio.notice}
        onToggle={audio.toggle}
      />
    </div>
  );
}
