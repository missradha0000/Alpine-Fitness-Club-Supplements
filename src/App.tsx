/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import heroGymImg from './assets/images/hero_gym_interior_1794801318333.jpg';
import supplementStoreImg from './assets/images/about_gym_supplements_1794801320086.jpg';
import strengthZoneImg from './assets/images/facility_strength_zone_1794801320690.jpg';
import galleryWheyStackImg from './assets/images/gallery_whey_creatine_stack_1794803953204.jpg';
import galleryCableWorkoutImg from './assets/images/gallery_cable_machine_workout_1794803954678.jpg';
import galleryCardioImg from './assets/images/gallery_cardio_treadmills_1794803954942.jpg';
import galleryDumbbellsImg from './assets/images/gallery_heavy_dumbbells_1794803956321.jpg';
import heroBannerStrengthAthleteImg from './assets/images/hero_banner_strength_athlete_1794822406835.jpg';
import heroBannerSupplementProImg from './assets/images/hero_banner_supplement_pro_1794822406539.jpg';

interface PricingPlan {
  id: string;
  duration: string;
  title: string;
  price: string;
  perMonthNote: string;
  description: string;
  highlight?: boolean;
  kicker: string;
  features: string[];
}

interface SupplementItem {
  id: string;
  name: string;
  category: 'protein' | 'creatine' | 'preworkout';
  categoryLabel: string;
  weight: string;
  memberPrice: string;
  mrp: string;
  highlights: string;
}

interface GoogleReviewItem {
  id: string;
  name: string;
  reviewCountText: string;
  initial: string;
  avatarBg: string;
  rating: number;
  timeAgo: string;
  text: string;
  translatedNote: string;
  likesCount: number;
}

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  isRealPhoto?: boolean;
  cropZoom?: boolean;
}

interface HeroSlideItem {
  id: string;
  image: string;
  alt: string;
  kicker: string;
  headlineTop: string;
  headlineBottom: string;
  accentColor: 'orange' | 'lime';
  subtext: string;
  ctaLabel: string;
  badgeText: string;
}

const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'hero-banner-1',
    image: heroBannerStrengthAthleteImg,
    alt: 'Alpine Fitness Club Sri Dungargarh — No Pain No Gain strength training banner',
    kicker: 'ALPINE FITNESS CLUB • SRI DUNGARGARH',
    headlineTop: 'NO PAIN',
    headlineBottom: 'NO GAIN',
    accentColor: 'orange',
    subtext: 'Apni best body banao — Pehla din Trial FREE! Certified Trainers & Heavy Machines.',
    ctaLabel: 'JOIN NOW',
    badgeText: '4.6 ★ Rating • 1000+ Members',
  },
  {
    id: 'hero-banner-2',
    image: heroBannerSupplementProImg,
    alt: 'Alpine Fitness Supplement Store — 100% Original Whey Protein, Gainer & Creatine',
    kicker: 'AUTHORIZED NUTRITION STORE • GAURAV PATH ROAD',
    headlineTop: 'SUPPLEMENT',
    headlineBottom: 'STORE',
    accentColor: 'lime',
    subtext: '100% Original Importer-Verified Whey Protein, Mass Gainer, Creatine & Pre-Workout.',
    ctaLabel: 'SHOP NOW',
    badgeText: 'Up to 18% Member Discount',
  },
  {
    id: 'hero-banner-3',
    image: galleryCableWorkoutImg,
    alt: 'Alpine Fitness Club — Build Your Dream Body cable crossover and hypertrophy zone',
    kicker: 'MODERN BIOMECHANICAL MACHINES • BIKANER',
    headlineTop: 'BUILD YOUR',
    headlineBottom: 'DREAM BODY',
    accentColor: 'orange',
    subtext: 'Weight Loss • Muscle Gain • Personal Training with dedicated batches for Boys & Girls.',
    ctaLabel: 'BOOK FREE TRIAL',
    badgeText: 'Morning & Evening Batches',
  },
  {
    id: 'hero-banner-4',
    image: galleryDumbbellsImg,
    alt: 'Alpine Fitness Club — Train Hard Stay Strong heavy dumbbell rack and free weights',
    kicker: 'HEAVY FREE WEIGHTS & POWER RACKS',
    headlineTop: 'TRAIN HARD',
    headlineBottom: 'STAY STRONG',
    accentColor: 'lime',
    subtext: 'Full Calibrated Dumbbell Rack (2.5kg to 50kg), Olympic Squat Racks & Deadlifting Platform.',
    ctaLabel: 'START TODAY',
    badgeText: '4.6 ★ Google Rated Club',
  },
  {
    id: 'hero-banner-5',
    image: heroGymImg,
    alt: 'Alpine Fitness Club — Push Your Limits main strength and conditioning floor',
    kicker: 'NEAR CHIDPID NATH • SRI DUNGARGARH',
    headlineTop: 'PUSH YOUR',
    headlineBottom: 'LIMITS',
    accentColor: 'orange',
    subtext: 'Clean, safe aur friendly environment. Transform your fitness journey daily with expert coaches.',
    ctaLabel: 'JOIN NOW',
    badgeText: 'Mon–Sat: 5–9 AM & 5–11 PM',
  },
];

// First 8 images: Cleanly cropped & sharpened Real Gym Photos
// Next 6 images: High-quality studio gym & supplement photos
const GALLERY_ITEMS: GalleryItem[] = [
  // 8 Real Gym Photos FIRST
  {
    id: 'real-1',
    title: 'Alpine Supplement Store Counter',
    subtitle: 'Real Club Photo · MuscleTech & Mass Gainers',
    image: '/club-real-1.jpg',
    alt: 'Real photo of Alpine Fitness Supplement Store shelves and counter in Sri Dungargarh',
    isRealPhoto: true,
  },
  {
    id: 'real-2',
    title: 'Main Bench & Squat Rack Zone',
    subtitle: 'Real Club Photo · Alpine Fitness Floor',
    image: '/club-real-2.jpg',
    alt: 'Real photo of Alpine Fitness Club incline bench press and squat rack floor',
    isRealPhoto: true,
  },
  {
    id: 'real-3',
    title: 'WG10 Functional Cable Crossover',
    subtitle: 'Real Club Photo · Multi-Pulley Station',
    image: '/club-real-3.jpg',
    alt: 'Real photo of Wellness Gym WG10 FT30 cable crossover station at Alpine Fitness',
    isRealPhoto: true,
  },
  {
    id: 'real-4',
    title: 'Heavy Hex & Urethane Dumbbell Rack',
    subtitle: 'Real Club Photo · Wellness Gym Series',
    image: '/club-real-4.jpg',
    alt: 'Real photo of heavy dumbbell rack at Alpine Fitness Club Sri Dungargarh',
    isRealPhoto: true,
  },
  {
    id: 'real-5',
    title: 'Heavy 45° Plate-Loaded Leg Press',
    subtitle: 'Real Club Photo · Lower Body Hypertrophy',
    image: '/club-real-5.jpg',
    alt: 'Real photo of angled leg press station at Alpine Fitness Club',
    isRealPhoto: true,
  },
  {
    id: 'real-6',
    title: 'Lat Pulldown & Seated Row Machine',
    subtitle: 'Real Club Photo · Back Isolation Station',
    image: '/club-real-6.jpg',
    alt: 'Real photo of commercial lat pulldown machine at Alpine Fitness Club',
    isRealPhoto: true,
  },
  {
    id: 'real-7',
    title: 'Mirrored Free-Weight & Machine Hall',
    subtitle: 'Real Club Photo · Spacious Training Bay',
    image: '/club-real-7.jpg',
    alt: 'Real photo of Alpine Fitness mirrored training hall and benches',
    isRealPhoto: true,
  },
  {
    id: 'real-8',
    title: 'Complete Commercial Dumbbell Lineup',
    subtitle: 'Real Club Photo · Free Weights Area',
    image: '/club-real-8.jpg',
    alt: 'Real photo of full dumbbell rack and mirror wall at Alpine Fitness Club',
    isRealPhoto: true,
  },
  // 6 Placeholder Gym Images AFTER Real Photos
  {
    id: 'placeholder-1',
    title: 'Olympic Power Racks & Strength Floor',
    subtitle: 'Heavy Compound Lifting Zone',
    image: heroGymImg,
    alt: 'Alpine Fitness Olympic power racks and main strength training floor',
  },
  {
    id: 'placeholder-2',
    title: '100% Authentic Supplement Bar',
    subtitle: 'Importer-Verified Nutrition Store',
    image: supplementStoreImg,
    alt: 'Alpine Fitness in-house authentic whey protein and sports supplement counter',
  },
  {
    id: 'placeholder-3',
    title: 'Dual-Pulley Cable Crossover',
    subtitle: 'Precision Hypertrophy Stations',
    image: galleryCableWorkoutImg,
    alt: 'Athlete performing cable chest flyes on commercial cable crossover machine',
  },
  {
    id: 'placeholder-4',
    title: 'Whey Isolate & Creatine Stack',
    subtitle: 'Lab-Tested Recovery Fuel',
    image: galleryWheyStackImg,
    alt: 'Authentic whey protein isolate tub, micronized creatine, and shaker bottle',
  },
  {
    id: 'placeholder-5',
    title: 'Calibrated Dumbbells & Plates',
    subtitle: '2.5 kg to 50 kg Complete Run',
    image: galleryDumbbellsImg,
    alt: 'Row of heavy calibrated urethane dumbbells and Olympic weight plates',
  },
  {
    id: 'placeholder-6',
    title: 'Cardio & Endurance Turf',
    subtitle: 'Incline Treadmills, Bikes & Ropes',
    image: galleryCardioImg,
    alt: 'Commercial motorized treadmills, spin bikes, and battle ropes conditioning zone',
  },
];

const PRICING_PLANS: PricingPlan[] = [
  {
    id: '1-month',
    duration: '1 Month',
    title: 'Monthly Flex Pass',
    price: '₹1,500',
    perMonthNote: 'Billed monthly · No lock-in',
    kicker: '01. Starter Commitment',
    description: 'Full access to our strength floor, cardio zone, and initial body composition baseline.',
    features: [
      'Full access to Strength & Cardio Floor (Morning or Evening batch)',
      '2 Personal Training orientation & form-check sessions',
      'Baseline BMI & muscle-fat analysis on Day 1',
      'Standard foundational workout split sheet',
      '5% member discount at Alpine Supplement Store',
    ],
  },
  {
    id: '3-months',
    duration: '3 Months',
    title: 'Quarterly Transformation',
    price: '₹3,800',
    perMonthNote: '₹1,266 / month · Save ₹700',
    kicker: '02. Most Popular Choice',
    highlight: true,
    description: 'Engineered for visible 90-day hypertrophy or fat-loss milestones with structured nutrition.',
    features: [
      'Unlimited access across Morning & Evening operating hours',
      '6 Dedicated Personal Training sessions (2 per month)',
      'Customized vegetarian & non-veg Rajasthani macro Diet Plan',
      'Bi-weekly progressive overload & posture tracking',
      '12% member discount on authentic Whey & Creatine',
    ],
  },
  {
    id: '12-months',
    duration: '12 Months',
    title: 'Annual Athlete Elite',
    price: '₹11,500',
    perMonthNote: '₹958 / month · Save ₹6,500',
    kicker: '03. Maximum Value',
    description: 'Year-round athletic conditioning with priority coaching, diet recalibration, and wholesale nutrition pricing.',
    features: [
      'All-access pass for 365 days + 30 days freeze privilege',
      '24 Personal Training & strength peaking sessions',
      'Quarterly Customized Diet & Supplement Stack Programming',
      'Complimentary shaker + 1st week recovery BCAA trial pack',
      'Flat 18% wholesale member rate at Alpine Supplement Store',
    ],
  },
];

const SUPPLEMENTS: SupplementItem[] = [
  {
    id: 'whey-isolate',
    name: '100% Gold Standard Whey Isolate',
    category: 'protein',
    categoryLabel: 'Whey Protein',
    weight: '2 kg (66 Servings)',
    memberPrice: '₹5,490',
    mrp: '₹6,499',
    highlights: '25g pure whey protein · 5.5g BCAA · Importer hologram verified',
  },
  {
    id: 'micronized-creatine',
    name: 'Micronized Creatine Monohydrate',
    category: 'creatine',
    categoryLabel: 'Strength & Power',
    weight: '250 g (83 Servings)',
    memberPrice: '₹890',
    mrp: '₹1,199',
    highlights: '100% pure pharmaceutical grade · 3g per scoop · Zero fillers',
  },
  {
    id: 'high-stim-pre',
    name: 'Alpine Surge Pre-Workout Formula',
    category: 'preworkout',
    categoryLabel: 'Pre-Workout & Focus',
    weight: '300 g (30 Servings)',
    memberPrice: '₹1,450',
    mrp: '₹1,899',
    highlights: '6g L-Citrulline · 3.2g Beta-Alanine · Sustained evening energy',
  },
  {
    id: 'eaa-hydration',
    name: 'Essential Amino EAA + Electrolytes',
    category: 'preworkout',
    categoryLabel: 'Intra-Workout Recovery',
    weight: '360 g (30 Servings)',
    memberPrice: '₹1,290',
    mrp: '₹1,650',
    highlights: '7g EAAs · Pink Himalayan electrolytes for Rajasthan heat',
  },
];

const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'google-rev-1',
    name: 'Puneet Ojha',
    reviewCountText: '4 समीक्षाएं',
    initial: 'P',
    avatarBg: 'bg-[#C2185B]',
    rating: 5,
    timeAgo: '4 साल पहले',
    text: 'बहुत ही बढ़िया प्रशिक्षक, बहुत मददगार।',
    translatedNote: 'यह अनुवाद Google ने किया है · मूल भाषा (अंग्रेज़ी) में समीक्षा देखें',
    likesCount: 1,
  },
  {
    id: 'google-rev-2',
    name: 'lalita tiwari',
    reviewCountText: '3 समीक्षाएं',
    initial: 'l',
    avatarBg: 'bg-[#00897B]',
    rating: 5,
    timeAgo: '4 साल पहले',
    text: 'अच्छी जगह है और लड़कों और लड़कियों दोनों के लिए बढ़िया व्यवस्था है।\nलड़कियों के लिए विशेष रूप से अनुशंसित।',
    translatedNote: 'यह अनुवाद Google ने किया है · मूल भाषा (अंग्रेज़ी) में समीक्षा देखें',
    likesCount: 1,
  },
  {
    id: 'google-rev-3',
    name: 'mukesh pareek',
    reviewCountText: '7 समीक्षाएं',
    initial: 'M',
    avatarBg: 'bg-[#1E88E5]',
    rating: 5,
    timeAgo: '3 साल पहले',
    text: 'शानदार जिम उपकरण और 100% ओरिजिनल सप्लीमेंट्स। श्री डूंगरगढ़ में फिटनेस के लिए सबसे बेहतरीन जगह।',
    translatedNote: 'यह अनुवाद Google ने किया है · मूल भाषा (अंग्रेज़ी) में समीक्षा देखें',
    likesCount: 2,
  },
  {
    id: 'google-rev-4',
    name: 'Vikram Singh Rathore',
    reviewCountText: '5 समीक्षाएं',
    initial: 'V',
    avatarBg: 'bg-[#7B1FA2]',
    rating: 5,
    timeAgo: '1 साल पहले',
    text: 'जिम में साफ-सफाई (hygiene) और वेंटिलेशन का बहुत खास ध्यान रखा जाता है। सभी मशीनें एकदम नई और स्मूथ हैं। वर्कआउट करने में बहुत मज़ा आता है।',
    translatedNote: 'यह अनुवाद Google ने किया है · मूल भाषा (अंग्रेज़ी) में समीक्षा देखें',
    likesCount: 3,
  },
  {
    id: 'google-rev-5',
    name: 'Ankit Sharma',
    reviewCountText: '6 समीक्षाएं',
    initial: 'A',
    avatarBg: 'bg-[#E65100]',
    rating: 5,
    timeAgo: '8 महीने पहले',
    text: 'यहाँ का माहौल बहुत ही फ्रेंडली और पॉजिटिव है। नए मेंबर्स को भी ट्रेनर्स पूरा सपोर्ट करते हैं और सही एक्सरसाइज फॉर्म सिखाते हैं।',
    translatedNote: 'यह अनुवाद Google ने किया है · मूल भाषा (अंग्रेज़ी) में समीक्षा देखें',
    likesCount: 2,
  },
  {
    id: 'google-rev-6',
    name: 'Deepak Sarswat',
    reviewCountText: '4 समीक्षाएं',
    initial: 'D',
    avatarBg: 'bg-[#2E7D32]',
    rating: 5,
    timeAgo: '5 महीने पहले',
    text: 'आधुनिक जिम मशीनें, हैवी डंबल रैक और 100% असली सप्लीमेंट्स। गौरव पथ रोड पर अपनी फिटनेस और बॉडी ट्रांसफॉर्मेशन के लिए सबसे भरोसेमंद जिम!',
    translatedNote: 'यह अनुवाद Google ने किया है · मूल भाषा (अंग्रेज़ी) में समीक्षा देखें',
    likesCount: 4,
  },
];

const GMAPS_SHARE_URL = 'https://maps.app.goo.gl/YcnVHRL9nbQwCck56';
const PHONE_DISPLAY = '+91 063501 80486';
const PHONE_CLEAN = '916350180486';
const PHONE_TEL = '+916350180486';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFacilityTab, setActiveFacilityTab] = useState<'equipment' | 'supplements' | 'timings'>('equipment');
  const [supplementFilter, setSupplementFilter] = useState<'all' | 'protein' | 'creatine' | 'preworkout'>('all');

  // Booking Modal & Trial Form State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('3 Months — Quarterly Transformation (₹3,800)');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredBatch, setPreferredBatch] = useState<'Morning (5:00 AM - 9:00 AM)' | 'Evening (5:00 PM - 11:00 PM)'>(
    'Morning (5:00 AM - 9:00 AM)'
  );
  const [fitnessGoal, setFitnessGoal] = useState<'Muscle Gain & Strength' | 'Fat Loss & Conditioning' | 'Supplement Consultation'>(
    'Muscle Gain & Strength'
  );
  const [formError, setFormError] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Interactive like state for Google review cards
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // In-Page "Write a Review" Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewFormError, setReviewFormError] = useState('');
  const reviewTimerRef = useRef<number | null>(null);
  const reviewCloseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (reviewTimerRef.current) window.clearTimeout(reviewTimerRef.current);
      if (reviewCloseTimerRef.current) window.clearTimeout(reviewCloseTimerRef.current);
    };
  }, []);

  // Image error fallback flags & Gallery Lightbox
  const [failedHeroSlides, setFailedHeroSlides] = useState<Record<string, boolean>>({});
  const [aboutImgError, setAboutImgError] = useState(false);
  const [failedGalleryIds, setFailedGalleryIds] = useState<Record<string, boolean>>({});
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Hero Slider State & Touch Swipe Tracking
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHeroPaused) return;
    const timer = window.setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [currentHeroSlide, isHeroPaused]);

  const goToNextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const goToPrevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleHeroTouchStart = (e: React.TouchEvent) => {
    touchEndXRef.current = null;
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleHeroTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleHeroTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      goToNextHeroSlide();
    } else if (distance < -minSwipeDistance) {
      goToPrevHeroSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Gallery & Reviews Scroll References
  const galleryScrollRef = useRef<HTMLDivElement | null>(null);
  const reviewsScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (!galleryScrollRef.current) return;
    const scrollAmount = 320;
    galleryScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollReviews = (direction: 'left' | 'right') => {
    if (!reviewsScrollRef.current) return;
    const scrollAmount = 370;
    reviewsScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const toggleReviewLike = (id: string) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openReviewModal = () => {
    if (reviewTimerRef.current) window.clearTimeout(reviewTimerRef.current);
    if (reviewCloseTimerRef.current) window.clearTimeout(reviewCloseTimerRef.current);
    setReviewerName('');
    setReviewRating(5);
    setReviewComment('');
    setReviewFormError('');
    setIsSubmittingReview(false);
    setReviewSuccess(false);
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    if (reviewTimerRef.current) window.clearTimeout(reviewTimerRef.current);
    if (reviewCloseTimerRef.current) window.clearTimeout(reviewCloseTimerRef.current);
    setIsSubmittingReview(false);
    setReviewModalOpen(false);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewerName.trim().length < 2) {
      setReviewFormError('Please enter your name.');
      return;
    }
    if (reviewComment.trim().length < 4) {
      setReviewFormError('Please write a short review about your experience.');
      return;
    }

    setReviewFormError('');
    setIsSubmittingReview(true);

    reviewTimerRef.current = window.setTimeout(() => {
      setIsSubmittingReview(false);
      setReviewSuccess(true);

      reviewCloseTimerRef.current = window.setTimeout(() => {
        setReviewModalOpen(false);
        setReviewSuccess(false);
        setReviewerName('');
        setReviewRating(5);
        setReviewComment('');
      }, 2000);
    }, 600);
  };

  const openTrialBooking = (planLabel?: string) => {
    if (planLabel) {
      setSelectedPlan(planLabel);
    }
    setBookingSubmitted(false);
    setFormError('');
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const digitsOnly = phone.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    if (digitsOnly.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setFormError('');
    setBookingSubmitted(true);
  };

  const getWhatsAppUrl = (customMessage?: string) => {
    const defaultText = customMessage
      ? customMessage
      : `Namaste Alpine Fitness Club & Supplements! I would like to inquire about gym membership and a Free Trial session at your Gaurav Path Road, Sri Dungargarh club.`;
    return `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(defaultText)}`;
  };

  const filteredSupplements =
    supplementFilter === 'all'
      ? SUPPLEMENTS
      : SUPPLEMENTS.filter((item) => item.category === supplementFilter);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-black text-[#F4F5F6] flex flex-col">
      {/* 1. PERMANENTLY FIXED TOP NAVBAR — Always Stays Visible at Top When Scrolling Down */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 w-full bg-black/95 backdrop-blur-md border-b border-zinc-800 shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
        <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
          {/* Zone 1: Responsive Brand Logo (text-lg font-bold truncate md:text-2xl) */}
          <a
            href="#home"
            className="font-display text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white hover:text-[#A3E635] transition-colors truncate min-w-0"
          >
            Alpine Fitness <span className="text-[#A3E635]">Club & Supplements</span>
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-zinc-300 shrink-0">
            <a
              href="#home"
              className="hover:text-[#A3E635] underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Home
            </a>
            <a
              href="#gallery"
              className="hover:text-[#A3E635] underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Gallery
            </a>
            <a
              href="#about"
              className="hover:text-[#A3E635] underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#memberships"
              className="hover:text-[#A3E635] underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Memberships
            </a>
            <a
              href="#reviews"
              className="hover:text-[#A3E635] underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="hover:text-[#A3E635] underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#A3E635] text-black font-bold text-xs sm:text-sm hover:bg-[#bef264] transition-all whitespace-nowrap shrink-0"
            >
              <i className="fa-brands fa-whatsapp text-sm sm:text-base" aria-hidden="true"></i>
              <span>WhatsApp Us</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-zinc-800 text-zinc-200 hover:border-[#A3E635] hover:text-[#A3E635] transition-colors shrink-0"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-base`} aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-5 space-y-3">
            <nav className="flex flex-col space-y-2.5 text-sm font-medium text-zinc-200">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                Home
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                Facility & Supplements Gallery
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                About & Supplement Store
              </a>
              <a
                href="#memberships"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                Memberships & Free Trial
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                Google Reviews (4.6 ★)
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                Location & Contact
              </a>
            </nav>
            <div className="pt-2 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
              <span>Gaurav Path Road, Sri Dungargarh</span>
              <a href={`tel:${PHONE_TEL}`} className="text-[#A3E635] font-mono-num font-semibold">
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 w-full pt-16 overflow-x-clip">
        {/* 2. HERO SECTION — Ultra-Sharp 8K AI Banner Carousel (Crisp on Both Mobile & Desktop) */}
        <section
          id="home"
          aria-label="Alpine Fitness Promotional Banner Carousel"
          className="scroll-mt-16 relative w-full bg-black border-b border-zinc-800 overflow-hidden select-none pt-3 sm:pt-6 pb-8 sm:pb-10"
        >
          {/* Ambient Dual-Tone Studio Glow Behind the Banner Stage */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-[1050px] h-[380px] rounded-full bg-gradient-to-r from-[#FF6B00]/15 via-[#A3E635]/12 to-[#FF6B00]/15 blur-3xl opacity-80"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-[1140px] mx-auto px-3 sm:px-6">
            {/* High-Resolution AI Banner Stage — 16:9 Aspect Ratio, Never Blurry or Pixelated */}
            <div
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
              onTouchStart={handleHeroTouchStart}
              onTouchMove={handleHeroTouchMove}
              onTouchEnd={handleHeroTouchEnd}
              className="relative w-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-zinc-800/90 shadow-[0_24px_80px_rgba(0,0,0,0.92)] bg-zinc-950"
            >
              {/* Horizontal Sliding Banner Track */}
              <div
                className="flex w-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentHeroSlide * 100}%)` }}
              >
                {HERO_SLIDES.map((slide, index) => {
                  const hasError = !!failedHeroSlides[slide.id];
                  const isOrange = slide.accentColor === 'orange';
                  return (
                    <div
                      key={slide.id}
                      aria-hidden={index !== currentHeroSlide}
                      onClick={() => openTrialBooking('3 Months — Quarterly Transformation (₹3,800)')}
                      className="w-full shrink-0 relative aspect-video min-h-[235px] sm:min-h-[340px] md:min-h-[460px] cursor-pointer bg-zinc-950 overflow-hidden"
                    >
                      {!hasError ? (
                        <img
                          src={slide.image}
                          alt={slide.alt}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedHeroSlides((prev) => ({
                              ...prev,
                              [slide.id]: true,
                            }))
                          }
                          className="w-full h-full object-cover object-center block"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                          <i className="fa-solid fa-dumbbell text-6xl sm:text-8xl text-zinc-700" aria-hidden="true"></i>
                        </div>
                      )}

                      {/* Directional Left Scrim for 100% Vector-Sharp Banner Typography */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/10 sm:via-black/60 sm:to-transparent pointer-events-none"
                        aria-hidden="true"
                      />

                      {/* Crisp Vector Banner Content (Scales Proportionally on Mobile & Desktop Without Ever Blurring) */}
                      <div className="absolute inset-0 z-10 flex flex-col justify-center px-7 sm:px-12 md:px-16 py-4 sm:py-8 max-w-[92%] sm:max-w-[75%] md:max-w-[68%]">
                        {/* Top Club Kicker + Accent Bar */}
                        <div className="mb-1.5 sm:mb-3">
                          <div
                            className={`text-[9px] sm:text-xs md:text-sm font-extrabold uppercase tracking-widest ${
                              isOrange ? 'text-[#FACC15]' : 'text-[#A3E635]'
                            }`}
                          >
                            {slide.kicker}
                          </div>
                          <div
                            className={`h-0.5 sm:h-1 w-8 sm:w-14 mt-1 rounded-full ${
                              isOrange ? 'bg-[#FF6B00]' : 'bg-[#A3E635]'
                            }`}
                          />
                        </div>

                        {/* Bold Two-Tone Banner Headline */}
                        <div className="font-display font-black uppercase tracking-tight leading-[0.94] text-2xl sm:text-5xl md:text-6xl lg:text-7xl mb-1.5 sm:mb-3.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                          <div className="text-white">{slide.headlineTop}</div>
                          <div className={isOrange ? 'text-[#FF6B00]' : 'text-[#A3E635]'}>
                            {slide.headlineBottom}
                          </div>
                        </div>

                        {/* Crisp Subtext */}
                        <p className="text-[11px] sm:text-sm md:text-base lg:text-lg font-semibold text-zinc-100 leading-snug mb-2.5 sm:mb-6 max-w-[46ch] line-clamp-2 sm:line-clamp-none drop-shadow">
                          {slide.subtext}
                        </p>

                        {/* Banner CTA Pill Button + Rating Badge */}
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                          <span
                            className={`inline-flex items-center justify-center px-3.5 sm:px-6 md:px-7 py-1.5 sm:py-2.5 md:py-3 rounded-full font-extrabold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider shadow-lg transition-transform duration-200 ${
                              isOrange
                                ? 'bg-[#FF6B00] text-white shadow-[#FF6B00]/40'
                                : 'bg-[#A3E635] text-black shadow-[#A3E635]/40'
                            }`}
                          >
                            {slide.ctaLabel}
                          </span>

                          <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white/95 flex items-center gap-1.5 drop-shadow">
                            <i className="fa-solid fa-star text-[#FACC15] text-[10px] sm:text-xs" aria-hidden="true"></i>
                            <span>{slide.badgeText}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtle Left (<) and Right (>) Navigation Arrows — Positioned at Outer Edges */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevHeroSlide();
                }}
                aria-label="Previous banner slide"
                className="absolute left-1 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-black/50 hover:bg-black/85 text-white/85 hover:text-[#A3E635] border border-white/20 hover:border-[#A3E635]/70 flex items-center justify-center backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <i className="fa-solid fa-chevron-left text-[10px] sm:text-xs md:text-sm" aria-hidden="true"></i>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextHeroSlide();
                }}
                aria-label="Next banner slide"
                className="absolute right-1 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-black/50 hover:bg-black/85 text-white/85 hover:text-[#A3E635] border border-white/20 hover:border-[#A3E635]/70 flex items-center justify-center backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <i className="fa-solid fa-chevron-right text-[10px] sm:text-xs md:text-sm" aria-hidden="true"></i>
              </button>

              {/* Subtle Bottom Dot Indicators — Placed Neatly Along Bottom Edge */}
              <div
                className="absolute bottom-1.5 sm:bottom-3 md:bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/15"
                role="tablist"
                aria-label="Banner slide indicators"
              >
                {HERO_SLIDES.map((slide, index) => {
                  const isActive = index === currentHeroSlide;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Go to banner ${index + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentHeroSlide(index);
                      }}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'w-5 sm:w-7 bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.9)]'
                          : 'w-1.5 sm:w-2 bg-white/55 hover:bg-white/90'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Integrated Club Action & Quick Info Bar Below Banner */}
            <div className="mt-4 sm:mt-6 p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FF6B00]/20 text-[#FF6B00]">
                    <i className="fa-solid fa-fire text-xs" aria-hidden="true"></i>
                  </span>
                  <span className="font-bold text-white">1st Day Trial FREE</span>
                </div>

                <div className="flex items-center gap-2 text-zinc-300">
                  <i className="fa-solid fa-clock text-[#A3E635] text-xs" aria-hidden="true"></i>
                  <span className="font-mono-num">5:00–9:00 AM &amp; 5:00–11:00 PM</span>
                </div>

                <div className="flex items-center gap-2 text-zinc-300">
                  <i className="fa-solid fa-location-dot text-[#FF6B00] text-xs" aria-hidden="true"></i>
                  <span>Gaurav Path Road, Sri Dungargarh</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => openTrialBooking('3 Months — Quarterly Transformation (₹3,800)')}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#ff7b1a] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_6px_20px_rgba(255,107,0,0.35)] cursor-pointer whitespace-nowrap"
                >
                  <span>Book Free Trial</span>
                  <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
                </button>

                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 font-mono-num font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                  <i className="fa-solid fa-phone text-xs text-[#A3E635]" aria-hidden="true"></i>
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2.5 SCROLLABLE IMAGE GALLERY — 8 Cleanly Cropped Real Gym Photos FIRST + 6 Studio Concept Photos */}
        <section id="gallery" className="scroll-mt-16 py-14 sm:py-18 bg-zinc-950 border-b border-zinc-800 w-full">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635] mb-1.5">
                  Inside Alpine Fitness · 14 High-Clarity Photos (Real Club &amp; Supplement Tour)
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
                  Explore Our <span className="text-[#A3E635]">Facility &amp; Supplements</span>
                </h2>
              </div>

              {/* Desktop Carousel Navigation Controls + Swipe Hint */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="text-xs text-zinc-400 sm:hidden">
                  Swipe or tap any photo to zoom <i className="fa-solid fa-arrow-right ml-1 text-[#A3E635]" aria-hidden="true"></i>
                </span>
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollGallery('left')}
                    aria-label="Scroll gallery left"
                    className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:border-[#A3E635] hover:text-[#A3E635] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <i className="fa-solid fa-chevron-left text-xs" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollGallery('right')}
                    aria-label="Scroll gallery right"
                    className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 hover:border-[#A3E635] hover:text-[#A3E635] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Smooth Horizontally Scrollable Carousel (flex overflow-x-auto snap-x gap-4 py-4 no-scrollbar) */}
            <div
              ref={galleryScrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 py-4 no-scrollbar scrollbar-hide"
            >
              {GALLERY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  className="w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] min-w-[280px] sm:min-w-[300px] shrink-0 rounded-2xl shadow-lg border-2 border-zinc-800 hover:border-[#A3E635]/70 snap-center relative overflow-hidden bg-zinc-900 group cursor-pointer transition-colors"
                >
                  {!failedGalleryIds[item.id] ? (
                    <img
                      src={item.image}
                      alt={item.alt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() =>
                        setFailedGalleryIds((prev) => ({
                          ...prev,
                          [item.id]: true,
                        }))
                      }
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 p-4 text-center">
                      <i className="fa-solid fa-dumbbell text-4xl text-[#A3E635] mb-2" aria-hidden="true"></i>
                      <span className="text-xs font-semibold text-zinc-300">{item.title}</span>
                    </div>
                  )}

                  {/* Top-Right Zoom Icon Hint */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-white/80 group-hover:text-[#A3E635] flex items-center justify-center text-xs transition-colors pointer-events-none">
                    <i className="fa-solid fa-expand" aria-hidden="true"></i>
                  </div>

                  {/* Measured Bottom Gradient Scrim for Legible Caption */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="absolute bottom-0 inset-x-0 p-4 pointer-events-none">
                    <div className="text-[11px] font-semibold text-[#A3E635]">{item.subtitle}</div>
                    <h3 className="font-display text-lg font-bold uppercase text-white leading-snug mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. ABOUT & FACILITIES SECTION — Dark Gray (bg-zinc-900) */}
        <section id="about" className="py-16 sm:py-20 md:py-24 bg-zinc-900 border-b border-zinc-800 w-full">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="max-w-2xl mb-10 sm:mb-12">
              <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635] mb-2">
                01. Facility, Timings & Authentic Nutrition
              </div>
              <h2
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4"
                style={{ textWrap: 'balance' }}
              >
                Engineered for Serious Training & <span className="text-[#A3E635]">Genuine Recovery</span> Under One Roof
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Located on Gaurav Path Road near Chidpid Nath in Sri Dungargarh, Alpine Fitness Club & Supplements combines commercial-grade iron with Rajasthan’s most reliable source for genuine sports nutrition.
              </p>
            </div>

            {/* 2-Column Layout (Text & Interactive Switcher on Left, Full-Height Visual on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column: Detailed Facility Breakdown */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-7 sm:space-y-8 min-w-0">
                {/* Interactive Segmented Control to Inspect Facility Highlights */}
                <div
                  role="tablist"
                  aria-label="Facility sections"
                  className="flex items-center gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-lg w-full sm:w-fit max-w-full overflow-x-auto no-scrollbar"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeFacilityTab === 'equipment'}
                    onClick={() => setActiveFacilityTab('equipment')}
                    className={`px-3 sm:px-3.5 py-2 text-xs font-bold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeFacilityTab === 'equipment'
                        ? 'bg-[#A3E635] text-black'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    Strength & Cardio Floor
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeFacilityTab === 'supplements'}
                    onClick={() => setActiveFacilityTab('supplements')}
                    className={`px-3 sm:px-3.5 py-2 text-xs font-bold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeFacilityTab === 'supplements'
                        ? 'bg-[#A3E635] text-black'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    Authentic Supplement Store
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeFacilityTab === 'timings'}
                    onClick={() => setActiveFacilityTab('timings')}
                    className={`px-3 sm:px-3.5 py-2 text-xs font-bold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeFacilityTab === 'timings'
                        ? 'bg-[#A3E635] text-black'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    Batch Timings & Coaching
                  </button>
                </div>

                {/* Dynamic Content Based on Selected Tab */}
                {activeFacilityTab === 'equipment' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#A3E635] mb-2">
                        Heavy-Duty Biomechanical Machines & Free Weights
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                        Every station on our floor is calibrated for smooth resistance curves and joint-safe hypertrophy. No waiting in long queues during peak hours—we stock multiple Olympic benches, squat racks, and a complete dumbbell run.
                      </p>
                    </div>

                    <div className="space-y-4 pt-2 border-t border-zinc-800">
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">Olympic Power Racks & Deadlifting Platforms</div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            Heavy rubberized shock-absorbing flooring for heavy compound lifts, squats, and rack pulls.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">Dual-Pulley Cable Crossovers & Isolation Stations</div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            Lat pulldowns, seated rows, pec dec flyes, leg press, hack squat, and hamstring curl machines.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">Endurance Cardio & Functional Conditioning Zone</div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            Commercial incline treadmills, spin bikes, battle ropes, and sled turf for fat loss and stamina.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeFacilityTab === 'supplements' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#A3E635] mb-2">
                        100% Authentic, Direct-from-Importer Supplement Store
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                        Never risk your health with unverified online sellers. Our counter inside Alpine Fitness stocks sealed, batch-verified sports supplements with official importer holograms and GST billing.
                      </p>
                    </div>

                    <div className="space-y-4 pt-2 border-t border-zinc-800">
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">Live Scratch-Code Verification at Counter</div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            Verify your Whey Isolate, Concentrate, or Mass Gainer authenticity right at the desk before opening.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">Goal-Specific Stack Guidance (No Hard Selling)</div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            Our head coach recommends only what fits your blood work, digestion, and budget—whether Creatine, Whey, or Multi-vitamins.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">Exclusive Up to 18% Club Member Rebate</div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            Active gym members receive direct wholesale discounts on every monthly supplement refill.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeFacilityTab === 'timings' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#A3E635] mb-2">
                        Two Dedicated Training Windows (Monday – Saturday)
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                        Our split schedule ensures the gym floor is sanitized, equipment is inspected twice daily, and certified floor trainers are present throughout every active hour.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                        <div className="text-xs font-bold text-[#A3E635] mb-1">Morning Batch (Mon – Sat)</div>
                        <div className="font-mono-num text-base sm:text-lg font-bold text-white">5:00 AM – 9:00 AM</div>
                        <p className="text-xs text-zinc-300 mt-1.5">
                          High-energy morning sessions, fasted cardio support, and focused compound strength supervision.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                        <div className="text-xs font-bold text-[#A3E635] mb-1">Evening Batch (Mon – Sat)</div>
                        <div className="font-mono-num text-base sm:text-lg font-bold text-white">5:00 PM – 11:00 PM</div>
                        <p className="text-xs text-zinc-300 mt-1.5">
                          6 full hours of evening access—perfect for students, traders, and professionals across Sri Dungargarh.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Always-Visible Facility Timings & Location Summary Strip */}
                <div className="p-4 sm:p-5 rounded-xl bg-zinc-800 border border-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-[#A3E635]">Club Timings & Location</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">
                      Mon–Sat: <span className="font-mono-num text-[#A3E635]">5:00 AM – 9:00 AM</span> &amp;{' '}
                      <span className="font-mono-num text-[#A3E635]">5:00 PM – 11:00 PM</span>
                    </div>
                    <div className="text-xs text-zinc-300">
                      <i className="fa-solid fa-location-dot text-[#A3E635] mr-1.5" aria-hidden="true"></i>
                      Gaurav Path Road, Near Chidpid Nath, Sri Dungargarh
                    </div>
                  </div>

                  <a
                    href={GMAPS_SHARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#A3E635] text-black text-xs font-bold hover:bg-[#bef264] transition-all whitespace-nowrap shrink-0"
                  >
                    <i className="fa-solid fa-map-location-dot" aria-hidden="true"></i>
                    <span>Directions</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Attractive Visual Showcase (Matches Height of Left Column) */}
              <div className="lg:col-span-6 flex flex-col min-w-0">
                <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] lg:min-h-full rounded-xl overflow-hidden border border-zinc-700 bg-zinc-800">
                  {!aboutImgError ? (
                    <img
                      src={activeFacilityTab === 'supplements' ? supplementStoreImg : strengthZoneImg}
                      alt={
                        activeFacilityTab === 'supplements'
                          ? 'Alpine Fitness authentic supplement store shelf with whey protein and sports nutrition'
                          : 'Alpine Fitness heavy dumbbell rack and cable crossover strength station'
                      }
                      referrerPolicy="no-referrer"
                      onError={() => setAboutImgError(true)}
                      className="w-full h-full lg:h-full object-cover object-center transition-opacity duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                      <i className="fa-solid fa-dumbbell text-6xl text-zinc-600" aria-hidden="true"></i>
                    </div>
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
                    <div>
                      <div className="text-xs font-semibold text-[#A3E635]">
                        {activeFacilityTab === 'supplements'
                          ? 'Authorized Nutrition Counter · Sri Dungargarh'
                          : 'Main Iron & Biomechanics Zone · Gaurav Path Road'}
                      </div>
                      <div className="font-display text-lg sm:text-xl font-bold uppercase text-white mt-0.5">
                        {activeFacilityTab === 'supplements'
                          ? 'Batch-Verified Whey, Creatine & Pre-Workouts'
                          : 'Calibrated Free Weights, Racks & Isolation Machines'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveFacilityTab(activeFacilityTab === 'supplements' ? 'equipment' : 'supplements')
                      }
                      className="w-fit px-3.5 py-2 rounded-lg bg-[#A3E635] text-black text-xs font-bold hover:bg-[#bef264] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Switch View
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive In-Store Supplement Catalog Preview */}
            <div className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-zinc-800">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-7 sm:mb-8">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635] mb-1">
                    In-Club Nutrition Counter
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                    Popular Authentic Supplements in Stock
                  </h3>
                </div>

                {/* Interactive Category Filter Buttons */}
                <div className="flex items-center gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-lg w-full sm:w-fit overflow-x-auto no-scrollbar max-w-full">
                  <button
                    type="button"
                    onClick={() => setSupplementFilter('all')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      supplementFilter === 'all'
                        ? 'bg-[#A3E635] text-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    All Stock
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupplementFilter('protein')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      supplementFilter === 'protein'
                        ? 'bg-[#A3E635] text-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Whey Protein
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupplementFilter('creatine')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      supplementFilter === 'creatine'
                        ? 'bg-[#A3E635] text-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Creatine
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupplementFilter('preworkout')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      supplementFilter === 'preworkout'
                        ? 'bg-[#A3E635] text-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Pre & Recovery
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredSupplements.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl bg-zinc-800 border border-zinc-700 flex flex-col justify-between hover:border-[#A3E635]/60 transition-colors"
                  >
                    <div>
                      <div className="text-xs text-zinc-300 mb-1.5">
                        <span className="text-[#A3E635] font-semibold">{item.categoryLabel}</span>
                        <span aria-hidden="true" className="mx-1.5">·</span>
                        <span className="font-mono-num">{item.weight}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">{item.name}</h4>
                      <p className="text-xs text-zinc-300 leading-relaxed mb-4">{item.highlights}</p>
                    </div>

                    <div className="pt-3 border-t border-zinc-700 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[11px] text-zinc-400">Member Price</div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono-num text-lg font-bold text-[#A3E635]">{item.memberPrice}</span>
                          <span className="font-mono-num text-xs text-zinc-500 line-through">{item.mrp}</span>
                        </div>
                      </div>

                      <a
                        href={getWhatsAppUrl(
                          `Hi Alpine Fitness! I want to check stock and price for ${item.name} (${item.weight}) at your Sri Dungargarh store.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-lg bg-[#A3E635] text-black text-xs font-bold hover:bg-[#bef264] transition-all whitespace-nowrap shrink-0"
                      >
                        Check Stock
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. PRICING & BOOKING SECTION — Pure Black (bg-black) with Lighter Cards (bg-zinc-800) & Glowing Scaled Middle Card */}
        <section id="memberships" className="py-16 sm:py-20 md:py-28 bg-black border-b border-zinc-800 w-full">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16">
              <div className="max-w-2xl">
                <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635] mb-2">
                  02. Memberships & Free Trial Booking
                </div>
                <h2
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-3"
                  style={{ textWrap: 'balance' }}
                >
                  Transparent Membership Plans with <span className="text-[#A3E635]">Zero Hidden Fees</span>
                </h2>
                <p className="text-zinc-300 text-sm sm:text-base">
                  Every membership includes access to both strength and cardio zones, personal trainer floor guidance, and member-only discounts at our supplement counter. Not sure yet? Book a 1-day Free Trial first.
                </p>
              </div>

              <div className="text-xs text-[#A3E635] font-mono-num font-semibold shrink-0">
                Morning (5–9 AM) / Evening (5–11 PM)
              </div>
            </div>

            {/* 3 Modern Pricing Cards (bg-zinc-800) with Highlighted Middle Card (Glowing Border + Scaled Up on Desktop) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {PRICING_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-xl p-6 sm:p-8 flex flex-col justify-between bg-zinc-800 transition-transform duration-200 ${
                    plan.highlight
                      ? 'border-2 border-[#A3E635] shadow-[0_0_30px_rgba(163,230,53,0.22)] lg:scale-105 lg:hover:scale-[1.07] z-10'
                      : 'border border-zinc-700 hover:border-[#A3E635]/60 sm:hover:scale-[1.02]'
                  }`}
                >
                  <div>
                    {/* Quiet 1-line text kicker */}
                    <div className="flex items-center justify-between gap-2 text-xs font-bold mb-3">
                      <span className="text-[#A3E635]">{plan.kicker}</span>
                      <span className="font-mono-num text-zinc-200">{plan.duration}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white mb-2">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-6">{plan.description}</p>

                    <div className="pb-6 mb-6 border-b border-zinc-700">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono-num text-3xl sm:text-5xl font-bold text-white">{plan.price}</span>
                        <span className="text-xs text-zinc-300">/ {plan.duration.toLowerCase()}</span>
                      </div>
                      <div className="font-mono-num text-xs font-semibold text-[#A3E635] mt-1.5">
                        {plan.perMonthNote}
                      </div>
                    </div>

                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-zinc-100">
                          <i
                            className="fa-solid fa-check text-[#A3E635] mt-1 text-xs shrink-0"
                            aria-hidden="true"
                          ></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => openTrialBooking(`${plan.duration} — ${plan.title} (${plan.price})`)}
                    className="w-full py-3.5 px-5 rounded-lg bg-[#A3E635] text-black font-bold text-sm hover:bg-[#bef264] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Book Free Trial
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. REDESIGNED TESTIMONIALS (REVIEWS) SECTION — Native Google Maps Review Cards Carousel */}
        <section id="reviews" className="py-16 sm:py-20 md:py-24 bg-zinc-900 border-b border-zinc-800 w-full">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            {/* Native Google Reviews Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 sm:mb-10">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635]">
                  03. Verified Google Maps Reviews
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {/* Google Multi-Color G Badge */}
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                      />
                    </svg>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
                    What our members say on <span className="text-[#A3E635]">Google</span>
                  </h2>
                </div>
              </div>

              {/* 4.6 ⭐ (19 Reviews) Summary Container + In-Page "Write a Review" Modal Trigger */}
              <div className="flex flex-wrap items-center gap-4 bg-white text-zinc-900 px-5 py-3.5 rounded-2xl shadow-lg shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-num text-xl font-bold text-zinc-900">4.6</span>
                    <div className="flex items-center text-[#FBBC04] text-sm" aria-label="4.6 out of 5 stars">
                      <i className="fa-solid fa-star" aria-hidden="true"></i>
                      <i className="fa-solid fa-star" aria-hidden="true"></i>
                      <i className="fa-solid fa-star" aria-hidden="true"></i>
                      <i className="fa-solid fa-star" aria-hidden="true"></i>
                      <i className="fa-solid fa-star-half-stroke" aria-hidden="true"></i>
                    </div>
                    <span className="text-xs font-semibold text-zinc-600">(19 Reviews)</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    अल्पाइन फिटनेस क्लब एंड सप्लीमेंट्स · Sri Dungargarh
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openReviewModal}
                  className="px-3.5 py-2 rounded-lg bg-[#1A73E8] text-white text-xs font-semibold hover:bg-[#1557B0] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                >
                  Write a Review
                </button>
              </div>
            </div>

            {/* Swipe Hint & Desktop Carousel Controls */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs text-zinc-400">
                Swipe horizontally to read all {GOOGLE_REVIEWS.length} member reviews{' '}
                <i className="fa-solid fa-arrow-right ml-1 text-[#A3E635]" aria-hidden="true"></i>
              </span>
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollReviews('left')}
                  aria-label="Scroll reviews left"
                  className="w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-700 text-zinc-200 hover:border-[#A3E635] hover:text-[#A3E635] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-chevron-left text-xs" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  onClick={() => scrollReviews('right')}
                  aria-label="Scroll reviews right"
                  className="w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-700 text-zinc-200 hover:border-[#A3E635] hover:text-[#A3E635] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            {/* Horizontally Scrollable Google Maps Review Cards Carousel */}
            <div
              ref={reviewsScrollRef}
              className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-hide no-scrollbar"
            >
              {GOOGLE_REVIEWS.map((review) => {
                const isLiked = !!likedReviews[review.id];
                const displayLikes = review.likesCount + (isLiked ? 1 : 0);

                return (
                  <article
                    key={review.id}
                    className="min-w-[85vw] sm:min-w-[360px] md:min-w-[350px] md:max-w-[380px] shrink-0 snap-center bg-white text-black rounded-2xl p-6 shadow-xl border border-zinc-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Author Row: Colored Initial Circle + Name + Review Count + 3-Dots Menu */}
                      <div className="flex items-start justify-between gap-3 mb-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full ${review.avatarBg} text-white font-semibold text-lg flex items-center justify-center shrink-0 select-none`}
                            aria-hidden="true"
                          >
                            {review.initial}
                          </div>
                          <div>
                            <h3 className="font-sans text-[15px] font-bold text-zinc-900 leading-tight">
                              {review.name}
                            </h3>
                            <div className="text-xs text-zinc-500 mt-0.5">{review.reviewCountText}</div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={openReviewModal}
                          aria-label={`Review options for ${review.name}`}
                          className="text-zinc-500 hover:text-zinc-800 p-1 transition-colors cursor-pointer"
                        >
                          <i className="fa-solid fa-ellipsis-vertical text-sm" aria-hidden="true"></i>
                        </button>
                      </div>

                      {/* 5 Stars + Relative Time Row (⭐⭐⭐⭐⭐ 4 साल पहले) */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-0.5 text-[#FBBC04] text-xs" aria-label="5 out of 5 stars">
                          {Array.from({ length: review.rating }).map((_, idx) => (
                            <i key={idx} className="fa-solid fa-star" aria-hidden="true"></i>
                          ))}
                        </div>
                        <span className="text-xs text-zinc-500">{review.timeAgo}</span>
                      </div>

                      {/* Hindi Review Text */}
                      <p className="font-sans text-[15px] text-zinc-800 leading-relaxed whitespace-pre-line mb-3">
                        {review.text}
                      </p>
                    </div>

                    {/* Bottom Google Translation Footnote + Like/Reaction Row */}
                    <div className="pt-3 mt-2 border-t border-zinc-100">
                      <div className="text-[11px] text-zinc-500 mb-3">
                        {review.translatedNote}
                      </div>

                      <div className="flex items-center gap-4 text-zinc-600">
                        <button
                          type="button"
                          onClick={() => toggleReviewLike(review.id)}
                          aria-label="Helpful review"
                          className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
                            isLiked ? 'text-red-600' : 'text-zinc-600 hover:text-zinc-900'
                          }`}
                        >
                          <i className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart text-base`} aria-hidden="true"></i>
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleReviewLike(review.id)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-zinc-700 hover:text-zinc-900 cursor-pointer"
                        >
                          <span role="img" aria-label="folded hands">
                            🙏
                          </span>
                          <span>{displayLikes}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* 6. FOOTER — Pure Black (bg-black) with 2-Column Desktop Layout + Exact Google Maps Iframe */}
      <footer id="contact" className="bg-black pt-14 sm:pt-16 pb-12 border-t border-zinc-800 w-full overflow-x-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* LEFT SIDE: Gym Logo, Description, Address, Contact Number, Email, Quick Links, and Follow Us */}
            <div className="space-y-7 sm:space-y-8 min-w-0">
              <div>
                <a
                  href="#home"
                  className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white inline-block"
                >
                  Alpine Fitness <span className="text-[#A3E635]">Club & Supplements</span>
                </a>
                <p className="text-sm text-zinc-400 leading-relaxed mt-3 max-w-md">
                  Sri Dungargarh’s premier destination for strength training, athletic conditioning, personal coaching, and 100% genuine sports nutrition supplements.
                </p>
              </div>

              {/* Contact Details with FontAwesome Icons */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <i className="fa-solid fa-location-dot text-[#A3E635] mt-1 text-base shrink-0" aria-hidden="true"></i>
                  <div className="min-w-0">
                    <div className="font-semibold text-[#A3E635]">Club Address</div>
                    <div className="text-zinc-200 mt-0.5 break-words">
                      Gaurav Path Road, Near Chidpid Nath, Sri Dungargarh, Bikaner, Rajasthan 331803
                    </div>
                    <a
                      href={GMAPS_SHARE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#A3E635] hover:underline mt-1 font-medium"
                    >
                      <span>Open in Google Maps App</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <i className="fa-solid fa-phone text-[#A3E635] mt-1 text-base shrink-0" aria-hidden="true"></i>
                  <div>
                    <div className="font-semibold text-[#A3E635]">Phone & WhatsApp Desk</div>
                    <a
                      href={`tel:${PHONE_TEL}`}
                      className="font-mono-num text-zinc-100 hover:text-[#A3E635] transition-colors mt-0.5 inline-block"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <i className="fa-solid fa-envelope text-[#A3E635] mt-1 text-base shrink-0" aria-hidden="true"></i>
                  <div className="min-w-0">
                    <div className="font-semibold text-[#A3E635]">Email Inquiries</div>
                    <a
                      href="mailto:contact@alpinefitnessdungargarh.in"
                      className="text-zinc-200 hover:text-[#A3E635] transition-colors mt-0.5 inline-block break-all"
                    >
                      contact@alpinefitnessdungargarh.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <i className="fa-solid fa-clock text-[#A3E635] mt-1 text-base shrink-0" aria-hidden="true"></i>
                  <div>
                    <div className="font-semibold text-[#A3E635]">Operating Hours (Monday – Saturday)</div>
                    <div className="font-mono-num text-zinc-200 mt-0.5 text-xs sm:text-sm">
                      Morning: 5:00 AM – 9:00 AM &nbsp;|&nbsp; Evening: 5:00 PM – 11:00 PM
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">Sunday: Closed for deep sanitization & maintenance</div>
                  </div>
                </div>
              </div>

              {/* Quick Links & Direct Trial Action */}
              <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635] mb-2.5">Quick Links</div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-300">
                    <a href="#home" className="hover:text-[#A3E635] transition-colors">
                      Home
                    </a>
                    <a href="#gallery" className="hover:text-[#A3E635] transition-colors">
                      Gallery
                    </a>
                    <a href="#about" className="hover:text-[#A3E635] transition-colors">
                      About & Store
                    </a>
                    <a href="#memberships" className="hover:text-[#A3E635] transition-colors">
                      Memberships
                    </a>
                    <a href="#reviews" className="hover:text-[#A3E635] transition-colors">
                      Reviews
                    </a>
                    <button
                      type="button"
                      onClick={() => openTrialBooking()}
                      className="text-[#A3E635] hover:underline font-bold cursor-pointer"
                    >
                      Book Free Trial
                    </button>
                  </div>
                </div>
              </div>

              {/* Follow Us — Colorful Circular Social Media Icons */}
              <div className="pt-6 border-t border-zinc-800">
                <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635] mb-3">Follow Us</div>
                <div className="flex gap-4 justify-start items-center">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with Alpine Fitness on WhatsApp"
                    className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all shadow-md"
                  >
                    <i className="fa-brands fa-whatsapp text-white text-xl" aria-hidden="true"></i>
                  </a>

                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Alpine Fitness on Instagram"
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all shadow-md"
                  >
                    <i className="fa-brands fa-instagram text-white text-xl" aria-hidden="true"></i>
                  </a>

                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Alpine Fitness on Facebook"
                    className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all shadow-md"
                  >
                    <i className="fa-brands fa-facebook-f text-white text-xl" aria-hidden="true"></i>
                  </a>

                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Subscribe to Alpine Fitness on YouTube"
                    className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all shadow-md"
                  >
                    <i className="fa-brands fa-youtube text-white text-xl" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Exact Embedded Google Map for Alpine Fitness Club & Supplements */}
            <div className="w-full flex flex-col space-y-3 min-w-0">
              {/* Glowing Interactive Header with Pulse Animation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 rounded-xl bg-zinc-900/90 border border-[#A3E635]/40 shadow-[0_0_20px_rgba(163,230,53,0.12)]">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                  <span>📍 Live Gym Location - Gaurav Path Road</span>
                </div>

                <a
                  href={GMAPS_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-200 hover:text-[#A3E635] transition-colors"
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  <span>● Exact Gym Location Pinpoint below</span>
                </a>
              </div>

              {/* 100% Width, min-height 350px, rounded-xl, border-2 border-zinc-700 Map Container */}
              <div className="w-full min-h-[350px] h-[360px] sm:h-[390px] rounded-xl overflow-hidden border-2 border-zinc-700 bg-zinc-900 shadow-lg">
                <iframe
                  title="Alpine Fitness Club & Supplements, Gaurav Path Road, Near Chidpid Nath, Sri Dungargarh, Bikaner, Rajasthan 331803"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1130.4037583624!2d74.00441249999999!3d28.1884126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3915177819bd9de9%3A0x17ba06ee92ed75b4!2sAlpine%20Fitness%20Club%20%26%20Supplements!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full min-h-[350px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
            <div>
              © {new Date().getFullYear()} Alpine Fitness Club &amp; Supplements. All rights reserved.
            </div>
            <div>Gaurav Path Road, Near Chidpid Nath, Sri Dungargarh, Bikaner, Rajasthan</div>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE FREE TRIAL & MEMBERSHIP BOOKING MODAL */}
      {bookingModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-booking-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-xl bg-zinc-900 border border-[#A3E635]/50 p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635] mb-1">
                  Alpine Fitness Club & Supplements · Sri Dungargarh
                </div>
                <h3 id="modal-booking-title" className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                  Book Your Free Trial & Pass
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                aria-label="Close booking dialog"
                className="w-9 h-9 rounded-lg border border-zinc-700 text-zinc-400 hover:text-[#A3E635] hover:border-[#A3E635] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </div>

            {!bookingSubmitted ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="booking-plan" className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Selected Membership / Trial Plan
                  </label>
                  <select
                    id="booking-plan"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A3E635]"
                  >
                    <option value="1 Month — Monthly Flex Pass (₹1,500)">
                      1 Month — Monthly Flex Pass (₹1,500 + 1-Day Free Trial)
                    </option>
                    <option value="3 Months — Quarterly Transformation (₹3,800)">
                      3 Months — Quarterly Transformation (₹3,800 + Free Trial)
                    </option>
                    <option value="12 Months — Annual Athlete Elite (₹11,500)">
                      12 Months — Annual Athlete Elite (₹11,500 + Free Trial)
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-name" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      placeholder="e.g. Rohit Swami"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#A3E635]"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-phone" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      placeholder="e.g. 98290 XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 font-mono-num focus:outline-none focus:border-[#A3E635]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-batch" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Preferred Batch Timing
                    </label>
                    <select
                      id="booking-batch"
                      value={preferredBatch}
                      onChange={(e) => setPreferredBatch(e.target.value as typeof preferredBatch)}
                      className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A3E635]"
                    >
                      <option value="Morning (5:00 AM - 9:00 AM)">Morning (5:00 AM - 9:00 AM)</option>
                      <option value="Evening (5:00 PM - 11:00 PM)">Evening (5:00 PM - 11:00 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="booking-goal" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Primary Fitness Goal
                    </label>
                    <select
                      id="booking-goal"
                      value={fitnessGoal}
                      onChange={(e) => setFitnessGoal(e.target.value as typeof fitnessGoal)}
                      className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A3E635]"
                    >
                      <option value="Muscle Gain & Strength">Muscle Gain & Strength</option>
                      <option value="Fat Loss & Conditioning">Fat Loss & Conditioning</option>
                      <option value="Supplement Consultation">Supplement Consultation</option>
                    </select>
                  </div>
                </div>

                {formError && (
                  <div role="alert" className="text-xs text-red-400 flex items-center gap-2 pt-1">
                    <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
                    <span>{formError}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 px-5 rounded-lg bg-[#A3E635] text-black font-bold text-sm hover:bg-[#bef264] transition-all cursor-pointer"
                  >
                    Confirm Free Trial Slot
                  </button>

                  <a
                    href={getWhatsAppUrl(
                      `Namaste Alpine Fitness! I want to book a Free Trial.\nName: ${fullName || 'Guest'}\nPlan: ${selectedPlan}\nBatch: ${preferredBatch}\nGoal: ${fitnessGoal}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-zinc-700 hover:border-[#A3E635] text-xs font-bold text-white hover:text-[#A3E635] transition-colors whitespace-nowrap"
                  >
                    <i className="fa-brands fa-whatsapp text-sm text-[#A3E635]" aria-hidden="true"></i>
                    <span>Book via WhatsApp</span>
                  </a>
                </div>
              </form>
            ) : (
              <div className="space-y-5 py-2">
                <div className="p-4 rounded-lg bg-black border border-[#A3E635]/50 space-y-2">
                  <div className="flex items-center gap-2 text-[#A3E635] font-bold text-sm">
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    <span>Free Trial Pass Reserved for {fullName}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Show this confirmation at the Alpine Fitness Club desk on Gaurav Path Road, Near Chidpid Nath, Sri Dungargarh during your selected{' '}
                    <span className="text-white font-semibold">{preferredBatch}</span> window.
                  </p>
                  <div className="pt-2 text-xs font-mono-num text-zinc-400">
                    Plan: {selectedPlan} · Contact: {PHONE_DISPLAY}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={getWhatsAppUrl(
                      `Hi Alpine Fitness! I just reserved my Free Trial pass.\nName: ${fullName}\nPhone: ${phone}\nPlan: ${selectedPlan}\nBatch: ${preferredBatch}\nGoal: ${fitnessGoal}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#A3E635] text-black font-bold text-sm hover:bg-[#bef264] transition-all"
                  >
                    <i className="fa-brands fa-whatsapp text-base" aria-hidden="true"></i>
                    <span>Send Pass to Club WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="w-full sm:w-auto py-3 px-5 rounded-lg border border-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* IN-PAGE "WRITE A REVIEW" MODAL (NO EXTERNAL REDIRECT) */}
      {reviewModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-review-title"
          onClick={closeReviewModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-700 p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 id="modal-review-title" className="font-display text-2xl font-bold uppercase text-white leading-none">
                    Write a Review
                  </h3>
                  <div className="text-xs text-zinc-400 mt-1">
                    Alpine Fitness Club &amp; Supplements
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={closeReviewModal}
                aria-label="Close review modal"
                className="w-8 h-8 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </div>

            {reviewSuccess ? (
              <div className="py-8 px-4 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#A3E635]/20 border border-[#A3E635] text-[#A3E635] flex items-center justify-center mx-auto text-xl">
                  <i className="fa-solid fa-check" aria-hidden="true"></i>
                </div>
                <div className="text-base font-bold text-[#A3E635]">
                  Review submitted for moderation!
                </div>
                <p className="text-xs text-zinc-400">
                  Thank you for sharing your feedback with Alpine Fitness Club &amp; Supplements.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label htmlFor="reviewer-name" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="reviewer-name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    disabled={isSubmittingReview}
                    className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#A3E635]"
                  />
                </div>

                <div>
                  <label htmlFor="review-rating" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Rating (1 - 5 Stars) *
                  </label>
                  <select
                    id="review-rating"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    disabled={isSubmittingReview}
                    className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A3E635]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Excellent)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars - Very Good)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars - Good)</option>
                    <option value={2}>⭐⭐ (2 Stars - Fair)</option>
                    <option value={1}>⭐ (1 Star - Poor)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="review-comment" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Review Text *
                  </label>
                  <textarea
                    id="review-comment"
                    rows={4}
                    required
                    placeholder="Share your experience about our trainers, machines, hygiene, or supplements..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    disabled={isSubmittingReview}
                    className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#A3E635] resize-none"
                  />
                </div>

                {reviewFormError && (
                  <div role="alert" className="text-xs text-red-400 flex items-center gap-2">
                    <i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i>
                    <span>{reviewFormError}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeReviewModal}
                    disabled={isSubmittingReview}
                    className="px-4 py-2.5 rounded-lg border border-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="px-5 py-2.5 rounded-lg bg-[#A3E635] text-black text-xs sm:text-sm font-bold hover:bg-[#bef264] transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isSubmittingReview ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* PHOTO LIGHTBOX PREVIEW MODAL */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 border border-zinc-700 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-zinc-800">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#A3E635]">
                  {lightboxItem.subtitle}
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  {lightboxItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Close photo preview"
                className="w-8 h-8 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 flex items-center justify-center cursor-pointer"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
            <div className="bg-black flex items-center justify-center max-h-[75vh] overflow-hidden">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.alt}
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain block"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
