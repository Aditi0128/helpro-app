import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Search,
  IndianRupee,
  Bell,
  User,
  Briefcase,
  CreditCard,
  RefreshCw,
  X,
  ChevronRight,
  Award,
  Zap,
  Phone,
  SlidersHorizontal,
  ArrowLeft,
  Send,
  Check,
  AlertTriangle,
  Compass,
  Play,
  Sparkles,
  Navigation,
  Layers,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Activity,
  DollarSign,
  Eye,
  Smartphone,
  RotateCcw,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  Filter,
  KeyRound,
  ShieldAlert,
  CheckCheck,
  HelpCircle,
} from "lucide-react";

const BASE_RATES = {
  Delivery: 150,
  Lifting: 300,
  Errands: 180,
  Queue: 200,
  Rides: 250,
};

const PUNE_AREAS = [
  "Kothrud",
  "Baner",
  "Shivajinagar",
  "Koregaon Park",
  "Viman Nagar",
  "Hinjewadi Tech Zone",
  "Aundh",
  "Wakad",
];

const SEED_USERS = [
  {
    id: "u_cust_1",
    name: "Rahul Sharma",
    email: "rahul.s@helpro.in",
    phone: "+91 98234 11223",
    role: "customer",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=180&q=80",
    city: "Kothrud, Pune",
    walletBalance: 1250,
    createdDate: "2024-01-15",
  },
  {
    id: "u_work_1",
    name: "Vikram Patil",
    email: "vikram.p@helpro.in",
    phone: "+91 97654 44321",
    role: "worker",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=180&q=80",
    city: "Shivajinagar, Pune",
    walletBalance: 8420,
    createdDate: "2023-11-20",
  },
  {
    id: "u_work_2",
    name: "Priya Kulkarni",
    email: "priya.k@helpro.in",
    phone: "+91 99221 88776",
    role: "worker",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80",
    city: "Baner, Pune",
    walletBalance: 6150,
    createdDate: "2023-12-05",
  },
];

const INITIAL_WORKERS = [
  {
    id: "w_1",
    userId: "u_work_1",
    name: "Vikram Patil",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=180&q=80",
    categories: ["Delivery", "Lifting"],
    priceMultiplier: 1.0,
    rating: 4.95,
    totalJobs: 168,
    availability: "Now",
    area: "Shivajinagar",
    distanceKm: 1.2,
    x: 48,
    y: 44,
    verified: true,
    earningsTotal: 34200,
    phone: "+91 97654 44321",
    vehicle: "Honda Activa (MH12-EU-4421)",
  },
  {
    id: "w_2",
    userId: "u_work_2",
    name: "Priya Kulkarni",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80",
    categories: ["Delivery"],
    priceMultiplier: 0.9,
    rating: 4.88,
    totalJobs: 119,
    availability: "Now",
    area: "Baner",
    distanceKm: 2.1,
    x: 32,
    y: 28,
    verified: true,
    earningsTotal: 18900,
    phone: "+91 99221 88776",
    vehicle: "TVS Jupiter",
  },
  {
    id: "w_3",
    userId: "u_work_3",
    name: "Santosh Shinde",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=80",
    categories: ["Lifting"],
    priceMultiplier: 1.1,
    rating: 4.82,
    totalJobs: 94,
    availability: "Now",
    area: "Aundh",
    distanceKm: 2.8,
    x: 58,
    y: 26,
    verified: true,
    earningsTotal: 29800,
    phone: "+91 98811 55667",
    vehicle: "Heavy Shifting Trolley + Bike",
  },
  {
    id: "w_4",
    userId: "u_work_4",
    name: "Amol Deshmukh",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80",
    categories: ["Delivery", "Lifting"],
    priceMultiplier: 1.05,
    rating: 4.96,
    totalJobs: 242,
    availability: "Now",
    area: "Kothrud",
    distanceKm: 0.7,
    x: 50,
    y: 56,
    verified: true,
    earningsTotal: 52400,
    phone: "+91 98112 00998",
    vehicle: "Suzuki Access",
  },
  {
    id: "w_5",
    userId: "u_work_5",
    name: "Ganesh Jadhav",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=180&q=80",
    categories: ["Lifting"],
    priceMultiplier: 0.85,
    rating: 4.5,
    totalJobs: 44,
    availability: "Now",
    area: "Deccan Gymkhana",
    distanceKm: 1.8,
    x: 44,
    y: 50,
    verified: false,
    earningsTotal: 9600,
    phone: "+91 91234 56789",
    vehicle: "On Foot / Public Transit",
  },
  {
    id: "w_6",
    userId: "u_work_6",
    name: "Kavita Rathod",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&q=80",
    categories: ["Delivery"],
    priceMultiplier: 1.0,
    rating: 4.75,
    availability: "Later",
    area: "Viman Nagar",
    distanceKm: 5.1,
    x: 82,
    y: 34,
    verified: true,
    earningsTotal: 13800,
    phone: "+91 98765 12345",
    vehicle: "Hero Pleasure",
  },
  {
    id: "w_7",
    userId: "u_work_7",
    name: "Rohan More",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=180&q=80",
    categories: ["Delivery", "Lifting"],
    priceMultiplier: 1.25,
    rating: 4.9,
    totalJobs: 139,
    availability: "Now",
    area: "Wakad",
    distanceKm: 6.0,
    x: 22,
    y: 22,
    verified: true,
    earningsTotal: 41200,
    phone: "+91 94230 45678",
    vehicle: "Bajaj Pulsar",
  },
  {
    id: "w_8",
    userId: "u_work_8",
    name: "Suresh Gaikwad",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=180&q=80",
    categories: ["Lifting"],
    priceMultiplier: 1.0,
    rating: 4.6,
    totalJobs: 61,
    availability: "Now",
    area: "Koregaon Park",
    distanceKm: 4.0,
    x: 74,
    y: 48,
    verified: true,
    earningsTotal: 17400,
    phone: "+91 95521 88990",
    vehicle: "Tata Ace Tie-up",
  },
  {
    id: "w_9",
    userId: "u_work_9",
    name: "Tanvi Joshi",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=180&q=80",
    categories: ["Delivery"],
    priceMultiplier: 0.95,
    rating: 4.82,
    totalJobs: 98,
    availability: "Now",
    area: "Erandwane",
    distanceKm: 1.4,
    x: 46,
    y: 58,
    verified: true,
    earningsTotal: 21500,
    phone: "+91 99881 22334",
    vehicle: "Honda Dio",
  },
  {
    id: "w_10",
    userId: "u_work_10",
    name: "Deepak Salunkhe",
    avatar:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=180&q=80",
    categories: ["Lifting"],
    priceMultiplier: 1.15,
    rating: 4.89,
    totalJobs: 125,
    availability: "Now",
    area: "Karve Nagar",
    distanceKm: 2.2,
    x: 42,
    y: 66,
    verified: true,
    earningsTotal: 36200,
    phone: "+91 97766 55443",
    vehicle: "Lifting Straps + Bike",
  },
  {
    id: "w_11",
    userId: "u_work_11",
    name: "Mahesh Chavan",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=180&q=80",
    categories: ["Delivery", "Lifting"],
    priceMultiplier: 1.35,
    rating: 4.94,
    totalJobs: 210,
    availability: "Now",
    area: "Hadapsar",
    distanceKm: 5.8,
    x: 88,
    y: 68,
    verified: true,
    earningsTotal: 61000,
    phone: "+91 98220 33445",
    vehicle: "Royal Enfield",
  },
  {
    id: "w_12",
    userId: "u_work_12",
    name: "Nisha Bhosale",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=180&q=80",
    categories: ["Delivery"],
    priceMultiplier: 0.85,
    rating: 4.6,
    totalJobs: 65,
    availability: "Offline",
    area: "Camp",
    distanceKm: 3.9,
    x: 64,
    y: 62,
    verified: true,
    earningsTotal: 10800,
    phone: "+91 98900 11223",
    vehicle: "Ather 450X",
  },
];

const INITIAL_TASKS = [
  {
    id: "task_helpro_1",
    customerId: "u_cust_1",
    workerId: "w_1",
    category: "Delivery",
    description:
      "Urgent: Deliver signed rental agreement to Shivaji Housing Society, Senapati Bapat Road",
    location: "Kothrud, Pune to Senapati Bapat Rd",
    dateTime: "Today, Slot 1",
    budget: 200,
    status: "paid",
    agreedPrice: 150,
    platformFee: 15,
    workerPayout: 135,
    pickupPin: "4821",
    declinedWorkerIds: [],
    createdAt: "Today, 1:15 PM",
    updatedAt: "35 mins ago",
  },
  {
    id: "task_helpro_2",
    customerId: "u_cust_1",
    workerId: "w_3",
    category: "Lifting",
    description:
      "Move 4 heavy archive carton boxes from basement store to 2nd floor elevator landing",
    location: "Mayur Colony, Kothrud",
    dateTime: "Yesterday, Slot 2",
    budget: 400,
    status: "paid",
    agreedPrice: 330,
    platformFee: 33,
    workerPayout: 297,
    pickupPin: "9104",
    declinedWorkerIds: [],
    createdAt: "Yesterday, 10:45 AM",
    updatedAt: "Yesterday, 12:40 PM",
  },
];

const INITIAL_REVIEWS = [
  {
    id: "rev_1",
    taskId: "task_helpro_1",
    workerId: "w_1",
    customerId: "u_cust_1",
    stars: 5,
    comment:
      "Instant pickup, documents arrived intact and completely dry despite monsoon drizzle!",
    tags: ["Super Fast", "Careful", "Punctual"],
    createdAt: "30 mins ago",
  },
  {
    id: "rev_2",
    taskId: "task_helpro_2",
    workerId: "w_3",
    customerId: "u_cust_1",
    stars: 5,
    comment:
      "Santosh handled heavy furniture without any noise or wall scratches. 10/10.",
    tags: ["Strong", "Polite"],
    createdAt: "Yesterday",
  },
];

const INITIAL_PAYMENTS = [
  {
    id: "pay_1",
    taskId: "task_helpro_1",
    amount: 150,
    fee: 15,
    payout: 135,
    status: "paid",
    method: "UPI (GPay)",
    createdAt: "35 mins ago",
  },
  {
    id: "pay_2",
    taskId: "task_helpro_2",
    amount: 330,
    fee: 33,
    payout: 297,
    status: "paid",
    method: "UPI (PhonePe)",
    createdAt: "Yesterday",
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeTaskId, setActiveTaskId] = useState(null);

  // Active Session User (Rahul Customer vs Vikram Worker)
  const [currentUser, setCurrentUser] = useState(SEED_USERS[0]);

  // App Collections
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [notifications, setNotifications] = useState([
    {
      id: "n_1",
      userId: "u_cust_1",
      title: "Welcome to Helpro Pune",
      message:
        "Need help moving boxes or urgent courier runs? 12 verified helpers are active around you.",
      read: false,
      time: "Just now",
      type: "info",
    },
  ]);

  // Demo Presentation Bar & Tour Controls
  const [demoExpanded, setDemoExpanded] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayTimerRef = useRef(null);

  // UI Interactive States
  const [toastMessage, setToastMessage] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mockCallWorker, setMockCallWorker] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  const addNotification = (userId, title, message, type = "info") => {
    const newNotif = {
      id: "notif_" + Date.now(),
      userId,
      title,
      message,
      read: false,
      time: "Just now",
      type,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    triggerToast(`${title}: ${message}`);
  };

  const currentWorkerRecord = useMemo(() => {
    return workers.find((w) => w.userId === currentUser.id) || workers[0];
  }, [workers, currentUser]);

  const currentActiveTask = useMemo(() => {
    return tasks.find((t) => t.id === activeTaskId) || null;
  }, [tasks, activeTaskId]);

  const calculateWorkerPrice = (baseRate, multiplier) => {
    return Math.round((baseRate * multiplier) / 10) * 10;
  };

  const handleTaskSubmit = (taskData) => {
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const newTask = {
      id: "task_" + Date.now(),
      customerId: currentUser.id,
      workerId: null,
      category: taskData.category,
      description: taskData.description,
      location: taskData.location,
      dateTime: taskData.dateTime,
      budget: Number(taskData.budget),
      status: "draft",
      agreedPrice: null,
      platformFee: 0,
      workerPayout: 0,
      pickupPin: randomPin,
      declinedWorkerIds: [],
      createdAt: "Just now",
      updatedAt: "Just now",
    };

    setTasks((prev) => [newTask, ...prev]);
    setActiveTaskId(newTask.id);
    setCurrentPage("nearby_workers");
    triggerToast(
      "Task posted! Live radar scanning nearest verified helpers...",
    );
  };

  const handleRequestWorker = (worker) => {
    if (!currentActiveTask) return;
    const baseRate = BASE_RATES[currentActiveTask.category] || 150;
    const price = calculateWorkerPrice(baseRate, worker.priceMultiplier);
    const fee = Math.round(price * 0.1);
    const payout = price - fee;

    const updatedTask = {
      ...currentActiveTask,
      workerId: worker.id,
      agreedPrice: price,
      platformFee: fee,
      workerPayout: payout,
      status: "requested",
      updatedAt: "Just now",
    };

    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );

    addNotification(
      worker.userId,
      "New Helpro Request! 🔔",
      `${currentActiveTask.category} from ${currentUser.name}. Price: ₹${price} (Payout ₹${payout})`,
      "action",
    );

    setCurrentPage("task_tracker");
  };

  const updateTaskStatus = (taskId, newStatus) => {
    let chosenWorkerId = null;
    let taskCustomer = "u_cust_1";

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        chosenWorkerId = t.workerId;
        taskCustomer = t.customerId;

        let extra = {};
        if (newStatus === "rejected") {
          extra.declinedWorkerIds = [
            ...(t.declinedWorkerIds || []),
            t.workerId,
          ];
          extra.workerId = null;
        }
        return { ...t, status: newStatus, updatedAt: "Just now", ...extra };
      }),
    );

    if (newStatus === "accepted") {
      addNotification(
        taskCustomer,
        "Helper Confirmed 🚀",
        "Vikram Patil accepted your task and is on the way.",
        "success",
      );
    } else if (newStatus === "rejected") {
      addNotification(
        taskCustomer,
        "Worker Busy ⚠️",
        "Worker declined. Choose another nearby helper immediately.",
        "warning",
      );
    } else if (newStatus === "in_progress") {
      addNotification(
        taskCustomer,
        "Task In Progress 📦",
        "Helper verified start PIN and began your task.",
        "info",
      );
    } else if (newStatus === "completed") {
      addNotification(
        taskCustomer,
        "Task Finished! 💳",
        "Please inspect delivery and complete escrow payment.",
        "action",
      );
    }
  };

  const handleChooseAnotherWorker = () => {
    if (!currentActiveTask) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === currentActiveTask.id ? { ...t, status: "draft" } : t,
      ),
    );
    setCurrentPage("nearby_workers");
  };

  const handleCancelTask = (taskId) => {
    updateTaskStatus(taskId, "cancelled");
    triggerToast("Task cancelled. No platform fee charged.");
  };

  const handlePaymentSuccess = (method = "UPI") => {
    if (!currentActiveTask) return;
    const task = currentActiveTask;
    const payment = {
      id: "pay_" + Date.now(),
      taskId: task.id,
      amount: task.agreedPrice,
      fee: task.platformFee,
      payout: task.workerPayout,
      status: "paid",
      method: method,
      createdAt: "Just now",
    };

    setPayments((prev) => [payment, ...prev]);

    // Update worker earnings total & job count
    setWorkers((prev) =>
      prev.map((w) => {
        if (w.id === task.workerId) {
          return {
            ...w,
            earningsTotal: w.earningsTotal + task.workerPayout,
            totalJobs: w.totalJobs + 1,
          };
        }
        return w;
      }),
    );

    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, status: "paid", updatedAt: "Just now" } : t,
      ),
    );

    const worker = workers.find((w) => w.id === task.workerId);
    if (worker) {
      addNotification(
        worker.userId,
        "Escrow Released 💰",
        `₹${task.workerPayout} transferred instantly to your UPI VPA.`,
        "success",
      );
    }
    triggerToast(
      `Payment of ₹${task.agreedPrice} cleared securely via Escrow.`,
    );
  };

  const handleReviewSubmit = (stars, comment, tags = []) => {
    if (!currentActiveTask) return;
    const newRev = {
      id: "rev_" + Date.now(),
      taskId: currentActiveTask.id,
      workerId: currentActiveTask.workerId,
      customerId: currentUser.id,
      stars: Number(stars),
      comment: comment || "Professional and polite service!",
      tags: tags.length ? tags : ["Punctual", "Careful"],
      createdAt: "Just now",
    };
    setReviews((prev) => [newRev, ...prev]);

    setWorkers((prev) =>
      prev.map((w) => {
        if (w.id === currentActiveTask.workerId) {
          const workerReviews = [
            ...reviews.filter((r) => r.workerId === w.id),
            newRev,
          ];
          const sum = workerReviews.reduce((acc, r) => acc + r.stars, 0);
          const avg = parseFloat((sum / workerReviews.length).toFixed(1));
          return { ...w, rating: avg };
        }
        return w;
      }),
    );

    triggerToast("★ Rating recorded! Match Score updated live in algorithm.");
  };

  const handleSwitchUser = (userRole, name) => {
    if (userRole === "customer") {
      setCurrentUser(SEED_USERS[0]);
      if (
        ["worker_dashboard", "worker_profile", "worker_earnings"].includes(
          currentPage,
        )
      ) {
        setCurrentPage("home");
      }
    } else {
      const workerUser =
        SEED_USERS.find((u) => u.name.includes(name)) || SEED_USERS[1];
      setCurrentUser(workerUser);
      setCurrentPage("worker_dashboard");
    }
    triggerToast(`Viewing Helpro as ${name} (${userRole})`);
  };

  const runDemoStep = (stepNumber) => {
    switch (stepNumber) {
      case 1: {
        setCurrentUser(SEED_USERS[0]);
        const sampleTask = {
          id: "task_demo_" + Date.now(),
          customerId: SEED_USERS[0].id,
          workerId: null,
          category: "Delivery",
          description:
            "Deliver emergency laptop charger & hard drive to ICC Trade Towers, Senapati Bapat Rd",
          location: "Kothrud to Senapati Bapat Road",
          dateTime: "Earliest Available (Today)",
          budget: 200,
          status: "draft",
          agreedPrice: null,
          platformFee: 0,
          workerPayout: 0,
          pickupPin: "5532",
          declinedWorkerIds: [],
          createdAt: "Just now",
          updatedAt: "Just now",
        };
        setTasks((prev) => [sampleTask, ...prev]);
        setActiveTaskId(sampleTask.id);
        setCurrentPage("nearby_workers");
        triggerToast("Step 1: Task Created → Proximity Radar active");
        break;
      }
      case 2: {
        let taskToUse = currentActiveTask;
        if (!taskToUse) {
          runDemoStep(1);
          return;
        }
        const topWorker = workers.find((w) => w.id === "w_1") || workers[0];
        handleRequestWorker(topWorker);
        triggerToast("Step 2: Vikram Patil Requested at ₹150");
        break;
      }
      case 3: {
        if (!activeTaskId) return;
        setCurrentUser(SEED_USERS[1]); // Vikram
        updateTaskStatus(activeTaskId, "accepted");
        setCurrentPage("worker_dashboard");
        triggerToast("Step 3: Vikram Accepted! Switched to Worker View");
        break;
      }
      case 4: {
        if (!activeTaskId) return;
        updateTaskStatus(activeTaskId, "in_progress");
        setCurrentUser(SEED_USERS[0]); // Back to Customer
        setCurrentPage("task_tracker");
        triggerToast("Step 4: Helper Verified PIN & Started Task");
        break;
      }
      case 5: {
        if (!activeTaskId) return;
        updateTaskStatus(activeTaskId, "completed");
        setCurrentUser(SEED_USERS[0]);
        setCurrentPage("task_tracker");
        setTimeout(() => {
          handlePaymentSuccess("UPI (GPay)");
          triggerToast("Step 5: Paid ₹150 via Escrow with 10% platform fee");
        }, 500);
        break;
      }
      case 6: {
        if (!activeTaskId) return;
        handleReviewSubmit(
          5,
          "Remarkable service! Vikram communicated clearly and handled everything safely.",
          ["Reliable", "Polite"],
        );
        setTimeout(() => {
          setCurrentUser(SEED_USERS[1]);
          setCurrentPage("worker_earnings");
          triggerToast("Step 6: Worker Ledger updated with ₹135 net payout!");
        }, 400);
        break;
      }
      default:
        break;
    }
  };

  const handleAutoPlay = () => {
    if (isAutoPlaying) {
      clearInterval(autoPlayTimerRef.current);
      setIsAutoPlaying(false);
      triggerToast("Auto Play stopped");
      return;
    }

    setIsAutoPlaying(true);
    let step = 1;
    runDemoStep(1);

    autoPlayTimerRef.current = setInterval(() => {
      step += 1;
      if (step > 6) {
        clearInterval(autoPlayTimerRef.current);
        setIsAutoPlaying(false);
        triggerToast("Demo walkthrough completed!");
      } else {
        runDemoStep(step);
      }
    }, 4200);
  };

  const handleResetDemo = () => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    setIsAutoPlaying(false);
    setTasks(INITIAL_TASKS);
    setWorkers(INITIAL_WORKERS);
    setReviews(INITIAL_REVIEWS);
    setPayments(INITIAL_PAYMENTS);
    setCurrentUser(SEED_USERS[0]);
    setActiveTaskId(null);
    setCurrentPage("home");
    triggerToast("Demo reset to initial clean state.");
  };

  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBFB] text-stone-900 flex flex-col font-sans selection:bg-rose-600 selection:text-white antialiased">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-stone-950/95 backdrop-blur-xl text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-800 text-xs font-semibold animate-in fade-in slide-in-from-top-3">
          <div className="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center">
            <Zap className="w-3 h-3 text-white fill-white" />
          </div>
          <span className="tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Mock Worker Phone Call Sheet */}
      {mockCallWorker && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 text-center animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full mx-auto relative mb-4">
              <img
                src={mockCallWorker.avatar}
                alt={mockCallWorker.name}
                className="w-full h-full rounded-full object-cover ring-4 ring-rose-100"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                <Phone className="w-3 h-3 text-white fill-white" />
              </div>
            </div>
            <h3 className="text-lg font-black text-stone-900">
              {mockCallWorker.name}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {mockCallWorker.phone} • Helpro Partner
            </p>
            <p className="text-xs text-emerald-600 font-bold mt-2">
              Connected on encrypted virtual line
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setMockCallWorker(null)}
                className="w-full py-3 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 shadow-lg shadow-rose-600/30"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Demo Presentation Tour Bar */}
      <div className="bg-stone-950 text-stone-100 border-b border-stone-800 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-sm shadow-rose-900">
                <Play className="w-3 h-3 fill-white" />
              </div>
              <span className="font-black text-xs tracking-wider uppercase text-rose-400">
                Helpro Demo Flow
              </span>
              <span className="text-stone-400 text-[11px] hidden lg:inline">
                • 1-Click Story Presenter
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAutoPlay}
                className={`px-3 py-1 rounded-lg text-[11px] font-black transition flex items-center gap-1.5 ${
                  isAutoPlaying
                    ? "bg-amber-500 text-stone-950 animate-pulse"
                    : "bg-rose-600 hover:bg-rose-700 text-white"
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                {isAutoPlaying ? "Pause Auto-Play" : "Auto Play Demo"}
              </button>

              <button
                onClick={handleResetDemo}
                className="p-1 text-stone-400 hover:text-white rounded-lg transition"
                title="Reset Demo Data"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setDemoExpanded(!demoExpanded)}
                className="text-stone-400 hover:text-white p-1 rounded-md text-[11px] flex items-center gap-1"
              >
                {demoExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {demoExpanded && (
            <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto pb-1 sm:pb-0">
              {[
                { step: 1, label: "1. Post Task" },
                { step: 2, label: "2. Match Workers" },
                { step: 3, label: "3. Worker Accepts" },
                { step: 4, label: "4. In Progress" },
                { step: 5, label: "5. Complete & Pay" },
                { step: 6, label: "6. Review & Payout" },
              ].map((st) => (
                <button
                  key={st.step}
                  onClick={() => runDemoStep(st.step)}
                  className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-rose-600 hover:text-white text-stone-300 font-semibold transition text-[11px] whitespace-nowrap border border-stone-800 active:scale-95"
                >
                  {st.label}
                </button>
              ))}

              <div className="h-4 w-px bg-stone-800 mx-1 hidden sm:block"></div>

              {/* Instant Role Persona Switcher */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleSwitchUser("customer", "Rahul")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition ${
                    currentUser.role === "customer"
                      ? "bg-rose-600 text-white shadow-sm"
                      : "bg-stone-900 text-stone-400 hover:text-white border border-stone-800"
                  }`}
                >
                  Customer (Rahul)
                </button>
                <button
                  onClick={() => handleSwitchUser("worker", "Vikram")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition ${
                    currentUser.role === "worker"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-stone-900 text-stone-400 hover:text-white border border-stone-800"
                  }`}
                >
                  Worker (Vikram)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main App Navigation Header */}
      <header className="sticky top-[45px] z-40 bg-white/95 backdrop-blur-xl border-b border-stone-200/80 shadow-sm transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Pune Region Marker */}
          <div
            onClick={() =>
              setCurrentPage(
                currentUser.role === "worker" ? "worker_dashboard" : "home",
              )
            }
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-700 to-red-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-stone-900 group-hover:text-rose-600 transition">
                  Helpro
                </span>
                <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-full tracking-wide">
                  PUNE
                </span>
              </div>
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider -mt-1">
                Hyperlocal Task Network
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-bold">
            {currentUser.role === "customer" ? (
              <>
                <button
                  onClick={() => setCurrentPage("home")}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    currentPage === "home"
                      ? "text-rose-600 bg-rose-50 font-black"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentPage("create_task")}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    currentPage === "create_task"
                      ? "text-rose-600 bg-rose-50 font-black"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60"
                  }`}
                >
                  Book Help
                </button>
                {activeTaskId && (
                  <button
                    onClick={() => setCurrentPage("task_tracker")}
                    className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                      currentPage === "task_tracker"
                        ? "text-rose-600 bg-rose-50 font-black"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                    Live Tracker
                  </button>
                )}
                <button
                  onClick={() => setCurrentPage("my_tasks")}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    currentPage === "my_tasks"
                      ? "text-rose-600 bg-rose-50 font-black"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60"
                  }`}
                >
                  My Tasks
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentPage("worker_dashboard")}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    currentPage === "worker_dashboard"
                      ? "text-emerald-700 bg-emerald-50 font-black"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60"
                  }`}
                >
                  Worker Dashboard
                </button>
                <button
                  onClick={() => setCurrentPage("worker_profile")}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    currentPage === "worker_profile"
                      ? "text-emerald-700 bg-emerald-50 font-black"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60"
                  }`}
                >
                  Rates & Multiplier
                </button>
                <button
                  onClick={() => setCurrentPage("worker_earnings")}
                  className={`px-3.5 py-2 rounded-xl transition ${
                    currentPage === "worker_earnings"
                      ? "text-emerald-700 bg-emerald-50 font-black"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60"
                  }`}
                >
                  Earnings Ledger
                </button>
              </>
            )}

            <button
              onClick={() => setCurrentPage("help")}
              className={`px-3.5 py-2 rounded-xl transition ${
                currentPage === "help"
                  ? "text-rose-600 bg-rose-50 font-black"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/60"
              }`}
            >
              Trust & Safety
            </button>
          </nav>

          {/* Action Bar */}
          <div className="flex items-center gap-3">
            {/* Wallet Balance Pill */}
            <div className="hidden sm:flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200/70 text-xs font-bold text-stone-700">
              <span className="text-[10px] text-stone-400 font-extrabold uppercase">
                Wallet
              </span>
              <span className="text-stone-900 font-black">
                ₹{currentUser.walletBalance}
              </span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(
                  (n) => !n.read && n.userId === currentUser.id,
                ).length > 0 && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-600 rounded-full ring-2 ring-white animate-pulse"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-stone-200 py-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 pb-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-stone-600">
                      Notifications
                    </span>
                    <button
                      onClick={() =>
                        setNotifications((prev) =>
                          prev.map((n) => ({ ...n, read: true })),
                        )
                      }
                      className="text-xs text-rose-600 hover:underline font-bold"
                    >
                      Mark read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-stone-50">
                    {notifications.filter((n) => n.userId === currentUser.id)
                      .length === 0 ? (
                      <div className="py-6 text-center text-xs text-stone-400">
                        No new alerts
                      </div>
                    ) : (
                      notifications
                        .filter((n) => n.userId === currentUser.id)
                        .map((n) => (
                          <div
                            key={n.id}
                            className="p-3.5 hover:bg-rose-50/50 transition text-left"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-black text-stone-900">
                                {n.title}
                              </span>
                              <span className="text-[10px] text-stone-400">
                                {n.time}
                              </span>
                            </div>
                            <p className="text-xs text-stone-600 leading-snug">
                              {n.message}
                            </p>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-2xl object-cover ring-2 ring-rose-500/20 shadow-sm"
              />
              <div className="hidden sm:block text-left text-xs leading-tight">
                <div className="font-black text-stone-900">
                  {currentUser.name.split(" ")[0]}
                </div>
                <div
                  className={`capitalize text-[10px] font-bold ${
                    currentUser.role === "worker"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {currentUser.role}
                </div>
              </div>
            </div>

            {/* Post Chore CTA */}
            {currentUser.role === "customer" &&
              currentPage !== "create_task" && (
                <button
                  onClick={() => setCurrentPage("create_task")}
                  className="hidden lg:inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white px-4 py-2 rounded-xl font-black text-xs shadow-md shadow-rose-600/30 transition active:scale-95"
                >
                  + Post Chore
                </button>
              )}
          </div>
        </div>
      </header>

      {/* Main Pages Switcher */}
      <main className="flex-1 pb-16">
        {currentPage === "home" && (
          <HomePage
            onStart={() => setCurrentPage("create_task")}
            onBecomeWorker={() => {
              handleSwitchUser("worker", "Vikram");
              setCurrentPage("worker_dashboard");
            }}
          />
        )}

        {currentPage === "create_task" && (
          <CreateTaskPage
            currentUser={currentUser}
            onSubmit={handleTaskSubmit}
            onCancel={() => setCurrentPage("home")}
          />
        )}

        {currentPage === "nearby_workers" && (
          <NearbyWorkersPage
            task={currentActiveTask}
            workers={workers}
            onRequestWorker={handleRequestWorker}
            onBack={() => setCurrentPage("create_task")}
          />
        )}

        {currentPage === "task_tracker" && (
          <TaskTrackerPage
            task={currentActiveTask}
            workers={workers}
            onUpdateStatus={updateTaskStatus}
            onChooseAnother={handleChooseAnotherWorker}
            onCancelTask={handleCancelTask}
            onPayNow={handlePaymentSuccess}
            onSubmitReview={handleReviewSubmit}
            reviews={reviews}
            payments={payments}
            onCallWorker={(w) => setMockCallWorker(w)}
          />
        )}

        {currentPage === "my_tasks" && (
          <MyTasksPage
            tasks={tasks.filter((t) => t.customerId === currentUser.id)}
            workers={workers}
            onSelectTask={(id) => {
              setActiveTaskId(id);
              setCurrentPage("task_tracker");
            }}
            onNewTask={() => setCurrentPage("create_task")}
          />
        )}

        {currentPage === "worker_dashboard" && (
          <WorkerDashboardPage
            worker={currentWorkerRecord}
            tasks={tasks}
            onUpdateStatus={updateTaskStatus}
            onToggleAvailability={(newStatus) => {
              setWorkers((prev) =>
                prev.map((w) =>
                  w.id === currentWorkerRecord.id
                    ? { ...w, availability: newStatus }
                    : w,
                ),
              );
              triggerToast(`Availability set to ${newStatus}`);
            }}
          />
        )}

        {currentPage === "worker_profile" && (
          <WorkerProfilePage
            worker={currentWorkerRecord}
            onSave={(updated) => {
              setWorkers((prev) =>
                prev.map((w) =>
                  w.id === currentWorkerRecord.id ? { ...w, ...updated } : w,
                ),
              );
              triggerToast("Worker profile & multiplier updated!");
            }}
          />
        )}

        {currentPage === "worker_earnings" && (
          <WorkerEarningsPage
            worker={currentWorkerRecord}
            tasks={tasks.filter(
              (t) =>
                t.workerId === currentWorkerRecord.id && t.status === "paid",
            )}
            payments={payments}
          />
        )}

        {currentPage === "help" && <HelpPage />}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-stone-200 z-40 px-3 py-2 flex items-center justify-around shadow-xl">
        {currentUser.role === "customer" ? (
          <>
            <button
              onClick={() => setCurrentPage("home")}
              className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
                currentPage === "home" ? "text-rose-600" : "text-stone-400"
              }`}
            >
              <Compass className="w-4 h-4" /> Home
            </button>
            <button
              onClick={() => setCurrentPage("create_task")}
              className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
                currentPage === "create_task"
                  ? "text-rose-600"
                  : "text-stone-400"
              }`}
            >
              <Zap className="w-4 h-4" /> Book
            </button>
            {activeTaskId && (
              <button
                onClick={() => setCurrentPage("task_tracker")}
                className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
                  currentPage === "task_tracker"
                    ? "text-rose-600"
                    : "text-stone-400"
                }`}
              >
                <Activity className="w-4 h-4" /> Tracker
              </button>
            )}
            <button
              onClick={() => setCurrentPage("my_tasks")}
              className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
                currentPage === "my_tasks" ? "text-rose-600" : "text-stone-400"
              }`}
            >
              <Briefcase className="w-4 h-4" /> Tasks
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setCurrentPage("worker_dashboard")}
              className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
                currentPage === "worker_dashboard"
                  ? "text-emerald-600"
                  : "text-stone-400"
              }`}
            >
              <Briefcase className="w-4 h-4" /> Jobs
            </button>
            <button
              onClick={() => setCurrentPage("worker_profile")}
              className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
                currentPage === "worker_profile"
                  ? "text-emerald-600"
                  : "text-stone-400"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" /> Rates
            </button>
            <button
              onClick={() => setCurrentPage("worker_earnings")}
              className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
                currentPage === "worker_earnings"
                  ? "text-emerald-600"
                  : "text-stone-400"
              }`}
            >
              <IndianRupee className="w-4 h-4" /> Ledger
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-xl bg-rose-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="text-lg font-black text-white">Helpro</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              India's premier on-demand physical task network. Upfront fair
              pricing, zero surprise surcharges, direct UPI settlements.
            </p>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-wider mb-3">
              Live Categories
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li>📦 Delivery (Base ₹150)</li>
              <li>🏋️‍♂️ Heavy Lifting (Base ₹300)</li>
              <li className="text-stone-500">
                🛒 Errands & Grocery (Coming soon)
              </li>
              <li className="text-stone-500">
                ⏳ Queue Standing (Coming soon)
              </li>
              <li className="text-stone-500">
                🛵 Urgent City Rides (Coming soon)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-wider mb-3">
              Trust & Safety
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>Aadhaar & Police Background Checks</li>
              <li>Escrow UPI Protection</li>
              <li>Live Radar Distance Verification</li>
              <li>Transparent 10% Platform Split</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-wider mb-3">
              Pune Active Clusters
            </h4>
            <p className="text-stone-400 leading-relaxed mb-3">
              Kothrud, Baner, Shivajinagar, Koregaon Park, Viman Nagar,
              Hinjewadi Phase 1-3.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/80 font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>{" "}
              Live & Active in Pune
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ onStart, onBecomeWorker }) {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 bg-gradient-to-b from-rose-50/60 via-white to-[#FDFBFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 border border-rose-200 text-rose-900 text-xs font-black mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
            Pune's Transparent Local Task & On-Demand Errands Network
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-stone-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Book nearby help for <br />
            <span className="bg-gradient-to-r from-rose-600 via-rose-700 to-red-600 bg-clip-text text-transparent">
              everyday chores & heavy lifting.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Need packages shifted across Pune or heavy furniture handled?
            Connect with verified local workers with upfront pricing and zero
            hidden surcharges.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-black text-base shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2 group active:scale-95"
            >
              Post a Chore Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onBecomeWorker}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-base border border-stone-200 shadow-sm transition"
            >
              Become a Helpro Partner
            </button>
          </div>

          {/* Operating Metrics */}
          <div className="mt-16 max-w-3xl mx-auto grid grid-cols-3 gap-4 pt-8 border-t border-stone-200/80 text-left">
            <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-rose-700">
                ₹150
              </div>
              <div className="text-xs text-stone-500 font-bold mt-1">
                Base delivery rate
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-rose-700">
                Direct
              </div>
              <div className="text-xs text-stone-500 font-bold mt-1">
                Direct helper matching
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-rose-700">
                100%
              </div>
              <div className="text-xs text-stone-500 font-bold mt-1">
                Verified Pune helpers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-black tracking-widest text-rose-600 uppercase">
            Categories
          </span>
          <h2 className="text-3xl font-black text-stone-900 mt-1">
            What do you need done today?
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Instant upfront booking with rated local helpers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* Active: Delivery */}
          <div
            onClick={onStart}
            className="group cursor-pointer bg-white rounded-3xl p-6 border-2 border-rose-500/30 hover:border-rose-600 hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-3.5 right-3.5 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
              Live Now
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📦
              </div>
              <h3 className="font-black text-base text-stone-900">Delivery</h3>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Emergency keys, laptops, medicines, paperwork, forgotten tiffin.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-black text-rose-600">
              <span>Base ₹150</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Active: Lifting */}
          <div
            onClick={onStart}
            className="group cursor-pointer bg-white rounded-3xl p-6 border-2 border-rose-500/30 hover:border-rose-600 hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-3.5 right-3.5 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
              Live Now
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🏋️‍♂️
              </div>
              <h3 className="font-black text-base text-stone-900">
                Lifting & Shifting
              </h3>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Heavy luggage, shifting boxes across floors, moving furniture.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-black text-rose-600">
              <span>Base ₹300</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Locked Categories */}
          <div className="bg-stone-100/70 rounded-3xl p-6 border border-stone-200 relative opacity-70 flex flex-col justify-between">
            <div className="absolute top-3.5 right-3.5 bg-stone-200 text-stone-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Coming Soon
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-stone-200 text-stone-500 flex items-center justify-center text-2xl mb-4">
                🛒
              </div>
              <h3 className="font-black text-base text-stone-700">
                Kirana & Errands
              </h3>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Grocery store items, tailor drop-off, hardware supplies.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-stone-200 text-[11px] font-bold text-stone-400">
              Base ₹180
            </div>
          </div>

          <div className="bg-stone-100/70 rounded-3xl p-6 border border-stone-200 relative opacity-70 flex flex-col justify-between">
            <div className="absolute top-3.5 right-3.5 bg-stone-200 text-stone-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Coming Soon
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-stone-200 text-stone-500 flex items-center justify-center text-2xl mb-4">
                ⏳
              </div>
              <h3 className="font-black text-base text-stone-700">
                Queue Standing
              </h3>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Hospital OPD tokens, municipal office queues, ticket lines.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-stone-200 text-[11px] font-bold text-stone-400">
              Base ₹200
            </div>
          </div>

          <div className="bg-stone-100/70 rounded-3xl p-6 border border-stone-200 relative opacity-70 flex flex-col justify-between">
            <div className="absolute top-3.5 right-3.5 bg-stone-200 text-stone-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Coming Soon
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-stone-200 text-stone-500 flex items-center justify-center text-2xl mb-4">
                🛵
              </div>
              <h3 className="font-black text-base text-stone-700">
                Quick City Rides
              </h3>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Pillion emergency drops during peak auto refusal hours.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-stone-200 text-[11px] font-bold text-stone-400">
              Base ₹250
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step How-It-Works */}
      <section className="bg-stone-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-rose-500 font-black text-xs uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="text-3xl font-black mt-2">The 6-Step Helpro Flow</h2>
            <p className="text-stone-400 text-xs mt-1">
              Fair algorithm, live radar tracking, and verified escrow payment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Post Your Chore",
                desc: "Pick category, location, and set your budget (min ₹50).",
              },
              {
                num: "02",
                title: "Algorithmic Match",
                desc: "Ranked by: (Rating × 20) − (Distance × 6) − (Price ÷ 25).",
              },
              {
                num: "03",
                title: "Worker Requested",
                desc: "Worker receives an instant push ping with upfront payout.",
              },
              {
                num: "04",
                title: "Live Tracker & PIN",
                desc: "Watch status updates from Accepted to PIN Verified to Done.",
              },
              {
                num: "05",
                title: "Secure Escrow Payment",
                desc: "10% platform fee, 90% direct UPI to the worker.",
              },
              {
                num: "06",
                title: "Verified Review",
                desc: "Rate your helper to keep the hyper-local Pune pool stellar.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-stone-900/90 border border-stone-800 rounded-3xl p-7 relative hover:border-rose-600 transition"
              >
                <div className="text-2xl font-black text-rose-500 mb-3">
                  {step.num}
                </div>
                <h3 className="font-black text-base text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function CreateTaskPage({ currentUser, onSubmit, onCancel }) {
  const [category, setCategory] = useState("Delivery");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Kothrud, Pune");
  const [dateTime, setDateTime] = useState("Earliest Available (Today)");
  const [budget, setBudget] = useState("200");
  const [errors, setErrors] = useState({});

  const validateAndSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!category) newErrors.category = "Please choose a category.";
    if (!description.trim())
      newErrors.description = "Please describe what needs to be done.";
    if (!location.trim()) newErrors.location = "Location is required.";
    if (!budget || Number(budget) < 50)
      newErrors.budget = "Minimum task budget is ₹50.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ category, description, location, dateTime, budget });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onCancel}
          className="text-xs font-bold text-stone-500 hover:text-stone-800 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <span className="text-xs text-rose-800 font-black bg-rose-100 px-3 py-1 rounded-full">
          Step 1 of 6: Create Chore
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-stone-200/80 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-stone-900">Post a Task</h2>
          <p className="text-xs text-stone-500 mt-1">
            Specify your requirements and Helpro’s algorithm will match verified
            helpers nearby.
          </p>
        </div>

        <form onSubmit={validateAndSubmit} className="space-y-6">
          {/* Category Chips */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-2">
              Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                {
                  name: "Delivery",
                  icon: "📦",
                  base: "₹150 base",
                  active: true,
                },
                {
                  name: "Lifting",
                  icon: "🏋️‍♂️",
                  base: "₹300 base",
                  active: true,
                },
                { name: "Errands", icon: "🛒", base: "Locked", active: false },
                { name: "Queue", icon: "⏳", base: "Locked", active: false },
                { name: "Rides", icon: "🛵", base: "Locked", active: false },
              ].map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  disabled={!cat.active}
                  onClick={() => setCategory(cat.name)}
                  className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                    !cat.active
                      ? "bg-stone-50 border-stone-200 text-stone-400 cursor-not-allowed opacity-60"
                      : category === cat.name
                        ? "border-rose-600 bg-rose-50 text-rose-950 ring-2 ring-rose-600/20 shadow-sm"
                        : "border-stone-200 hover:border-stone-300 bg-white text-stone-700"
                  }`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div>
                    <div className="text-xs font-black">{cat.name}</div>
                    <div className="text-[10px] text-stone-500">{cat.base}</div>
                  </div>
                </button>
              ))}
            </div>
            {errors.category && (
              <p className="text-rose-600 text-xs mt-1">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-1">
              Task Details & Notes *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., Pickup medicine carton from MedPlus Karve Nagar and deliver to 4th floor flat..."
              className="w-full text-xs p-3.5 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
            />
            {errors.description && (
              <p className="text-rose-600 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Location with Quick Pune Presets */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-1">
              Pune Task Area *
            </label>
            <div className="relative mb-2">
              <MapPin className="w-4 h-4 text-rose-600 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="E.g., Kothrud, near Karve Statue"
                className="w-full text-xs pl-10 pr-3.5 py-3.5 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
              />
            </div>
            {/* Quick Location Pills */}
            <div className="flex flex-wrap gap-1.5">
              {PUNE_AREAS.slice(0, 5).map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => setLocation(area + ", Pune")}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-700 border border-stone-200 transition"
                >
                  {area}
                </button>
              ))}
            </div>
            {errors.location && (
              <p className="text-rose-600 text-xs mt-1">{errors.location}</p>
            )}
          </div>

          {/* Timing and Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-1">
                Requested Service Slot
              </label>
              <select
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full text-xs p-3.5 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
              >
                <option value="Earliest Available (Today)">
                  Earliest Available (Today)
                </option>
                <option value="Today Afternoon (2 PM - 5 PM)">
                  Today Afternoon (2 PM - 5 PM)
                </option>
                <option value="Today Evening (6 PM - 9 PM)">
                  Today Evening (6 PM - 9 PM)
                </option>
                <option value="Tomorrow Morning (9 AM - 12 PM)">
                  Tomorrow Morning (9 AM - 12 PM)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-1">
                Your Estimated Budget (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-stone-400 font-bold text-xs">
                  ₹
                </span>
                <input
                  type="number"
                  min="50"
                  step="10"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full text-xs pl-8 pr-3.5 py-3.5 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500 font-black"
                />
              </div>
              <span className="text-[10px] text-stone-400">
                Min. ₹50 (Base rate is ₹{BASE_RATES[category] || 150})
              </span>
              {errors.budget && (
                <p className="text-rose-600 text-xs mt-1">{errors.budget}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-black text-sm shadow-xl shadow-rose-600/30 transition flex items-center justify-center gap-2 active:scale-95"
          >
            Find Nearby Helpers
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function NearbyWorkersPage({ task, workers, onRequestWorker, onBack }) {
  const [maxPriceFilter, setMaxPriceFilter] = useState(1000);
  const [minRatingFilter, setMinRatingFilter] = useState(4.0);
  const [availFilter, setAvailFilter] = useState("ALL");
  const [selectedPin, setSelectedPin] = useState(null);

  if (!task) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <AlertCircle className="w-12 h-12 text-stone-400 mx-auto mb-3" />
        <h3 className="text-base font-bold">No active task session</h3>
        <p className="text-xs text-stone-500 mt-1 mb-4">
          Please create a task first.
        </p>
        <button
          onClick={onBack}
          className="bg-rose-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold"
        >
          Create Task
        </button>
      </div>
    );
  }

  const baseRate = BASE_RATES[task.category] || 150;

  // Sorting Formula: (Rating * 20) - (Distance * 6) - (Price / 25)
  const processedWorkers = useMemo(() => {
    return workers
      .filter((w) => {
        const offersCategory = w.categories.includes(task.category);
        const notOffline = w.availability !== "Offline";
        const notDeclined =
          !task.declinedWorkerIds || !task.declinedWorkerIds.includes(w.id);

        if (!offersCategory || !notOffline || !notDeclined) return false;

        const workerPrice =
          Math.round((baseRate * w.priceMultiplier) / 10) * 10;
        if (workerPrice > maxPriceFilter) return false;
        if (w.rating < minRatingFilter) return false;
        if (availFilter !== "ALL" && w.availability !== availFilter)
          return false;

        return true;
      })
      .map((w) => {
        const price = Math.round((baseRate * w.priceMultiplier) / 10) * 10;
        const score = parseFloat(
          (w.rating * 20 - w.distanceKm * 6 - price / 25).toFixed(1),
        );
        const isOverBudget = price > task.budget;
        return { ...w, computedPrice: price, score, isOverBudget };
      })
      .sort((a, b) => b.score - a.score);
  }, [workers, task, baseRate, maxPriceFilter, minRatingFilter, availFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-bold text-stone-500 hover:text-stone-800 flex items-center gap-1.5 mb-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Modify Requirements
          </button>
          <h2 className="text-2xl font-black text-stone-900">
            Available Helpers for{" "}
            <span className="text-rose-600">{task.category}</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Area:{" "}
            <span className="font-bold text-stone-800">{task.location}</span> •
            Target Budget:{" "}
            <span className="font-black text-stone-900">₹{task.budget}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-rose-100 text-rose-800 px-3.5 py-1.5 rounded-full font-black">
            {processedWorkers.length} Helpers Active Around You
          </span>
        </div>
      </div>

      {/* Pune Radar Map Visualizer */}
      <div className="mb-8 bg-stone-950 rounded-3xl p-5 shadow-2xl border border-stone-800 relative overflow-hidden text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-rose-500 animate-spin" />
            <span className="text-xs font-black tracking-wider uppercase text-stone-300">
              Pune Hyperlocal Radar • Live Proximity Grid
            </span>
          </div>
          <span className="text-[11px] text-stone-400">
            Click any pin to inspect helper details
          </span>
        </div>

        {/* Map Canvas */}
        <div className="w-full h-52 sm:h-64 bg-stone-900 rounded-2xl relative border border-stone-800 overflow-hidden flex items-center justify-center">
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e11d4812_1px,transparent_1px),linear-gradient(to_bottom,#e11d4812_1px,transparent_1px)] bg-[size:28px_28px]"></div>

          {/* Distance radar rings */}
          <div className="absolute w-36 h-36 rounded-full border border-rose-500/20 pointer-events-none animate-ping opacity-30"></div>
          <div className="absolute w-48 h-48 rounded-full border border-rose-500/20 pointer-events-none"></div>
          <div className="absolute w-72 h-72 rounded-full border border-rose-500/10 pointer-events-none"></div>

          {/* Center Customer Pin */}
          <div className="absolute z-20 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg ring-4 ring-rose-500/30 animate-pulse">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-black bg-stone-950 text-rose-300 px-2 py-0.5 rounded-md mt-1 shadow border border-stone-800">
              You (Kothrud)
            </span>
          </div>

          {/* Worker Pins */}
          {processedWorkers.slice(0, 10).map((w, idx) => (
            <div
              key={w.id}
              onClick={() => setSelectedPin(w)}
              style={{
                left: `${w.x || 30 + idx * 7}%`,
                top: `${w.y || 25 + idx * 6}%`,
              }}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              <div
                className={`w-8 h-8 rounded-full border-2 p-0.5 shadow-md transition-transform group-hover:scale-125 ${
                  idx === 0
                    ? "border-amber-400 bg-amber-500 ring-2 ring-amber-400/40"
                    : "border-rose-400 bg-rose-950"
                }`}
              >
                <img
                  src={w.avatar}
                  alt={w.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-stone-950 text-white text-[10px] py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl z-40 border border-stone-700 font-bold">
                {w.name} • ₹{w.computedPrice} • {w.distanceKm}km away
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-black text-stone-800">
          <SlidersHorizontal className="w-4 h-4 text-rose-600" />
          <span>Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-500">Max Budget:</span>
            <select
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              className="border border-stone-200 rounded-xl px-2.5 py-1.5 bg-white font-bold"
            >
              <option value="1000">Any (₹1000)</option>
              <option value="400">Under ₹400</option>
              <option value="300">Under ₹300</option>
              <option value="200">Under ₹200</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-500">Rating:</span>
            <select
              value={minRatingFilter}
              onChange={(e) => setMinRatingFilter(Number(e.target.value))}
              className="border border-stone-200 rounded-xl px-2.5 py-1.5 bg-white font-bold"
            >
              <option value="3.5">★ 3.5+</option>
              <option value="4.0">★ 4.0+</option>
              <option value="4.5">★ 4.5+</option>
              <option value="4.8">★ 4.8+ Top Rated</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-500">Availability:</span>
            <select
              value={availFilter}
              onChange={(e) => setAvailFilter(e.target.value)}
              className="border border-stone-200 rounded-xl px-2.5 py-1.5 bg-white font-bold"
            >
              <option value="ALL">All Online</option>
              <option value="Now">Ready Now</option>
              <option value="Later">Later Today</option>
            </select>
          </div>
        </div>
      </div>

      {/* Workers Cards Grid */}
      {processedWorkers.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm max-w-xl mx-auto">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-900">
            No Workers Match Right Now
          </h3>
          <p className="text-xs text-stone-500 mt-1 mb-6 leading-relaxed">
            No helpers nearby match your filters. Try raising your budget or
            selecting "All Online".
          </p>
          <button
            onClick={() => {
              setMaxPriceFilter(1000);
              setMinRatingFilter(3.5);
              setAvailFilter("ALL");
            }}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedWorkers.map((worker, index) => {
            const isBestMatch = index === 0;

            return (
              <div
                key={worker.id}
                className={`bg-white rounded-3xl border transition-all p-6 flex flex-col justify-between shadow-sm hover:shadow-xl relative ${
                  isBestMatch
                    ? "border-2 border-rose-600 ring-4 ring-rose-500/10"
                    : "border-stone-200/90"
                }`}
              >
                {/* Badges */}
                <div className="flex items-center gap-2 mb-4">
                  {isBestMatch && (
                    <span className="bg-gradient-to-r from-amber-500 to-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" /> Best Match
                    </span>
                  )}
                  {worker.isOverBudget && (
                    <span className="bg-rose-100 text-rose-700 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      Over Budget (₹{task.budget})
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ml-auto ${
                      worker.availability === "Now"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {worker.availability === "Now"
                      ? "🟢 Ready Now"
                      : "⏱️ Later Today"}
                  </span>
                </div>

                {/* Worker Info */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-stone-100 shadow-sm"
                    />
                    {worker.verified && (
                      <div
                        className="absolute -bottom-1 -right-1 bg-rose-600 text-white p-0.5 rounded-full shadow"
                        title="Verified Worker"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-black text-stone-900 text-base">
                      {worker.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span className="flex items-center gap-1 text-amber-500 font-extrabold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{" "}
                        {worker.rating}
                      </span>
                      <span>•</span>
                      <span>{worker.totalJobs} jobs</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-stone-400 mt-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      <span>
                        {worker.area} • {worker.distanceKm} km away
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Score Box */}
                <div className="my-5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 grid grid-cols-2 gap-3 text-left">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-black tracking-wider">
                      Upfront Price
                    </span>
                    <div className="text-xl font-black text-stone-900">
                      ₹{worker.computedPrice}
                    </div>
                    <span className="text-[10px] text-stone-400">
                      ({worker.priceMultiplier}x multiplier)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-black tracking-wider">
                      Match Score
                    </span>
                    <div className="text-base font-black text-rose-700">
                      {worker.score} pts
                    </div>
                    <span className="text-[10px] text-stone-400">
                      Algorithm Ranked
                    </span>
                  </div>
                </div>

                {/* Request Button */}
                <button
                  onClick={() => onRequestWorker(worker)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-black text-xs shadow-md shadow-rose-600/30 transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" /> Request{" "}
                  {worker.name.split(" ")[0]} (₹{worker.computedPrice})
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TaskTrackerPage({
  task,
  workers,
  onUpdateStatus,
  onChooseAnother,
  onCancelTask,
  onPayNow,
  onSubmitReview,
  reviews,
  payments,
  onCallWorker,
}) {
  const [showPayModal, setShowPayModal] = useState(false);
  const [payMethod, setPayMethod] = useState("UPI");
  const [payProcessing, setPayProcessing] = useState(false);
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState(["Super Fast", "Punctual"]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!task) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <AlertCircle className="w-12 h-12 text-stone-400 mx-auto mb-3" />
        <h3 className="text-base font-bold">No active task session</h3>
        <p className="text-xs text-stone-500 mt-1">
          Please select or post a chore first.
        </p>
      </div>
    );
  }

  const assignedWorker = workers.find((w) => w.id === task.workerId);
  const existingReview = reviews.find((r) => r.taskId === task.id);

  const getStepProgress = () => {
    switch (task.status) {
      case "requested":
        return 1;
      case "accepted":
        return 2;
      case "in_progress":
        return 3;
      case "completed":
      case "paid":
        return 4;
      default:
        return 0;
    }
  };

  const progressIndex = getStepProgress();

  const handlePay = () => {
    setPayProcessing(true);
    setTimeout(() => {
      onPayNow(payMethod);
      setPayProcessing(false);
      setShowPayModal(false);
    }, 1200);
  };

  const toggleReviewTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSendReview = (e) => {
    e.preventDefault();
    onSubmitReview(stars, comment, selectedTags);
    setReviewSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Simulation Quick Bar */}
      <div className="mb-6 bg-stone-950 text-white rounded-3xl p-4 shadow-xl border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-black text-rose-500 uppercase tracking-wider text-[10px] block">
            Helpro Partner Simulation Bar
          </span>
          <p className="text-stone-300 text-[11px] mt-0.5">
            Test as partner {assignedWorker?.name || "Helper"}:
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {task.status === "requested" && (
            <>
              <button
                onClick={() => onUpdateStatus(task.id, "accepted")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg font-bold"
              >
                Accept
              </button>
              <button
                onClick={() => onUpdateStatus(task.id, "rejected")}
                className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-1 rounded-lg font-bold"
              >
                Decline
              </button>
            </>
          )}
          {task.status === "accepted" && (
            <button
              onClick={() => onUpdateStatus(task.id, "in_progress")}
              className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg font-bold"
            >
              Verify PIN & Start
            </button>
          )}
          {task.status === "in_progress" && (
            <button
              onClick={() => onUpdateStatus(task.id, "completed")}
              className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-lg font-bold"
            >
              Complete Task
            </button>
          )}
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
        {/* Status Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-stone-950 via-rose-950 to-stone-900 text-white">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-rose-400 font-black uppercase tracking-wider">
              Chore #{task.id.slice(-6)}
            </span>
            <span className="bg-white/10 text-white px-3 py-1 rounded-full text-[11px] font-bold">
              Status: {task.status.toUpperCase()}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {task.status === "requested" && "Waiting for Helper Acceptance..."}
            {task.status === "accepted" && "Helper Accepted & En Route!"}
            {task.status === "in_progress" && "Task In Progress 🚀"}
            {task.status === "completed" && "Task Completed! Awaiting Payment"}
            {task.status === "paid" && "Chore Settled & Closed ✅"}
            {task.status === "rejected" && "Worker Busy (Declined)"}
            {task.status === "cancelled" && "Chore Cancelled"}
          </h2>

          <p className="text-xs text-stone-300 mt-2 max-w-xl leading-relaxed">
            {task.description}
          </p>

          {/* OTP / PIN Verification Box */}
          {task.pickupPin &&
            (task.status === "accepted" || task.status === "in_progress") && (
              <div className="mt-4 p-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-semibold text-stone-200">
                    Start Verification PIN:
                  </span>
                </div>
                <span className="font-mono text-base font-black tracking-widest text-white bg-rose-600 px-3 py-0.5 rounded-lg">
                  {task.pickupPin}
                </span>
              </div>
            )}
        </div>

        {/* 4-Step Tracker */}
        {task.status !== "rejected" && task.status !== "cancelled" && (
          <div className="p-6 sm:p-8 border-b border-stone-100 bg-rose-50/20">
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-200 -translate-y-1/2 z-0"></div>
              <div
                className="absolute top-1/2 left-0 h-1 bg-rose-600 -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${((progressIndex - 1) / 3) * 100}%` }}
              ></div>

              <div className="relative z-10 flex justify-between">
                {[
                  { step: 1, label: "Requested", icon: Clock },
                  { step: 2, label: "Accepted", icon: CheckCircle2 },
                  { step: 3, label: "In Progress", icon: Play },
                  { step: 4, label: "Completed", icon: Award },
                ].map(({ step, label, icon: IconComponent }) => {
                  const isDone = progressIndex >= step;
                  const isCurrent = progressIndex === step;

                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition shadow-sm ${
                          isDone
                            ? "bg-rose-600 text-white ring-4 ring-rose-100"
                            : "bg-white text-stone-400 border border-stone-300"
                        } ${isCurrent ? "animate-bounce" : ""}`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-[11px] font-black mt-2 whitespace-nowrap ${
                          isDone ? "text-stone-900" : "text-stone-400"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Rejection State */}
        {task.status === "rejected" && (
          <div className="p-8 text-center bg-rose-50/60">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-stone-900">
              Worker declined, zero charge
            </h3>
            <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
              Helper was currently unavailable. They have been hidden for this
              chore. Pick another nearby helper immediately.
            </p>
            <div className="mt-5">
              <button
                onClick={onChooseAnother}
                className="bg-rose-600 hover:bg-rose-700 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-md transition"
              >
                Choose Another Worker
              </button>
            </div>
          </div>
        )}

        {/* Assigned Worker Card & Actions */}
        {assignedWorker && task.status !== "rejected" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-4">
                <img
                  src={assignedWorker.avatar}
                  alt={assignedWorker.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-rose-200 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-stone-900 text-base">
                      {assignedWorker.name}
                    </h4>
                    {assignedWorker.verified && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-stone-500 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1 text-amber-500 font-extrabold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{" "}
                      {assignedWorker.rating}
                    </span>
                    <span>•</span>
                    <span>
                      {assignedWorker.area} ({assignedWorker.distanceKm} km
                      away)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => onCallWorker(assignedWorker)}
                  className="p-3 bg-white text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-2xl transition shadow-sm"
                  title="Call Helper"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-black">
                    Agreed Price
                  </span>
                  <div className="text-xl font-black text-rose-700">
                    ₹{task.agreedPrice}
                  </div>
                </div>
              </div>
            </div>

            {/* Cancel Chore */}
            {(task.status === "requested" || task.status === "accepted") && (
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-stone-400">
                  Need to cancel before work starts?
                </span>
                <button
                  onClick={() => onCancelTask(task.id)}
                  className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline"
                >
                  Cancel Task
                </button>
              </div>
            )}

            {/* Payment Summary */}
            {task.status === "completed" && (
              <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-200 text-stone-900">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black">
                    ₹
                  </div>
                  <div>
                    <h4 className="font-black text-rose-950 text-base">
                      Service Completed! Ready for Payment
                    </h4>
                    <p className="text-xs text-rose-800">
                      Direct UPI escrow settlement.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 py-3 border-y border-rose-200 text-xs text-stone-700">
                  <div className="flex justify-between">
                    <span>Task Price</span>
                    <span className="font-bold">₹{task.agreedPrice}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Helpro Platform Fee (10%)</span>
                    <span>₹{task.platformFee}</span>
                  </div>
                  <div className="flex justify-between font-black text-sm text-stone-900 pt-1">
                    <span>Total Amount Payable</span>
                    <span className="text-rose-700 font-black">
                      ₹{task.agreedPrice}
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-500 text-right">
                    (Worker direct UPI transfer: ₹{task.workerPayout})
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => setShowPayModal(true)}
                    className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-black text-sm rounded-2xl shadow-xl shadow-rose-600/30 transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    <CreditCard className="w-4 h-4" /> Pay ₹{task.agreedPrice}{" "}
                    Securely
                  </button>
                </div>
              </div>
            )}

            {/* Review Section */}
            {task.status === "paid" && (
              <div className="p-6 rounded-3xl bg-rose-50/40 border border-rose-100">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-rose-600" />
                  <h4 className="font-black text-stone-900 text-sm">
                    Rate & Review {assignedWorker.name}
                  </h4>
                </div>

                {existingReview || reviewSubmitted ? (
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 text-xs">
                    <div className="flex items-center gap-1 text-amber-500 font-bold mb-2">
                      {[...Array(existingReview?.stars || stars)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ),
                      )}
                    </div>
                    <p className="text-stone-700 italic">
                      "
                      {existingReview?.comment ||
                        comment ||
                        "Fast and dependable!"}
                      "
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {(existingReview?.tags || selectedTags).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-3">
                      ✓ Rating credited to worker's Pune algorithm score.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSendReview} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-stone-600 font-bold">
                        Rating:
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setStars(s)}
                            className="p-1 hover:scale-110 transition"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                s <= stars
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-stone-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tag feedback chips */}
                    <div>
                      <span className="text-[11px] text-stone-500 font-bold block mb-1.5">
                        Quick feedback chips:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          "Super Fast",
                          "Punctual",
                          "Careful",
                          "Strong",
                          "Polite",
                        ].map((tag) => {
                          const active = selectedTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleReviewTag(tag)}
                              className={`text-xs px-3 py-1 rounded-full font-bold transition ${
                                active
                                  ? "bg-rose-600 text-white shadow-sm"
                                  : "bg-white border border-stone-200 text-stone-600"
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Comment on timing, carefulness, and attitude..."
                      className="w-full text-xs p-3.5 rounded-2xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />

                    <button
                      type="submit"
                      className="bg-rose-600 hover:bg-rose-700 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-md transition"
                    >
                      Submit Worker Review
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Razorpay / UPI Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
                  ₹
                </div>
                <h3 className="font-black text-stone-900 text-base">
                  Helpro Pay
                </h3>
              </div>
              <button
                onClick={() => setShowPayModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-5">
              <div className="text-center py-4 bg-rose-50/70 rounded-2xl mb-4 border border-rose-100">
                <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider">
                  Amount to Pay
                </span>
                <div className="text-3xl font-black text-stone-900 mt-0.5">
                  ₹{task.agreedPrice}
                </div>
                <span className="text-[10px] text-rose-700 font-semibold">
                  10% Platform Fee Included
                </span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    id: "UPI",
                    name: "Instant UPI (Google Pay, PhonePe, Paytm)",
                    desc: "Direct escrow clearance",
                  },
                  {
                    id: "Card",
                    name: "Credit / Debit Card (Visa, RuPay)",
                    desc: "Instant authorization",
                  },
                  {
                    id: "NetBanking",
                    name: "NetBanking (HDFC, ICICI, SBI)",
                    desc: "Direct bank debit",
                  },
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setPayMethod(m.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      payMethod === m.id
                        ? "border-rose-600 bg-rose-50/60 ring-2 ring-rose-500/20"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-black text-stone-900">
                        {m.name}
                      </div>
                      <div className="text-[10px] text-stone-500">{m.desc}</div>
                    </div>
                    {payMethod === m.id && (
                      <Check className="w-4 h-4 text-rose-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={payProcessing}
              className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-black text-sm rounded-2xl shadow-xl shadow-rose-600/30 transition flex items-center justify-center gap-2"
            >
              {payProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Authorizing UPI
                  Escrow Transaction...
                </>
              ) : (
                <>Authorize ₹{task.agreedPrice} Settlement</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MyTasksPage({ tasks, workers, onSelectTask, onNewTask }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-stone-900">Task History</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Track active requests and past completed chores.
          </p>
        </div>
        <button
          onClick={onNewTask}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-2xl text-xs font-black shadow-md shadow-rose-600/20"
        >
          + Post New Chore
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
          <Clock className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <h4 className="font-bold text-stone-800">No tasks created yet</h4>
          <p className="text-xs text-stone-400 mt-1 mb-4">
            Post your first errand or heavy lifting chore in seconds.
          </p>
          <button
            onClick={onNewTask}
            className="px-5 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl"
          >
            Post Chore
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onSelectTask(task.id)}
              className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-black text-rose-700 text-xs bg-rose-100 px-2.5 py-0.5 rounded-full">
                    {task.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      task.status === "paid"
                        ? "bg-emerald-100 text-emerald-800"
                        : task.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : task.status === "completed"
                            ? "bg-purple-100 text-purple-800"
                            : task.status === "rejected"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {task.status.replace("_", " ")}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    • {task.createdAt}
                  </span>
                </div>

                <h4 className="font-black text-stone-900 text-sm line-clamp-1">
                  {task.description}
                </h4>
                <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />{" "}
                  {task.location}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-black">
                    Amount
                  </span>
                  <div className="text-base font-black text-stone-900">
                    ₹{task.agreedPrice || task.budget}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WorkerDashboardPage({
  worker,
  tasks,
  onUpdateStatus,
  onToggleAvailability,
}) {
  const incomingRequests = tasks.filter(
    (t) => t.workerId === worker.id && t.status === "requested",
  );
  const activeTasks = tasks.filter(
    (t) =>
      t.workerId === worker.id &&
      (t.status === "accepted" || t.status === "in_progress"),
  );
  const awaitingPaymentTasks = tasks.filter(
    (t) => t.workerId === worker.id && t.status === "completed",
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header Profile Summary */}
      <div className="bg-gradient-to-r from-stone-950 via-rose-950 to-stone-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={worker.avatar}
              alt={worker.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-rose-500/50"
            />
            {worker.verified && (
              <div
                className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full"
                title="Verified"
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {worker.name}
              </h2>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Helpro Partner
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-300 mt-1">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {worker.rating}{" "}
                Rating
              </span>
              <span>•</span>
              <span>{worker.totalJobs} Completed Jobs</span>
              <span>•</span>
              <span>{worker.area}</span>
            </div>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="bg-stone-900/90 p-2.5 rounded-2xl border border-stone-800 flex items-center gap-2">
          <span className="text-xs font-bold text-stone-300">
            Availability:
          </span>
          <div className="flex items-center gap-1">
            {["Now", "Later", "Offline"].map((st) => (
              <button
                key={st}
                onClick={() => onToggleAvailability(st)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                  worker.availability === st
                    ? st === "Now"
                      ? "bg-emerald-600 text-white shadow"
                      : st === "Later"
                        ? "bg-amber-500 text-white shadow"
                        : "bg-rose-600 text-white shadow"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
            Total Settled Earnings
          </span>
          <div className="text-2xl font-black text-stone-900 mt-1">
            ₹{worker.earningsTotal.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">
            90% Direct UPI Payouts
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
            Incoming Requests
          </span>
          <div className="text-2xl font-black text-rose-700 mt-1">
            {incomingRequests.length}
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            Pending Decision
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
            Rate Multiplier
          </span>
          <div className="text-2xl font-black text-stone-900 mt-1">
            {worker.priceMultiplier}x
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            Applied to base rates
          </span>
        </div>
      </div>

      {/* Incoming Requests */}
      <div>
        <h3 className="font-black text-lg text-stone-900 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-rose-600" /> Incoming Chores (
          {incomingRequests.length})
        </h3>

        {incomingRequests.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-stone-200 text-xs text-stone-400">
            No incoming chore requests right now. Keep your availability set to
            "Now" to receive instant pings!
          </div>
        ) : (
          <div className="space-y-4">
            {incomingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-3xl p-6 border-2 border-rose-500/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="bg-rose-100 text-rose-800 text-xs font-black px-2.5 py-0.5 rounded-full">
                      {req.category}
                    </span>
                    <span className="text-xs text-stone-500">
                      Requested at {req.createdAt}
                    </span>
                  </div>
                  <h4 className="font-black text-stone-900 text-base">
                    {req.description}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />{" "}
                    {req.location}
                  </p>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-stone-400 font-black uppercase">
                      Customer Quote
                    </span>
                    <div className="text-xs font-bold text-stone-600">
                      ₹{req.agreedPrice}
                    </div>
                    <span className="text-sm font-black text-emerald-600 block mt-0.5">
                      You earn: ₹{req.workerPayout}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateStatus(req.id, "accepted")}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition"
                    >
                      Accept Job
                    </button>
                    <button
                      onClick={() => onUpdateStatus(req.id, "rejected")}
                      className="px-4 py-2.5 bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-600 rounded-xl text-xs font-bold transition"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Tasks */}
      <div>
        <h3 className="font-black text-lg text-stone-900 mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-rose-600" /> Active Tasks (
          {activeTasks.length})
        </h3>

        {activeTasks.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-stone-200 text-xs text-stone-400">
            No active chores currently in progress.
          </div>
        ) : (
          <div className="space-y-4">
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded capitalize">
                      {task.status.replace("_", " ")}
                    </span>
                    <span className="text-xs text-stone-500">
                      {task.category}
                    </span>
                  </div>
                  <h4 className="font-black text-stone-900 text-base">
                    {task.description}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1">
                    Location: {task.location}
                  </p>
                  {task.pickupPin && (
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-stone-700 font-bold bg-stone-100 px-3 py-1 rounded-xl">
                      <KeyRound className="w-3.5 h-3.5 text-rose-600" /> Ask
                      customer for Start PIN: #{task.pickupPin}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 font-black uppercase">
                      Net Payout
                    </span>
                    <div className="text-base font-black text-emerald-600">
                      ₹{task.workerPayout}
                    </div>
                  </div>

                  {task.status === "accepted" && (
                    <button
                      onClick={() => onUpdateStatus(task.id, "in_progress")}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition"
                    >
                      Verify PIN & Start
                    </button>
                  )}

                  {task.status === "in_progress" && (
                    <button
                      onClick={() => onUpdateStatus(task.id, "completed")}
                      className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black shadow-md transition"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Awaiting Customer Settlement */}
      {awaitingPaymentTasks.length > 0 && (
        <div>
          <h3 className="font-black text-lg text-stone-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" /> Awaiting Customer
            Payment ({awaitingPaymentTasks.length})
          </h3>
          <div className="space-y-3">
            {awaitingPaymentTasks.map((task) => (
              <div
                key={task.id}
                className="bg-amber-50 border border-amber-200 rounded-3xl p-4 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-black text-amber-950">
                    {task.category}: {task.description}
                  </span>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Task marked complete. Payout ₹{task.workerPayout} will
                    credit upon customer checkout.
                  </p>
                </div>
                <span className="font-bold bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-[10px]">
                  Pending Release
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WorkerProfilePage({ worker, onSave }) {
  const [categories, setCategories] = useState(
    worker.categories || ["Delivery"],
  );
  const [priceMultiplier, setPriceMultiplier] = useState(
    worker.priceMultiplier || 1.0,
  );
  const [area, setArea] = useState(worker.area || "Shivajinagar");
  const [verified, setVerified] = useState(worker.verified || false);

  const toggleCategory = (cat) => {
    if (categories.includes(cat)) {
      if (categories.length === 1) return;
      setCategories(categories.filter((c) => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onSave({
      categories,
      priceMultiplier: Number(priceMultiplier),
      area,
      verified,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200">
        <h2 className="text-2xl font-black text-stone-900 mb-1">
          Rates & Worker Profile
        </h2>
        <p className="text-xs text-stone-500 mb-6">
          Scale your rate multiplier based on vehicle capacity, specialized
          gear, and speed.
        </p>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-stone-700 mb-2">
              Categories Offered
            </label>
            <div className="flex gap-3">
              {["Delivery", "Lifting"].map((cat) => {
                const checked = categories.includes(cat);
                return (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-3 rounded-2xl border text-xs font-black transition flex items-center gap-2 ${
                      checked
                        ? "bg-rose-50 border-rose-600 text-rose-950 ring-2 ring-rose-600/20"
                        : "border-stone-200 text-stone-500 hover:border-stone-300"
                    }`}
                  >
                    <span>
                      {cat === "Delivery" ? "📦 Delivery" : "🏋️ Lifting"}
                    </span>
                    {checked && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-black uppercase text-stone-700">
                Rate Multiplier ({priceMultiplier}x)
              </label>
              <span className="text-xs font-black text-rose-700">
                Delivery: ₹
                {Math.round((BASE_RATES.Delivery * priceMultiplier) / 10) * 10}{" "}
                • Lifting: ₹
                {Math.round((BASE_RATES.Lifting * priceMultiplier) / 10) * 10}
              </span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.8"
              step="0.05"
              value={priceMultiplier}
              onChange={(e) => setPriceMultiplier(parseFloat(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>0.8x (Budget helper)</span>
              <span>1.0x (Standard Pune rate)</span>
              <span>1.8x (Heavy 2-Person helper)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-stone-700 mb-1">
              Home Base Area
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full text-xs p-3.5 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Aadhaar ID
                Verification
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Verified partners rank higher in customer radar matches.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setVerified(!verified)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                verified
                  ? "bg-emerald-600 text-white"
                  : "bg-stone-200 text-stone-600"
              }`}
            >
              {verified ? "✓ Verified" : "Toggle Badge"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-black text-sm rounded-2xl shadow-xl shadow-rose-600/30 transition"
          >
            Save Profile Settings
          </button>
        </form>
      </div>
    </div>
  );
}

function WorkerEarningsPage({ worker, tasks, payments }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-stone-900">Earnings Ledger</h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Live statement showing completed chores, 10% platform fee, and 90% net
          worker payout.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
          <span className="text-[10px] text-stone-400 uppercase font-black">
            Lifetime Earnings
          </span>
          <div className="text-2xl font-black text-stone-900 mt-1">
            ₹{worker.earningsTotal.toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
          <span className="text-[10px] text-stone-400 uppercase font-black">
            Settled Jobs
          </span>
          <div className="text-2xl font-black text-rose-700 mt-1">
            {tasks.length}
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm">
          <span className="text-[10px] text-stone-400 uppercase font-black">
            Platform Fee Standard
          </span>
          <div className="text-2xl font-black text-stone-800 mt-1">10%</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-stone-50 border-b border-stone-200 font-black text-xs uppercase text-stone-600">
          Recent Settlements
        </div>

        {tasks.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400">
            No completed settlements recorded yet for this session. Complete a
            job to inspect live ledger entries!
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-stone-900">
                      {t.category}
                    </span>
                    <span className="text-stone-400">• {t.createdAt}</span>
                  </div>
                  <p className="text-stone-600 line-clamp-1">{t.description}</p>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block">
                      Customer Paid
                    </span>
                    <span className="font-bold text-stone-700">
                      ₹{t.agreedPrice}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block">
                      Fee (10%)
                    </span>
                    <span className="font-bold text-rose-500">
                      -₹{t.platformFee}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block">
                      Net Payout
                    </span>
                    <span className="font-black text-emerald-600 text-sm">
                      ₹{t.workerPayout}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h2 className="text-2xl font-black text-stone-900">
          Trust, Safety & FAQ
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Institutional rules, escrow safeguards, and compliance guidelines for
          Helpro Pune.
        </p>
      </div>

      <div className="space-y-3.5">
        {[
          {
            q: "How does the Match Score algorithm work without fake promises?",
            a: "Helpro uses verifiable metrics: Match Score = (Rating × 20) − (Distance in km × 6) − (Price ÷ 25). We do not display fictitious arrival estimates; we display the helper’s actual kilometer distance and live availability state (Now / Later).",
          },
          {
            q: "How does the Start PIN protect customers and workers?",
            a: "When a task is accepted, the customer receives a 4-digit mutual Start PIN. The helper must ask for and verify this code before the task starts, preventing misdeliveries or false start claims.",
          },
          {
            q: "What happens if a worker rejects my request?",
            a: "There is zero charge. That helper is hidden for that specific chore and your screen resets so you can pick another high-rated nearby partner immediately.",
          },
          {
            q: "How does worker payout work?",
            a: "Helpro operates on a transparent 10% platform fee. When a ₹150 delivery task is completed, ₹135 is routed directly to the worker’s linked UPI handle.",
          },
        ].map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm"
          >
            <h4 className="font-black text-sm text-stone-900 mb-1">{faq.q}</h4>
            <p className="text-xs text-stone-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 flex items-center justify-between">
        <div>
          <h4 className="font-black text-rose-950 text-sm">
            Need Pune Emergency Support?
          </h4>
          <p className="text-xs text-rose-800 mt-0.5">
            Our local customer safety desk is available 7 AM to 11 PM.
          </p>
        </div>
        <a
          href="tel:+919823411223"
          className="bg-rose-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 hover:bg-rose-700 transition"
        >
          <Phone className="w-3.5 h-3.5" /> Call Desk
        </a>
      </div>
    </div>
  );
}
