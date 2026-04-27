'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Activity {
  date: string;
  time: string;
  title: string;
}

interface Trip {
  id: number;
  departure: string;
  destination: string;
  startDate: string;
  endDate: string;
  activities: Activity[];
}

export default function TravelScheduler() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activity, setActivity] = useState('');
  const [activityTime, setActivityTime] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [currentTripId, setCurrentTripId] = useState<number | null>(null);


  // 페이지 로드 시 localStorage에서 데이터 복원
  useEffect(() => {
    const savedTrips = localStorage.getItem('travelTrips');
    const savedDurations = localStorage.getItem('travelDurations');
    if (savedTrips) {
      try {
        setTrips(JSON.parse(savedTrips));
      } catch (error) {
        console.error('Failed to load trips:', error);
      }
    }

  }, []);

  // trips가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('travelTrips', JSON.stringify(trips));
  }, [trips]);



  const addTrip = () => {
    if (departure && destination && startDate && endDate) {
      const newTrip: Trip = {
        id: Date.now(),
        departure,
        destination,
        startDate,
        endDate,
        activities: [],
      };
      setTrips([...trips, newTrip]);
      setDeparture('');
      setDestination('');
      setStartDate('');
      setEndDate('');
    }
  };



  const addActivity = (tripId: number) => {
    if (activity && activityTime && activityDate) {
      const newActivity: Activity = { date: activityDate, time: activityTime, title: activity };
      const updatedActivities = [...trips.find(t => t.id === tripId)!.activities, newActivity]
        .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
      setTrips(trips.map(trip =>
        trip.id === tripId
          ? { ...trip, activities: updatedActivities }
          : trip
      ));
      setActivity('');
      setActivityTime('');
      setActivityDate('');
      setCurrentTripId(null);
    }
  };

  const removeTrip = (id: number) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  const removeActivity = (tripId: number, activityDate: string, activityTime: string) => {
    setTrips(trips.map(trip =>
      trip.id === tripId
        ? { ...trip, activities: trip.activities.filter(a => !(a.date === activityDate && a.time === activityTime)) }
        : trip
    ));
  };

  const getDateRange = (startDate: string, endDate: string): string[] => {
    const dates: string[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Link href="/">
        <button className="mb-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
          ← Back to Home
        </button>
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-center">Travel Scheduler</h1>

      <div className="flex gap-8">
        {/* Add Trip Form */}
        <div className="w-1/3">
          <div className="bg-gray-800 p-6 rounded-lg sticky top-24">
            <h2 className="text-xl font-bold mb-4">Add New Trip</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Departure"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded mb-2"
                />
                <button
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors text-sm"
                >
                  지도에서 출발지 찾기
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded mb-2"
                />
                <button
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors text-sm"
                >
                  지도에서 목적지 찾기
                </button>
              </div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded"
              />
              <button
                onClick={addTrip}
                className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>

        {/* Trips List */}
        <div className="w-2/3 space-y-6">
          {trips.map((trip, index) => (
          <div key={trip.id} className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-blue-400 mb-3">#{index + 1}</h2>
                <h3 className="text-xl font-bold">{trip.departure} → {trip.destination}</h3>
                <p className="text-gray-400">{trip.startDate} to {trip.endDate}</p>
              </div>
              <button
                onClick={() => window.open(`https://www.google.com/maps/dir/${encodeURIComponent(trip.departure)}/${encodeURIComponent(trip.destination)}`, '_blank')}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors text-sm whitespace-nowrap ml-4"
              >
                경로 보기
              </button>
            </div>

            {/* Activities */}
            <div className="mb-4">
              <h4 className="font-bold mb-2">Activities:</h4>
              {trip.activities.length === 0 ? (
                <p className="text-gray-400 text-sm">No activities added yet</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(
                    trip.activities.reduce((acc, act) => {
                      if (!acc[act.date]) acc[act.date] = [];
                      acc[act.date].push(act);
                      return acc;
                    }, {} as {[key: string]: Activity[]})
                  ).map(([date, acts]) => (
                    <div key={date} className="bg-gray-700 p-3 rounded">
                      <p className="font-semibold text-blue-300 mb-2">{date}</p>
                      <ul className="list-disc list-inside space-y-1">
                        {acts.map((act) => (
                          <li key={`${act.date}-${act.time}`} className="flex justify-between items-center text-sm">
                            <span>{act.time} - {act.title}</span>
                            <button
                              onClick={() => removeActivity(trip.id, act.date, act.time)}
                              className="text-red-400 hover:text-red-300 ml-2"
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Activity */}
            {currentTripId === trip.id ? (
              <div className="space-y-2 mb-2">
                <select
                  value={activityDate}
                  onChange={(e) => setActivityDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded"
                >
                  <option value="">날짜 선택</option>
                  {getDateRange(trip.startDate, trip.endDate).map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
                <input
                  type="time"
                  value={activityTime}
                  onChange={(e) => setActivityTime(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded"
                />
                <input
                  type="text"
                  placeholder="Add activity"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => addActivity(trip.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setCurrentTripId(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setCurrentTripId(trip.id)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
              >
                Add Activity
              </button>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => removeTrip(trip.id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors text-sm"
              >
                Remove Trip
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}