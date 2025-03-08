import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaEdit } from "react-icons/fa";

interface TokenPayload {
  username: string;
}

interface UserProfile {
  avatar_url: string;
  bio: string;
  birth_date: string;
  followers: Follower[];
  following: Follower[];
}

interface Follower {
  id: number;
  username: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>({
    avatar_url: "",
    bio: "",
    birth_date: "",
    followers: [],
    following: [],
  });
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<TokenPayload>(token);
      setUsername(decodedToken.username);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://twitter-clone-sn7k.onrender.com/api/users/profile/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data);
    };
    fetchProfile();
  }, [`https://twitter-clone-sn7k.onrender.com/`]);

  useEffect(() => {
    setBackgroundImageUrl(
      `https://picsum.photos/800/200?random=${Math.random()}`
    );
  }, []);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
    await axios.put(
      `https://twitter-clone-sn7k.onrender.com/api/users/profile/update/`,
      { bio: newBio, birth_date: newBirthDate },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setProfile({ ...profile, bio: newBio, birth_date: newBirthDate });
    setUpdate(false);
  };

  return (
    <div className="p-8">
      <div className="relative">
        <img
          src={backgroundImageUrl}
          alt="Background"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-48 bg-black bg-opacity-50 flex items-center justify-center">
          <img
            src={`https://robohash.org/${username}.png`}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </div>
      </div>
      <div className="text-center mt-16">
        {!update ? (
          <div className="relative">
            <FaEdit
              className="absolute top-0 right-0 text-2xl text-gray-600 cursor-pointer"
              onClick={() => setUpdate(true)}
            />
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              {username}
            </h1>
            <h2 className="text-lg font-bold text-gray-600">{profile.bio}</h2>
            <p className="text-gray-600">Birth Date: {profile.birth_date}</p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold">Update Profile:</h3>
            <div className="mt-4">
              <input
                type="text"
                placeholder="New Bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="p-2 border border-gray-300 rounded-md mr-4"
              />
              <input
                type="date"
                placeholder="New Birth Date"
                value={newBirthDate}
                onChange={(e) => setNewBirthDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-md mr-4"
              />
              <button
                onClick={handleUpdateProfile}
                className="py-2 px-4 bg-blue-600 text-white rounded-full ml-8 hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
