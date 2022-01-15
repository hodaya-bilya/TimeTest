export interface Exam {
   daysToStudy: number;
   courseName: string;
   requiredDaysToStudy: number;
   testDurationHours: number;
   scheduledDate: Date;
   secondExam: boolean;
   preferredSecondDate: Date;
}
export interface ExamWrapper {
   exams: Exam[];
   reports: string[]
}