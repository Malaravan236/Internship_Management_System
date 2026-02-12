// import React, { useState, useEffect } from "react";
// import { getAuth, signOut } from "firebase/auth";
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { app } from "../../firebase/firebaseConfig";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faEnvelope, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

// const Profile = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const auth = getAuth(app);
//         const currentUser = auth.currentUser;

//         if (!currentUser) {
//           navigate("/login");
//           return;
//         }

//         const db = getFirestore(app);
//         const userDoc = await getDoc(doc(db, "users", currentUser.uid));

//         if (userDoc.exists()) {
//           setUserData({
//             ...userDoc.data(),
//             email: currentUser.email
//           });
//         } else {
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   const handleLogout = async () => {
//     try {
//       const auth = getAuth(app);
//       await signOut(auth);
//       navigate("/login");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 flex items-center justify-center ">
//       <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-4">
//             <FontAwesomeIcon icon={faUser} className="text-teal-500 text-3xl" />
//           </div>
//           <h1 className="text-xl font-bold text-gray-800">{userData?.username || "User"}</h1>
//           <p className="text-gray-600">{userData?.email}</p>
//         </div>

//         <div className="space-y-4 mb-6">
//           <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//             <FontAwesomeIcon icon={faUser} className="text-teal-500 mr-3" />
//             <span>{userData?.username || "Username not set"}</span>
//           </div>
//           <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//             <FontAwesomeIcon icon={faEnvelope} className="text-teal-500 mr-3" />
//             <span>{userData?.email}</span>
//           </div>
//         </div>

//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center p-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"
//         >
//           <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;









// import React, { useState, useEffect } from "react";
// import { getAuth, signOut, User } from "firebase/auth";
// import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { app } from "../../firebase/firebaseConfig";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//   faUser, 
//   faEnvelope, 
//   faSignOutAlt, 
//   faTimes, 
//   faEdit,
//   faSave,
//   faTimesCircle
// } from "@fortawesome/free-solid-svg-icons";

// interface UserData {
//   username?: string;
//   email?: string;
//   [key: string]: any; // For additional user properties
// }

// interface EditData {
//   username: string;
//   // Add other editable fields here
// }

// interface Errors {
//   username?: string;
//   form?: string;
//   [key: string]: string | undefined;
// }

// interface ProfileProps {
//   onClose?: () => void;
// }

// const Profile: React.FC<ProfileProps> = ({ onClose }) => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const [editData, setEditData] = useState<EditData>({ username: '' });
//   const [errors, setErrors] = useState<Errors>({});
//   const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const auth = getAuth(app);
//         const currentUser: User | null = auth.currentUser;

//         if (!currentUser) {
//           navigate("/login");
//           return;
//         }

//         const db = getFirestore(app);
//         const userDoc = await getDoc(doc(db, "users", currentUser.uid));

//         if (userDoc.exists()) {
//           const data: UserData = {
//             ...userDoc.data(),
//             email: currentUser.email || ''
//           };
//           setUserData(data);
//           setEditData({
//             username: data.username || "",
//             // Add other editable fields here
//           });
//         } else {
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   const handleLogout = async () => {
//     try {
//       const auth = getAuth(app);
//       await signOut(auth);
//       navigate("/login");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//     setErrors({});
//     setUpdateSuccess(false);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setEditData({
//       username: userData?.username || "",
//       // Reset other fields
//     });
//     setErrors({});
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: undefined
//       }));
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Errors = {};
    
//     if (!editData.username || editData.username.trim() === "") {
//       newErrors.username = "Username is required";
//     } else if (editData.username.length < 3) {
//       newErrors.username = "Username must be at least 3 characters";
//     }
    
//     // Add validation for other fields
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = async () => {
//     if (!validateForm()) return;
    
//     try {
//       const auth = getAuth(app);
//       const currentUser = auth.currentUser;
      
//       if (!currentUser) {
//         navigate("/login");
//         return;
//       }

//       const db = getFirestore(app);
      
//       await updateDoc(doc(db, "users", currentUser.uid), {
//         username: editData.username
//         // Update other fields here
//       });
      
//       setUserData(prev => ({
//         ...prev,
//         username: editData.username
//         // Update other fields
//       }));
      
//       setIsEditing(false);
//       setUpdateSuccess(true);
//       setTimeout(() => setUpdateSuccess(false), 3000);
//     } catch (error) {
//       console.error("Error updating user data:", error);
//       setErrors({ form: "Failed to update profile. Please try again." });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 flex items-center justify-center relative">
//       <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative">
//         {/* Close button (only shown if onClose prop is provided) */}
//         {onClose && (
//           <button 
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             aria-label="Close profile"
//           >
//             <FontAwesomeIcon icon={faTimes} />
//           </button>
//         )}
        
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-4">
//             <FontAwesomeIcon icon={faUser} className="text-teal-500 text-3xl" />
//           </div>
//           {isEditing ? (
//             <div className="w-full mb-4">
//               <input
//                 type="text"
//                 name="username"
//                 value={editData.username}
//                 onChange={handleInputChange}
//                 className={`w-full p-2 border rounded ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
//                 placeholder="Username"
//               />
//               {errors.username && (
//                 <p className="text-red-500 text-sm mt-1">{errors.username}</p>
//               )}
//             </div>
//           ) : (
//             <>
//               <h1 className="text-xl font-bold text-gray-800">{userData?.username || "User"}</h1>
//               <p className="text-gray-600">{userData?.email}</p>
//             </>
//           )}
//         </div>

//         <div className="space-y-4 mb-6">
//           <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//             <FontAwesomeIcon icon={faUser} className="text-teal-500 mr-3" />
//             {isEditing ? (
//               <span className="text-gray-500">Editing username above</span>
//             ) : (
//               <span>{userData?.username || "Username not set"}</span>
//             )}
//           </div>
//           <div className="flex items-center p-3 bg-gray-50 rounded-lg">
//             <FontAwesomeIcon icon={faEnvelope} className="text-teal-500 mr-3" />
//             <span>{userData?.email}</span>
//           </div>
//         </div>

//         {updateSuccess && (
//           <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
//             Profile updated successfully!
//           </div>
//         )}

//         {errors.form && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//             {errors.form}
//           </div>
//         )}

//         <div className="flex space-x-3">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={handleSave}
//                 className="flex-1 flex items-center justify-center p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
//               >
//                 <FontAwesomeIcon icon={faSave} className="mr-2" />
//                 Save
//               </button>
//               <button
//                 onClick={handleCancelEdit}
//                 className="flex-1 flex items-center justify-center p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//               >
//                 <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={handleEdit}
//                 className="flex-1 flex items-center justify-center p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
//               >
//                 <FontAwesomeIcon icon={faEdit} className="mr-2" />
//                 Edit
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex-1 flex items-center justify-center p-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"
//               >
//                 <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;













import React, { useState, useEffect } from "react";
import { getAuth, signOut, User } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faEnvelope, 
  faSignOutAlt, 
  faTimes, 
  faEdit,
  faSave,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

interface UserData {
  username?: string;
  email?: string;
  [key: string]: any;
}

interface EditData {
  username: string;
}

interface Errors {
  username?: string;
  form?: string;
  [key: string]: string | undefined;
}

interface ProfileProps {
  onClose?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onClose }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState<EditData>({ username: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth(app);
        const currentUser: User | null = auth.currentUser;

        if (!currentUser) {
          navigate("/login");
          return;
        }

        const db = getFirestore(app);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));

        if (userDoc.exists()) {
          const data: UserData = {
            ...userDoc.data(),
            email: currentUser.email || ''
          };
          setUserData(data);
          setEditData({
            username: data.username || "",
          });
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear all local storage
      localStorage.clear();
      
      // Clear session storage
      sessionStorage.clear();
      
      // Redirect to login and replace history
      navigate("/login", { replace: true });
      
      // Optional: Force reload to ensure clean state
      window.location.reload();
      
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
    setUpdateSuccess(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      username: userData?.username || "",
    });
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    if (!editData.username || editData.username.trim() === "") {
      newErrors.username = "Username is required";
    } else if (editData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    try {
      const auth = getAuth(app);
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        navigate("/login");
        return;
      }

      const db = getFirestore(app);
      
      await updateDoc(doc(db, "users", currentUser.uid), {
        username: editData.username
      });
      
      setUserData(prev => ({
        ...prev,
        username: editData.username
      }));
      
      setIsEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating user data:", error);
      setErrors({ form: "Failed to update profile. Please try again." });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center relative">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close profile"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faUser} className="text-teal-500 text-3xl" />
          </div>
          {isEditing ? (
            <div className="w-full mb-4">
              <input
                type="text"
                name="username"
                value={editData.username}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-gray-800">{userData?.username || "User"}</h1>
              <p className="text-gray-600">{userData?.email}</p>
            </>
          )}
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <FontAwesomeIcon icon={faUser} className="text-teal-500 mr-3" />
            {isEditing ? (
              <span className="text-gray-500">Editing username above</span>
            ) : (
              <span>{userData?.username || "Username not set"}</span>
            )}
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <FontAwesomeIcon icon={faEnvelope} className="text-teal-500 mr-3" />
            <span>{userData?.email}</span>
          </div>
        </div>

        {updateSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Profile updated successfully!
          </div>
        )}

        {errors.form && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {errors.form}
          </div>
        )}

        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex-1 flex items-center justify-center p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="flex-1 flex items-center justify-center p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Edit
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center p-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;