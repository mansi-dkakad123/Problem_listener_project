// src/components/GeoMap.tsx
import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { BarChart3, MapPin, TrendingDown, TrendingUp } from 'lucide-react';
import { mockDistricts } from '../../data/mockData';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const GeoMap: React.FC = () => {
  const getMarkerColor = (avgSentiment: number) => {
    if (avgSentiment > 0.2) return '#22c55e'; // green
    if (avgSentiment < -0.2) return '#ef4444'; // red
    return '#f59e0b'; // yellow
  };

  const getMarkerSize = (complaints: number) => {
    if (complaints > 200) return 20;
    if (complaints > 100) return 15;
    return 10;
  };

  const getSentimentLabel = (avgSentiment: number) => {
    if (avgSentiment > 0.2) return 'Positive';
    if (avgSentiment < -0.2) return 'Negative';
    return 'Neutral';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Geographic Analysis</h2>
        <p className="text-gray-600">Complaint distribution and sentiment across Indian districts</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-danger-500 rounded-full"></div>
            <span className="text-sm font-medium">High Complaint Areas</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {mockDistricts.filter(d => d.avgSentiment < -0.2).length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success-500 rounded-full"></div>
            <span className="text-sm font-medium">Satisfied Areas</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {mockDistricts.filter(d => d.avgSentiment > 0.2).length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium">Total Districts</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{mockDistricts.length}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium">Avg Complaints/District</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {Math.round(mockDistricts.reduce((acc, d) => acc + d.complaints, 0) / mockDistricts.length)}
          </p>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">District-wise Complaint Map</h3>
          <p className="text-sm text-gray-600">Circle size = complaint count, color = sentiment</p>
        </div>

        <div className="h-[500px]">
          <MapContainer center={[22.9734, 78.6569]} zoom={5.3} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            {mockDistricts.map((district) => (
              <CircleMarker
                key={district.name}
                center={district.coordinates}
                radius={getMarkerSize(district.complaints)}
                fillColor={getMarkerColor(district.avgSentiment)}
                color="white"
                weight={2}
                opacity={1}
                fillOpacity={0.7}
              >
                <Popup>
                  <div className="p-2">
                    <h4 className="font-semibold text-gray-900">{district.name}</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Total Complaints:</span>
                        <span className="font-medium">{district.complaints}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sentiment:</span>
                        <span className={`font-medium ${
                          district.avgSentiment > 0.2 ? 'text-success-600' :
                          district.avgSentiment < -0.2 ? 'text-danger-600' : 'text-warning-600'
                        }`}>
                          {getSentimentLabel(district.avgSentiment)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between flex-wrap">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Sentiment Legend</h4>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-success-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Positive</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-warning-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Neutral</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-danger-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Negative</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Size Legend</h4>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Low (&lt;100)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Medium (100-200)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-600">High (&gt;200)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingDown className="h-5 w-5 text-danger-500 mr-2" />
            Most Complained Districts
          </h3>
          <div className="space-y-3">
            {mockDistricts
              .sort((a, b) => b.complaints - a.complaints)
              .slice(0, 5)
              .map((district, index) => (
                <div key={district.name} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                    <span className="font-medium text-gray-900">{district.name}</span>
                  </div>
                  <span className="text-danger-600 font-bold">{district.complaints}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 text-success-500 mr-2" />
            Most Satisfied Districts
          </h3>
          <div className="space-y-3">
            {mockDistricts
              .sort((a, b) => b.avgSentiment - a.avgSentiment)
              .slice(0, 5)
              .map((district, index) => (
                <div key={district.name} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                    <span className="font-medium text-gray-900">{district.name}</span>
                  </div>
                  <span className="text-success-600 font-bold">
                    {getSentimentLabel(district.avgSentiment)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoMap;