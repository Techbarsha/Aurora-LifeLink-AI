import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // If you're using React Router
import './ProfileDropdown.css'; // Create this CSS file

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  // Add props for user data if needed, e.g., userData: UserType;
}

interface UserType {
  name: string;
  email: string;
  donationCount: number;
  bloodType: string;
  // Add other relevant user data types
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // If using React Router
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Placeholder user data
  const userData: UserType = {
    name: 'John Doe',
    email: 'john@example.com',
    donationCount: 5,
    bloodType: 'O+',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <div className="user-info">
        <div className="avatar"></div> {/* You'll likely want to handle user avatars */}
        <div className="details">
          <div className="name">{userData.name}</div>
          <div className="email">{userData.email}</div>
        </div>
      </div>
      <ul className="profile-menu">
        <li onClick={() => navigate('/profile')}> {/* Use navigate if you have a profile route */}
          {/* Replace with your actual Profile icon */}
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"></path></svg> Profile
        </li>
        <li onClick={() => navigate('/donation-history')}> {/* Use navigate for donation history */}
          {/* Replace with your actual Donation History icon */}
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c-4.55 0-8.27 3.69-8.27 8.25 0 4.05 3.04 7.4 7.07 8.06v-2.28c-.83-.23-1.6-.64-2.27-1.2L9 15v-3c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v3l1.47 1.47c-.67.56-1.44.97-2.27 1.2v2.28c4.03-.66 7.07-4.01 7.07-8.06C20.27 6.69 16.55 3 12 3m0 2c3.45 0 6.27 2.77 6.27 6.25 0 3.47-2.82 6.25-6.27 6.25-3.45 0-6.27-2.78-6.27-6.25C5.73 7.77 8.55 5 12 5z"></path></svg> Donation History <span className="badge">{userData.donationCount}</span>
        </li>
        <li onClick={() => navigate('/appointments')}> {/* Use navigate for appointments */}
          {/* Replace with your actual Appointments icon */}
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3h-4V1h-2v2H9V1H7v2H3v18h18V3m-2 16H5V8h14v11m-3-5v-2h-2v2H9v-2H7v2H5v-4h14v4h-2v-2h-2v2h-2v-2h-2v2z"></path></svg> Appointments
        </li>
        <li className="blood-type">
          {/* Replace with your actual Blood Type icon */}
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-10 10c0 5.52 3.84 10.17 9 10.88v-7.72H7.72v-3.16H12v-4.56c4.42 0 8 3.58 8 8 0 1.58-.55 3.09-1.49 4.34l-1.45.97c-.3.2-.67.31-1.07.31-1.47 0-2.64-1.33-2.64-2.96 0-1.63 1.17-2.96 2.64-2.96.4 0 .77.11 1.07.31l1.45.97c.94 1.25 1.49 2.76 1.49 4.34 0 4.42-3.58 8-8 8a10 10 0 0 0 10-10c0-5.52-3.84-10.17-9-10.88v7.72h3.28v3.16H12v4.56c-4.42 0-8-3.58-8-8 0-1.58.55-3.09 1.49-4.34l1.45-.97c.3-.2.67-.31 1.07-.31 1.47 0 2.64 1.33 2.64 2.96 0 1.63-1.17 2.96-2.64 2.96-.4 0-.77-.11-1.07-.31L7.51 6.34C6.57 5.09 6 3.58 6 2a10 10 0 0 0-10 10c0 5.52 3.84 10.17 9 10.88v-7.72H7.72v-3.16H12v-4.56c4.42 0 8 3.58 8 8 0 1.58-.55 3.09-1.49 4.34l-1.45.97c-.3.2-.67.31 1.07.31-1.47 0-2.64-1.33-2.64-2.96 0-1.63 1.17-2.96 2.64-2.96.4 0 .77.11 1.07.31l1.45.97c.94 1.25 1.49 2.76 1.49 4.34 0 4.42-3.58 8-8 8a10 10 0 0 0 10-10c0-5.52-3.84-10.17-9-10.88v7.72h3.28v3.16H12v4.56c-4.42 0-8-3.58-8-8 0-1.58.55-3.09 1.49-4.34l1.45-.97c.3-.2.67-.31 1.07-.31 1.47 0 2.64 1.33 2.64 2.96 0 1.63-1.17 2.96-2.64 2.96-.4 0-.77-.11-1.07-.31L7.51 6.34C6.57 5.09 6 3.58 6 2a10 10 0 0 0-10 10c0 5.52 3.84 10.17 9 10.88v-7.72H7.72v-3.16H12v-4.56c4.42 0 8 3.58 8 8 0 1.58-.55 3.09-1.49 4.34l-1.45.97c-.3.2-.67.31 1.07.31-1.47 0-2.64-1.33-2.64-2.96 0-1.63 1.17-2.96 2.64-2.96.4 0 .77.11 1.07.31l1.45.97c.94 1.25 1.49 2.76 1.49 4.34 0 4.42-3.58 8-8 8a10 10 0 0 0 10-10c0-5.52-3.84-10.17-9-10.88v7.72h3.28v3.16H12v4.56c-4.42 0-8-3.58-8-8 0-1.58.55-3.09 1.49-4.34l1.45-.97c.3-.2.67-.31 1.07-.31 1.47 0 2.64 1.33 2.64 2.96 0 1.63-1.17 2.96-2.64 2.96-.4 0-.77-.11-1.07-.31L7.51 6.34C6.57 5.09 6 3.58 6 2z"></path></svg> Blood Type <span className="blood-group">{userData.bloodType}</span> {/* You might want a more interactive element here */}
        </li>
        <li onClick={() => navigate('/settings')}> {/* Use navigate for settings */}
          {/* Replace with your actual Settings icon */}
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.81c.19-.17.24-.43.12-.64l-2-3.46c-.12-.21-.34-.3-.55-.19l-1.81.41c-.59-.41-1.27-.67-1.98-.76L15 2h-2l-.27 1.62c-.71.09-1.39.35-1.98.76L9.79 4.07c-.21-.11-.43-.02-.55.19l-2 3.46c-.13.22-.07.47.12.64l2.11 1.81c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.81c-.19.17-.24.43-.12.64l2 3.46c.12.21.34.3.55.19l1.81-.41c.59.41 1.27.67 1.98.76L13 22h2l.27-1.62c.71-.09 1.39-.35 1.98-.76l1.81.41c.21.11.43.02.55-.19l2-3.46c.13-.22.07-.47-.12-.64l-2.11-1.81zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></svg> Settings
        </li>
        <li className="logout" onClick={() => navigate('/logout')}> {/* Handle your logout logic */}
          {/* Replace with your actual Log out icon */}
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M14.08 15.59L16.67 13H7v-2h9.67l-2.59-2.59L15.5 9.41L20.17 14L15.5 18.59L14.08 15.59M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m0 2H5v14h14V5z"></path></svg> Log out
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;