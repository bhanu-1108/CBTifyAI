import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Pre-seeded AI Test Questions
const physicsQuestions = [
  {
    questionText: 'Which law of thermodynamics states that entropy of an isolated system always increases over time?',
    options: ['Zeroth Law', 'First Law', 'Second Law', 'Third Law'],
    correctAnswer: 2,
    explanation: 'The Second Law of Thermodynamics states that natural processes are irreversible, and the entropy of an isolated system always increases.'
  },
  {
    questionText: 'What is the speed of light in a vacuum (approximately)?',
    options: ['3 x 10^8 m/s', '3 x 10^6 m/s', '1.5 x 10^8 m/s', '2.9 x 10^5 m/s'],
    correctAnswer: 0,
    explanation: 'The speed of light in a vacuum is approximately 3 * 10^8 meters per second.'
  },
  {
    questionText: 'What physical quantity is measured in Henries?',
    options: ['Capacitance', 'Resistance', 'Inductance', 'Magnetic Flux'],
    correctAnswer: 2,
    explanation: 'Inductance is measured in Henries, named after Joseph Henry who discovered electromagnetic induction independently.'
  },
  {
    questionText: 'Who formulated the wave equation of quantum mechanics?',
    options: ['Max Planck', 'Albert Einstein', 'Erwin Schrödinger', 'Werner Heisenberg'],
    correctAnswer: 2,
    explanation: 'Erwin Schrödinger formulated the wave equation in 1925, describing the behaviors of quantum particles.'
  },
  {
    questionText: 'What is the work done by a centripetal force acting on an object in circular motion?',
    options: ['Positive', 'Zero', 'Negative', 'Infinite'],
    correctAnswer: 1,
    explanation: 'Because the centripetal force acts perpendicular to the instantaneous velocity, the angle is 90 degrees. cos(90) = 0, so work done is zero.'
  }
];

const ethicsQuestions = [
  {
    questionText: 'What is the primary objective of reinforcement learning from human feedback (RLHF) in large language models?',
    options: [
      'To optimize gradient descent speeds on small datasets',
      'To align model outputs with human preferences regarding helpfulness, accuracy, and safety',
      'To automatically write documentation for neural networks',
      'To replace traditional feedforward architectures'
    ],
    correctAnswer: 1,
    explanation: 'RLHF uses human feedback to train a reward model, which then tunes the main language model using reinforcement learning to achieve better alignment.'
  },
  {
    questionText: 'Which ethical risk focuses on the potential of AI tools to generate highly realistic, misleading audio or visual media?',
    options: [
      'Algorithmic bias',
      'Explainable AI deficiency',
      'Deepfake generation & disinformation propagation',
      'Data scraping copyright violations'
    ],
    correctAnswer: 2,
    explanation: 'Deepfakes use generative models to create highly convincing false media, presenting a threat to trust and safety.'
  },
  {
    questionText: 'In AI alignment, what does the term "inner alignment" refer to?',
    options: [
      'Ensuring the neural network weights are loaded correctly in memory',
      'Ensuring the reward model correctly translates human ratings',
      'Ensuring that the agent actually optimizes its specified objective in all environments',
      'Ensuring the model learns the correct policy that aligns with the developer\'s true intent, rather than a proxy objective'
    ],
    correctAnswer: 3,
    explanation: 'Inner alignment refers to ensuring the optimizer (the model during training) behaves in accordance with the base objective set by designers.'
  },
  {
    questionText: 'What does the concept of "explainability" (XAI) represent in medical diagnosis AI systems?',
    options: [
      'The speed at which the model makes diagnosis recommendations',
      'The ability of the system to provide clear, interpretable reasons for its output that clinical professionals can audit',
      'The number of layers inside the diagnostic model architecture',
      'The database size of patient records used for training'
    ],
    correctAnswer: 1,
    explanation: 'XAI guarantees that critical systems do not operate as pure black boxes, allowing clinicians to review the specific features leading to a decision.'
  },
  {
    questionText: 'Which global regulatory framework has categorized AI systems by risk tiers (e.g. Unacceptable, High, Limited, Minimal)?',
    options: [
      'The EU AI Act',
      'The US Executive Order on AI',
      'The ISO/IEC 42001 Standard',
      'The UNESCO Recommendations on AI'
    ],
    correctAnswer: 0,
    explanation: 'The European Union\'s AI Act introduces a risk-based approach, banning unacceptable risk systems and heavily regulating high-risk systems.'
  }
];

const generalQuestions = [
  {
    questionText: 'What is the primary execution runtime environment for JavaScript on the server side?',
    options: ['Deno', 'V8', 'Node.js', 'Bun'],
    correctAnswer: 2,
    explanation: 'Node.js is the original and most widely used JavaScript runtime built on Chrome\'s V8 engine.'
  },
  {
    questionText: 'Which CSS property is used to create a backdrop blur filter for glassmorphic elements?',
    options: ['blur-radius', 'backdrop-filter', 'background-blur', 'filter: blur()'],
    correctAnswer: 1,
    explanation: 'The backdrop-filter CSS property lets you apply graphical effects such as blurring or color shifting to the area behind an element.'
  },
  {
    questionText: 'In Git, which command is used to download commits, files, and refs from a remote repository into your local branch directly?',
    options: ['git fetch', 'git pull', 'git clone', 'git merge'],
    correctAnswer: 1,
    explanation: 'git pull combines git fetch (downloading changes) and git merge (integrating them into your current branch).'
  },
  {
    questionText: 'What does SaaS stand for in software industry terms?',
    options: ['Software as a System', 'Security as a Service', 'System and Application Service', 'Software as a Service'],
    correctAnswer: 3,
    explanation: 'SaaS stands for Software as a Service, a model where applications are hosted centrally and licensed on a subscription basis.'
  }
];

export const AppProvider = ({ children }) => {
  // 1. Registered Users database (seeded with demo accounts)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('cbtify_registered_users');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'student-1',
        username: 'John Doe',
        email: 'student@cbtify.ai',
        password: 'password',
        role: 'student',
        organizationName: ''
      },
      {
        id: 'org-1',
        username: 'Admin Admin',
        email: 'school@cbtify.ai',
        password: 'password',
        role: 'organization',
        organizationName: 'IIIT Delhi Institute'
      }
    ];
  });

  // 2. Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('cbtify_user');
    return saved ? JSON.parse(saved) : {
      id: 'student-1',
      username: 'John Doe',
      email: 'student@cbtify.ai',
      role: 'student',
      organizationName: ''
    };
  });

  // 3. Tests List State
  const [tests, setTests] = useState(() => {
    const saved = localStorage.getItem('cbtify_tests');
    if (saved) return JSON.parse(saved);
    
    return [
      {
        id: 'test-physics',
        title: 'Introduction to Physics: Classical Mechanics',
        description: 'Covers Newton\'s Laws, friction, rotational kinetic energy, and linear momentum.',
        timeLimit: 10,
        questions: physicsQuestions.slice(0, 3),
        createdBy: 'system',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'test-ethics',
        title: 'AI Ethics and Governance Quiz',
        description: 'A standardized assessment testing core principles of safe alignment, generative risk, and governance structures.',
        timeLimit: 15,
        questions: ethicsQuestions,
        createdBy: 'system',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'test-general',
        title: 'General Aptitude: Web Development Basics',
        description: 'Assesses standard knowledge in modern front-end styling, server runtimes, and version control structures.',
        timeLimit: 8,
        questions: generalQuestions,
        createdBy: 'system',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  });

  // 4. Submissions / Attempts History State
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('cbtify_submissions');
    if (saved) return JSON.parse(saved);
    
    // Default attempts for John Doe (student-1)
    return [
      {
        id: 'sub-1',
        testId: 'test-ethics',
        testTitle: 'AI Ethics and Governance Quiz',
        userId: 'student-1',
        username: 'John Doe',
        score: 3,
        totalQuestions: 5,
        accuracy: 60,
        timeSpent: 280,
        answers: [1, 2, 0, 1, 1], // Wrong on Q3 and Q5 (indices 2 and 4)
        questionStatus: ['correct', 'correct', 'wrong', 'correct', 'wrong'],
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'sub-2',
        testId: 'test-physics',
        testTitle: 'Introduction to Physics: Classical Mechanics',
        userId: 'student-1',
        username: 'John Doe',
        score: 2,
        totalQuestions: 3,
        accuracy: 67,
        timeSpent: 190,
        answers: [1, 2, 1], // Wrong on Q3
        questionStatus: ['correct', 'correct', 'wrong'],
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'sub-3',
        testId: 'test-ethics',
        testTitle: 'AI Ethics and Governance Quiz',
        userId: 'student-1',
        username: 'John Doe',
        score: 5,
        totalQuestions: 5,
        accuracy: 100,
        timeSpent: 120,
        answers: [1, 2, 3, 1, 0], // Perfect score
        questionStatus: ['correct', 'correct', 'correct', 'correct', 'correct'],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  });

  // 5. Documents Upload List State
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('cbtify_documents');
    if (saved) return JSON.parse(saved);
    
    return [
      {
        id: 'doc-physics',
        filename: 'classical_mechanics_notes.pdf',
        size: '2.4 MB',
        status: 'ready',
        testId: 'test-physics',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'doc-ethics',
        filename: 'ai_governance_framework.pdf',
        size: '4.8 MB',
        status: 'ready',
        testId: 'test-ethics',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  });

  // 6. Organizational Roster Students
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('cbtify_students');
    if (saved) return JSON.parse(saved);
    
    return [
      { id: 'stud-1', name: 'Alice Smith', email: 'alice@iiitd.ac.in', testsTaken: 5, avgAccuracy: 88, lastActive: '2026-06-04' },
      { id: 'stud-2', name: 'Bob Johnson', email: 'bob@iiitd.ac.in', testsTaken: 3, avgAccuracy: 74, lastActive: '2026-06-03' },
      { id: 'stud-3', name: 'Charlie Davis', email: 'charlie@iiitd.ac.in', testsTaken: 7, avgAccuracy: 91, lastActive: '2026-06-05' },
      { id: 'stud-4', name: 'Diana Prince', email: 'diana@iiitd.ac.in', testsTaken: 2, avgAccuracy: 82, lastActive: '2026-06-01' },
      { id: 'stud-5', name: 'Ethan Hunt', email: 'ethan@iiitd.ac.in', testsTaken: 4, avgAccuracy: 69, lastActive: '2026-05-28' }
    ];
  });

  // 7. Scheduled Exams (for Organizations)
  const [schedules, setSchedules] = useState(() => {
    const saved = localStorage.getItem('cbtify_schedules');
    if (saved) return JSON.parse(saved);
    
    return [
      { id: 'sched-1', title: 'Mid-Term Physics Mechanics Exam', date: '2026-06-10', time: '10:00 AM', duration: '60 mins', studentsCount: 45 },
      { id: 'sched-2', title: 'AI Ethics Final Assessment', date: '2026-06-15', time: '02:00 PM', duration: '30 mins', studentsCount: 120 }
    ];
  });

  // Synchronization with LocalStorage
  useEffect(() => {
    localStorage.setItem('cbtify_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('cbtify_user', currentUser ? JSON.stringify(currentUser) : '');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cbtify_tests', JSON.stringify(tests));
  }, [tests]);

  useEffect(() => {
    localStorage.setItem('cbtify_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('cbtify_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('cbtify_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('cbtify_schedules', JSON.stringify(schedules));
  }, [schedules]);


  // --- Actions ---

  // Auth Action
  const login = (email, password) => {
    const matchedUser = registeredUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!matchedUser) {
      throw new Error('Invalid email or password');
    }

    setCurrentUser(matchedUser);
    return matchedUser;
  };

  const register = (username, email, password, role, organizationName) => {
    const exists = registeredUsers.some(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
      role,
      organizationName: role === 'organization' ? organizationName : ''
    };

    setRegisteredUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const forgotPassword = (email) => {
    return true; // Simulate success
  };

  // Upload Document and simulate AI Generation Process in state
  const uploadDocument = (filename, size, onProgressUpdate) => {
    const docId = `doc-${Date.now()}`;
    const newDoc = {
      id: docId,
      filename,
      size,
      status: 'uploading',
      createdAt: new Date().toISOString()
    };

    setDocuments(prev => [newDoc, ...prev]);

    // Setup simulated timers
    let currentStatus = 'uploading';
    onProgressUpdate(currentStatus, null);

    setTimeout(() => {
      // Step 2: Processing
      currentStatus = 'processing';
      setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status: currentStatus } : d));
      onProgressUpdate(currentStatus, null);

      setTimeout(() => {
        // Step 3: Generating
        currentStatus = 'generating';
        setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status: currentStatus } : d));
        onProgressUpdate(currentStatus, null);

        setTimeout(() => {
          // Step 4: Ready, add the dynamic CBT test
          currentStatus = 'ready';
          
          // Determine topic question pool
          const nameLower = filename.toLowerCase();
          let pool = generalQuestions;
          let topicText = 'General Development Basics';
          if (nameLower.includes('physic') || nameLower.includes('mechanic') || nameLower.includes('science')) {
            pool = physicsQuestions;
            topicText = 'Physics Classical Mechanics';
          } else if (nameLower.includes('ethics') || nameLower.includes('governance') || nameLower.includes('align')) {
            pool = ethicsQuestions;
            topicText = 'AI Ethics and Governance';
          }

          const newTestId = `test-${Date.now()}`;
          const newTest = {
            id: newTestId,
            title: `AI-Generated Test: ${filename.split('.')[0]}`,
            description: `A customized assessment generated from your uploaded file "${filename}" focusing on ${topicText}.`,
            timeLimit: pool.length * 3, // 3 mins per question
            questions: pool,
            createdBy: currentUser ? currentUser.id : 'anonymous',
            createdAt: new Date().toISOString()
          };

          setTests(prev => [newTest, ...prev]);
          setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status: currentStatus, testId: newTestId } : d));
          onProgressUpdate(currentStatus, newTestId);
        }, 2000);
      }, 2000);
    }, 1500);
  };

  const uploadGeneratedTest = (filename, size, generatedTest) => {
    const docId = `doc-${Date.now()}`;
    const testId = `test-${Date.now()}`;
    const questions = Array.isArray(generatedTest.questions) ? generatedTest.questions : [];

    const newTest = {
      id: testId,
      title: generatedTest.title || `AI-Generated Test: ${filename.split('.')[0]}`,
      description: generatedTest.description || `A customized assessment generated from your uploaded file "${filename}".`,
      timeLimit: Number(generatedTest.timeLimit) || Math.max(5, questions.length * 3),
      questions,
      createdBy: currentUser ? currentUser.id : 'anonymous',
      createdAt: new Date().toISOString()
    };

    const newDoc = {
      id: docId,
      filename,
      size,
      status: 'ready',
      testId,
      createdAt: new Date().toISOString()
    };

    setTests(prev => [newTest, ...prev]);
    setDocuments(prev => [newDoc, ...prev]);

    return testId;
  };

  // Submit Test Grade
  const submitTest = (testId, answers, timeSpent) => {
    const test = tests.find(t => t.id === testId);
    if (!test) return null;

    let score = 0;
    const totalQuestions = test.questions.length;
    const questionStatus = [];

    test.questions.forEach((q, idx) => {
      const ans = answers[idx];
      if (ans === undefined || ans === null || ans === -1) {
        questionStatus.push('unanswered');
      } else if (ans === q.correctAnswer) {
        score++;
        questionStatus.push('correct');
      } else {
        questionStatus.push('wrong');
      }
    });

    const accuracy = Math.round((score / totalQuestions) * 100);
    
    const newSubmission = {
      id: `sub-${Date.now()}`,
      testId,
      testTitle: test.title,
      userId: currentUser ? currentUser.id : 'student-1',
      username: currentUser ? currentUser.username : 'John Doe',
      score,
      totalQuestions,
      accuracy,
      timeSpent,
      answers,
      questionStatus,
      createdAt: new Date().toISOString()
    };

    setSubmissions(prev => [newSubmission, ...prev]);
    return newSubmission;
  };

  // Add Org student
  const addStudent = (name, email) => {
    const newStudent = {
      id: `stud-${Date.now()}`,
      name,
      email,
      testsTaken: 0,
      avgAccuracy: 0,
      lastActive: new Date().toISOString().split('T')[0]
    };
    setStudents(prev => [newStudent, ...prev]);
  };

  // Schedule Org Exam
  const scheduleExam = (title, date, time, duration, studentsCount) => {
    const newSched = {
      id: `sched-${Date.now()}`,
      title,
      date,
      time,
      duration: duration || '30 mins',
      studentsCount: studentsCount || 60
    };
    setSchedules(prev => [newSched, ...prev]);
  };

  // Compile Analytics Dashboard Values
  const getAnalytics = () => {
    const userSubs = submissions.filter(s => s.userId === (currentUser ? currentUser.id : 'student-1'));
    if (userSubs.length === 0) {
      return {
        totalTests: 0,
        avgAccuracy: 0,
        timeSpent: 0,
        improvementRate: 0,
        accuracyTrend: [],
        subjectAnalysis: {
          'Classical Physics': 70,
          'AI Ethics & Safety': 75,
          'General Aptitude': 65
        },
        weakTopics: [{ topic: 'No data available', mistakesCount: 0 }],
        strongTopics: ['No data available'],
        mistakeHeatmap: []
      };
    }

    const totalTests = userSubs.length;
    const totalAccuracy = userSubs.reduce((sum, s) => sum + s.accuracy, 0);
    const avgAccuracy = Math.round(totalAccuracy / totalTests);
    const totalTimeSpent = userSubs.reduce((sum, s) => sum + s.timeSpent, 0);

    // Calc improvement rate
    let improvementRate = 0;
    if (totalTests > 1) {
      const sortedByDate = [...userSubs].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      const firstAcc = sortedByDate[0].accuracy;
      const lastAcc = sortedByDate[sortedByDate.length - 1].accuracy;
      improvementRate = lastAcc - firstAcc;
    } else {
      improvementRate = userSubs[0].accuracy >= 80 ? 12 : 5;
    }

    // SVG Line chart trend
    const accuracyTrend = [...userSubs]
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map(s => ({
        date: new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        accuracy: s.accuracy,
        title: s.testTitle
      }));

    // Group accuracies by subject
    let physSum = 0, physCount = 0;
    let ethSum = 0, ethCount = 0;
    let genSum = 0, genCount = 0;

    userSubs.forEach(s => {
      const t = s.testTitle.toLowerCase();
      if (t.includes('physic') || t.includes('mechanic')) {
        physSum += s.accuracy;
        physCount++;
      } else if (t.includes('ethics') || t.includes('governance')) {
        ethSum += s.accuracy;
        ethCount++;
      } else {
        genSum += s.accuracy;
        genCount++;
      }
    });

    const subjectAnalysis = {
      'Classical Physics': physCount > 0 ? Math.round(physSum / physCount) : 75,
      'AI Ethics & Safety': ethCount > 0 ? Math.round(ethSum / ethCount) : 80,
      'General Aptitude': genCount > 0 ? Math.round(genSum / genCount) : 70
    };

    // Calculate topics
    const weakTopicsMap = new Map();
    const strongTopicsMap = new Map();

    const topicsPhysics = ['Circular Motion', 'Newtonian Units', 'Static Friction Calculations'];
    const topicsEthics = ['RLHF Alignments', 'Deepfake Risks', 'Inner Alignment Protocols', 'XAI Explainability', 'EU AI Risk Tiers'];
    const topicsGeneral = ['Server Runtime', 'Glassmorphism backdrop', 'Git Pull vs Fetch', 'SaaS Acronyms'];

    userSubs.forEach(s => {
      const t = s.testTitle.toLowerCase();
      let topics = topicsGeneral;
      if (t.includes('physic')) topics = topicsPhysics;
      else if (t.includes('ethics')) topics = topicsEthics;

      s.questionStatus.forEach((status, idx) => {
        const topic = topics[idx] || 'General Knowledge';
        if (status === 'wrong') {
          weakTopicsMap.set(topic, (weakTopicsMap.get(topic) || 0) + 1);
        } else if (status === 'correct') {
          strongTopicsMap.set(topic, (strongTopicsMap.get(topic) || 0) + 1);
        }
      });
    });

    const weakTopics = Array.from(weakTopicsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([topic, count]) => ({ topic, mistakesCount: count }));

    if (weakTopics.length === 0) {
      weakTopics.push(
        { topic: 'Static Friction Calculations', mistakesCount: 1 },
        { topic: 'Inner Alignment Policies', mistakesCount: 1 }
      );
    }

    const strongTopics = Array.from(strongTopicsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([topic]) => topic);

    if (strongTopics.length === 0) {
      strongTopics.push('RLHF Alignment Systems', 'Newtonian Force Conversions', 'Git Operations');
    }

    // Heatmap array
    const dateMap = new Map();
    userSubs.forEach(s => {
      const dStr = new Date(s.createdAt).toISOString().split('T')[0];
      dateMap.set(dStr, (dateMap.get(dStr) || 0) + 1);
    });

    const mistakeHeatmap = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split('T')[0];
      mistakeHeatmap.push({
        date: dStr,
        label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count: dateMap.get(dStr) || 0
      });
    }

    return {
      totalTests,
      avgAccuracy,
      timeSpent: totalTimeSpent,
      improvementRate,
      accuracyTrend,
      subjectAnalysis,
      weakTopics,
      strongTopics,
      mistakeHeatmap
    };
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      tests,
      submissions,
      documents,
      students,
      schedules,
      login,
      register,
      logout,
      forgotPassword,
      uploadDocument,
      uploadGeneratedTest,
      submitTest,
      addStudent,
      scheduleExam,
      getAnalytics
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
