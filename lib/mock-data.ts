export const testimonials = [
  {
    id: 1,
    name: "Adunni Olamide",
    program: "Computer Science, 300L",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    quote: "Abike Ade Court has been my home away from home. The facilities are excellent and the environment is perfect for studying.",
    rating: 5
  },
  {
    id: 2,
    name: "Emmanuel Chukwu", 
    program: "Engineering, 400L",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    quote: "The security and maintenance here are top-notch. I've never had any issues and the staff are very responsive.",
    rating: 5
  },
  {
    id: 3,
    name: "Fatima Aliyu",
    program: "Medicine, 200L", 
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    quote: "Great value for money! The rooms are spacious and the internet is reliable for my online classes.",
    rating: 4
  }
];

export const hostelFeatures = [
  {
    icon: "Shield",
    title: "24/7 Security",
    description: "Round-the-clock security with CCTV monitoring and controlled access"
  },
  {
    icon: "Wifi",
    title: "High-Speed Internet",
    description: "Reliable fiber internet connection throughout all floors"
  },
  {
    icon: "Car",
    title: "Parking Space",
    description: "Secure parking area for students with vehicles"
  },
  {
    icon: "Utensils",
    title: "Kitchen Facilities",
    description: "Shared kitchen spaces with modern appliances"
  },
  {
    icon: "Lightbulb",
    title: "24/7 Power Supply",
    description: "Uninterrupted power supply with backup generators"
  },
  {
    icon: "Users",
    title: "Common Areas",
    description: "Study rooms, lounge areas, and recreational spaces"
  }
];

export const transactions = [
  {
    id: "TXN001",
    date: "2024-01-15",
    description: "Room Rent - January 2024",
    amount: 85000,
    status: "paid",
    method: "Bank Transfer"
  },
  {
    id: "TXN002", 
    date: "2024-01-10",
    description: "Security Deposit",
    amount: 50000,
    status: "paid",
    method: "Card Payment"
  },
  {
    id: "TXN003",
    date: "2024-01-05",
    description: "Registration Fee",
    amount: 15000,
    status: "paid", 
    method: "Online Transfer"
  },
  {
    id: "TXN004",
    date: "2024-02-01",
    description: "Room Rent - February 2024",
    amount: 85000,
    status: "pending",
    method: "Bank Transfer"
  },
  {
    id: "TXN005",
    date: "2023-12-20",
    description: "Utility Bill - December",
    amount: 12000,
    status: "failed",
    method: "Card Payment"
  }
];

export const studentProfile = {
  name: "Adebayo Johnson",
  email: "adebayo.johnson@student.university.edu.ng",
  studentId: "UNI/2021/CSC/0456",
  phone: "+234 801 234 5678",
  program: "Computer Science",
  level: "300L",
  roomNumber: "Block A - Room 205",
  roomType: "Single Room",
  checkInDate: "2024-01-05",
  avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
};

export const agreement = {
  title: "Abike Ade Court Hostel Agreement",
  version: "v2024.1",
  lastUpdated: "January 1, 2024",
  content: `
    TERMS AND CONDITIONS FOR HOSTEL ACCOMMODATION
    
    1. GENERAL PROVISIONS
    This agreement is between Abike Ade Court Management and the student (resident) for hostel accommodation.
    
    2. PAYMENT TERMS
    - All fees must be paid in full before occupancy
    - Late payment attracts a penalty of 5% per week
    - No refund for early termination without valid reasons
    
    3. HOUSE RULES
    - No smoking or alcohol consumption in rooms
    - Visitors allowed only between 8:00 AM - 10:00 PM
    - Students must maintain cleanliness in their rooms
    - Loud music/noise prohibited after 10:00 PM
    
    4. MAINTENANCE AND REPAIRS
    - Report all maintenance issues promptly
    - Damage caused by negligence will be charged to student
    - Management reserves right to enter rooms for inspection
    
    5. SECURITY
    - Students must keep room keys secure
    - Lost keys will be charged ₦5,000 replacement fee
    - Management not liable for stolen personal items
    
    6. TERMINATION
    - Either party may terminate with 30 days notice
    - Violation of rules may result in immediate eviction
    - Security deposit refunded after room inspection
  `
};

// Room listing data
export const rooms = [
  {
    id: "room-001",
    title: "Premium Single Room",
    type: "Single",
    price: 85000,
    pricePer: "month",
    capacity: 1,
    size: "12m²",
    floor: "2nd Floor",
    block: "Block A",
    roomNumber: "A-201",
    status: "available",
    images: [
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    ],
    amenities: [
      "Private Bathroom",
      "Study Desk",
      "Wardrobe",
      "Ceiling Fan",
      "High-Speed WiFi",
      "24/7 Power Supply"
    ],
    description: "Spacious single room with modern amenities, perfect for focused study and comfortable living. Features a private bathroom and dedicated study area.",
    features: {
      bedType: "Single Bed",
      bathroom: "Private",
      kitchen: "Shared",
      balcony: false,
      ac: false,
      wifi: true,
      parking: true
    },
    rules: [
      "No smoking",
      "No pets",
      "Quiet hours: 10 PM - 7 AM",
      "Maximum 2 visitors at a time"
    ],
    availability: {
      immediate: true,
      nextAvailable: "2024-02-01",
      minimumStay: "3 months"
    }
  },
  {
    id: "room-002",
    title: "Deluxe Single Room",
    type: "Single",
    price: 95000,
    pricePer: "month",
    capacity: 1,
    size: "15m²",
    floor: "3rd Floor",
    block: "Block A",
    roomNumber: "A-305",
    status: "available",
    images: [
      "https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    ],
    amenities: [
      "Private Bathroom",
      "Study Desk",
      "Wardrobe",
      "Air Conditioning",
      "Ceiling Fan",
      "High-Speed WiFi",
      "24/7 Power Supply",
      "Mini Fridge"
    ],
    description: "Premium single room with air conditioning and additional amenities. Ideal for students who prefer extra comfort and convenience.",
    features: {
      bedType: "Single Bed",
      bathroom: "Private",
      kitchen: "Shared",
      balcony: true,
      ac: true,
      wifi: true,
      parking: true
    },
    rules: [
      "No smoking",
      "No pets",
      "Quiet hours: 10 PM - 7 AM",
      "Maximum 2 visitors at a time"
    ],
    availability: {
      immediate: true,
      nextAvailable: "2024-02-01",
      minimumStay: "3 months"
    }
  },
  {
    id: "room-003",
    title: "Shared Double Room",
    type: "Shared",
    price: 65000,
    pricePer: "month",
    capacity: 2,
    size: "18m²",
    floor: "1st Floor",
    block: "Block B",
    roomNumber: "B-105",
    status: "available",
    images: [
      "https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571466/pexels-photo-1571466.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    ],
    amenities: [
      "Shared Bathroom",
      "Two Study Desks",
      "Two Wardrobes",
      "Ceiling Fan",
      "High-Speed WiFi",
      "24/7 Power Supply"
    ],
    description: "Comfortable shared room perfect for friends or roommates. Each occupant gets their own study desk and wardrobe space.",
    features: {
      bedType: "Two Single Beds",
      bathroom: "Shared",
      kitchen: "Shared",
      balcony: false,
      ac: false,
      wifi: true,
      parking: true
    },
    rules: [
      "No smoking",
      "No pets",
      "Quiet hours: 10 PM - 7 AM",
      "Maximum 2 visitors per person"
    ],
    availability: {
      immediate: true,
      nextAvailable: "2024-02-01",
      minimumStay: "3 months"
    }
  },
  {
    id: "room-004",
    title: "Premium Double Room",
    type: "Shared",
    price: 75000,
    pricePer: "month",
    capacity: 2,
    size: "20m²",
    floor: "4th Floor",
    block: "Block B",
    roomNumber: "B-405",
    status: "booked",
    images: [
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    ],
    amenities: [
      "Private Bathroom",
      "Two Study Desks",
      "Two Wardrobes",
      "Air Conditioning",
      "Ceiling Fan",
      "High-Speed WiFi",
      "24/7 Power Supply",
      "Mini Fridge",
      "Balcony"
    ],
    description: "Luxury shared room with private bathroom and balcony. Perfect for students who want premium shared accommodation.",
    features: {
      bedType: "Two Single Beds",
      bathroom: "Private",
      kitchen: "Shared",
      balcony: true,
      ac: true,
      wifi: true,
      parking: true
    },
    rules: [
      "No smoking",
      "No pets",
      "Quiet hours: 10 PM - 7 AM",
      "Maximum 2 visitors per person"
    ],
    availability: {
      immediate: false,
      nextAvailable: "2024-03-01",
      minimumStay: "3 months"
    }
  },
  {
    id: "room-005",
    title: "Studio Apartment",
    type: "Studio",
    price: 120000,
    pricePer: "month",
    capacity: 1,
    size: "25m²",
    floor: "5th Floor",
    block: "Block C",
    roomNumber: "C-501",
    status: "available",
    images: [
      "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571473/pexels-photo-1571473.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    ],
    amenities: [
      "Private Bathroom",
      "Private Kitchen",
      "Study Desk",
      "Wardrobe",
      "Air Conditioning",
      "Ceiling Fan",
      "High-Speed WiFi",
      "24/7 Power Supply",
      "Balcony",
      "Mini Fridge"
    ],
    description: "Complete studio apartment with private kitchen and bathroom. Ideal for students who prefer complete independence and privacy.",
    features: {
      bedType: "Single Bed",
      bathroom: "Private",
      kitchen: "Private",
      balcony: true,
      ac: true,
      wifi: true,
      parking: true
    },
    rules: [
      "No smoking",
      "No pets",
      "Quiet hours: 10 PM - 7 AM",
      "Maximum 3 visitors at a time"
    ],
    availability: {
      immediate: true,
      nextAvailable: "2024-02-01",
      minimumStay: "6 months"
    }
  },
  {
    id: "room-006",
    title: "Economy Single Room",
    type: "Single",
    price: 65000,
    pricePer: "month",
    capacity: 1,
    size: "10m²",
    floor: "1st Floor",
    block: "Block D",
    roomNumber: "D-101",
    status: "available",
    images: [
      "https://images.pexels.com/photos/1571474/pexels-photo-1571474.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571475/pexels-photo-1571475.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1571476/pexels-photo-1571476.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    ],
    amenities: [
      "Shared Bathroom",
      "Study Desk",
      "Wardrobe",
      "Ceiling Fan",
      "High-Speed WiFi",
      "24/7 Power Supply"
    ],
    description: "Affordable single room with shared bathroom. Perfect for budget-conscious students who want quality accommodation.",
    features: {
      bedType: "Single Bed",
      bathroom: "Shared",
      kitchen: "Shared",
      balcony: false,
      ac: false,
      wifi: true,
      parking: true
    },
    rules: [
      "No smoking",
      "No pets",
      "Quiet hours: 10 PM - 7 AM",
      "Maximum 2 visitors at a time"
    ],
    availability: {
      immediate: true,
      nextAvailable: "2024-02-01",
      minimumStay: "3 months"
    }
  }
];

// Room filters and categories
export const roomTypes = [
  { value: "all", label: "All Rooms" },
  { value: "single", label: "Single Rooms" },
  { value: "shared", label: "Shared Rooms" },
  { value: "studio", label: "Studio Apartments" }
];

export const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-70000", label: "₦0 - ₦70,000" },
  { value: "70000-90000", label: "₦70,000 - ₦90,000" },
  { value: "90000-120000", label: "₦90,000 - ₦120,000" },
  { value: "120000+", label: "₦120,000+" }
];

export const amenities = [
  { value: "ac", label: "Air Conditioning" },
  { value: "private-bathroom", label: "Private Bathroom" },
  { value: "balcony", label: "Balcony" },
  { value: "parking", label: "Parking" },
  { value: "wifi", label: "High-Speed WiFi" }
];