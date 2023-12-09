// import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import checkedIcon from '../assets/images/all-changes-saved.png';
import helpIcon from '../assets/images/help.png';
import profileIcon from '../assets/images/profile.png';
import { MenuIcon } from './icons';

interface Props {
  open?: boolean;
  toggle: () => void;
}

export function Header(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const location = useLocation();

  return (
    <header className="flex gap-x-10 items-center bg-black text-gray-300 p-2 flex-wrap relative">
      <div className="mr-auto flex gap-x-5 items-center basis-full sm:basis-auto">
        <Link to={'/'} className="font-bold">
          HyBatTwin
        </Link>
        {/* breadcrumbs */}
        {/* TODO replace battery IDs with descriptive names */}
        {location.pathname
          .split('/')
          .filter((subpath) => subpath)
          .map((subpath) => {
            const paths = location.pathname.split('/');
            const ind = paths.indexOf(subpath);
            const path = paths.slice(0, ind + 1).join('/');

            return (
              <>
                <span>&gt;</span>
                <Link to={path}>{subpath}</Link>
              </>
            );
          })}
      </div>

      <div className="flex gap-x-10 items-center justify-center mx-auto sm:mr-0">
        <div className="flex items-center text-sm text-[#5d8dd1]">
          <img src={checkedIcon} alt="" />
          <span className="hidden sm:inline-block">All Changes Saved</span>
        </div>
        <Link to={'/help'}>
          <img src={helpIcon} alt="help icon" />
        </Link>
        <Link to={'/profile'}>
          <img src={profileIcon} alt="profile icon" />
        </Link>
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
