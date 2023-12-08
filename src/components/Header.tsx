// import React from 'react';
import checkedIcon from '../assets/images/all-changes-saved.png';
import helpIcon from '../assets/images/help.png';
import profileIcon from '../assets/images/profile.png';
import MenuIcon from './icons/MenuIcon';

interface Props {
  open?: boolean;
  toggle: () => void;
}

export function Header(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return (
    <header className="flex gap-x-10 items-center bg-black text-gray-300 p-2 flex-wrap relative">
      <div className="mr-auto flex gap-x-5 items-center basis-full sm:basis-auto">
        <a href="/" className="font-bold">
          HyBatTwin
        </a>
        <span>&gt;</span>
        <a>Samplepack</a>
      </div>
      <div className="flex gap-x-10 items-center justify-center mx-auto sm:mr-0">
        <div className="flex items-center text-sm text-[#5d8dd1]">
          <img src={checkedIcon} alt="" />
          <span className="hidden sm:inline-block">All Changes Saved</span>
        </div>
        <a className="" href="#">
          <img src={helpIcon} alt="help icon" />
        </a>
        <a href="#">
          <img src={profileIcon} alt="profile icon" />
        </a>
      </div>
      <span
        className="sm:hidden absolute right-0 top-0 mr-2 mt-2"
        onClick={props.toggle}
      >
        <MenuIcon />
      </span>
    </header>
  );
}
