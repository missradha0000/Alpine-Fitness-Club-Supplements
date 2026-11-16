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

type Language = 'en' | 'hi';

interface PricingPlan {
  id: string;
  durationEn: string;
  durationHi: string;
  titleEn: string;
  titleHi: string;
  price: string;
  perMonthNoteEn: string;
  perMonthNoteHi: string;
  descriptionEn: string;
  descriptionHi: string;
  highlight?: boolean;
  kickerEn: string;
  kickerHi: string;
  featuresEn: string[];
  featuresHi: string[];
}

interface SupplementItem {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'protein' | 'creatine' | 'preworkout';
  categoryLabelEn: string;
  categoryLabelHi: string;
  weightEn: string;
  weightHi: string;
  memberPrice: string;
  mrp: string;
  highlightsEn: string;
  highlightsHi: string;
}

interface GoogleReviewItem {
  id: string;
  name: string;
  reviewCountTextEn: string;
  reviewCountTextHi: string;
  initial: string;
  avatarBg: string;
  rating: number;
  timeAgoEn: string;
  timeAgoHi: string;
  textHi: string;
  textEn: string;
  translatedNoteHi: string;
  translatedNoteEn: string;
  likesCount: number;
}

interface GalleryItem {
  id: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  image: string;
  alt: string;
  isRealPhoto?: boolean;
}

interface HeroSlideItem {
  id: string;
  image: string;
  alt: string;
  kickerEn: string;
  kickerHi: string;
  headlineTopEn: string;
  headlineTopHi: string;
  headlineBottomEn: string;
  headlineBottomHi: string;
  accentColor: 'orange' | 'lime';
  subtextEn: string;
  subtextHi: string;
  ctaLabelEn: string;
  ctaLabelHi: string;
  badgeTextEn: string;
  badgeTextHi: string;
}

const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'hero-banner-1',
    image: heroBannerStrengthAthleteImg,
    alt: 'Alpine Fitness Club Sri Dungargarh — No Pain No Gain strength training banner',
    kickerEn: 'ALPINE FITNESS CLUB • SRI DUNGARGARH',
    kickerHi: 'अल्पाइन फिटनेस क्लब • श्री डूंगरगढ़',
    headlineTopEn: 'NO PAIN',
    headlineTopHi: 'नो पेन',
    headlineBottomEn: 'NO GAIN',
    headlineBottomHi: 'नो गेन',
    accentColor: 'orange',
    subtextEn: 'Apni best body banao — Pehla din Trial FREE! Certified Trainers & Heavy Machines.',
    subtextHi: 'अपनी बेस्ट बॉडी बनाओ — पहले दिन का ट्रायल बिल्कुल फ्री! एक्सपर्ट ट्रेनर्स और आधुनिक मशीनें।',
    ctaLabelEn: 'JOIN NOW',
    ctaLabelHi: 'अभी जॉइन करें',
    badgeTextEn: '4.6 ★ Rating • 1000+ Members',
    badgeTextHi: '4.6 ★ रेटिंग • 1000+ मेंबर्स',
  },
  {
    id: 'hero-banner-2',
    image: heroBannerSupplementProImg,
    alt: 'Alpine Fitness Supplement Store — 100% Original Whey Protein, Gainer & Creatine',
    kickerEn: 'AUTHORIZED NUTRITION STORE • GAURAV PATH ROAD',
    kickerHi: 'अधिकृत न्यूट्रिशन स्टोर • गौरव पथ रोड',
    headlineTopEn: 'SUPPLEMENT',
    headlineTopHi: 'सप्लीमेंट',
    headlineBottomEn: 'STORE',
    headlineBottomHi: 'स्टोर',
    accentColor: 'lime',
    subtextEn: '100% Original Importer-Verified Whey Protein, Mass Gainer, Creatine & Pre-Workout.',
    subtextHi: '100% ओरिजिनल और इम्पोर्टर-वेरिफाइड व्हे प्रोटीन, मास गेनर, क्रिएटिन और प्री-वर्कआउट।',
    ctaLabelEn: 'SHOP NOW',
    ctaLabelHi: 'स्टोर देखें',
    badgeTextEn: 'Up to 18% Member Discount',
    badgeTextHi: 'मेंबर्स को 18% तक विशेष छूट',
  },
  {
    id: 'hero-banner-3',
    image: galleryCableWorkoutImg,
    alt: 'Alpine Fitness Club — Build Your Dream Body cable crossover and hypertrophy zone',
    kickerEn: 'MODERN BIOMECHANICAL MACHINES • BIKANER',
    kickerHi: 'आधुनिक बायोमैकेनिकल मशीनें • श्री डूंगरगढ़',
    headlineTopEn: 'BUILD YOUR',
    headlineTopHi: 'बनाएं अपनी',
    headlineBottomEn: 'DREAM BODY',
    headlineBottomHi: 'ड्रीम बॉडी',
    accentColor: 'orange',
    subtextEn: 'Weight Loss • Muscle Gain • Personal Training with dedicated batches for Boys & Girls.',
    subtextHi: 'वेट लॉस • मसल गेन • पर्सनल ट्रेनिंग — लड़कों और लड़कियों दोनों के लिए सुरक्षित और बेहतरीन व्यवस्था।',
    ctaLabelEn: 'BOOK FREE TRIAL',
    ctaLabelHi: 'फ्री ट्रायल बुक करें',
    badgeTextEn: 'Morning & Evening Batches',
    badgeTextHi: 'सुबह और शाम के बैच उपलब्ध',
  },
  {
    id: 'hero-banner-4',
    image: galleryDumbbellsImg,
    alt: 'Alpine Fitness Club — Train Hard Stay Strong heavy dumbbell rack and free weights',
    kickerEn: 'HEAVY FREE WEIGHTS & POWER RACKS',
    kickerHi: 'हैवी डंबल रैक और पावर रैक्स',
    headlineTopEn: 'TRAIN HARD',
    headlineTopHi: 'कड़ी मेहनत',
    headlineBottomEn: 'STAY STRONG',
    headlineBottomHi: 'मजबूत शरीर',
    accentColor: 'lime',
    subtextEn: 'Full Calibrated Dumbbell Rack (2.5kg to 50kg), Olympic Squat Racks & Deadlifting Platform.',
    subtextHi: '2.5 किलो से 50 किलो तक पूरा डंबल रैक, ओलंपिक स्क्वैट रैक्स और डेडलिफ्टिंग प्लेटफॉर्म।',
    ctaLabelEn: 'START TODAY',
    ctaLabelHi: 'आज ही शुरू करें',
    badgeTextEn: '4.6 ★ Google Rated Club',
    badgeTextHi: '4.6 ★ गूगल रेटेड क्लब',
  },
  {
    id: 'hero-banner-5',
    image: heroGymImg,
    alt: 'Alpine Fitness Club — Push Your Limits main strength and conditioning floor',
    kickerEn: 'NEAR CHIDPID NATH • SRI DUNGARGARH',
    kickerHi: 'चिड़पिड़ नाथ के पास • गौरव पथ रोड',
    headlineTopEn: 'PUSH YOUR',
    headlineTopHi: 'अपनी क्षमता',
    headlineBottomEn: 'LIMITS',
    headlineBottomHi: 'को बढ़ाएं',
    accentColor: 'orange',
    subtextEn: 'Clean, safe aur friendly environment. Transform your fitness journey daily with expert coaches.',
    subtextHi: 'साफ-सुथरा, सुरक्षित और फ्रेंडली माहौल। अनुभवी कोच के साथ रोज़ाना अपनी फिटनेस को नई ऊंचाई दें।',
    ctaLabelEn: 'JOIN NOW',
    ctaLabelHi: 'अभी जुड़ें',
    badgeTextEn: 'Mon–Sat: 5–9 AM & 5–11 PM',
    badgeTextHi: 'सोम–शनि: सुबह 5–9 व शाम 5–11',
  },
];

// First 8 images: Cleanly cropped & sharpened Real Gym Photos
// Next 6 images: High-quality studio gym & supplement photos
const GALLERY_ITEMS: GalleryItem[] = [
  // 8 Real Gym Photos FIRST
  {
    id: 'real-1',
    titleEn: 'Alpine Supplement Store Counter',
    titleHi: 'अल्पाइन सप्लीमेंट स्टोर काउंटर',
    subtitleEn: 'Real Club Photo · MuscleTech & Mass Gainers',
    subtitleHi: 'असली जिम फोटो · 100% ओरिजिनल सप्लीमेंट्स',
    image: '/club-real-1.jpg',
    alt: 'Real photo of Alpine Fitness Supplement Store shelves and counter in Sri Dungargarh',
    isRealPhoto: true,
  },
  {
    id: 'real-2',
    titleEn: 'Main Bench & Squat Rack Zone',
    titleHi: 'मेन बेंच और स्क्वैट रैक ज़ोन',
    subtitleEn: 'Real Club Photo · Alpine Fitness Floor',
    subtitleHi: 'असली जिम फोटो · मुख्य स्ट्रेंथ फ्लोर',
    image: '/club-real-2.jpg',
    alt: 'Real photo of Alpine Fitness Club incline bench press and squat rack floor',
    isRealPhoto: true,
  },
  {
    id: 'real-3',
    titleEn: 'WG10 Functional Cable Crossover',
    titleHi: 'WG10 फंक्शनल केबल क्रॉसओवर',
    subtitleEn: 'Real Club Photo · Multi-Pulley Station',
    subtitleHi: 'असली जिम फोटो · मल्टी-पुली स्टेशन',
    image: '/club-real-3.jpg',
    alt: 'Real photo of Wellness Gym WG10 FT30 cable crossover station at Alpine Fitness',
    isRealPhoto: true,
  },
  {
    id: 'real-4',
    titleEn: 'Heavy Hex & Urethane Dumbbell Rack',
    titleHi: 'हैवी डंबल रैक (Wellness Gym)',
    subtitleEn: 'Real Club Photo · Wellness Gym Series',
    subtitleHi: 'असली जिम फोटो · वेलनेस जिम सीरीज़',
    image: '/club-real-4.jpg',
    alt: 'Real photo of heavy dumbbell rack at Alpine Fitness Club Sri Dungargarh',
    isRealPhoto: true,
  },
  {
    id: 'real-5',
    titleEn: 'Heavy 45° Plate-Loaded Leg Press',
    titleHi: 'हैवी 45° प्लेट-लोडेड लेग प्रेस',
    subtitleEn: 'Real Club Photo · Lower Body Hypertrophy',
    subtitleHi: 'असली जिम फोटो · लेग वर्कआउट मशीन',
    image: '/club-real-5.jpg',
    alt: 'Real photo of angled leg press station at Alpine Fitness Club',
    isRealPhoto: true,
  },
  {
    id: 'real-6',
    titleEn: 'Lat Pulldown & Seated Row Machine',
    titleHi: 'लैट पुलडाउन और सीटेड रो मशीन',
    subtitleEn: 'Real Club Photo · Back Isolation Station',
    subtitleHi: 'असली जिम फोटो · बैक वर्कआउट स्टेशन',
    image: '/club-real-6.jpg',
    alt: 'Real photo of commercial lat pulldown machine at Alpine Fitness Club',
    isRealPhoto: true,
  },
  {
    id: 'real-7',
    titleEn: 'Mirrored Free-Weight & Machine Hall',
    titleHi: 'मिरर वर्कआउट और मशीन हॉल',
    subtitleEn: 'Real Club Photo · Spacious Training Bay',
    subtitleHi: 'असली जिम फोटो · हवादार ट्रेनिंग हॉल',
    image: '/club-real-7.jpg',
    alt: 'Real photo of Alpine Fitness mirrored training hall and benches',
    isRealPhoto: true,
  },
  {
    id: 'real-8',
    titleEn: 'Complete Commercial Dumbbell Lineup',
    titleHi: 'कम्पलीट कमर्शियल डंबल सेटअप',
    subtitleEn: 'Real Club Photo · Free Weights Area',
    subtitleHi: 'असली जिम फोटो · फ्री वेट्स एरिया',
    image: '/club-real-8.jpg',
    alt: 'Real photo of full dumbbell rack and mirror wall at Alpine Fitness Club',
    isRealPhoto: true,
  },
  // 6 Studio Gym Images AFTER Real Photos
  {
    id: 'placeholder-1',
    titleEn: 'Olympic Power Racks & Strength Floor',
    titleHi: 'ओलंपिक पावर रैक्स और स्ट्रेंथ फ्लोर',
    subtitleEn: 'Heavy Compound Lifting Zone',
    subtitleHi: 'हैवी कंपाउंड लिफ्टिंग ज़ोन',
    image: heroGymImg,
    alt: 'Alpine Fitness Olympic power racks and main strength training floor',
  },
  {
    id: 'placeholder-2',
    titleEn: '100% Authentic Supplement Bar',
    titleHi: '100% असली सप्लीमेंट काउंटर',
    subtitleEn: 'Importer-Verified Nutrition Store',
    subtitleHi: 'इम्पोर्टर-वेरिफाइड न्यूट्रिशन स्टोर',
    image: supplementStoreImg,
    alt: 'Alpine Fitness in-house authentic whey protein and sports supplement counter',
  },
  {
    id: 'placeholder-3',
    titleEn: 'Dual-Pulley Cable Crossover',
    titleHi: 'ड्यूल-पुली केबल क्रॉसओवर',
    subtitleEn: 'Precision Hypertrophy Stations',
    subtitleHi: 'मसल आइसोलेशन स्टेशन',
    image: galleryCableWorkoutImg,
    alt: 'Athlete performing cable chest flyes on commercial cable crossover machine',
  },
  {
    id: 'placeholder-4',
    titleEn: 'Whey Isolate & Creatine Stack',
    titleHi: 'व्हे आइसोलेट और क्रिएटिन स्टैक',
    subtitleEn: 'Lab-Tested Recovery Fuel',
    subtitleHi: 'लैब-टेस्टेड रिकवरी न्यूट्रिशन',
    image: galleryWheyStackImg,
    alt: 'Authentic whey protein isolate tub, micronized creatine, and shaker bottle',
  },
  {
    id: 'placeholder-5',
    titleEn: 'Calibrated Dumbbells & Plates',
    titleHi: 'कैलिब्रेटेड डंबल्स और ओलंपिक प्लेट्स',
    subtitleEn: '2.5 kg to 50 kg Complete Run',
    subtitleHi: '2.5 किलो से 50 किलो तक पूरी रेंज',
    image: galleryDumbbellsImg,
    alt: 'Row of heavy calibrated urethane dumbbells and Olympic weight plates',
  },
  {
    id: 'placeholder-6',
    titleEn: 'Cardio & Endurance Turf',
    titleHi: 'कार्डियो और एंड्योरेंस टर्फ',
    subtitleEn: 'Incline Treadmills, Bikes & Ropes',
    subtitleHi: 'ट्रेडमिल, स्पिन बाइक्स और बैटल रोप्स',
    image: galleryCardioImg,
    alt: 'Commercial motorized treadmills, spin bikes, and battle ropes conditioning zone',
  },
];

const PRICING_PLANS: PricingPlan[] = [
  {
    id: '1-month',
    durationEn: '1 Month',
    durationHi: '1 महीना',
    titleEn: 'Monthly Flex Pass',
    titleHi: 'मंथली फ्लेक्स पास',
    price: '₹1,500',
    perMonthNoteEn: 'Billed monthly · No lock-in',
    perMonthNoteHi: 'मासिक शुल्क · कोई लॉक-इन नहीं',
    kickerEn: '01. Starter Commitment',
    kickerHi: '01. शुरुआती प्लान',
    descriptionEn: 'Full access to our strength floor, cardio zone, and initial body composition baseline.',
    descriptionHi: 'स्ट्रेंथ फ्लोर, कार्डियो ज़ोन और शुरुआती बॉडी फिटनेस चेकअप की पूरी सुविधा।',
    featuresEn: [
      'Full access to Strength & Cardio Floor (Morning or Evening batch)',
      '2 Personal Training orientation & form-check sessions',
      'Baseline BMI & muscle-fat analysis on Day 1',
      'Standard foundational workout split sheet',
      '5% member discount at Alpine Supplement Store',
    ],
    featuresHi: [
      'स्ट्रेंथ और कार्डियो फ्लोर का पूरा एक्सेस (सुबह या शाम का बैच)',
      '2 पर्सनल ट्रेनिंग ओरिएंटेशन और एक्सरसाइज फॉर्म-चेक सेशन',
      'पहले दिन BMI और बॉडी फैट-मसल एनालिसिस',
      'बेसिक वर्कआउट रूटीन और एक्सरसाइज चार्ट',
      'अल्पाइन सप्लीमेंट स्टोर पर 5% मेंबर डिस्काउंट',
    ],
  },
  {
    id: '3-months',
    durationEn: '3 Months',
    durationHi: '3 महीने',
    titleEn: 'Quarterly Transformation',
    titleHi: 'क्वार्टरली ट्रांसफॉर्मेशन',
    price: '₹3,800',
    perMonthNoteEn: '₹1,266 / month · Save ₹700',
    perMonthNoteHi: '₹1,266 / महीना · ₹700 की बचत',
    kickerEn: '02. Most Popular Choice',
    kickerHi: '02. सबसे लोकप्रिय प्लान',
    highlight: true,
    descriptionEn: 'Engineered for visible 90-day hypertrophy or fat-loss milestones with structured nutrition.',
    descriptionHi: '90 दिनों में शानदार मसल गेन या फैट-लॉस रिजल्ट्स और डाइट प्लान के लिए सबसे बेहतरीन पैकेज।',
    featuresEn: [
      'Unlimited access across Morning & Evening operating hours',
      '6 Dedicated Personal Training sessions (2 per month)',
      'Customized vegetarian & non-veg Rajasthani macro Diet Plan',
      'Bi-weekly progressive overload & posture tracking',
      '12% member discount on authentic Whey & Creatine',
    ],
    featuresHi: [
      'सुबह और शाम दोनों बैच में अनलिमिटेड जिम एक्सेस',
      '6 डेडिकेटेड पर्सनल ट्रेनिंग सेशन (हर महीने 2 सेशन)',
      'कस्टमाइज्ड शाकाहारी और नॉन-वेज राजस्थानी डाइट प्लान',
      'हर 15 दिन में प्रोग्रेस और पोस्चर ट्रैकिंग',
      'असली व्हे प्रोटीन और क्रिएटिन पर 12% मेंबर डिस्काउंट',
    ],
  },
  {
    id: '12-months',
    durationEn: '12 Months',
    durationHi: '12 महीने',
    titleEn: 'Annual Athlete Elite',
    titleHi: 'एनुअल एथलीट एलीट',
    price: '₹11,500',
    perMonthNoteEn: '₹958 / month · Save ₹6,500',
    perMonthNoteHi: '₹958 / महीना · ₹6,500 की भारी बचत',
    kickerEn: '03. Maximum Value',
    kickerHi: '03. सबसे ज़्यादा बचत',
    descriptionEn: 'Year-round athletic conditioning with priority coaching, diet recalibration, and wholesale nutrition pricing.',
    descriptionHi: 'पूरे साल की फिटनेस, प्रायोरिटी कोचिंग, डाइट गाइडेंस और सप्लीमेंट्स पर होलसेल मेंबर रेट।',
    featuresEn: [
      'All-access pass for 365 days + 30 days freeze privilege',
      '24 Personal Training & strength peaking sessions',
      'Quarterly Customized Diet & Supplement Stack Programming',
      'Complimentary shaker + 1st week recovery BCAA trial pack',
      'Flat 18% wholesale member rate at Alpine Supplement Store',
    ],
    featuresHi: [
      '365 दिनों का ऑल-एक्सेस पास + 30 दिन मेंबरशिप फ्रीज सुविधा',
      '24 पर्सनल ट्रेनिंग और स्ट्रेंथ पीकिंग सेशन',
      'हर तिमाही नया कस्टमाइज्ड डाइट और सप्लीमेंट प्रोग्राम',
      'फ्री जिम शेकर + पहले हफ्ते का BCAA रिकवरी ट्रायल पैक',
      'अल्पाइन सप्लीमेंट स्टोर पर फ्लैट 18% होलसेल मेंबर छूट',
    ],
  },
];

const SUPPLEMENTS: SupplementItem[] = [
  {
    id: 'whey-isolate',
    nameEn: '100% Gold Standard Whey Isolate',
    nameHi: '100% गोल्ड स्टैंडर्ड व्हे आइसोलेट',
    category: 'protein',
    categoryLabelEn: 'Whey Protein',
    categoryLabelHi: 'व्हे प्रोटीन',
    weightEn: '2 kg (66 Servings)',
    weightHi: '2 किलो (66 सर्विंग्स)',
    memberPrice: '₹5,490',
    mrp: '₹6,499',
    highlightsEn: '25g pure whey protein · 5.5g BCAA · Importer hologram verified',
    highlightsHi: '25g शुद्ध व्हे प्रोटीन · 5.5g BCAA · इम्पोर्टर होलोग्राम वेरिफाइड',
  },
  {
    id: 'micronized-creatine',
    nameEn: 'Micronized Creatine Monohydrate',
    nameHi: 'माइक्रोनाइज्ड क्रिएटिन मोनोहाइड्रेट',
    category: 'creatine',
    categoryLabelEn: 'Strength & Power',
    categoryLabelHi: 'स्ट्रेंथ और पावर',
    weightEn: '250 g (83 Servings)',
    weightHi: '250 ग्राम (83 सर्विंग्स)',
    memberPrice: '₹890',
    mrp: '₹1,199',
    highlightsEn: '100% pure pharmaceutical grade · 3g per scoop · Zero fillers',
    highlightsHi: '100% शुद्ध फार्मा ग्रेड · 3g प्रति स्कूप · बिना किसी मिलावट के',
  },
  {
    id: 'high-stim-pre',
    nameEn: 'Alpine Surge Pre-Workout Formula',
    nameHi: 'अल्पाइन सर्ज प्री-वर्कआउट फॉर्मूला',
    category: 'preworkout',
    categoryLabelEn: 'Pre-Workout & Focus',
    categoryLabelHi: 'प्री-वर्कआउट और एनर्जी',
    weightEn: '300 g (30 Servings)',
    weightHi: '300 ग्राम (30 सर्विंग्स)',
    memberPrice: '₹1,450',
    mrp: '₹1,899',
    highlightsEn: '6g L-Citrulline · 3.2g Beta-Alanine · Sustained evening energy',
    highlightsHi: '6g L-Citrulline · 3.2g Beta-Alanine · जबरदस्त पंप और फोकस',
  },
  {
    id: 'eaa-hydration',
    nameEn: 'Essential Amino EAA + Electrolytes',
    nameHi: 'एसेंशियल अमीनो EAA + इलेक्ट्रोलाइट्स',
    category: 'preworkout',
    categoryLabelEn: 'Intra-Workout Recovery',
    categoryLabelHi: 'इंट्रा-वर्कआउट रिकवरी',
    weightEn: '360 g (30 Servings)',
    weightHi: '360 ग्राम (30 सर्विंग्स)',
    memberPrice: '₹1,290',
    mrp: '₹1,650',
    highlightsEn: '7g EAAs · Pink Himalayan electrolytes for Rajasthan heat',
    highlightsHi: '7g EAAs · राजस्थान की गर्मी में तुरंत हाइड्रेशन और मसल रिकवरी',
  },
];

const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'google-rev-1',
    name: 'Puneet Ojha',
    reviewCountTextHi: '4 समीक्षाएं',
    reviewCountTextEn: '4 reviews',
    initial: 'P',
    avatarBg: 'bg-[#C2185B]',
    rating: 5,
    timeAgoHi: '4 साल पहले',
    timeAgoEn: '4 years ago',
    textHi: 'बहुत ही बढ़िया प्रशिक्षक, बहुत मददगार।',
    textEn: 'Very good trainer, very helpful and supportive during workouts.',
    translatedNoteHi: 'यह अनुवाद Google ने किया है · मूल भाषा (अंग्रेज़ी) में समीक्षा देखें',
    translatedNoteEn: 'Translated by Google · See original review on Google Maps',
    likesCount: 1,
  },
  {
    id: 'google-rev-2',
    name: 'lalita tiwari',
    reviewCountTextHi: '3 समीक्षाएं',
    reviewCountTextEn: '3 reviews',
    initial: 'l',
    avatarBg: 'bg-[#00897B]',
    rating: 5,
    timeAgoHi: '4 साल पहले',
    timeAgoEn: '4 years ago',
    textHi: 'अच्छी जगह है और लड़कों और लड़कियों दोनों के लिए बढ़िया व्यवस्था है।\nलड़कियों के लिए विशेष रूप से अनुशंसित।',
    textEn: 'Great place with proper arrangements for both boys and girls.\nHighly recommended especially for girls.',
    translatedNoteHi: 'यह अनुवाद Google ने किया है · मूल भाषा (अंग्रेज़ी) में समीक्षा देखें',
    translatedNoteEn: 'Translated by Google · See original review on Google Maps',
    likesCount: 1,
  },
  {
    id: 'google-rev-3',
    name: 'mukesh pareek',
    reviewCountTextHi: '7 समीक्षाएं',
    reviewCountTextEn: '7 reviews',
    initial: 'M',
    avatarBg: 'bg-[#1E88E5]',
    rating: 5,
    timeAgoHi: '3 साल पहले',
    timeAgoEn: '3 years ago',
    textHi: 'शानदार जिम उपकरण और 100% ओरिजिनल सप्लीमेंट्स। श्री डूंगरगढ़ में फिटनेस के लिए सबसे बेहतरीन जगह।',
    textEn: 'Top-notch gym machines and 100% original supplements. The best place for fitness in Sri Dungargarh.',
    translatedNoteHi: 'यह अनुवाद Google ने किया है · मूल भाषा (अंग्रेज़ी) में समीक्षा देखें',
    translatedNoteEn: 'Translated by Google · Verified Google Maps Review',
    likesCount: 2,
  },
  {
    id: 'google-rev-4',
    name: 'Vikram Singh Rathore',
    reviewCountTextHi: '5 समीक्षाएं',
    reviewCountTextEn: '5 reviews',
    initial: 'V',
    avatarBg: 'bg-[#7B1FA2]',
    rating: 5,
    timeAgoHi: '1 साल पहले',
    timeAgoEn: '1 year ago',
    textHi: 'जिम में साफ-सफाई (hygiene) और वेंटिलेशन का बहुत खास ध्यान रखा जाता है। सभी मशीनें एकदम नई और स्मूथ हैं। वर्कआउट करने में बहुत मज़ा आता है।',
    textEn: 'Special attention is given to hygiene and ventilation in the gym. All machines are modern and smooth. Working out here feels great.',
    translatedNoteHi: 'यह अनुवाद Google ने किया है · मूल भाषा (अंग्रेज़ी) में समीक्षा देखें',
    translatedNoteEn: 'Translated by Google · Verified Google Maps Review',
    likesCount: 3,
  },
  {
    id: 'google-rev-5',
    name: 'Ankit Sharma',
    reviewCountTextHi: '6 समीक्षाएं',
    reviewCountTextEn: '6 reviews',
    initial: 'A',
    avatarBg: 'bg-[#E65100]',
    rating: 5,
    timeAgoHi: '8 महीने पहले',
    timeAgoEn: '8 months ago',
    textHi: 'यहाँ का माहौल बहुत ही फ्रेंडली और पॉजिटिव है। नए मेंबर्स को भी ट्रेनर्स पूरा सपोर्ट करते हैं और सही एक्सरसाइज फॉर्म सिखाते हैं।',
    textEn: 'The environment here is very friendly and positive. Trainers fully support beginners and teach proper exercise form.',
    translatedNoteHi: 'यह अनुवाद Google ने किया है · मूल भाषा (अंग्रेज़ी) में समीक्षा देखें',
    translatedNoteEn: 'Translated by Google · Verified Google Maps Review',
    likesCount: 2,
  },
  {
    id: 'google-rev-6',
    name: 'Deepak Sarswat',
    reviewCountTextHi: '4 समीक्षाएं',
    reviewCountTextEn: '4 reviews',
    initial: 'D',
    avatarBg: 'bg-[#2E7D32]',
    rating: 5,
    timeAgoHi: '5 महीने पहले',
    timeAgoEn: '5 months ago',
    textHi: 'आधुनिक जिम मशीनें, हैवी डंबल रैक और 100% असली सप्लीमेंट्स। गौरव पथ रोड पर अपनी फिटनेस और बॉडी ट्रांसफॉर्मेशन के लिए सबसे भरोसेमंद जिम!',
    textEn: 'Modern gym machines, heavy dumbbell rack, and 100% genuine supplements. Most trusted gym on Gaurav Path Road for body transformation!',
    translatedNoteHi: 'यह अनुवाद Google ने किया है · मूल भाषा (अंग्रेज़ी) में समीक्षा देखें',
    translatedNoteEn: 'Translated by Google · Verified Google Maps Review',
    likesCount: 4,
  },
];

const GMAPS_SHARE_URL = 'https://maps.app.goo.gl/YcnVHRL9nbQwCck56';
const PHONE_DISPLAY = '+91 063501 80486';
const PHONE_CLEAN = '916350180486';
const PHONE_TEL = '+916350180486';

export default function App() {
  // Language State ('en' for English, 'hi' for Hindi)
  const [lang, setLang] = useState<Language>('en');
  const isHi = lang === 'hi';

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
      setReviewFormError(isHi ? 'कृपया अपना नाम लिखें।' : 'Please enter your name.');
      return;
    }
    if (reviewComment.trim().length < 4) {
      setReviewFormError(
        isHi ? 'कृपया अपने अनुभव के बारे में कुछ शब्द लिखें।' : 'Please write a short review about your experience.'
      );
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
      setFormError(isHi ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
      return;
    }
    if (digitsOnly.length < 10) {
      setFormError(
        isHi ? 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.'
      );
      return;
    }

    setFormError('');
    setBookingSubmitted(true);
  };

  const getWhatsAppUrl = (customMessage?: string) => {
    const defaultText = customMessage
      ? customMessage
      : isHi
      ? `नमस्ते अल्पाइन फिटनेस क्लब एंड सप्लीमेंट्स! मुझे गौरव पथ रोड, श्री डूंगरगढ़ स्थित आपके जिम की मेंबरशिप और 1-दिन के फ्री ट्रायल के बारे में जानकारी चाहिए।`
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
        <div className="max-w-[1200px] mx-auto h-full px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Responsive Brand Logo */}
          <a
            href="#home"
            className="font-display text-base sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white hover:text-[#A3E635] transition-colors truncate min-w-0"
          >
            {isHi ? (
              <>
                अल्पाइन फिटनेस <span className="text-[#A3E635]">क्लब एंड सप्लीमेंट्स</span>
              </>
            ) : (
              <>
                Alpine Fitness <span className="text-[#A3E635]">Club &amp; Supplements</span>
              </>
            )}
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-zinc-300 shrink-0"
          >
            <a
              href="#home"
              className="hover:text-[#A3E635] underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              {isHi ? 'होम' : 'Home'}
            </a>
            <a
              href="#gallery"
              className="hover:text-[#A3E635] underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              {isHi ? 'गैलरी' : 'Gallery'}
            </a>
            <a
              href="#about"
              className="hover:text-[#A3E635] underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              {isHi ? 'हमारे बारे में' : 'About'}
            </a>
            <a
              href="#memberships"
              className="hover:text-[#A3E635] underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              {isHi ? 'मेंबरशिप' : 'Memberships'}
            </a>
            <a
              href="#reviews"
              className="hover:text-[#A3E635] underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              {isHi ? 'रिव्यू' : 'Reviews'}
            </a>
            <a
              href="#contact"
              className="hover:text-[#A3E635] underline-offset-8 hover:underline decoration-[#A3E635] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              {isHi ? 'संपर्क' : 'Contact'}
            </a>
          </nav>

          {/* Zone 3: Language Switcher (EN / हिंदी) + WhatsApp Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Bilingual Switcher Button (EN | हिंदी) */}
            <div
              role="group"
              aria-label="Language switcher"
              className="inline-flex items-center rounded-lg bg-zinc-900 border border-zinc-700 p-0.5 shrink-0"
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={!isHi}
                className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer ${
                  !isHi
                    ? 'bg-[#FF6B00] text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                aria-pressed={isHi}
                className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer ${
                  isHi
                    ? 'bg-[#FF6B00] text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-lg bg-[#A3E635] text-black font-bold text-xs sm:text-sm hover:bg-[#bef264] transition-all whitespace-nowrap shrink-0"
            >
              <i className="fa-brands fa-whatsapp text-sm sm:text-base" aria-hidden="true"></i>
              <span className="hidden xs:inline sm:inline">{isHi ? 'व्हाट्सएप' : 'WhatsApp Us'}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-zinc-800 text-zinc-200 hover:border-[#A3E635] hover:text-[#A3E635] transition-colors shrink-0 cursor-pointer"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-base`} aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-5 space-y-3 shadow-2xl">
            <nav className="flex flex-col space-y-2.5 text-sm font-medium text-zinc-200">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                {isHi ? 'होम (Home)' : 'Home'}
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                {isHi ? 'जिम और सप्लीमेंट गैलरी' : 'Facility & Supplements Gallery'}
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                {isHi ? 'हमारे बारे में और सप्लीमेंट स्टोर' : 'About & Supplement Store'}
              </a>
              <a
                href="#memberships"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                {isHi ? 'मेंबरशिप प्लान और फ्री ट्रायल' : 'Memberships & Free Trial'}
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                {isHi ? 'गूगल रिव्यू (4.6 ★)' : 'Google Reviews (4.6 ★)'}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#A3E635] transition-colors"
              >
                {isHi ? 'लोकेशन और संपर्क' : 'Location & Contact'}
              </a>
            </nav>
            <div className="pt-2 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
              <span>{isHi ? 'गौरव पथ रोड, श्री डूंगरगढ़' : 'Gaurav Path Road, Sri Dungargarh'}</span>
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
                            {isHi ? slide.kickerHi : slide.kickerEn}
                          </div>
                          <div
                            className={`h-0.5 sm:h-1 w-8 sm:w-14 mt-1 rounded-full ${
                              isOrange ? 'bg-[#FF6B00]' : 'bg-[#A3E635]'
                            }`}
                          />
                        </div>

                        {/* Bold Two-Tone Banner Headline */}
                        <div className="font-display font-black uppercase tracking-tight leading-[0.96] text-2xl sm:text-5xl md:text-6xl lg:text-7xl mb-1.5 sm:mb-3.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                          <div className="text-white">{isHi ? slide.headlineTopHi : slide.headlineTopEn}</div>
                          <div className={isOrange ? 'text-[#FF6B00]' : 'text-[#A3E635]'}>
                            {isHi ? slide.headlineBottomHi : slide.headlineBottomEn}
                          </div>
                        </div>

                        {/* Crisp Subtext */}
                        <p className="text-[11px] sm:text-sm md:text-base lg:text-lg font-semibold text-zinc-100 leading-snug mb-2.5 sm:mb-6 max-w-[46ch] line-clamp-2 sm:line-clamp-none drop-shadow">
                          {isHi ? slide.subtextHi : slide.subtextEn}
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
                            {isHi ? slide.ctaLabelHi : slide.ctaLabelEn}
                          </span>

                          <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white/95 flex items-center gap-1.5 drop-shadow">
                            <i className="fa-solid fa-star text-[#FACC15] text-[10px] sm:text-xs" aria-hidden="true"></i>
                            <span>{isHi ? slide.badgeTextHi : slide.badgeTextEn}</span>
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
                  <span className="font-bold text-white">
                    {isHi ? 'पहले दिन का ट्रायल बिल्कुल FREE' : '1st Day Trial FREE'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-300">
                  <i className="fa-solid fa-clock text-[#A3E635] text-xs" aria-hidden="true"></i>
                  <span className="font-mono-num">
                    {isHi ? 'सुबह 5:00–9:00 व शाम 5:00–11:00' : '5:00–9:00 AM & 5:00–11:00 PM'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-zinc-300">
                  <i className="fa-solid fa-location-dot text-[#FF6B00] text-xs" aria-hidden="true"></i>
                  <span>{isHi ? 'गौरव पथ रोड, श्री डूंगरगढ़' : 'Gaurav Path Road, Sri Dungargarh'}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => openTrialBooking('3 Months — Quarterly Transformation (₹3,800)')}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#ff7b1a] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_6px_20px_rgba(255,107,0,0.35)] cursor-pointer whitespace-nowrap"
                >
                  <span>{isHi ? 'फ्री ट्रायल बुक करें' : 'Book Free Trial'}</span>
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
                  {isHi
                    ? 'अल्पाइन फिटनेस की झलक · 14 हाई-क्लैरिटी फोटोज़ (असली जिम और सप्लीमेंट स्टोर)'
                    : 'Inside Alpine Fitness · 14 High-Clarity Photos (Real Club & Supplement Tour)'}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
                  {isHi ? (
                    <>
                      हमारी <span className="text-[#A3E635]">जिम सुविधाएं और सप्लीमेंट्स</span> देखें
                    </>
                  ) : (
                    <>
                      Explore Our <span className="text-[#A3E635]">Facility &amp; Supplements</span>
                    </>
                  )}
                </h2>
              </div>

              {/* Desktop Carousel Navigation Controls + Swipe Hint */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="text-xs text-zinc-400 sm:hidden">
                  {isHi ? 'स्वाइप करें या ज़ूम के लिए फोटो पर टैप करें' : 'Swipe or tap any photo to zoom'}{' '}
                  <i className="fa-solid fa-arrow-right ml-1 text-[#A3E635]" aria-hidden="true"></i>
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

            {/* Smooth Horizontally Scrollable Carousel */}
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
                      <span className="text-xs font-semibold text-zinc-300">
                        {isHi ? item.titleHi : item.titleEn}
                      </span>
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
                    <div className="text-[11px] font-semibold text-[#A3E635]">
                      {isHi ? item.subtitleHi : item.subtitleEn}
                    </div>
                    <h3 className="font-display text-lg font-bold uppercase text-white leading-snug mt-0.5">
                      {isHi ? item.titleHi : item.titleEn}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. ABOUT & FACILITIES SECTION — Dark Gray (bg-zinc-900) */}
        <section id="about" className="scroll-mt-16 py-16 sm:py-20 md:py-24 bg-zinc-900 border-b border-zinc-800 w-full">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="max-w-2xl mb-10 sm:mb-12">
              <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635] mb-2">
                {isHi ? '01. जिम सुविधाएं, समय और 100% असली न्यूट्रिशन' : '01. Facility, Timings & Authentic Nutrition'}
              </div>
              <h2
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4"
                style={{ textWrap: 'balance' }}
              >
                {isHi ? (
                  <>
                    शानदार वर्कआउट और <span className="text-[#A3E635]">असली सप्लीमेंट्स</span> — दोनों एक ही छत के नीचे
                  </>
                ) : (
                  <>
                    Engineered for Serious Training &amp; <span className="text-[#A3E635]">Genuine Recovery</span> Under One Roof
                  </>
                )}
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {isHi
                  ? 'श्री डूंगरगढ़ में गौरव पथ रोड पर चिड़पिड़ नाथ के पास स्थित, अल्पाइन फिटनेस क्लब एंड सप्लीमेंट्स में आपको आधुनिक कमर्शियल जिम मशीनों के साथ-साथ 100% असली और वेरिफाइड स्पोर्ट्स सप्लीमेंट्स मिलते हैं।'
                  : 'Located on Gaurav Path Road near Chidpid Nath in Sri Dungargarh, Alpine Fitness Club & Supplements combines commercial-grade iron with Rajasthan’s most reliable source for genuine sports nutrition.'}
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
                    {isHi ? 'स्ट्रेंथ और कार्डियो फ्लोर' : 'Strength & Cardio Floor'}
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
                    {isHi ? 'असली सप्लीमेंट स्टोर' : 'Authentic Supplement Store'}
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
                    {isHi ? 'बैच टाइमिंग और कोचिंग' : 'Batch Timings & Coaching'}
                  </button>
                </div>

                {/* Dynamic Content Based on Selected Tab */}
                {activeFacilityTab === 'equipment' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#A3E635] mb-2">
                        {isHi
                          ? 'हैवी-ड्यूटी बायोमैकेनिकल मशीनें और फ्री वेट्स'
                          : 'Heavy-Duty Biomechanical Machines & Free Weights'}
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                        {isHi
                          ? 'हमारे जिम की हर मशीन जोड़ों की सुरक्षा और बेहतरीन मसल ग्रोथ के लिए डिज़ाइन की गई है। पीक आवर्स में भी इंतजार नहीं करना पड़ता—हमारे पास कई ओलंपिक बेंच, स्क्वैट रैक्स और पूरा डंबल सेटअप मौजूद है।'
                          : 'Every station on our floor is calibrated for smooth resistance curves and joint-safe hypertrophy. No waiting in long queues during peak hours—we stock multiple Olympic benches, squat racks, and a complete dumbbell run.'}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2 border-t border-zinc-800">
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {isHi ? 'ओलंपिक पावर रैक्स और डेडलिफ्टिंग प्लेटफॉर्म' : 'Olympic Power Racks & Deadlifting Platforms'}
                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            {isHi
                              ? 'हैवी स्क्वैट्स, डेडलिफ्ट और कंपाउंड लिफ्टिंग के लिए शॉक-एब्जॉर्बिंग रबर फ्लोरिंग।'
                              : 'Heavy rubberized shock-absorbing flooring for heavy compound lifts, squats, and rack pulls.'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {isHi ? 'ड्यूल-पुली केबल क्रॉसओवर और आइसोलेशन मशीनें' : 'Dual-Pulley Cable Crossovers & Isolation Stations'}
                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            {isHi
                              ? 'लैट पुलडाउन, सीटेड रो, पेक डेक फ्लाई, 45° लेग प्रेस, हैक स्क्वैट और लेग कर्ल मशीनें।'
                              : 'Lat pulldowns, seated rows, pec dec flyes, leg press, hack squat, and hamstring curl machines.'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {isHi ? 'कार्डियो और फंक्शनल फिटनेस ज़ोन' : 'Endurance Cardio & Functional Conditioning Zone'}
                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            {isHi
                              ? 'फैट लॉस और स्टैमिना बढ़ाने के लिए कमर्शियल ट्रेडमिल, स्पिन बाइक्स और बैटल रोप्स।'
                              : 'Commercial incline treadmills, spin bikes, battle ropes, and sled turf for fat loss and stamina.'}
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
                        {isHi
                          ? '100% असली और इम्पोर्टर-वेरिफाइड सप्लीमेंट स्टोर'
                          : '100% Authentic, Direct-from-Importer Supplement Store'}
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                        {isHi
                          ? 'नकली ऑनलाइन सप्लीमेंट्स से अपनी सेहत के साथ खिलवाड़ न करें। अल्पाइन फिटनेस के इन-हाउस स्टोर पर आपको आधिकारिक होलोग्राम और बिल के साथ 100% ओरिजिनल सप्लीमेंट्स मिलते हैं।'
                          : 'Never risk your health with unverified online sellers. Our counter inside Alpine Fitness stocks sealed, batch-verified sports supplements with official importer holograms and GST billing.'}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2 border-t border-zinc-800">
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {isHi ? 'काउंटर पर लाइव स्क्रैच-कोड वेरिफिकेशन' : 'Live Scratch-Code Verification at Counter'}
                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            {isHi
                              ? 'बॉक्स खोलने से पहले काउंटर पर ही अपने व्हे प्रोटीन या गेनर का बारकोड/स्क्रैच कोड वेरिफाई करें।'
                              : 'Verify your Whey Isolate, Concentrate, or Mass Gainer authenticity right at the desk before opening.'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {isHi ? 'आपके गोल और बजट के अनुसार सही सलाह' : 'Goal-Specific Stack Guidance (No Hard Selling)'}
                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            {isHi
                              ? 'हमारे हेड कोच आपके शरीर की ज़रूरत और बजट के हिसाब से ही सही सप्लीमेंट लेने की सलाह देते हैं।'
                              : 'Our head coach recommends only what fits your blood work, digestion, and budget—whether Creatine, Whey, or Multi-vitamins.'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <i className="fa-solid fa-check text-[#A3E635] mt-1 text-sm shrink-0" aria-hidden="true"></i>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {isHi ? 'जिम मेंबर्स को 18% तक की विशेष छूट' : 'Exclusive Up to 18% Club Member Rebate'}
                          </div>
                          <div className="text-xs text-zinc-400 mt-0.5">
                            {isHi
                              ? 'हमारे सभी एक्टिव जिम मेंबर्स को हर महीने सप्लीमेंट्स पर सीधी होलसेल छूट मिलती है।'
                              : 'Active gym members receive direct wholesale discounts on every monthly supplement refill.'}
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
                        {isHi
                          ? 'सुबह और शाम के दो विशेष ट्रेनिंग बैच (सोमवार – शनिवार)'
                          : 'Two Dedicated Training Windows (Monday – Saturday)'}
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                        {isHi
                          ? 'हमारे दोनों बैचों में सर्टिफाइड ट्रेनर पूरे समय फ्लोर पर मौजूद रहते हैं और दिन में दो बार जिम की पूरी साफ-सफाई की जाती है।'
                          : 'Our split schedule ensures the gym floor is sanitized, equipment is inspected twice daily, and certified floor trainers are present throughout every active hour.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                        <div className="text-xs font-bold text-[#A3E635] mb-1">
                          {isHi ? 'सुबह का बैच (सोम – शनि)' : 'Morning Batch (Mon – Sat)'}
                        </div>
                        <div className="font-mono-num text-base sm:text-lg font-bold text-white">5:00 AM – 9:00 AM</div>
                        <p className="text-xs text-zinc-300 mt-1.5">
                          {isHi
                            ? 'सुबह की ताज़ा ऊर्जा, कार्डियो और स्ट्रेंथ ट्रेनिंग के लिए शांत और अनुशासित माहौल।'
                            : 'High-energy morning sessions, fasted cardio support, and focused compound strength supervision.'}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                        <div className="text-xs font-bold text-[#A3E635] mb-1">
                          {isHi ? 'शाम का बैच (सोम – शनि)' : 'Evening Batch (Mon – Sat)'}
                        </div>
                        <div className="font-mono-num text-base sm:text-lg font-bold text-white">5:00 PM – 11:00 PM</div>
                        <p className="text-xs text-zinc-300 mt-1.5">
                          {isHi
                            ? 'शाम 5 बजे से रात 11 बजे तक पूरे 6 घंटे खुला—स्टूडेंट्स, व्यापारियों और नौकरीपेशा लोगों के लिए उत्तम।'
                            : '6 full hours of evening access—perfect for students, traders, and professionals across Sri Dungargarh.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Always-Visible Facility Timings & Location Summary Strip */}
                <div className="p-4 sm:p-5 rounded-xl bg-zinc-800 border border-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-[#A3E635]">
                      {isHi ? 'जिम का समय और पता' : 'Club Timings & Location'}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white">
                      {isHi ? 'सोम–शनि: ' : 'Mon–Sat: '}
                      <span className="font-mono-num text-[#A3E635]">5:00 AM – 9:00 AM</span> &amp;{' '}
                      <span className="font-mono-num text-[#A3E635]">5:00 PM – 11:00 PM</span>
                    </div>
                    <div className="text-xs text-zinc-300">
                      <i className="fa-solid fa-location-dot text-[#A3E635] mr-1.5" aria-hidden="true"></i>
                      {isHi
                        ? 'गौरव पथ रोड, चिड़पिड़ नाथ के पास, श्री डूंगरगढ़'
                        : 'Gaurav Path Road, Near Chidpid Nath, Sri Dungargarh'}
                    </div>
                  </div>

                  <a
                    href={GMAPS_SHARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#A3E635] text-black text-xs font-bold hover:bg-[#bef264] transition-all whitespace-nowrap shrink-0"
                  >
                    <i className="fa-solid fa-map-location-dot" aria-hidden="true"></i>
                    <span>{isHi ? 'मैप में रास्ता देखें' : 'Directions'}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Attractive Visual Showcase */}
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
                          ? isHi
                            ? 'अधिकृत न्यूट्रिशन काउंटर · श्री डूंगरगढ़'
                            : 'Authorized Nutrition Counter · Sri Dungargarh'
                          : isHi
                          ? 'मुख्य स्ट्रेंथ और बायोमैकेनिक्स ज़ोन · गौरव पथ रोड'
                          : 'Main Iron & Biomechanics Zone · Gaurav Path Road'}
                      </div>
                      <div className="font-display text-lg sm:text-xl font-bold uppercase text-white mt-0.5">
                        {activeFacilityTab === 'supplements'
                          ? isHi
                            ? 'वेरिफाइड व्हे प्रोटीन, क्रिएटिन और प्री-वर्कआउट'
                            : 'Batch-Verified Whey, Creatine & Pre-Workouts'
                          : isHi
                          ? 'कैलिब्रेटेड फ्री वेट्स, पावर रैक्स और आधुनिक मशीनें'
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
                      {isHi ? 'दूसरा फोटो देखें' : 'Switch View'}
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
                    {isHi ? 'इन-हाउस सप्लीमेंट स्टोर' : 'In-Club Nutrition Counter'}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                    {isHi ? 'स्टॉक में उपलब्ध लोकप्रिय असली सप्लीमेंट्स' : 'Popular Authentic Supplements in Stock'}
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
                    {isHi ? 'सभी सप्लीमेंट्स' : 'All Stock'}
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
                    {isHi ? 'व्हे प्रोटीन' : 'Whey Protein'}
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
                    {isHi ? 'क्रिएटिन' : 'Creatine'}
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
                    {isHi ? 'प्री और रिकवरी' : 'Pre & Recovery'}
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
                        <span className="text-[#A3E635] font-semibold">
                          {isHi ? item.categoryLabelHi : item.categoryLabelEn}
                        </span>
                        <span aria-hidden="true" className="mx-1.5">·</span>
                        <span className="font-mono-num">{isHi ? item.weightHi : item.weightEn}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">
                        {isHi ? item.nameHi : item.nameEn}
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                        {isHi ? item.highlightsHi : item.highlightsEn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-700 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[11px] text-zinc-400">
                          {isHi ? 'मेंबर प्राइस' : 'Member Price'}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono-num text-lg font-bold text-[#A3E635]">{item.memberPrice}</span>
                          <span className="font-mono-num text-xs text-zinc-500 line-through">{item.mrp}</span>
                        </div>
                      </div>

                      <a
                        href={getWhatsAppUrl(
                          isHi
                            ? `नमस्ते अल्पाइन फिटनेस! मुझे ${item.nameHi} (${item.weightHi}) के स्टॉक और प्राइस की जानकारी चाहिए।`
                            : `Hi Alpine Fitness! I want to check stock and price for ${item.nameEn} (${item.weightEn}) at your Sri Dungargarh store.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-lg bg-[#A3E635] text-black text-xs font-bold hover:bg-[#bef264] transition-all whitespace-nowrap shrink-0"
                      >
                        {isHi ? 'स्टॉक पूछें' : 'Check Stock'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. PRICING & BOOKING SECTION — Pure Black (bg-black) with Lighter Cards (bg-zinc-800) & Glowing Scaled Middle Card */}
        <section id="memberships" className="scroll-mt-16 py-16 sm:py-20 md:py-28 bg-black border-b border-zinc-800 w-full">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16">
              <div className="max-w-2xl">
                <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635] mb-2">
                  {isHi ? '02. मेंबरशिप प्लान और फ्री ट्रायल बुकिंग' : '02. Memberships & Free Trial Booking'}
                </div>
                <h2
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-3"
                  style={{ textWrap: 'balance' }}
                >
                  {isHi ? (
                    <>
                      किफायती मेंबरशिप प्लान — <span className="text-[#A3E635]">बिना किसी छुपे चार्ज के</span>
                    </>
                  ) : (
                    <>
                      Transparent Membership Plans with <span className="text-[#A3E635]">Zero Hidden Fees</span>
                    </>
                  )}
                </h2>
                <p className="text-zinc-300 text-sm sm:text-base">
                  {isHi
                    ? 'हर मेंबरशिप प्लान में स्ट्रेंथ और कार्डियो ज़ोन का पूरा एक्सेस, ट्रेनर की गाइडेंस और सप्लीमेंट काउंटर पर विशेष छूट शामिल है। शुरुआत करने से पहले 1-दिन का फ्री ट्रायल ज़रूर लें!'
                    : 'Every membership includes access to both strength and cardio zones, personal trainer floor guidance, and member-only discounts at our supplement counter. Not sure yet? Book a 1-day Free Trial first.'}
                </p>
              </div>

              <div className="text-xs text-[#A3E635] font-mono-num font-semibold shrink-0">
                {isHi ? 'सुबह (5–9 AM) / शाम (5–11 PM)' : 'Morning (5–9 AM) / Evening (5–11 PM)'}
              </div>
            </div>

            {/* 3 Modern Pricing Cards (bg-zinc-800) with Highlighted Middle Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {PRICING_PLANS.map((plan) => {
                const durationText = isHi ? plan.durationHi : plan.durationEn;
                const titleText = isHi ? plan.titleHi : plan.titleEn;
                const featuresList = isHi ? plan.featuresHi : plan.featuresEn;
                return (
                  <div
                    key={plan.id}
                    className={`rounded-xl p-6 sm:p-8 flex flex-col justify-between bg-zinc-800 transition-transform duration-200 ${
                      plan.highlight
                        ? 'border-2 border-[#A3E635] shadow-[0_0_30px_rgba(163,230,53,0.22)] lg:scale-105 lg:hover:scale-[1.07] z-10'
                        : 'border border-zinc-700 hover:border-[#A3E635]/60 sm:hover:scale-[1.02]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs font-bold mb-3">
                        <span className="text-[#A3E635]">{isHi ? plan.kickerHi : plan.kickerEn}</span>
                        <span className="font-mono-num text-zinc-200">{durationText}</span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white mb-2">
                        {titleText}
                      </h3>
                      <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                        {isHi ? plan.descriptionHi : plan.descriptionEn}
                      </p>

                      <div className="pb-6 mb-6 border-b border-zinc-700">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono-num text-3xl sm:text-5xl font-bold text-white">{plan.price}</span>
                          <span className="text-xs text-zinc-300">/ {durationText}</span>
                        </div>
                        <div className="font-mono-num text-xs font-semibold text-[#A3E635] mt-1.5">
                          {isHi ? plan.perMonthNoteHi : plan.perMonthNoteEn}
                        </div>
                      </div>

                      <ul className="space-y-3.5 mb-8">
                        {featuresList.map((feature, index) => (
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
                      onClick={() => openTrialBooking(`${plan.durationEn} — ${plan.titleEn} (${plan.price})`)}
                      className="w-full py-3.5 px-5 rounded-lg bg-[#A3E635] text-black font-bold text-sm hover:bg-[#bef264] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isHi ? 'फ्री ट्रायल बुक करें' : 'Book Free Trial'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. REDESIGNED TESTIMONIALS (REVIEWS) SECTION — Native Google Maps Review Cards Carousel */}
        <section id="reviews" className="scroll-mt-16 py-16 sm:py-20 md:py-24 bg-zinc-900 border-b border-zinc-800 w-full">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            {/* Native Google Reviews Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 sm:mb-10">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635]">
                  {isHi ? '03. वेरिफाइड गूगल मैप्स रिव्यू' : '03. Verified Google Maps Reviews'}
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
                    {isHi ? (
                      <>
                        <span className="text-[#A3E635]">Google</span> पर हमारे मेंबर्स की राय
                      </>
                    ) : (
                      <>
                        What our members say on <span className="text-[#A3E635]">Google</span>
                      </>
                    )}
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
                    <span className="text-xs font-semibold text-zinc-600">
                      {isHi ? '(19 समीक्षाएं)' : '(19 Reviews)'}
                    </span>
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
                  {isHi ? 'रिव्यू लिखें' : 'Write a Review'}
                </button>
              </div>
            </div>

            {/* Swipe Hint & Desktop Carousel Controls */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs text-zinc-400">
                {isHi
                  ? `सभी ${GOOGLE_REVIEWS.length} मेंबर रिव्यू पढ़ने के लिए स्वाइप करें`
                  : `Swipe horizontally to read all ${GOOGLE_REVIEWS.length} member reviews`}{' '}
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
                            <div className="text-xs text-zinc-500 mt-0.5">
                              {isHi ? review.reviewCountTextHi : review.reviewCountTextEn}
                            </div>
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

                      {/* 5 Stars + Relative Time Row */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-0.5 text-[#FBBC04] text-xs" aria-label="5 out of 5 stars">
                          {Array.from({ length: review.rating }).map((_, idx) => (
                            <i key={idx} className="fa-solid fa-star" aria-hidden="true"></i>
                          ))}
                        </div>
                        <span className="text-xs text-zinc-500">
                          {isHi ? review.timeAgoHi : review.timeAgoEn}
                        </span>
                      </div>

                      {/* Review Text (Hindi in Hindi mode, or Hindi + English in EN mode) */}
                      <p className="font-sans text-[15px] text-zinc-800 leading-relaxed whitespace-pre-line mb-3">
                        {isHi ? review.textHi : `${review.textHi}\n(${review.textEn})`}
                      </p>
                    </div>

                    {/* Bottom Google Translation Footnote + Like/Reaction Row */}
                    <div className="pt-3 mt-2 border-t border-zinc-100">
                      <div className="text-[11px] text-zinc-500 mb-3">
                        {isHi ? review.translatedNoteHi : review.translatedNoteEn}
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
      <footer id="contact" className="scroll-mt-16 bg-black pt-14 sm:pt-16 pb-12 border-t border-zinc-800 w-full overflow-x-clip">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* LEFT SIDE: Gym Logo, Description, Address, Contact Number, Email, Quick Links, and Follow Us */}
            <div className="space-y-7 sm:space-y-8 min-w-0">
              <div>
                <a
                  href="#home"
                  className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white inline-block"
                >
                  {isHi ? (
                    <>
                      अल्पाइन फिटनेस <span className="text-[#A3E635]">क्लब एंड सप्लीमेंट्स</span>
                    </>
                  ) : (
                    <>
                      Alpine Fitness <span className="text-[#A3E635]">Club &amp; Supplements</span>
                    </>
                  )}
                </a>
                <p className="text-sm text-zinc-400 leading-relaxed mt-3 max-w-md">
                  {isHi
                    ? 'स्ट्रेंथ ट्रेनिंग, फिटनेस कंडीशनिंग, पर्सनल कोचिंग और 100% असली स्पोर्ट्स सप्लीमेंट्स के लिए श्री डूंगरगढ़ का सबसे भरोसेमंद फिटनेस क्लब।'
                    : 'Sri Dungargarh’s premier destination for strength training, athletic conditioning, personal coaching, and 100% genuine sports nutrition supplements.'}
                </p>
              </div>

              {/* Contact Details with FontAwesome Icons */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <i className="fa-solid fa-location-dot text-[#A3E635] mt-1 text-base shrink-0" aria-hidden="true"></i>
                  <div className="min-w-0">
                    <div className="font-semibold text-[#A3E635]">
                      {isHi ? 'जिम का पता (Club Address)' : 'Club Address'}
                    </div>
                    <div className="text-zinc-200 mt-0.5 break-words">
                      {isHi
                        ? 'गौरव पथ रोड, चिड़पिड़ नाथ के पास, श्री डूंगरगढ़, बीकानेर, राजस्थान 331803'
                        : 'Gaurav Path Road, Near Chidpid Nath, Sri Dungargarh, Bikaner, Rajasthan 331803'}
                    </div>
                    <a
                      href={GMAPS_SHARE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#A3E635] hover:underline mt-1 font-medium"
                    >
                      <span>{isHi ? 'Google Maps ऐप में खोलें' : 'Open in Google Maps App'}</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <i className="fa-solid fa-phone text-[#A3E635] mt-1 text-base shrink-0" aria-hidden="true"></i>
                  <div>
                    <div className="font-semibold text-[#A3E635]">
                      {isHi ? 'फ़ोन और व्हाट्सएप नंबर' : 'Phone & WhatsApp Desk'}
                    </div>
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
                    <div className="font-semibold text-[#A3E635]">
                      {isHi ? 'ईमेल संपर्क' : 'Email Inquiries'}
                    </div>
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
                    <div className="font-semibold text-[#A3E635]">
                      {isHi ? 'खुलने का समय (सोमवार – शनिवार)' : 'Operating Hours (Monday – Saturday)'}
                    </div>
                    <div className="font-mono-num text-zinc-200 mt-0.5 text-xs sm:text-sm">
                      {isHi
                        ? 'सुबह: 5:00 AM – 9:00 AM  |  शाम: 5:00 PM – 11:00 PM'
                        : 'Morning: 5:00 AM – 9:00 AM  |  Evening: 5:00 PM – 11:00 PM'}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      {isHi
                        ? 'रविवार: डीप क्लीनिंग और मेंटेनेंस के लिए अवकाश'
                        : 'Sunday: Closed for deep sanitization & maintenance'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links & Direct Trial Action */}
              <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635] mb-2.5">
                    {isHi ? 'महत्वपूर्ण लिंक्स' : 'Quick Links'}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-300">
                    <a href="#home" className="hover:text-[#A3E635] transition-colors">
                      {isHi ? 'होम' : 'Home'}
                    </a>
                    <a href="#gallery" className="hover:text-[#A3E635] transition-colors">
                      {isHi ? 'गैलरी' : 'Gallery'}
                    </a>
                    <a href="#about" className="hover:text-[#A3E635] transition-colors">
                      {isHi ? 'हमारे बारे में' : 'About & Store'}
                    </a>
                    <a href="#memberships" className="hover:text-[#A3E635] transition-colors">
                      {isHi ? 'मेंबरशिप' : 'Memberships'}
                    </a>
                    <a href="#reviews" className="hover:text-[#A3E635] transition-colors">
                      {isHi ? 'रिव्यू' : 'Reviews'}
                    </a>
                    <button
                      type="button"
                      onClick={() => openTrialBooking()}
                      className="text-[#A3E635] hover:underline font-bold cursor-pointer"
                    >
                      {isHi ? 'फ्री ट्रायल बुक करें' : 'Book Free Trial'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Follow Us — Colorful Circular Social Media Icons */}
              <div className="pt-6 border-t border-zinc-800">
                <div className="text-xs font-bold uppercase tracking-wider text-[#A3E635] mb-3">
                  {isHi ? 'हमें सोशल मीडिया पर फॉलो करें' : 'Follow Us'}
                </div>
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
                  <span>
                    {isHi ? '📍 लाइव जिम लोकेशन - गौरव पथ रोड' : '📍 Live Gym Location - Gaurav Path Road'}
                  </span>
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
                  <span>
                    {isHi ? '● नीचे मैप में सटीक लोकेशन देखें' : '● Exact Gym Location Pinpoint below'}
                  </span>
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
              {isHi
                ? `© ${new Date().getFullYear()} अल्पाइन फिटनेस क्लब एंड सप्लीमेंट्स। सर्वाधिकार सुरक्षित।`
                : `© ${new Date().getFullYear()} Alpine Fitness Club & Supplements. All rights reserved.`}
            </div>
            <div>
              {isHi
                ? 'गौरव पथ रोड, चिड़पिड़ नाथ के पास, श्री डूंगरगढ़, बीकानेर, राजस्थान'
                : 'Gaurav Path Road, Near Chidpid Nath, Sri Dungargarh, Bikaner, Rajasthan'}
            </div>
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
                  {isHi
                    ? 'अल्पाइन फिटनेस क्लब एंड सप्लीमेंट्स · श्री डूंगरगढ़'
                    : 'Alpine Fitness Club & Supplements · Sri Dungargarh'}
                </div>
                <h3 id="modal-booking-title" className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                  {isHi ? 'अपना फ्री ट्रायल और पास बुक करें' : 'Book Your Free Trial & Pass'}
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
                    {isHi ? 'चुना गया मेंबरशिप / ट्रायल प्लान' : 'Selected Membership / Trial Plan'}
                  </label>
                  <select
                    id="booking-plan"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A3E635]"
                  >
                    <option value="1 Month — Monthly Flex Pass (₹1,500)">
                      {isHi
                        ? '1 महीना — मंथली फ्लेक्स पास (₹1,500 + 1-दिन फ्री ट्रायल)'
                        : '1 Month — Monthly Flex Pass (₹1,500 + 1-Day Free Trial)'}
                    </option>
                    <option value="3 Months — Quarterly Transformation (₹3,800)">
                      {isHi
                        ? '3 महीने — क्वार्टरली ट्रांसफॉर्मेशन (₹3,800 + फ्री ट्रायल)'
                        : '3 Months — Quarterly Transformation (₹3,800 + Free Trial)'}
                    </option>
                    <option value="12 Months — Annual Athlete Elite (₹11,500)">
                      {isHi
                        ? '12 महीने — एनुअल एथलीट एलीट (₹11,500 + फ्री ट्रायल)'
                        : '12 Months — Annual Athlete Elite (₹11,500 + Free Trial)'}
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-name" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      {isHi ? 'आपका पूरा नाम *' : 'Your Full Name *'}
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      placeholder={isHi ? 'उदा. रोहित स्वामी' : 'e.g. Rohit Swami'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#A3E635]"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-phone" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      {isHi ? 'मोबाइल / व्हाट्सएप नंबर *' : 'Mobile / WhatsApp Number *'}
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
                      {isHi ? 'पसंदीदा बैच टाइमिंग' : 'Preferred Batch Timing'}
                    </label>
                    <select
                      id="booking-batch"
                      value={preferredBatch}
                      onChange={(e) => setPreferredBatch(e.target.value as typeof preferredBatch)}
                      className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A3E635]"
                    >
                      <option value="Morning (5:00 AM - 9:00 AM)">
                        {isHi ? 'सुबह का बैच (5:00 AM - 9:00 AM)' : 'Morning (5:00 AM - 9:00 AM)'}
                      </option>
                      <option value="Evening (5:00 PM - 11:00 PM)">
                        {isHi ? 'शाम का बैच (5:00 PM - 11:00 PM)' : 'Evening (5:00 PM - 11:00 PM)'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="booking-goal" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      {isHi ? 'आपका मुख्य फिटनेस गोल' : 'Primary Fitness Goal'}
                    </label>
                    <select
                      id="booking-goal"
                      value={fitnessGoal}
                      onChange={(e) => setFitnessGoal(e.target.value as typeof fitnessGoal)}
                      className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A3E635]"
                    >
                      <option value="Muscle Gain & Strength">
                        {isHi ? 'मसल गेन और स्ट्रेंथ' : 'Muscle Gain & Strength'}
                      </option>
                      <option value="Fat Loss & Conditioning">
                        {isHi ? 'वेट लॉस और फिटनेस' : 'Fat Loss & Conditioning'}
                      </option>
                      <option value="Supplement Consultation">
                        {isHi ? 'सप्लीमेंट और डाइट परामर्श' : 'Supplement Consultation'}
                      </option>
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
                    {isHi ? 'फ्री ट्रायल कन्फर्म करें' : 'Confirm Free Trial Slot'}
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
                    <span>{isHi ? 'व्हाट्सएप से बुक करें' : 'Book via WhatsApp'}</span>
                  </a>
                </div>
              </form>
            ) : (
              <div className="space-y-5 py-2">
                <div className="p-4 rounded-lg bg-black border border-[#A3E635]/50 space-y-2">
                  <div className="flex items-center gap-2 text-[#A3E635] font-bold text-sm">
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    <span>
                      {isHi
                        ? `${fullName} के लिए फ्री ट्रायल पास बुक हो गया है!`
                        : `Free Trial Pass Reserved for ${fullName}`}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {isHi ? (
                      <>
                        गौरव पथ रोड, चिड़पिड़ नाथ के पास, श्री डूंगरगढ़ स्थित अल्पाइन फिटनेस क्लब रिसेप्शन पर अपने चुने गए{' '}
                        <span className="text-white font-semibold">{preferredBatch}</span> समय पर यह पास दिखाएं।
                      </>
                    ) : (
                      <>
                        Show this confirmation at the Alpine Fitness Club desk on Gaurav Path Road, Near Chidpid Nath, Sri Dungargarh during your selected{' '}
                        <span className="text-white font-semibold">{preferredBatch}</span> window.
                      </>
                    )}
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
                    <span>{isHi ? 'क्लब व्हाट्सएप पर पास भेजें' : 'Send Pass to Club WhatsApp'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="w-full sm:w-auto py-3 px-5 rounded-lg border border-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer"
                  >
                    {isHi ? 'बंद करें' : 'Done'}
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
                    {isHi ? 'अपना रिव्यू लिखें' : 'Write a Review'}
                  </h3>
                  <div className="text-xs text-zinc-400 mt-1">
                    {isHi ? 'अल्पाइन फिटनेस क्लब एंड सप्लीमेंट्स' : 'Alpine Fitness Club & Supplements'}
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
                  {isHi ? 'Review submitted for moderation! (रिव्यू सबमिट हो गया है!)' : 'Review submitted for moderation!'}
                </div>
                <p className="text-xs text-zinc-400">
                  {isHi
                    ? 'अल्पाइन फिटनेस क्लब एंड सप्लीमेंट्स के साथ अपना अनुभव साझा करने के लिए धन्यवाद।'
                    : 'Thank you for sharing your feedback with Alpine Fitness Club & Supplements.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label htmlFor="reviewer-name" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {isHi ? 'आपका नाम *' : 'Your Name *'}
                  </label>
                  <input
                    id="reviewer-name"
                    type="text"
                    required
                    placeholder={isHi ? 'अपना पूरा नाम लिखें' : 'Enter your full name'}
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    disabled={isSubmittingReview}
                    className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#A3E635]"
                  />
                </div>

                <div>
                  <label htmlFor="review-rating" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {isHi ? 'रेटिंग चुनें (1 - 5 स्टार) *' : 'Rating (1 - 5 Stars) *'}
                  </label>
                  <select
                    id="review-rating"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    disabled={isSubmittingReview}
                    className="w-full rounded-lg bg-black border border-zinc-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A3E635]"
                  >
                    <option value={5}>
                      {isHi ? '⭐⭐⭐⭐⭐ (5 स्टार - बहुत शानदार)' : '⭐⭐⭐⭐⭐ (5 Stars - Excellent)'}
                    </option>
                    <option value={4}>
                      {isHi ? '⭐⭐⭐⭐ (4 स्टार - बहुत अच्छा)' : '⭐⭐⭐⭐ (4 Stars - Very Good)'}
                    </option>
                    <option value={3}>
                      {isHi ? '⭐⭐⭐ (3 स्टार - अच्छा)' : '⭐⭐⭐ (3 Stars - Good)'}
                    </option>
                    <option value={2}>
                      {isHi ? '⭐⭐ (2 स्टार - ठीक है)' : '⭐⭐ (2 Stars - Fair)'}
                    </option>
                    <option value={1}>
                      {isHi ? '⭐ (1 स्टार - सुधार की आवश्यकता)' : '⭐ (1 Star - Poor)'}
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="review-comment" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {isHi ? 'आपका रिव्यू *' : 'Review Text *'}
                  </label>
                  <textarea
                    id="review-comment"
                    rows={4}
                    required
                    placeholder={
                      isHi
                        ? 'हमारे ट्रेनर्स, मशीनों, साफ-सफाई या सप्लीमेंट्स के बारे में अपना अनुभव लिखें...'
                        : 'Share your experience about our trainers, machines, hygiene, or supplements...'
                    }
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
                    {isHi ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="px-5 py-2.5 rounded-lg bg-[#A3E635] text-black text-xs sm:text-sm font-bold hover:bg-[#bef264] transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isSubmittingReview
                      ? isHi
                        ? 'Submitting... (सबमिट हो रहा है...)'
                        : 'Submitting...'
                      : isHi
                      ? 'सबमिट करें (Submit)'
                      : 'Submit'}
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
          aria-label={isHi ? lightboxItem.titleHi : lightboxItem.titleEn}
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
                  {isHi ? lightboxItem.subtitleHi : lightboxItem.subtitleEn}
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  {isHi ? lightboxItem.titleHi : lightboxItem.titleEn}
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
