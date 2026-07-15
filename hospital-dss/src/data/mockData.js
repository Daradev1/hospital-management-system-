export const currentUser = {
  id: 'stf-0192',
  name: 'Dr. Adaeze Momoh',
  role: 'admin', // admin | doctor | nurse | records
  avatarInitials: 'AM',
  department: 'Internal Medicine',
}

export const kpis = {
  bedOccupancy: { value: 78, trend: [62, 65, 70, 68, 74, 76, 78], unit: '%' },
  patientsToday: { value: 214, trend: [180, 190, 175, 205, 198, 220, 214], unit: '' },
  avgWaitTime: { value: 34, trend: [42, 40, 38, 36, 35, 33, 34], unit: 'min' },
  pendingAlerts: { value: 6, trend: [2, 3, 5, 4, 6, 7, 6], unit: '' },
  revenueToday: { value: 4.82, trend: [3.9, 4.1, 4.4, 4.0, 4.6, 4.7, 4.82], unit: 'M' },
  criticalPatients: { value: 3, trend: [1, 2, 2, 3, 2, 4, 3], unit: '' },
}

export const departmentLoad = [
  { name: 'Emergency', patients: 42, capacity: 50 },
  { name: 'Internal Medicine', patients: 61, capacity: 70 },
  { name: 'Pediatrics', patients: 28, capacity: 40 },
  { name: 'Surgery', patients: 19, capacity: 25 },
  { name: 'Obstetrics', patients: 33, capacity: 35 },
  { name: 'Cardiology', patients: 24, capacity: 30 },
]

export const admissionsTrend = [
  { day: 'Mon', admissions: 32, discharges: 28 },
  { day: 'Tue', admissions: 41, discharges: 30 },
  { day: 'Wed', admissions: 38, discharges: 35 },
  { day: 'Thu', admissions: 45, discharges: 33 },
  { day: 'Fri', admissions: 52, discharges: 40 },
  { day: 'Sat', admissions: 36, discharges: 44 },
  { day: 'Sun', admissions: 29, discharges: 31 },
]

export const diagnosisFrequency = [
  { name: 'Malaria', count: 128 },
  { name: 'Hypertension', count: 96 },
  { name: 'Typhoid', count: 74 },
  { name: 'Respiratory Infection', count: 61 },
  { name: 'Diabetes Type II', count: 48 },
  { name: 'Peptic Ulcer', count: 35 },
]

export const patients = [
  { id: 'PT-10234', name: 'Chinedu Okafor', age: 45, gender: 'M', department: 'Cardiology', status: 'Admitted', condition: 'Stable', lastVisit: '2026-07-08', doctor: 'Dr. Momoh' },
  { id: 'PT-10235', name: 'Funmilayo Adeyemi', age: 32, gender: 'F', department: 'Obstetrics', status: 'Admitted', condition: 'Stable', lastVisit: '2026-07-09', doctor: 'Dr. Balogun' },
  { id: 'PT-10236', name: 'Ibrahim Musa', age: 61, gender: 'M', department: 'Emergency', status: 'Critical', condition: 'Critical', lastVisit: '2026-07-09', doctor: 'Dr. Eze' },
  { id: 'PT-10237', name: 'Ngozi Umeh', age: 8, gender: 'F', department: 'Pediatrics', status: 'Discharged', condition: 'Recovered', lastVisit: '2026-07-06', doctor: 'Dr. Fashola' },
  { id: 'PT-10238', name: 'Tunde Bakare', age: 54, gender: 'M', department: 'Internal Medicine', status: 'Outpatient', condition: 'Monitoring', lastVisit: '2026-07-07', doctor: 'Dr. Momoh' },
  { id: 'PT-10239', name: 'Aisha Bello', age: 29, gender: 'F', department: 'Surgery', status: 'Admitted', condition: 'Stable', lastVisit: '2026-07-09', doctor: 'Dr. Eze' },
  { id: 'PT-10240', name: 'Emeka Nwosu', age: 71, gender: 'M', department: 'Cardiology', status: 'Critical', condition: 'Critical', lastVisit: '2026-07-09', doctor: 'Dr. Momoh' },
  { id: 'PT-10241', name: 'Blessing Etim', age: 26, gender: 'F', department: 'Emergency', status: 'Outpatient', condition: 'Stable', lastVisit: '2026-07-08', doctor: 'Dr. Balogun' },
]

export const appointments = [
  { id: 'AP-5001', patient: 'Chinedu Okafor', doctor: 'Dr. Momoh', department: 'Cardiology', time: '09:00', date: '2026-07-09', status: 'Confirmed' },
  { id: 'AP-5002', patient: 'Aisha Bello', doctor: 'Dr. Eze', department: 'Surgery', time: '09:30', date: '2026-07-09', status: 'Confirmed' },
  { id: 'AP-5003', patient: 'Tunde Bakare', doctor: 'Dr. Momoh', department: 'Internal Medicine', time: '10:15', date: '2026-07-09', status: 'Pending' },
  { id: 'AP-5004', patient: 'Blessing Etim', doctor: 'Dr. Balogun', department: 'Emergency', time: '11:00', date: '2026-07-09', status: 'Confirmed' },
  { id: 'AP-5005', patient: 'Ngozi Umeh', doctor: 'Dr. Fashola', department: 'Pediatrics', time: '13:30', date: '2026-07-09', status: 'Cancelled' },
  { id: 'AP-5006', patient: 'Emeka Nwosu', doctor: 'Dr. Momoh', department: 'Cardiology', time: '14:00', date: '2026-07-09', status: 'Confirmed' },
]

export const alerts = [
  { id: 'AL-01', severity: 'critical', message: 'ICU bed capacity at 92% — Emergency dept.', time: '8 min ago' },
  { id: 'AL-02', severity: 'critical', message: 'Patient PT-10236 vitals unstable — Room 4B.', time: '15 min ago' },
  { id: 'AL-03', severity: 'warning', message: 'Blood bank O- reserves below threshold.', time: '42 min ago' },
  { id: 'AL-04', severity: 'warning', message: 'Radiology equipment maintenance due tomorrow.', time: '1 hr ago' },
  { id: 'AL-05', severity: 'info', message: 'Staffing gap predicted for night shift Friday.', time: '2 hr ago' },
  { id: 'AL-06', severity: 'critical', message: 'Medication stock: Insulin below reorder point.', time: '3 hr ago' },
]
