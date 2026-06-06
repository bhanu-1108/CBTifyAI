import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Calendar, 
  Plus, 
  Download, 
  Mail, 
  User, 
  CheckCircle2, 
  ShieldAlert,
  FileSpreadsheet,
  Clock
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const OrgPortal = () => {
  const { students, schedules, addStudent, scheduleExam } = useApp();

  // Student form states
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [studentSuccess, setStudentSuccess] = useState('');

  // Schedule form states
  const [examTitle, setExamTitle] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('');
  const [examDuration, setExamDuration] = useState('30 mins');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState('');

  const handleAddStudent = (e) => {
    e.preventDefault();
    setStudentSuccess('');
    if (!studentName || !studentEmail) return;

    addStudent(studentName, studentEmail);
    setStudentName('');
    setStudentEmail('');
    setStudentSuccess('Student added successfully!');
    setTimeout(() => {
      setStudentSuccess('');
      setShowStudentForm(false);
    }, 1500);
  };

  const handleScheduleExam = (e) => {
    e.preventDefault();
    setScheduleSuccess('');
    if (!examTitle || !examDate || !examTime) return;

    scheduleExam(examTitle, examDate, examTime, examDuration, 45);
    setExamTitle('');
    setExamDate('');
    setExamTime('');
    setScheduleSuccess('Exam scheduled successfully!');
    setTimeout(() => {
      setScheduleSuccess('');
      setShowScheduleForm(false);
    }, 1500);
  };

  // Trigger Client-side CSV export
  const exportCSV = () => {
    const headers = 'Student Name,Email,Tests Completed,Average Accuracy %,Last Active\r\n';
    const rows = students.map(s => 
      `"${s.name}","${s.email}",${s.testsTaken},${s.avgAccuracy},"${s.lastActive}"`
    ).join('\r\n');
    
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + rows);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', 'cbtify_student_roster.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header welcome banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Organization Console</h1>
          <p className="text-xs text-mutedGray mt-1">
            Manage student registrations, launch secure tests, track accuracy percentiles and export rosters.
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-white transition-all self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-cyanAccent" />
          <span>Export Student Roster</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Student Roster table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-accentBlue" />
              <span>Enrolled Student Roster</span>
            </h2>
            <button
              onClick={() => setShowStudentForm(true)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-accentBlue/10 border border-accentBlue/30 text-accentBlue text-xs font-semibold hover:bg-accentBlue/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          </div>

          {/* Student Add form modal */}
          {showStudentForm && (
            <GlassCard glowColor="blue" className="p-5 animate-slideIn">
              <form onSubmit={handleAddStudent} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-slate-300">Student Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-mutedGray" />
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accentBlue focus:border-accentBlue"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-mutedGray" />
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="jane@iiitd.ac.in"
                      className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accentBlue focus:border-accentBlue"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-lg bg-accentBlue text-white text-xs font-semibold hover:bg-accentBlue/80 transition-colors"
                  >
                    Save Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowStudentForm(false)}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              {studentSuccess && (
                <div className="mt-3 text-xs text-green-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> {studentSuccess}
                </div>
              )}
            </GlassCard>
          )}

          {/* Student roster Table grid */}
          <GlassCard glowColor="purple" className="p-0 overflow-hidden border border-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.02] text-mutedGray uppercase tracking-wider text-[10px] border-b border-white/5">
                  <tr>
                    <th className="py-4 px-5 font-semibold">Student Name</th>
                    <th className="py-4 px-5 font-semibold">Email</th>
                    <th className="py-4 px-5 font-semibold text-center">Tests Taken</th>
                    <th className="py-4 px-5 font-semibold text-center">Avg Accuracy</th>
                    <th className="py-4 px-5 font-semibold">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-white/[0.01]">
                      <td className="py-4 px-5 font-semibold text-white">{student.name}</td>
                      <td className="py-4 px-5 text-mutedGray font-mono">{student.email}</td>
                      <td className="py-4 px-5 text-center font-bold text-slate-300">{student.testsTaken}</td>
                      <td className="py-4 px-5 text-center">
                        <span className={`font-bold ${student.avgAccuracy >= 80 ? 'text-green-400' : student.avgAccuracy >= 60 ? 'text-yellow-500' : 'text-slate-400'}`}>
                          {student.avgAccuracy > 0 ? `${student.avgAccuracy}%` : 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-mutedGray font-mono">{student.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* Right 1 Column: Schedule exams panel */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyanAccent" />
              <span>Exam Schedule</span>
            </h2>
            <button
              onClick={() => setShowScheduleForm(true)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-cyanAccent/10 border border-cyanAccent/30 text-cyanAccent text-xs font-semibold hover:bg-cyanAccent/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Exam</span>
            </button>
          </div>

          {/* Schedule Form */}
          {showScheduleForm && (
            <GlassCard glowColor="cyan" className="p-5 animate-slideIn space-y-4">
              <form onSubmit={handleScheduleExam} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-slate-300">Exam Title</label>
                  <input
                    type="text"
                    required
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    placeholder="E.g. Chemistry Unit 3 Mid-Term"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyanAccent focus:border-cyanAccent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-slate-300">Scheduled Date</label>
                    <input
                      type="date"
                      required
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyanAccent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-slate-300">Start Time</label>
                    <input
                      type="text"
                      required
                      value={examTime}
                      onChange={(e) => setExamTime(e.target.value)}
                      placeholder="10:00 AM"
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyanAccent"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-lg bg-cyanAccent text-white text-xs font-semibold hover:bg-cyanAccent/80 transition-colors"
                  >
                    Confirm Schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowScheduleForm(false)}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              {scheduleSuccess && (
                <div className="text-xs text-green-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> {scheduleSuccess}
                </div>
              )}
            </GlassCard>
          )}

          {/* List of active schedules */}
          <div className="space-y-4">
            {schedules.map((sched) => (
              <GlassCard key={sched.id} glowColor="cyan" className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-white leading-tight">{sched.title}</h4>
                  <span className="text-[9px] bg-red-500/25 border border-red-500/30 text-red-400 px-1.5 py-0.5 rounded font-mono">Exam Lock</span>
                </div>
                <div className="text-[10px] text-mutedGray space-y-1 font-mono">
                  <div>Date: {sched.date}</div>
                  <div>Time: {sched.time} ({sched.duration})</div>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-mutedGray font-medium">
                  <span>Enrolled: {sched.studentsCount} candidates</span>
                  <span className="text-accentBlue hover:underline cursor-pointer flex items-center gap-0.5"><Clock className="w-3.5 h-3.5" /> Scheduled</span>
                </div>
              </GlassCard>
            ))}

            {/* Security Notice */}
            <GlassCard glowColor="purple" className="p-4 bg-gradient-to-tr from-purpleGlow/5 to-transparent border-purpleGlow/25 flex items-start space-x-3">
              <ShieldAlert className="w-5 h-5 text-purpleGlow flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-white">Institutional Security Notice</h5>
                <p className="text-[10px] text-slate-300 leading-normal">
                  All generated exams are run inside a lock-down timer canvas that tracks browser focus loss. Focus loss triggers will be logged in the result sheets.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>

      </div>

    </div>
  );
};

export default OrgPortal;
