import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import UnderDevelopment from './UnderDevelopment.jsx';
import Toast from './Toast.jsx';
import '../assets/styles/profile-portal.css';
import { updateProfile, getProfile } from '../api/auth.js';
import { reportError } from '../utils/errorHandler.js';
import profileImg from '../assets/images/mallam6.webp'
import {
  Trophy,
  GraduationCap,
  TrendingUp,
  Clock4,
  ClipboardList,
  Eye,
  EyeOff,
  Search,
  Filter,
  Settings, 
  UserPlus, 
  Users,
  User,
  ChevronLeft,
  BellRing,
  SearchX,
  Edit,
  Save,
  X,
} from 'lucide-react';

export default function ProfilePortal({
  isEditing = false,
}) {
  const fileInputRef = useRef(null);
  
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    class: '',
  });

  const [profilePicture, setProfilePicture] = useState(profileImg);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const [editableData, setEditableData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '15 August 2011',
    gender: 'Male',
    homeAddress: '15, Iyana Ajia Road, Ibadan.',
    guardianName: 'Mr. Abdurrazaq',
    contactNumber: '08132145677',
    whatsappNumber: '09014457562',
  });

  useEffect(() => {
    Promise.resolve().then(() => setIsEditingMode(isEditing));
  }, [isEditing]);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const response = await getProfile();
        const user = response.user;
        
        setUserData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          username: user.username || '',
          class: user.class || '',
        });
        
        if (user.profilePicture) {
          setProfilePicture(user.profilePicture);
        }
        
        setEditableData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          dateOfBirth: user.dateOfBirth || '',
          gender: user.gender || 'Male',
          homeAddress: user.homeAddress || '',
          guardianName: user.guardianName || '',
          contactNumber: user.contactNumber || '',
          whatsappNumber: user.whatsappNumber || '',
        });
      } catch (error) {
        const userMessage = reportError('Failed to fetch profile', error);
        setToast({ message: userMessage, type: 'error' });
        // Fallback to localStorage on error
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            setUserData({
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              username: user.username || '',
              class: user.class || '',
            });
            setEditableData(prev => ({
              ...prev,
              firstName: user.firstName || '',
              lastName: user.lastName || '',
            }));
          } catch (err) {
            const restoreMessage = reportError('Failed to restore cached profile', err);
            setToast({ message: restoreMessage, type: 'error' });
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);

  const formatName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const fullName = `${formatName(userData.firstName)} ${formatName(userData.lastName)}`.trim();

  const handleEdit = () => {
    setIsEditingMode(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        firstName: editableData.firstName,
        lastName: editableData.lastName,
        dateOfBirth: editableData.dateOfBirth,
        gender: editableData.gender,
        homeAddress: editableData.homeAddress,
        guardianName: editableData.guardianName,
        contactNumber: editableData.contactNumber,
        whatsappNumber: editableData.whatsappNumber,
        profilePicture: profilePicture,
      });

      setUserData(prev => ({
        ...prev,
        firstName: editableData.firstName,
        lastName: editableData.lastName,
      }));
      
      setIsEditingMode(false);
      setToast({ message: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      const userMessage = reportError('Failed to save profile', error);
      setToast({ message: userMessage, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditingMode(false);
    setEditableData(prev => ({
      ...prev,
      firstName: userData.firstName,
      lastName: userData.lastName,
    }));
  };

  const handleEditPictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        const validationMessage = reportError('File validation failed', 'Please select an image file');
        setToast({ message: validationMessage, type: 'warning' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        const sizeMessage = reportError('File validation failed', 'File size must be less than 5MB');
        setToast({ message: sizeMessage, type: 'warning' });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result;
        if (imageData) {
          setProfilePicture(imageData);
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset the input so the same file can be selected again
    event.target.value = '';
  };

  const handleInputChange = (field, value) => {
    setEditableData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const isEditingVisible = isEditingMode || isEditing;

  return (
    <section className="profile__container">
      <div className="profile__images">
        <div className="profile__picture">
          <img src={profilePicture} alt="student's passport" />
        </div>

        {isEditingVisible && (
          <div className="edit-picture" onClick={handleEditPictureClick}>
            <Settings size={16} />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        )}
      </div>

      <div className="profile__header-info">
        {isEditingVisible ? (
          <div className="profile__edit-header">
            <div className="profile__name-inputs">
              <input
                type="text"
                value={editableData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="First Name"
                className="profile__input"
              />
              <input
                type="text"
                value={editableData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Last Name"
                className="profile__input"
              />
            </div>
            <p>
              Username:
              <span> {userData.username}</span>
            </p>
          </div>
        ) : (
          <>
            <h4>{fullName || 'Loading...'}</h4>
            <p>
              Username:
              <span> {userData.username}</span>
            </p>
          </>
        )}
      </div>

      <div className="profile__main-info">
        <div className="profile__student-details">
          <h5>
            <span className="profile__details-icon"><User size={19}/></span>
            Personal Information
          </h5>

          <div className="profile__details">
            <div>
              <span className="profile__details-icon"><GraduationCap size={18}/></span>

              <div>
                <small>Class / Classes Managed</small>
                {isEditingVisible ? (
                  <input
                    type="text"
                    value={userData.class || ''}
                    disabled
                    className="profile__input"
                  />
                ) : (
                  <p>{userData.class || '-'}</p>
                )}
              </div>
            </div>
            <div>
              <span className="profile__details-icon"><Settings size={18}/></span>

              <div>
                <small>Date of Birth</small>
                {isEditingVisible ? (
                  <input
                    type="text"
                    value={editableData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="profile__input"
                  />
                ) : (
                  <p>{editableData.dateOfBirth}</p>
                )}
              </div>
            </div>

            <div>
              <span className="profile__details-icon"><User size={18}/></span>

              <div>
                <small>Gender</small>
                {isEditingVisible ? (
                  <select
                    value={editableData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="profile__input"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p>{editableData.gender}</p>
                )}
              </div>
            </div>

            <div>
              <span className="profile__details-icon"><Filter size={18}/></span>

              <div>
                <small>Home Address</small>
                {isEditingVisible ? (
                  <input
                    type="text"
                    value={editableData.homeAddress}
                    onChange={(e) => handleInputChange('homeAddress', e.target.value)}
                    className="profile__input"
                  />
                ) : (
                  <p>{editableData.homeAddress}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="profile__guardian-details">
          <h5>
            <span className="profile__details-icon"><User size={19}/></span>
            Guardian Details
          </h5>

          <div className="profile__details">
            <div>
              <span className="profile__details-icon"><User size={18}/></span>

              <div>
                <small>Guardian Name</small>
                {isEditingVisible ? (
                  <input
                    type="text"
                    value={editableData.guardianName}
                    onChange={(e) => handleInputChange('guardianName', e.target.value)}
                    className="profile__input"
                  />
                ) : (
                  <p>{editableData.guardianName}</p>
                )}
              </div>
            </div>

            <div>
              <span className="profile__details-icon"><BellRing size={18}/></span>

              <div>
                <small>Contact Number</small>
                {isEditingVisible ? (
                  <input
                    type="tel"
                    value={editableData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    className="profile__input"
                  />
                ) : (
                  <p>{editableData.contactNumber}</p>
                )}
              </div>
            </div>

            <div>
              <span className="profile__details-icon"><Clock4 size={18}/></span>

              <div>
                <small>Whatsapp Number</small>
                {isEditingVisible ? (
                  <input
                    type="tel"
                    value={editableData.whatsappNumber}
                    onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                    className="profile__input"
                  />
                ) : (
                  <p>{editableData.whatsappNumber}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile__actions">
        {isEditingVisible ? (
          <div className="profile__edit-actions">
            <button
              type="button"
              className="profile__btn-small profile__btn-save"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="profile__btn-small profile__btn-cancel"
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="profile__btn-small profile__btn-edit"
            onClick={handleEdit}
            disabled={isLoading}
          >
            <Edit size={16} />
            {isLoading ? 'Loading...' : 'Edit Profile'}
          </button>
        )}
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />
    </section>
  );
}

ProfilePortal.propTypes = {
  userProfile: PropTypes.shape({
    id: PropTypes.string,
    fullName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
  onSaveProfile: PropTypes.func,
  isEditing: PropTypes.bool,
};

ProfilePortal.defaultProps = {
  userProfile: null,
  onSaveProfile: () => {},
  isEditing: false,
};
