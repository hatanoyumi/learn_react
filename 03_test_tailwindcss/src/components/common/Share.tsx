import { ReactComponent as Facebook } from '@icons/systems/sns/facebook.svg';
import { ReactComponent as Line } from '@icons/systems/sns/line.svg';
import { ReactComponent as Link } from '@icons/systems/sns/link.svg';
import { ReactComponent as Linkedin } from '@icons/systems/sns/linkedin.svg';
import { ReactComponent as Twitter } from '@icons/systems/sns/x.svg';
import { getClsByDevice } from '@src/utils';
import clsx from 'clsx';
import { type MouseEventHandler } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { FacebookShareButton, LineShareButton, TwitterShareButton } from 'react-share';

import IconButton from '../Buttons/IconButton';

function Share({ className, link }: Props) {
  const location = useLocation();
  const currentUrl = link ?? `https://recruit.nhn-japan.com/${location.pathname}`;

  const copyToClipboardFallback = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus({ preventScroll: true });
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (!successful) {
        throw new Error();
      }

      notify();
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const copyTextToClipboard = async () => {
    if (!navigator.clipboard) {
      return copyToClipboardFallback(currentUrl);
    }

    try {
      await navigator.clipboard.writeText(currentUrl);
      notify();
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
    }
  };

  const notify = () =>
    toast('リンクがコピーされました！', {
      style: {
        background: 'rgba(33, 33, 38,0.8)',
        boxShadow: 'none',
        color: 'white',
        fontFamily: 'Pretendard',
      },
    });

  const preventDefault = (fn?: () => void) => {
    const handler: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.stopPropagation();

      fn ? fn() : null;
    };

    return handler;
  };

  return (
    <div
      role='presentation'
      className={getClsByDevice({
        common: clsx('z-100 flex bg-gs-white', className),
        desktop: 'gap-16 rounded-8 px-20 py-16 shadow-share-box',
        mobile: 'mx-auto flex-wrap items-center justify-center gap-x-32 gap-y-16',
      })}
      onClick={(e) => e.stopPropagation()}
    >
      <IconButton
        variant='light'
        size='default'
        Icon={<Linkedin />}
        onClick={preventDefault(() => {
          openWindowPopup(`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`);
        })}
      />
      <IconButton
        variant='light'
        size='default'
        Icon={
          <FacebookShareButton url={currentUrl} onClick={preventDefault()}>
            <Facebook />
          </FacebookShareButton>
        }
      />
      <IconButton
        variant='light'
        size='default'
        Icon={
          <LineShareButton url={currentUrl} onClick={preventDefault()}>
            <Line />
          </LineShareButton>
        }
      />

      <IconButton
        variant='light'
        size='default'
        Icon={
          <TwitterShareButton onClick={preventDefault()} url={currentUrl}>
            <Twitter />
          </TwitterShareButton>
        }
      />
      <IconButton variant='light' size='default' Icon={<Link />} onClick={preventDefault(copyTextToClipboard)} />
    </div>
  );
}

export default Share;

type Props = {
  className?: string;
  link?: string;
  title?: string;
  description?: string;
};

const openWindowPopup = (url: string, features?: string) => {
  return window.open(
    url,
    url,
    features ?? 'popup=yes, top=50%, left=50%, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=yes'
  );
};
