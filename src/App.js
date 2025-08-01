import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Calendar, User, Plus, MessageCircle, Search, Filter } from 'lucide-react';

const PawMates = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('discover');
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Sample data - in a real app this would come from a backend
  const sampleUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 28,
      location: "Downtown, 0.3 miles away",
      pets: [{ name: "Luna", type: "Golden Retriever", age: 3 }],
      bio: "Love long walks in the park! Luna is super friendly and loves meeting new doggy friends 🐕",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
      petPhoto: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      age: 32,
      location: "Westside, 0.8 miles away",
      pets: [{ name: "Charlie", type: "Border Collie", age: 2 }],
      bio: "Charlie needs lots of exercise! Looking for active pet parents for weekend adventures 🎾",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      petPhoto: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Emma Thompson",
      age: 25,
      location: "Riverside, 1.2 miles away",
      pets: [{ name: "Whiskers", type: "Maine Coon", age: 4 }],
      bio: "Cat parent looking for other feline friends! Whiskers loves supervised outdoor time 🐱",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      petPhoto: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop"
    },
    {
      id: 4,
      name: "David Park",
      age: 30,
      location: "Northside, 1.5 miles away",
      pets: [{ name: "Buddy", type: "French Bulldog", age: 1 }],
      bio: "New puppy parent! Buddy is still learning social skills and would love some patient friends 🐶",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      petPhoto: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate loading user data
    setUsers(sampleUsers);
    setCurrentUser({
      id: 0,
      name: "You",
      pets: [{ name: "Max", type: "Labrador Mix", age: 3 }]
    });
  }, []);

  const handleLike = (userId) => {
    setMatches(prev => [...prev, userId]);
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handlePass = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.pets.some(pet => pet.type.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || 
                         user.pets.some(pet => pet.type.toLowerCase().includes(filterType.toLowerCase()));
    return matchesSearch && matchesFilter;
  });

  const UserCard = ({ user }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm mx-auto">
      <div className="relative">
        <img 
          src={user.petPhoto} 
          alt={user.pets[0].name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
          <Heart className="w-5 h-5 text-red-500" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <div>
            <h3 className="font-bold text-lg">{user.name}, {user.age}</h3>
            <p className="text-gray-500 text-sm flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {user.location}
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="bg-purple-100 rounded-lg p-3 mb-3">
            <h4 className="font-semibold text-purple-800">{user.pets[0].name}</h4>
            <p className="text-purple-600 text-sm">{user.pets[0].type} • {user.pets[0].age} years old</p>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-6">{user.bio}</p>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => handlePass(user.id)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-medium transition-colors"
          >
            Pass
          </button>
          <button 
            onClick={() => handleLike(user.id)}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-105"
          >
            Like & Connect
          </button>
        </div>
      </div>
    </div>
  );

  const MatchCard = ({ user }) => (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
      <img 
        src={user.avatar} 
        alt={user.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <h4 className="font-semibold">{user.name}</h4>
        <p className="text-gray-500 text-sm">{user.pets[0].name} • {user.pets[0].type}</p>
        <p className="text-purple-600 text-xs">{user.location}</p>
      </div>
      <div className="flex space-x-2">
        <button className="bg-purple-100 hover:bg-purple-200 text-purple-600 p-2 rounded-lg transition-colors">
          <MessageCircle className="w-5 h-5" />
        </button>
        <button className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-lg transition-colors">
          <Calendar className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            PawMates
          </h1>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto pb-20">
        {activeTab === 'discover' && (
          <div className="p-4">
            {/* Search and Filter */}
            <div className="mb-6 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or pet type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Pet Types</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="retriever">Retrievers</option>
                <option value="collie">Collies</option>
              </select>
            </div>

            {/* User Cards */}
            {filteredUsers.length > 0 ? (
              <div className="space-y-6">
                {filteredUsers.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No more profiles nearby</h3>
                <p className="text-gray-500">Check back later for new pet friends!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Your Matches</h2>
            {matches.length > 0 ? (
              <div className="space-y-4">
                {matches.map(matchId => {
                  const matchedUser = sampleUsers.find(u => u.id === matchId);
                  return matchedUser ? <MatchCard key={matchId} user={matchedUser} /> : null;
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No matches yet</h3>
                <p className="text-gray-500">Start swiping to find your perfect pet playdate!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab('discover')}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'discover' 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Search className="w-6 h-6" />
              <span className="text-xs font-medium">Discover</span>
            </button>
            
            <button
              onClick={() => setActiveTab('matches')}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors relative ${
                activeTab === 'matches' 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs font-medium">Matches</span>
              {matches.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {matches.length}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PawMates;
