'use client';

import { MainMenu } from './main-menu';

interface HeaderProps {
  isBackVisible: boolean;
  onBack: any;
  onColumnToggle?: () => void;
  showColumnToggle?: boolean;
}

export function Header({ isBackVisible, onBack, onColumnToggle, showColumnToggle }: HeaderProps) {
  return (
    <nav className="flex items-center justify-between py-0 px-5 fixed top-0 left-0 right-0 z-10 bg-white h-[60px]">
      <div className="flex items-center">
        <MainMenu isBackVisible={isBackVisible} onBack={onBack} />
        {showColumnToggle && (
          <button 
            onClick={onColumnToggle}
            className="p-2 ml-2 hover:opacity-70 transition-opacity flex items-center justify-center size-12"
            aria-label="Toggle columns"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </button>
        )}
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <img 
          src="/logo.gif" 
          alt="415 Industries Logo" 
          className="size-10"
        />
      </div>

      <div className="flex items-center">
        {/* Cart removed as per user request to remove store functionality */}
      </div>
    </nav>
  );
}
