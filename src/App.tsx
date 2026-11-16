/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import heroGymImg from './assets/images/hero_gym_interior_1794801318333.jpg';
import supplementStoreImg from './assets/images/about_gym_supplements_1794801320086.jpg';
import strengthZoneImg from './assets/images/facility_strength_zone_1794801320690.jpg';

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

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  tenure: string;
  rating: number;
  outcome: string;
  quote: string;
}

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

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Vikram Singh Rathore',
    role: 'Business Owner, Sri Dungargarh',
    tenure: 'Member for 11 Months · 12-Month Plan',
    rating: 5,
    outcome: 'Lost 11.5 kg & improved deadlift to 160 kg in 6 months',
    quote:
      'Best gym on Gaurav Path Road by far. Before joining Alpine Fitness, I struggled with inconsistent home workouts. The cable stations, heavy dumbbells, and morning 5:30 AM batch vibe pushed my consistency, and their diet plan worked with my regular home food.',
  },
  {
    id: 'rev-2',
    name: 'Pradeep Sharma',
    role: 'Competitive Powerlifter & Athlete',
    tenure: 'Member for 8 Months · 3-Month Plan',
    rating: 5,
    outcome: 'Added 18 kg to bench press & verified 100% authentic supplements',
    quote:
      'Finding genuine supplements in Bikaner district used to be tough with so many duplicates in the market. At Alpine Fitness Club & Supplements, every protein tub has the official importer tag and scratch code. Heavy biomechanics machines are smooth and well-maintained.',
  },
  {
    id: 'rev-3',
    name: 'Ankit Bhargava',
    role: 'Bank Executive, Near Chidpid Nath',
    tenure: 'Member for 5 Months · 3-Month Plan',
    rating: 5,
    outcome: 'Dropped waist from 36" to 32" training in the 7:00 PM evening batch',
    quote:
      'The evening slot from 5:00 PM to 11:00 PM is ideal after office hours. Even during peak evening time, the ventilation, hygiene, and floor trainers are top-notch. Worth every rupee of the 4.6+ star reputation they have in Sri Dungargarh.',
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

  // Image error fallback flags
  const [heroImgError, setHeroImgError] = useState(false);
  const [aboutImgError, setAboutImgError] = useState(false);

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
    <div className="min-h-screen bg-[#090A0C] text-[#F4F5F6] flex flex-col">
      {/* 1. STICKY NAVBAR (Strict 3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 h-16 bg-[#090A0C]/90 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="font-display text-2xl sm:text-[26px] font-bold uppercase tracking-wider text-white hover:text-[#A3E635] transition-colors whitespace-nowrap shrink-0"
          >
            Alpine Fitness <span className="text-[#A3E635]">Club & Supplements</span>
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <a
              href="#home"
              className="hover:text-white underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-white underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#memberships"
              className="hover:text-white underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Memberships
            </a>
            <a
              href="#reviews"
              className="hover:text-white underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="hover:text-white underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#A3E635] text-[#090A0C] font-semibold text-sm hover:bg-[#bef264] transition-colors whitespace-nowrap shrink-0"
            >
              <i className="fa-brands fa-whatsapp text-base" aria-hidden="true"></i>
              <span>WhatsApp Us</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-800 text-neutral-200 hover:border-neutral-700 hover:text-white transition-colors"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-base`} aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111317] border-b border-neutral-800 px-4 pt-3 pb-5 space-y-3">
            <nav className="flex flex-col space-y-2.5 text-sm font-medium text-neutral-200">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                Home
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
                Member Reviews (4.6 ★)
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                Location & Contact
              </a>
            </nav>
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>Gaurav Path Road, Sri Dungargarh</span>
              <a href={`tel:${PHONE_TEL}`} className="text-[#A3E635] font-mono-num font-medium">
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section id="home" className="relative overflow-hidden border-b border-neutral-800/80">
          {/* Background Image with Measured Contrast Scrim & Resilient Fallback */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#090A0C] via-[#13171D] to-[#1A2112]">
            {!heroImgError ? (
              <img
                src={heroGymImg}
                alt="Alpine Fitness Club & Supplements main strength floor with power racks and calibrated weights"
                referrerPolicy="no-referrer"
                onError={() => setHeroImgError(true)}
                className="w-full h-full object-cover object-center opacity-55"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center opacity-20">
                <i className="fa-solid fa-dumbbell text-9xl text-[#A3E635]" aria-hidden="true"></i>
              </div>
            )}
            {/* Measured multi-stop scrim guaranteeing >4.5:1 text contrast */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#090A0C]/95 via-[#090A0C]/85 to-[#090A0C]/45"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-transparent to-[#090A0C]/60"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 pb-14 md:pt-24 md:pb-20">
            <div className="max-w-2xl">
              {/* Quiet unboxed metadata line (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium text-neutral-300 mb-4">
                <span className="text-[#A3E635] font-semibold">Sri Dungargarh, Bikaner</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>Gaurav Path Road, Near Chidpid Nath</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="font-mono-num text-amber-400">
                  <i className="fa-solid fa-star mr-1 text-xs" aria-hidden="true"></i>
                  4.6 Google Rated
                </span>
              </div>

              <h1
                className="font-display font-bold uppercase tracking-tight text-white leading-[1.03] mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', textWrap: 'balance' }}
              >
                Achieve Your Dream Physique at <span className="text-[#A3E635]">Alpine Fitness</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-[62ch]">
                Train on heavy-duty biomechanical strength machines and fuel your recovery at Sri Dungargarh’s most trusted in-house authentic supplement store. Built for serious lifters, beginners, and athletes alike.
              </p>

              {/* Single Dominant Primary CTA + Quiet Secondary Link */}
              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={() => openTrialBooking('3 Months — Quarterly Transformation (₹3,800)')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#A3E635] text-[#090A0C] font-bold text-base hover:bg-[#bef264] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Join Now</span>
                  <i className="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
                </button>

                <a
                  href="#about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-200 hover:text-[#A3E635] transition-colors py-2 whitespace-nowrap shrink-0"
                >
                  <span>Explore Facility & Supplements</span>
                  <i className="fa-solid fa-chevron-down text-xs" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            {/* Full-Width 4-Column Operational & Proof Strip below Hero content */}
            <div className="mt-14 pt-8 border-t border-neutral-800/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="text-xs font-medium text-neutral-400 mb-1">Operating Days & Morning Batch</div>
                <div className="font-mono-num text-sm sm:text-base font-semibold text-white">
                  Mon – Sat · 5:00 AM – 9:00 AM
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">Dedicated morning strength & cardio coaching</div>
              </div>

              <div>
                <div className="text-xs font-medium text-neutral-400 mb-1">Evening Peak Training Batch</div>
                <div className="font-mono-num text-sm sm:text-base font-semibold text-white">
                  Mon – Sat · 5:00 PM – 11:00 PM
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">Extended late-evening hours for working professionals</div>
              </div>

              <div>
                <div className="text-xs font-medium text-neutral-400 mb-1">In-House Nutrition Store</div>
                <div className="text-sm sm:text-base font-semibold text-[#A3E635]">
                  100% Importer-Verified Supplements
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">Scratch-code verified Whey, Creatine, BCAA & Pre</div>
              </div>

              <div>
                <div className="text-xs font-medium text-neutral-400 mb-1">Direct Club Desk</div>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="font-mono-num text-sm sm:text-base font-semibold text-white hover:text-[#A3E635] transition-colors inline-flex items-center gap-2"
                >
                  <i className="fa-solid fa-phone text-xs text-[#A3E635]" aria-hidden="true"></i>
                  <span>{PHONE_DISPLAY}</span>
                </a>
                <div className="text-xs text-neutral-400 mt-0.5">Near Chidpid Nath, Gaurav Path Road</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ABOUT & FACILITIES SECTION (2-Column Balanced Split + Supplement Showcase) */}
        <section id="about" className="py-20 md:py-24 border-b border-neutral-800/80">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-semibold text-[#A3E635] tracking-wide mb-2">
                01. Facility, Timings & Authentic Nutrition
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-4"
                style={{ textWrap: 'balance' }}
              >
                Engineered for Serious Training & Genuine Recovery Under One Roof
              </h2>
              <p className="text-neutral-300 text-base leading-relaxed">
                Located on Gaurav Path Road near Chidpid Nath in Sri Dungargarh, Alpine Fitness Club & Supplements combines commercial-grade iron with Rajasthan’s most reliable source for genuine sports nutrition.
              </p>
            </div>

            {/* 2-Column Layout (Text & Interactive Switcher on Left, Full-Height Visual on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left Column: Detailed Facility Breakdown */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
                {/* Interactive Segmented Control to Inspect Facility Highlights */}
                <div
                  role="tablist"
                  aria-label="Facility sections"
                  className="flex items-center gap-1 p-1 bg-[#12151B] border border-neutral-800 rounded-lg w-fit max-w-full overflow-x-auto"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeFacilityTab === 'equipment'}
                    onClick={() => setActiveFacilityTab('equipment')}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeFacilityTab === 'equipment'
                        ? 'bg-[#A3E635] text-[#090A0C]'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    Strength & Cardio Floor
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeFacilityTab === 'supplements'}
                    onClick={() => setActiveFacilityTab('supplements')}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeFacilityTab === 'supplements'
                        ? 'bg-[#A3E635] text-[#090A0C]'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    Authentic Supplement Store
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeFacilityTab === 'timings'}
                    onClick={() => setActiveFacilityTab('timings')}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeFacilityTab === 'timings'
                        ? 'bg-[#A3E635] text-[#090A0C]'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    Batch Timings & Coaching
                  </button>
                </div>

                {/* Dynamic Content Based on Selected Tab */}
                {activeFacilityTab === 'equipment' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold uppercase text-white mb-2">
                        Heavy-Duty Biomechanical Machines & Free Weights
                      </h3>
                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                        Every station on our floor is calibrated for smooth resistance curves and joint-safe hypertrophy. No waiting in long queues during peak hours—we stock multiple Olympic benches, squat racks, and a complete dumbbell run.
                      </p>
                    </div>

                    <div className="space-y-4 pt-2 border-t border-neutral-800/80">
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">Olympic Power Racks & Deadlifting Platforms</div>
                          <div className="text-xs text-neutral-400 mt-0.5">
                            Heavy rubberized shock-absorbing flooring for heavy compound lifts, squats, and rack pulls.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">Dual-Pulley Cable Crossovers & Isolation Stations</div>
                          <div className="text-xs text-neutral-400 mt-0.5">
                            Lat pulldowns, seated rows, pec dec flyes, leg press, hack squat, and hamstring curl machines.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">Endurance Cardio & Functional Conditioning Zone</div>
                          <div className="text-xs text-neutral-400 mt-0.5">
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
                      <h3 className="font-display text-2xl font-bold uppercase text-white mb-2">
                        100% Authentic, Direct-from-Importer Supplement Store
                      </h3>
                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                        Never risk your health with unverified online sellers. Our counter inside Alpine Fitness stocks sealed, batch-verified sports supplements with official importer holograms and GST billing.
                      </p>
                    </div>

                    <div className="space-y-4 pt-2 border-t border-neutral-800/80">
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">Live Scratch-Code Verification at Counter</div>
                          <div className="text-xs text-neutral-400 mt-0.5">
                            Verify your Whey Isolate, Concentrate, or Mass Gainer authenticity right at the desk before opening.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">Goal-Specific Stack Guidance (No Hard Selling)</div>
                          <div className="text-xs text-neutral-400 mt-0.5">
                            Our head coach recommends only what fits your blood work, digestion, and budget—whether Creatine, Whey, or Multi-vitamins.
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">Exclusive Up to 18% Club Member Rebate</div>
                          <div className="text-xs text-neutral-400 mt-0.5">
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
                      <h3 className="font-display text-2xl font-bold uppercase text-white mb-2">
                        Two Dedicated Training Windows (Monday – Saturday)
                      </h3>
                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                        Our split schedule ensures the gym floor is sanitized, equipment is inspected twice daily, and certified floor trainers are present throughout every active hour.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-[#12151B] border border-neutral-800">
                        <div className="text-xs font-medium text-[#A3E635] mb-1">Morning Batch (Mon – Sat)</div>
                        <div className="font-mono-num text-lg font-bold text-white">5:00 AM – 9:00 AM</div>
                        <p className="text-xs text-neutral-400 mt-1.5">
                          High-energy morning sessions, fasted cardio support, and focused compound strength supervision.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#12151B] border border-neutral-800">
                        <div className="text-xs font-medium text-amber-400 mb-1">Evening Batch (Mon – Sat)</div>
                        <div className="font-mono-num text-lg font-bold text-white">5:00 PM – 11:00 PM</div>
                        <p className="text-xs text-neutral-400 mt-1.5">
                          6 full hours of evening access—perfect for students, traders, and professionals across Sri Dungargarh.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Always-Visible Facility Timings & Location Summary Strip */}
                <div className="p-5 rounded-xl bg-[#12151B] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-neutral-400">Club Timings & Location</div>
                    <div className="text-sm font-semibold text-white">
                      Mon–Sat: <span className="font-mono-num text-[#A3E635]">5:00 AM – 9:00 AM</span> &amp;{' '}
                      <span className="font-mono-num text-[#A3E635]">5:00 PM – 11:00 PM</span>
                    </div>
                    <div className="text-xs text-neutral-400">
                      <i className="fa-solid fa-location-dot text-[#A3E635] mr-1.5" aria-hidden="true"></i>
                      Gaurav Path Road, Near Chidpid Nath, Sri Dungargarh
                    </div>
                  </div>

                  <a
                    href={GMAPS_SHARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-700 hover:border-[#A3E635] text-xs font-semibold text-white hover:text-[#A3E635] transition-colors whitespace-nowrap shrink-0"
                  >
                    <i className="fa-solid fa-map-location-dot" aria-hidden="true"></i>
                    <span>Directions</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Attractive Visual Showcase (Matches Height of Left Column) */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="relative flex-1 min-h-[340px] lg:min-h-full rounded-xl overflow-hidden border border-neutral-800 bg-[#12151B]">
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
                    <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                      <i className="fa-solid fa-dumbbell text-6xl text-neutral-700" aria-hidden="true"></i>
                    </div>
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/90 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium text-[#A3E635]">
                        {activeFacilityTab === 'supplements'
                          ? 'Authorized Nutrition Counter · Sri Dungargarh'
                          : 'Main Iron & Biomechanics Zone · Gaurav Path Road'}
                      </div>
                      <div className="font-display text-xl font-bold uppercase text-white mt-0.5">
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
                      className="px-3.5 py-2 rounded-lg bg-[#090A0C]/85 border border-neutral-700 text-xs font-medium text-neutral-200 hover:text-[#A3E635] hover:border-[#A3E635] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Switch View
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive In-Store Supplement Catalog Preview */}
            <div className="mt-16 pt-12 border-t border-neutral-800/80">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <div className="text-xs font-semibold text-amber-400 mb-1">In-Club Nutrition Counter</div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                    Popular Authentic Supplements in Stock
                  </h3>
                </div>

                {/* Interactive Category Filter Buttons */}
                <div className="flex items-center gap-1 p-1 bg-[#12151B] border border-neutral-800 rounded-lg w-fit overflow-x-auto max-w-full">
                  <button
                    type="button"
                    onClick={() => setSupplementFilter('all')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      supplementFilter === 'all'
                        ? 'bg-neutral-800 text-white'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    All Stock
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupplementFilter('protein')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      supplementFilter === 'protein'
                        ? 'bg-neutral-800 text-white'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Whey Protein
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupplementFilter('creatine')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      supplementFilter === 'creatine'
                        ? 'bg-neutral-800 text-white'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Creatine
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupplementFilter('preworkout')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      supplementFilter === 'preworkout'
                        ? 'bg-neutral-800 text-white'
                        : 'text-neutral-400 hover:text-neutral-200'
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
                    className="p-5 rounded-xl bg-[#12151B] border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors"
                  >
                    <div>
                      <div className="text-xs text-neutral-400 mb-1.5">
                        <span>{item.categoryLabel}</span>
                        <span aria-hidden="true" className="mx-1.5">·</span>
                        <span className="font-mono-num">{item.weight}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">{item.name}</h4>
                      <p className="text-xs text-neutral-400 leading-relaxed mb-4">{item.highlights}</p>
                    </div>

                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[11px] text-neutral-400">Member Price</div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono-num text-lg font-bold text-[#A3E635]">{item.memberPrice}</span>
                          <span className="font-mono-num text-xs text-neutral-500 line-through">{item.mrp}</span>
                        </div>
                      </div>

                      <a
                        href={getWhatsAppUrl(
                          `Hi Alpine Fitness! I want to check stock and price for ${item.name} (${item.weight}) at your Sri Dungargarh store.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-lg border border-neutral-700 hover:border-[#A3E635] text-xs font-semibold text-white hover:text-[#A3E635] transition-colors whitespace-nowrap shrink-0"
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

        {/* 4. PRICING & BOOKING (DEMO) SECTION */}
        <section id="memberships" className="py-20 md:py-24 bg-[#0C0E12] border-b border-neutral-800/80">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <div className="text-xs font-semibold text-[#A3E635] tracking-wide mb-2">
                  02. Memberships & Free Trial Booking
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-3"
                  style={{ textWrap: 'balance' }}
                >
                  Transparent Membership Plans with Zero Hidden Fees
                </h2>
                <p className="text-neutral-300 text-base">
                  Every membership includes access to both strength and cardio zones, personal trainer floor guidance, and member-only discounts at our supplement counter. Not sure yet? Book a 1-day Free Trial first.
                </p>
              </div>

              <div className="text-xs text-neutral-400 font-mono-num shrink-0">
                Morning (5–9 AM) / Evening (5–11 PM)
              </div>
            </div>

            {/* 3 Modern Pricing Cards with Hover Scale Effects */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {PRICING_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-xl p-7 sm:p-8 flex flex-col justify-between transition-transform duration-200 hover:scale-[1.02] ${
                    plan.highlight
                      ? 'bg-[#14191F] border-2 border-[#A3E635]'
                      : 'bg-[#12151B] border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div>
                    {/* Quiet 1-line text kicker (No Pill Sandwich) */}
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold mb-3">
                      <span className={plan.highlight ? 'text-[#A3E635]' : 'text-neutral-400'}>{plan.kicker}</span>
                      <span className="font-mono-num text-neutral-300">{plan.duration}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white mb-2">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-6">{plan.description}</p>

                    <div className="pb-6 mb-6 border-b border-neutral-800">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono-num text-4xl sm:text-5xl font-bold text-white">{plan.price}</span>
                        <span className="text-xs text-neutral-400">/ {plan.duration.toLowerCase()}</span>
                      </div>
                      <div className="font-mono-num text-xs text-[#A3E635] mt-1.5">{plan.perMonthNote}</div>
                    </div>

                    <ul className="space-y-3.5 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-neutral-200">
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
                    className={`w-full py-3.5 px-5 rounded-lg font-bold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      plan.highlight
                        ? 'bg-[#A3E635] text-[#090A0C] hover:bg-[#bef264]'
                        : 'bg-neutral-800 text-white hover:bg-[#A3E635] hover:text-[#090A0C]'
                    }`}
                  >
                    Book Free Trial
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. TESTIMONIALS (REVIEWS) SECTION */}
        <section id="reviews" className="py-20 md:py-24 border-b border-neutral-800/80">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <div className="text-xs font-semibold text-[#A3E635] tracking-wide mb-2">
                  03. Verified Member Outcomes
                </div>
                <h2
                  className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-3"
                  style={{ textWrap: 'balance' }}
                >
                  Rated 4.6 Stars by Lifters Across Sri Dungargarh
                </h2>
                <p className="text-neutral-300 text-base">
                  Real transformations and honest feedback from members training at our Gaurav Path Road facility.
                </p>
              </div>

              {/* Unboxed Google Rating Summary Link */}
              <div className="flex flex-col sm:items-end shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-400 text-sm" aria-label="4.6 out of 5 stars">
                    <i className="fa-solid fa-star" aria-hidden="true"></i>
                    <i className="fa-solid fa-star" aria-hidden="true"></i>
                    <i className="fa-solid fa-star" aria-hidden="true"></i>
                    <i className="fa-solid fa-star" aria-hidden="true"></i>
                    <i className="fa-solid fa-star-half-stroke" aria-hidden="true"></i>
                  </div>
                  <span className="font-mono-num text-lg font-bold text-white">4.6 / 5.0</span>
                </div>
                <a
                  href={GMAPS_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-400 hover:text-[#A3E635] underline underline-offset-4 mt-1 transition-colors"
                >
                  View Alpine Fitness on Google Maps
                </a>
              </div>
            </div>

            {/* 3 Review Cards with 5-Star Ratings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
              {REVIEWS.map((review) => (
                <article
                  key={review.id}
                  className="rounded-xl p-7 bg-[#12151B] border border-neutral-800 flex flex-col justify-between"
                >
                  <div>
                    {/* 5-Star Rating Row */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1 text-amber-400 text-xs" aria-label="5 star rating">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <i key={i} className="fa-solid fa-star" aria-hidden="true"></i>
                        ))}
                      </div>
                      <span className="text-xs text-neutral-400">Verified Member</span>
                    </div>

                    {/* Quantified Member Outcome */}
                    <div className="text-xs font-semibold text-[#A3E635] mb-3">{review.outcome}</div>

                    <p className="text-sm text-neutral-200 leading-relaxed mb-6">“{review.quote}”</p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800/80">
                    <div className="text-sm font-bold text-white">{review.name}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      <span>{review.role}</span>
                      <span aria-hidden="true" className="mx-1.5">·</span>
                      <span>{review.tenure}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 6. FOOTER (Specific 2-Column Desktop Layout + Interactive Google Maps Iframe) */}
      <footer id="contact" className="bg-[#07080A] pt-16 pb-12 border-t border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT SIDE: Gym Logo, Description, Address, Contact Number, Email, and Quick Links */}
            <div className="space-y-8">
              <div>
                <a
                  href="#home"
                  className="font-display text-3xl font-bold uppercase tracking-wider text-white inline-block"
                >
                  Alpine Fitness <span className="text-[#A3E635]">Club & Supplements</span>
                </a>
                <p className="text-sm text-neutral-400 leading-relaxed mt-3 max-w-md">
                  Sri Dungargarh’s premier destination for strength training, athletic conditioning, personal coaching, and 100% genuine sports nutrition supplements.
                </p>
              </div>

              {/* Contact Details with FontAwesome Icons */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <i className="fa-solid fa-location-dot text-[#A3E635] mt-1 text-base shrink-0" aria-hidden="true"></i>
                  <div>
                    <div className="font-semibold text-white">Club Address</div>
                    <div className="text-neutral-300 mt-0.5">
                      Gaurav Path Road, Near Chidpid Nath, Sri Dungargarh, Bikaner, Rajasthan 331803
                    </div>
                    <a
                      href={GMAPS_SHARE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#A3E635] hover:underline mt-1"
                    >
                      <span>Open in Google Maps App</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <i className="fa-solid fa-phone text-[#A3E635] mt-1 text-base shrink-0" aria-hidden="true"></i>
                  <div>
                    <div className="font-semibold text-white">Phone & WhatsApp Desk</div>
                    <a
                      href={`tel:${PHONE_TEL}`}
                      className="font-mono-num text-neutral-200 hover:text-[#A3E635] transition-colors mt-0.5 inline-block"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <i className="fa-solid fa-envelope text-[#A3E635] mt-1 text-base shrink-0" aria-hidden="true"></i>
                  <div>
                    <div className="font-semibold text-white">Email Inquiries</div>
                    <a
                      href="mailto:contact@alpinefitnessdungargarh.in"
                      className="text-neutral-300 hover:text-[#A3E635] transition-colors mt-0.5 inline-block"
                    >
                      contact@alpinefitnessdungargarh.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <i className="fa-solid fa-clock text-[#A3E635] mt-1 text-base shrink-0" aria-hidden="true"></i>
                  <div>
                    <div className="font-semibold text-white">Operating Hours (Monday – Saturday)</div>
                    <div className="font-mono-num text-neutral-300 mt-0.5">
                      Morning: 5:00 AM – 9:00 AM &nbsp;|&nbsp; Evening: 5:00 PM – 11:00 PM
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">Sunday: Closed for deep sanitization & maintenance</div>
                  </div>
                </div>
              </div>

              {/* Quick Links & Direct Trial Action */}
              <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-semibold text-neutral-400 mb-2.5">Quick Links</div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-300">
                    <a href="#home" className="hover:text-[#A3E635] transition-colors">
                      Home
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
                      className="text-[#A3E635] hover:underline font-medium cursor-pointer"
                    >
                      Book Free Trial
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Interactive Google Maps Iframe pointing to Sri Dungargarh, Bikaner, Rajasthan */}
            <div className="w-full flex flex-col space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>
                  <i className="fa-solid fa-map-pin text-[#A3E635] mr-1.5" aria-hidden="true"></i>
                  Interactive Map — Sri Dungargarh, Bikaner, Rajasthan
                </span>
                <a
                  href={GMAPS_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A3E635] hover:underline font-medium"
                >
                  Exact Pin Link
                </a>
              </div>

              <div className="w-full h-[340px] sm:h-[380px] rounded-xl overflow-hidden border border-neutral-800 bg-[#12151B]">
                <iframe
                  title="Alpine Fitness Club & Supplements - Sri Dungargarh Location Map"
                  src="https://maps.google.com/maps?q=Gaurav+Path+Road,+Sri+Dungargarh,+Bikaner,+Rajasthan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-xl bg-[#12151B] border border-neutral-700 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className="text-xs font-semibold text-[#A3E635] mb-1">
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
                className="w-9 h-9 rounded-lg border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </div>

            {!bookingSubmitted ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="booking-plan" className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Selected Membership / Trial Plan
                  </label>
                  <select
                    id="booking-plan"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full rounded-lg bg-[#090A0C] border border-neutral-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A3E635]"
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
                    <label htmlFor="booking-name" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      placeholder="e.g. Rohit Swami"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-lg bg-[#090A0C] border border-neutral-700 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#A3E635]"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-phone" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      placeholder="e.g. 98290 XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg bg-[#090A0C] border border-neutral-700 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 font-mono-num focus:outline-none focus:border-[#A3E635]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-batch" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Preferred Batch Timing
                    </label>
                    <select
                      id="booking-batch"
                      value={preferredBatch}
                      onChange={(e) => setPreferredBatch(e.target.value as typeof preferredBatch)}
                      className="w-full rounded-lg bg-[#090A0C] border border-neutral-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A3E635]"
                    >
                      <option value="Morning (5:00 AM - 9:00 AM)">Morning (5:00 AM - 9:00 AM)</option>
                      <option value="Evening (5:00 PM - 11:00 PM)">Evening (5:00 PM - 11:00 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="booking-goal" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Primary Fitness Goal
                    </label>
                    <select
                      id="booking-goal"
                      value={fitnessGoal}
                      onChange={(e) => setFitnessGoal(e.target.value as typeof fitnessGoal)}
                      className="w-full rounded-lg bg-[#090A0C] border border-neutral-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A3E635]"
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
                    className="w-full sm:flex-1 py-3 px-5 rounded-lg bg-[#A3E635] text-[#090A0C] font-bold text-sm hover:bg-[#bef264] transition-colors cursor-pointer"
                  >
                    Confirm Free Trial Slot
                  </button>

                  <a
                    href={getWhatsAppUrl(
                      `Namaste Alpine Fitness! I want to book a Free Trial.\nName: ${fullName || 'Guest'}\nPlan: ${selectedPlan}\nBatch: ${preferredBatch}\nGoal: ${fitnessGoal}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-neutral-700 hover:border-[#A3E635] text-xs font-semibold text-white hover:text-[#A3E635] transition-colors whitespace-nowrap"
                  >
                    <i className="fa-brands fa-whatsapp text-sm text-[#A3E635]" aria-hidden="true"></i>
                    <span>Book via WhatsApp</span>
                  </a>
                </div>
              </form>
            ) : (
              <div className="space-y-5 py-2">
                <div className="p-4 rounded-lg bg-[#090A0C] border border-[#A3E635]/40 space-y-2">
                  <div className="flex items-center gap-2 text-[#A3E635] font-semibold text-sm">
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    <span>Free Trial Pass Reserved for {fullName}</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Show this confirmation at the Alpine Fitness Club desk on Gaurav Path Road, Near Chidpid Nath, Sri Dungargarh during your selected{' '}
                    <span className="text-white font-semibold">{preferredBatch}</span> window.
                  </p>
                  <div className="pt-2 text-xs font-mono-num text-neutral-400">
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
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#A3E635] text-[#090A0C] font-bold text-sm hover:bg-[#bef264] transition-colors"
                  >
                    <i className="fa-brands fa-whatsapp text-base" aria-hidden="true"></i>
                    <span>Send Pass to Club WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="w-full sm:w-auto py-3 px-5 rounded-lg border border-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
