'use client';
// @ts-nocheck

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  Copy,
  Edit,
  Trash2,
  Archive,
  Eye,
  History,
  AlertCircle,
  Clock,
  ShieldCheck,
  Sparkles,
  Layers,
  X,
} from 'lucide-react';
import { OrganiserEvent, EventStatus, CauseCategory } from '../types';

interface EventManagementViewProps {
  events?: OrganiserEvent[];
  onSaveEvent?: (event: OrganiserEvent) => void;
  onCreateEvent?: (event: OrganiserEvent) => void;
  onUpdateEvent?: (eventId: string, patch: Partial<OrganiserEvent>) => void;
  onDuplicateEvent?: (event: OrganiserEvent) => void;
  onDeleteEvent?: (eventId: string) => void;
  onChangeEventStatus?: (eventId: string, status: EventStatus) => void;
}

export const EventManagementView: React.FC<EventManagementViewProps> = ({
  events = [],
  onSaveEvent,
  onCreateEvent,
  onUpdateEvent,
  onDuplicateEvent,
  onDeleteEvent,
  onChangeEventStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEventForHistory, setSelectedEventForHistory] = useState<OrganiserEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<OrganiserEvent | null>(null);

  const handleSave = (event: OrganiserEvent) => {
    if (onSaveEvent) {
      onSaveEvent(event);
    } else if (editingEvent && onUpdateEvent) {
      onUpdateEvent(event.id, event);
    } else if (onCreateEvent) {
      onCreateEvent(event);
    }
  };

  const handleDuplicate = (event: OrganiserEvent) => {
    if (onDuplicateEvent) {
      onDuplicateEvent(event);
    } else if (onCreateEvent) {
      onCreateEvent({
        ...event,
        id: `evt-${Date.now()}`,
        name: `${event.name} (Copy)`,
      });
    }
  };

  const handleChangeStatus = (eventId: string, status: EventStatus) => {
    if (onChangeEventStatus) {
      onChangeEventStatus(eventId, status);
    } else if (onUpdateEvent) {
      onUpdateEvent(eventId, { status });
    }
  };

  // Form states for Create/Edit
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState<CauseCategory>('Environment');
  const [formDate, setFormDate] = useState('2026-09-25');
  const [formStartTime, setFormStartTime] = useState('09:00');
  const [formEndTime, setFormEndTime] = useState('15:00');
  const [formVenue, setFormVenue] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formMaxVolunteers, setFormMaxVolunteers] = useState(100);
  const [formRequiredVolunteers, setFormRequiredVolunteers] = useState(80);
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800');
  const [formStatus, setFormStatus] = useState<EventStatus>('Open for Registration');
  const [formRegOpen, setFormRegOpen] = useState('2026-09-01');
  const [formRegClose, setFormRegClose] = useState('2026-09-23');
  const [formRequirements, setFormRequirements] = useState('Safety Training Level 1 required\nComfortable outdoor footwear');

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormName('');
    setFormDescription('');
    setFormCategory('Environment');
    setFormDate('2026-10-10');
    setFormStartTime('08:30');
    setFormEndTime('14:30');
    setFormVenue('Harbor Central Park');
    setFormAddress('100 Harbor Way, Bay District');
    setFormMaxVolunteers(80);
    setFormRequiredVolunteers(65);
    setFormImage('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800');
    setFormStatus('Open for Registration');
    setFormRegOpen('2026-09-10');
    setFormRegClose('2026-10-08');
    setFormRequirements('Attendance at 15-min morning briefing\nSunscreen and hat recommended');
    setIsModalOpen(true);
  };

  const openEditModal = (evt: OrganiserEvent) => {
    setEditingEvent(evt);
    setFormName(evt.name);
    setFormDescription(evt.description);
    setFormCategory(evt.category);
    setFormDate(evt.date);
    setFormStartTime(evt.startTime);
    setFormEndTime(evt.endTime);
    setFormVenue(evt.venue);
    setFormAddress(evt.address);
    setFormMaxVolunteers(evt.maxVolunteers);
    setFormRequiredVolunteers(evt.requiredVolunteers);
    setFormImage(evt.image);
    setFormStatus(evt.status);
    setFormRegOpen(evt.registrationOpenDate);
    setFormRegClose(evt.registrationCloseDate);
    setFormRequirements(evt.requirements.join('\n'));
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: OrganiserEvent = {
      id: editingEvent ? editingEvent.id : `evt-${Date.now()}`,
      name: formName,
      description: formDescription,
      category: formCategory,
      date: formDate,
      startTime: formStartTime,
      endTime: formEndTime,
      venue: formVenue,
      address: formAddress,
      maxVolunteers: Number(formMaxVolunteers),
      requiredVolunteers: Number(formRequiredVolunteers),
      registeredCount: editingEvent ? editingEvent.registeredCount : 0,
      confirmedCount: editingEvent ? editingEvent.confirmedCount : 0,
      image: formImage,
      organiserName: 'Elena Rostova',
      registrationOpenDate: formRegOpen,
      registrationCloseDate: formRegClose,
      status: formStatus,
      requirements: formRequirements.split('\n').filter((r) => r.trim().length > 0),
      assignedLeaders: editingEvent ? editingEvent.assignedLeaders : ['Sophia Chen'],
      teams: editingEvent ? editingEvent.teams : ['Registration Team', 'Logistics Team'],
      activityHistory: editingEvent
        ? [
            ...editingEvent.activityHistory,
            {
              id: `act-${Date.now()}`,
              timestamp: 'Just now',
              action: `Event updated by Elena Rostova`,
              user: 'Elena Rostova',
            },
          ]
        : [
            {
              id: `act-${Date.now()}`,
              timestamp: 'Just now',
              action: `Event created by Elena Rostova`,
              user: 'Elena Rostova',
            },
          ],
    };

    handleSave(newEvent);
    setIsModalOpen(false);
  };

  // Filter events
  const filteredEvents = (events || []).filter((evt) => {
    const matchesSearch =
      (evt.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.venue || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || evt.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const allStatuses: EventStatus[] = [
    'Draft',
    'Open for Registration',
    'Registration Closed',
    'Upcoming',
    'In Progress',
    'Completed',
    'Cancelled',
    'Archived',
  ];

  const getStatusBadgeClass = (status: EventStatus) => {
    switch (status) {
      case 'Open for Registration':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse';
      case 'Upcoming':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Draft':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Registration Closed':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Completed':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Archived':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div id="event-management-view" className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Event Management Module</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {events.length} Total Events
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Create and orchestrate the complete volunteer event lifecycle, define volunteer requirements, configure capacities, appoint leaders, and manage status transitions.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events by name, venue, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
          >
            <option value="All">All Statuses ({events.length})</option>
            {allStatuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
          >
            <option value="All">All Causes</option>
            <option value="Environment">Environment</option>
            <option value="Food Security">Food Security</option>
            <option value="Education">Education</option>
            <option value="Community Aid">Community Aid</option>
            <option value="Disaster Relief">Disaster Relief</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const fulfillmentPct = Math.round((event.confirmedCount / (event.requiredVolunteers || 1)) * 100);

          return (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Event Image Banner with Status Badge */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-xs ${getStatusBadgeClass(
                      event.status
                    )}`}
                  >
                    {event.status}
                  </span>
                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded-lg">
                    {event.category}
                  </span>
                </div>

                {/* Event Details */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-base text-slate-900 line-clamp-1">{event.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{event.description}</p>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{event.date} • {event.startTime} - {event.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>

                  {/* Staffing Capacity Bar */}
                  <div className="pt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600">Volunteer Staffing</span>
                      <span className="font-bold text-slate-900">
                        {event.confirmedCount} / {event.requiredVolunteers} needed
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          fulfillmentPct >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min(100, fulfillmentPct)}%` }}
                      />
                    </div>
                  </div>

                  {/* Assigned Leaders & Teams */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                    <span>Leaders: <strong>{event.assignedLeaders.join(', ') || 'Unassigned'}</strong></span>
                    <span>{event.teams.length} Teams</span>
                  </div>
                </div>
              </div>

              {/* Event Actions Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(event)}
                    title="Edit Event"
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDuplicate(event)}
                    title="Duplicate Event"
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedEventForHistory(event)}
                    title="View Activity History"
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Status Switcher Quick Select */}
                <select
                  value={event.status}
                  onChange={(e) => handleChangeStatus(event.id, e.target.value as EventStatus)}
                  className="text-[11px] font-bold bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-800"
                >
                  {allStatuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Activity History Drawer/Modal */}
      {selectedEventForHistory && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Event Activity History</h3>
              </div>
              <button
                onClick={() => setSelectedEventForHistory(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 font-semibold">{selectedEventForHistory.name}</p>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {selectedEventForHistory.activityHistory.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{item.action}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{item.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Initiated by {item.user}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedEventForHistory(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition-all"
            >
              Close History Log
            </button>
          </div>
        </div>
      )}

      {/* Create / Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-lg text-slate-900">
                  {editingEvent ? 'Edit Volunteer Event' : 'Create Complete Volunteer Event'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Event Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Coastal Wetland Restoration & Bird Habitat"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Event Description</label>
                  <textarea
                    rows={3}
                    required
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Describe mission objectives, activities, and community impact..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CauseCategory)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="Environment">Environment</option>
                    <option value="Food Security">Food Security</option>
                    <option value="Education">Education</option>
                    <option value="Community Aid">Community Aid</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as EventStatus)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    {allStatuses.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Date</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={formStartTime}
                      onChange={(e) => setFormStartTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">End Time</label>
                    <input
                      type="time"
                      value={formEndTime}
                      onChange={(e) => setFormEndTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Venue / Facility</label>
                  <input
                    type="text"
                    required
                    value={formVenue}
                    onChange={(e) => setFormVenue(e.target.value)}
                    placeholder="e.g. Pacific Cove Sanctuary"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Address / GPS Details</label>
                  <input
                    type="text"
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="e.g. 1400 Ocean Parkway"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Required Volunteers</label>
                  <input
                    type="number"
                    value={formRequiredVolunteers}
                    onChange={(e) => setFormRequiredVolunteers(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Maximum Capacity</label>
                  <input
                    type="number"
                    value={formMaxVolunteers}
                    onChange={(e) => setFormMaxVolunteers(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Registration Opening Date</label>
                  <input
                    type="date"
                    value={formRegOpen}
                    onChange={(e) => setFormRegOpen(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Registration Closing Date</label>
                  <input
                    type="date"
                    value={formRegClose}
                    onChange={(e) => setFormRegClose(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Event Banner Image URL</label>
                  <input
                    type="url"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Volunteer Requirements (One per line)
                  </label>
                  <textarea
                    rows={2}
                    value={formRequirements}
                    onChange={(e) => setFormRequirements(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  {editingEvent ? 'Update Event' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
