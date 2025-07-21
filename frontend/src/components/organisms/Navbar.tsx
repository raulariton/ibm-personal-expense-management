import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex flex-row items-center border-b border-border bg-card sticky top-0 z-50">
      {/* Space that matches sidebar width */}
      <div className="w-64 flex-shrink-0"></div>
      
      {/* Main content - Dashboard title with left padding */}
      <div className="flex flex-1 justify-between items-center py-6 px-3">
        <h1 className="font-semibold text-xl font-eudoxus-sans">Dashboard</h1>
        
        {/* Right side content can go here */}
        <div className="flex items-center space-x-4">
          {/* Navigation controls, user profile, etc. */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;