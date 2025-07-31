"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
	Search,
	Star,
	MapPin,
	Bed,
	Bath,
	Car,
	Wifi,
	Shield,
	Building2,
	ArrowRight,
	Heart,
	Eye,
	Users,
	Home,
	ChevronLeft,
	ChevronRight,
	Mail,
	Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Expanded property data with new multi-unit building
const properties = [
	{
		id: 1,
		title: "Modern 2BR Apartment in Bole",
		type: "Apartment",
		price: 25000,
		rating: 4.8,
		reviews: 24,
		bedrooms: 2,
		bathrooms: 2,
		area: "85 sqm",
		featured: true,
		images: [
			"https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
			"https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["Parking", "WiFi", "Security", "Generator"],
		description:
			"Beautiful modern apartment with stunning city views, fully furnished.",
		yearBuilt: 2020,
		leaseTerms: "1-year minimum",
		representative: {
			name: "Abebe Kebede",
			phone: "+251-911-123456",
			email: "abebe@akeray.et",
		},
	},
	{
		id: 2,
		title: "Luxury Condo in Kazanchis",
		type: "Condo",
		price: 38000,
		rating: 4.9,
		reviews: 30,
		bedrooms: 3,
		bathrooms: 2,
		area: "120 sqm",
		featured: true,
		images: [
			"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
			"https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["Pool", "Gym", "Security", "Parking"],
		description: "Elegant condo with premium amenities in a prime location.",
		yearBuilt: 2018,
		leaseTerms: "6-month minimum",
		representative: {
			name: "Meron Tesfaye",
			phone: "+251-922-987654",
			email: "meron@akeray.et",
		},
	},
	{
		id: 3,
		title: "Spacious Townhouse in Gerji",
		type: "Townhouse",
		price: 32000,
		rating: 4.7,
		reviews: 18,
		bedrooms: 3,
		bathrooms: 3,
		area: "150 sqm",
		featured: false,
		images: [
			"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["Garden", "Parking", "Security", "Balcony"],
		description: "Modern townhouse with spacious rooms and private garden.",
		yearBuilt: 2019,
		leaseTerms: "1-year minimum",
		representative: {
			name: "Yared Alemayehu",
			phone: "+251-933-456789",
			email: "yared@akeray.et",
		},
	},
	{
		id: 4,
		title: "Commercial Office Building in Piassa",
		type: "Office",
		price: 45000,
		rating: 4.6,
		reviews: 15,
		bedrooms: 0,
		bathrooms: 2,
		area: "200 sqm",
		featured: false,
		images: [
			"https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["Elevator", "Parking", "Security", "Conference Room"],
		description: "Prime office space in the heart of the business district.",
		yearBuilt: 2017,
		leaseTerms: "2-year minimum",
		representative: {
			name: "Selamawit Bekele",
			phone: "+251-944-321098",
			email: "selamawit@akeray.et",
		},
	},
	{
		id: 5,
		title: "Cozy Studio in CMC",
		type: "Apartment",
		price: 15000,
		rating: 4.4,
		reviews: 10,
		bedrooms: 1,
		bathrooms: 1,
		area: "40 sqm",
		featured: false,
		images: [
			"https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["WiFi", "Furnished", "Security"],
		description: "Perfect studio for young professionals, fully equipped.",
		yearBuilt: 2021,
		leaseTerms: "6-month minimum",
		representative: {
			name: "Dawit Tadesse",
			phone: "+251-955-654321",
			email: "dawit@akeray.et",
		},
	},
	{
		id: 6,
		title: "Family House in Sarbet",
		type: "House",
		price: 40000,
		rating: 4.8,
		reviews: 22,
		bedrooms: 4,
		bathrooms: 3,
		area: "180 sqm",
		featured: true,
		images: [
			"https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["Garden", "Parking", "Security", "Pool"],
		description: "Spacious family home with modern amenities and large garden.",
		yearBuilt: 2016,
		leaseTerms: "1-year minimum",
		representative: {
			name: "Lidya Asfaw",
			phone: "+251-966-789123",
			email: "lidya@akeray.et",
		},
	},
	{
		id: 7,
		title: "Retail Shop in Merkato",
		type: "Shop",
		price: 20000,
		rating: 4.5,
		reviews: 12,
		bedrooms: 0,
		bathrooms: 1,
		area: "60 sqm",
		featured: false,
		images: [
			"https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["Security", "Storage", "High Foot Traffic"],
		description: "Prime retail space in the bustling Merkato market.",
		yearBuilt: 2015,
		leaseTerms: "1-year minimum",
		representative: {
			name: "Tewodros Getachew",
			phone: "+251-977-123456",
			email: "tewodros@akeray.et",
		},
	},
	{
		id: 8,
		title: "Luxury Villa in Old Airport",
		type: "Villa",
		price: 55000,
		rating: 4.9,
		reviews: 28,
		bedrooms: 5,
		bathrooms: 4,
		area: "250 sqm",
		featured: true,
		images: [
			"https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["Pool", "Garden", "Security", "Maid Quarters"],
		description: "Exquisite villa with expansive grounds and luxury finishes.",
		yearBuilt: 2020,
		leaseTerms: "2-year minimum",
		representative: {
			name: "Hana Lemma",
			phone: "+251-988-456789",
			email: "hana@akeray.et",
		},
	},
	{
		id: 9,
		title: "Modern 3BR Condo in Megenagna",
		type: "Condo",
		price: 34000,
		rating: 4.7,
		reviews: 20,
		bedrooms: 3,
		bathrooms: 2,
		area: "110 sqm",
		featured: false,
		images: [
			"https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["Gym", "Parking", "Security", "Rooftop"],
		description: "Stylish condo with modern amenities in a vibrant area.",
		yearBuilt: 2019,
		leaseTerms: "1-year minimum",
		representative: {
			name: "Elias Teshome",
			phone: "+251-999-321098",
			email: "elias@akeray.et",
		},
	},
	{
		id: 10,
		title: "Compact Office in Bole Atlas",
		type: "Office",
		price: 28000,
		rating: 4.3,
		reviews: 8,
		bedrooms: 0,
		bathrooms: 1,
		area: "80 sqm",
		featured: false,
		images: [
			"https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["Elevator", "WiFi", "Security"],
		description: "Efficient office space perfect for startups.",
		yearBuilt: 2022,
		leaseTerms: "1-year minimum",
		representative: {
			name: "Bethel Solomon",
			phone: "+251-911-654321",
			email: "bethel@akeray.et",
		},
	},
	{
		id: 11,
		title: "Charming 2BR House in Summit",
		type: "House",
		price: 30000,
		rating: 4.6,
		reviews: 15,
		bedrooms: 2,
		bathrooms: 2,
		area: "100 sqm",
		featured: false,
		images: [
			"https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["Garden", "Parking", "Pet-Friendly"],
		description: "Cozy house ideal for small families or professionals.",
		yearBuilt: 2018,
		leaseTerms: "6-month minimum",
		representative: {
			name: "Ruth Getachew",
			phone: "+251-922-789123",
			email: "ruth@akeray.et",
		},
	},
	{
		id: 12,
		title: "Duplex Apartment in Ayat",
		type: "Apartment",
		price: 27000,
		rating: 4.5,
		reviews: 14,
		bedrooms: 3,
		bathrooms: 2,
		area: "95 sqm",
		featured: false,
		images: [
			"https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["Balcony", "WiFi", "Security"],
		description: "Spacious duplex with modern design and great views.",
		yearBuilt: 2021,
		leaseTerms: "1-year minimum",
		representative: {
			name: "Samuel Negash",
			phone: "+251-933-123456",
			email: "samuel@akeray.et",
		},
	},
	{
		id: 13,
		title: "Executive Townhouse in CMC",
		type: "Townhouse",
		price: 36000,
		rating: 4.8,
		reviews: 19,
		bedrooms: 3,
		bathrooms: 3,
		area: "140 sqm",
		featured: true,
		images: [
			"https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: ["Garage", "Garden", "Security", "Rooftop"],
		description: "Elegant townhouse with premium features and ample space.",
		yearBuilt: 2019,
		leaseTerms: "1-year minimum",
		representative: {
			name: "Aster Mengistu",
			phone: "+251-944-987654",
			email: "aster@akeray.et",
		},
	},
	{
		id: 14,
		title: "Bole Heights Building",
		type: "Building",
		price: 120000, // Total for all units
		rating: 4.7,
		reviews: 25,
		bedrooms: 10, // Total across units
		bathrooms: 8, // Total across units
		area: "400 sqm",
		featured: true,
		images: [
			"https://images.pexels.com/photos/259685/pexels-photo-259685.jpeg?auto=compress&cs=tinysrgb&w=800",
			"https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=800",
			"https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		amenities: [
			"Elevator",
			"Parking",
			"Security",
			"Generator",
			"Rooftop Terrace",
		],
		description:
			"Modern multi-unit building with 4 rental units, ideal for families and professionals in Bole.",
		yearBuilt: 2020,
		leaseTerms: "1-year minimum per unit",
		representative: {
			name: "Fikru Tesfaye",
			phone: "+251-911-555678",
			email: "fikru@akeray.et",
		},
		units: [
			{
				unitId: "A1",
				type: "2BR Apartment",
				class: "Standard",
				age: 5, // Years since built
				floor: 2,
				price: 30000,
				bedrooms: 2,
				bathrooms: 2,
				area: "90 sqm",
				status: "Available",
				amenities: ["Balcony", "WiFi", "Parking"],
			},
			{
				unitId: "A2",
				type: "3BR Apartment",
				class: "Premium",
				age: 5,
				floor: 3,
				price: 35000,
				bedrooms: 3,
				bathrooms: 2,
				area: "110 sqm",
				status: "Occupied",
				amenities: ["Balcony", "WiFi", "Parking", "Generator"],
			},
			{
				unitId: "B1",
				type: "2BR Apartment",
				class: "Standard",
				age: 5,
				floor: 4,
				price: 28000,
				bedrooms: 2,
				bathrooms: 1,
				area: "85 sqm",
				status: "Available",
				amenities: ["WiFi", "Parking"],
			},
			{
				unitId: "B2",
				type: "3BR Penthouse",
				class: "Luxury",
				age: 5,
				floor: 5,
				price: 40000,
				bedrooms: 3,
				bathrooms: 3,
				area: "125 sqm",
				status: "Available",
				amenities: ["Rooftop Terrace", "WiFi", "Parking", "Generator"],
			},
		],
	},
];

// Expanded testimonials
const testimonials = [
	{
		name: "Abebe Kebede",
		role: "Tenant",
		text: "Found my dream apartment in just days! Akeray made renting so easy.",
		image: "https://randomuser.me/api/portraits/men/1.jpg",
	},
	{
		name: "Meron Tesfaye",
		role: "Owner",
		text: "Listing my property was seamless, and I got tenants quickly!",
		image: "https://randomuser.me/api/portraits/women/2.jpg",
	},
	{
		name: "Yared Alemayehu",
		role: "Tenant",
		text: "The search filters made finding my perfect home a breeze!",
		image: "https://randomuser.me/api/portraits/men/3.jpg",
	},
	{
		name: "Selamawit Bekele",
		role: "Tenant",
		text: "Akeray’s platform is user-friendly, and the support team is amazing!",
		image: "https://randomuser.me/api/portraits/women/4.jpg",
	},
	{
		name: "Dawit Tadesse",
		role: "Owner",
		text: "I listed my office space and had inquiries within hours!",
		image: "https://randomuser.me/api/portraits/men/5.jpg",
	},
	{
		name: "Lidya Asfaw",
		role: "Tenant",
		text: "The variety of properties on Akeray helped me find exactly what I needed.",
		image: "https://randomuser.me/api/portraits/women/6.jpg",
	},
];

export default function LandingPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [filterPrice, setFilterPrice] = useState("all");
	const [selectedProperty, setSelectedProperty] = useState<any>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Parallax for hero and sections
	const heroRef = useRef(null);
	const { scrollY } = useScroll();
	const heroBgY = useTransform(scrollY, [0, 600], [0, 200]);
	const heroTextY = useTransform(scrollY, [0, 600], [0, 50]);

	// Animation triggers
	const [featuredRefView, featuredInView] = useInView({ threshold: 0.3 });
	const [allRefView, allInView] = useInView({ threshold: 0.3 });
	const [ctaRefView, ctaInView] = useInView({ threshold: 0.3 });

	// Filter properties
	const filteredProperties = properties.filter((property) => {
		const matchesSearch =
			property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.type.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType =
			filterType === "all" ||
			property.type.toLowerCase() === filterType.toLowerCase();
		const matchesPrice =
			filterPrice === "all" ||
			(filterPrice === "low" && property.price < 20000) ||
			(filterPrice === "medium" &&
				property.price >= 20000 &&
				property.price < 35000) ||
			(filterPrice === "high" && property.price >= 35000);
		return matchesSearch && matchesType && matchesPrice;
	});

	const featuredProperties = filteredProperties.filter((p) => p.featured);
	const regularProperties = filteredProperties.filter((p) => !p.featured);

	// Render star ratings
	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`h-4 w-4 ${
					i < Math.floor(rating)
						? "fill-yellow-400 text-yellow-400"
						: "text-gray-300"
				}`}
			/>
		));
	};

	// Property type icon
	const getTypeIcon = (type: string) => {
		switch (type.toLowerCase()) {
			case "apartment":
				return <Building2 className="h-5 w-5" />;
			case "house":
				return <Home className="h-5 w-5" />;
			case "condo":
				return <Building2 className="h-5 w-5" />;
			case "townhouse":
				return <Home className="h-5 w-5" />;
			case "shop":
				return <span>🏪</span>;
			case "office":
				return <span>🏢</span>;
			case "villa":
				return <Home className="h-5 w-5" />;
			case "building":
				return <Building2 className="h-5 w-5" />;
			default:
				return <Home className="h-5 w-5" />;
		}
	};

	// Image carousel navigation
	const nextImage = () => {
		if (selectedProperty) {
			setCurrentImageIndex(
				(prev) => (prev + 1) % selectedProperty.images.length
			);
		}
	};

	const prevImage = () => {
		if (selectedProperty) {
			setCurrentImageIndex((prev) =>
				prev === 0 ? selectedProperty.images.length - 1 : prev - 1
			);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-blue-50 font-[Poppins]">
			{/* Header */}
			<motion.header
				className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			>
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#F1C40F] rounded-xl flex items-center justify-center shadow-lg">
							<Building2 className="h-6 w-6 text-white" />
						</div>
						<div>
							<h1 className="font-bold text-2xl bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] bg-clip-text text-transparent">
								Akeray Marketplace
							</h1>
							<p className="text-sm text-gray-500">Find Your Perfect Rental</p>
						</div>
					</div>
					<div className="flex items-center space-x-3">
						<Button
							variant="outline"
							asChild
							className="border-[#4A90E2] hover:bg-[#F5F7FA] text-[#4A90E2]"
						>
							<Link href="/login">Login</Link>
						</Button>
						<Dialog>
							<DialogTrigger asChild>
								<Button className="bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] hover:from-[#3A80D2] hover:to-[#E1B40F] text-white">
									Sign Up
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-md bg-white">
								<DialogHeader>
									<DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] bg-clip-text text-transparent">
										Join Akeray
									</DialogTitle>
									<DialogDescription className="text-center text-gray-600">
										Choose your role to start
									</DialogDescription>
								</DialogHeader>
								<div className="space-y-4 py-4">
									<Button
										asChild
										className="w-full h-16 bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] hover:from-[#3A80D2] hover:to-[#E1B40F] text-white"
									>
										<Link href="/signup/owner" className="flex flex-col">
											<span className="font-semibold">Join as Owner</span>
											<span className="text-sm opacity-90">
												List your properties
											</span>
										</Link>
									</Button>
									<Button
										asChild
										variant="outline"
										className="w-full h-16 border-[#4A90E2] hover:bg-[#F5F7FA] text-[#4A90E2]"
									>
										<Link href="/signup/tenant" className="flex flex-col">
											<span className="font-semibold">Join as Tenant</span>
											<span className="text-sm text-gray-600">Find a home</span>
										</Link>
									</Button>
								</div>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</motion.header>

			{/* Hero Section with Enhanced Parallax */}
			<section ref={heroRef} className="relative overflow-hidden pt-20">
				<motion.div
					style={{ y: heroBgY }}
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage: `url('https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
					}}
				/>
				<div className="absolute inset-0 bg-black/40" />
				<div className="relative container mx-auto px-4 py-32 text-center">
					<motion.div
						style={{ y: heroTextY }}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1, ease: "easeOut" }}
					>
						<h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
							Find Your Perfect Rental with APMS
						</h1>
						<p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
							Discover premium apartments, condos, houses, and more across
							Ethiopia. Your dream home awaits!
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Dialog>
								<DialogTrigger asChild>
									<Button
										size="lg"
										className="bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] hover:from-[#3A80D2] hover:to-[#E1B40F] text-white text-lg px-8 py-6"
									>
										<ArrowRight className="mr-2 h-5 w-5" />
										Start Now
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-md bg-white">
									<DialogHeader>
										<DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] bg-clip-text text-transparent">
											Join Akeray
										</DialogTitle>
										<DialogDescription className="text-center text-gray-600">
											Choose your role
										</DialogDescription>
									</DialogHeader>
									<div className="space-y-4 py-4">
										<Button
											asChild
											className="w-full h-16 bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] hover:from-[#3A80D2] hover:to-[#E1B40F] text-white"
										>
											<Link href="/signup/owner" className="flex flex-col">
												<span className="font-semibold">Owner</span>
												<span className="text-sm opacity-90">
													List your properties
												</span>
											</Link>
										</Button>
										<Button
											asChild
											variant="outline"
											className="w-full h-16 border-[#4A90E2] hover:bg-[#F5F7FA] text-[#4A90E2]"
										>
											<Link href="/signup/tenant" className="flex flex-col">
												<span className="font-semibold">Tenant</span>
												<span className="text-sm text-gray-600">
													Find a home
												</span>
											</Link>
										</Button>
									</div>
								</DialogContent>
							</Dialog>
							<Button
								variant="outline"
								size="lg"
								asChild
								className="border-[#4A90E2] hover:bg-[#F5F7FA] text-[#4A90E2] text-lg px-8 py-6"
							>
								<Link href="/login">Already a Member?</Link>
							</Button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Property Type Carousel */}
			<section className="py-12 px-4 bg-[#F5F7FA]">
				<div className="container mx-auto text-center">
					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="text-3xl font-bold mb-8 text-gray-900"
					>
						Explore by Property Type
					</motion.h2>
					<div className="flex justify-center gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
						{[
							"Apartment",
							"House",
							"Condo",
							"Townhouse",
							"Shop",
							"Office",
							"Villa",
							"Building",
						].map((type, index) => (
							<motion.div
								key={type}
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.2,
									ease: "easeOut",
								}}
								className="flex-shrink-0 snap-center"
							>
								<Button
									variant={
										filterType === type.toLowerCase() ? "default" : "outline"
									}
									className={`flex items-center space-x-2 h-12 px-6 rounded-full ${
										filterType === type.toLowerCase()
											? "bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] text-white"
											: "border-[#4A90E2] hover:bg-[#F5F7FA]"
									}`}
									onClick={() => setFilterType(type.toLowerCase())}
									aria-label={`Filter by ${type}`}
								>
									{getTypeIcon(type)}
									<span>{type}</span>
								</Button>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Search and Filter Section */}
			<section className="py-7 px-4 sticky top-16 z-40 bg-[#F5F7FA]/90 backdrop-blur-md">
				<div className="container mx-auto">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="bg-white rounded-2xl shadow-lg p-6 border border-[#4A90E2]/20"
					>
						<h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
							Search Properties
						</h2>
						<div className="flex flex-col md:flex-row gap-4">
							<div className="relative flex-1">
								<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
								<Input
									placeholder="Search by location, type, or features..."
									className="pl-12 h-12 rounded-full border-2 border-[#4A90E2]/50 focus:border-[#4A90E2] text-gray-900"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									aria-label="Search properties"
								/>
							</div>
							<Select value={filterType} onValueChange={setFilterType}>
								<SelectTrigger className="h-12 rounded-full border-2 border-[#4A90E2]/50 focus:border-[#4A90E2] text-gray-900">
									<SelectValue placeholder="Property Type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Types</SelectItem>
									<SelectItem value="apartment">Apartment</SelectItem>
									<SelectItem value="house">House</SelectItem>
									<SelectItem value="condo">Condo</SelectItem>
									<SelectItem value="townhouse">Townhouse</SelectItem>
									<SelectItem value="shop">Shop</SelectItem>
									<SelectItem value="office">Office</SelectItem>
									<SelectItem value="villa">Villa</SelectItem>
									<SelectItem value="building">Building</SelectItem>
								</SelectContent>
							</Select>
							<Select value={filterPrice} onValueChange={setFilterPrice}>
								<SelectTrigger className="h-12 rounded-full border-2 border-[#4A90E2]/50 focus:border-[#4A90E2] text-gray-900">
									<SelectValue placeholder="Price Range" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Prices</SelectItem>
									<SelectItem value="low">Under 20,000 ETB</SelectItem>
									<SelectItem value="medium">20,000 - 35,000 ETB</SelectItem>
									<SelectItem value="high">Above 35,000 ETB</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Featured Properties - Horizontal Scroll */}
			{featuredProperties.length > 0 && (
				<section
					ref={featuredRefView}
					className="py-16 px-4 relative overflow-hidden"
				>
					<motion.div
						style={{ y: useTransform(scrollY, [0, 1000], [0, 300]) }}
						className="absolute inset-0 bg-cover bg-center opacity-20"
						style={{
							backgroundImage: `url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800')`,
						}}
					/>
					<div className="relative container mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{
								opacity: featuredInView ? 1 : 0,
								y: featuredInView ? 0 : 50,
							}}
							transition={{ duration: 0.8, ease: "easeOut" }}
						>
							<div className="text-center mb-12">
								<Badge className="bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] text-white px-4 py-2 mb-4">
									⭐ Featured Listings
								</Badge>
								<h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] bg-clip-text text-transparent">
									Premium Properties
								</h2>
								<p className="text-lg text-gray-600">
									Explore our top-tier rentals
								</p>
							</div>
							<div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
								{featuredProperties.map((property, index) => (
									<motion.div
										key={property.id}
										initial={{ opacity: 0, x: 100 }}
										animate={{
											opacity: featuredInView ? 1 : 0,
											x: featuredInView ? 0 : 100,
										}}
										transition={{
											duration: 0.6,
											delay: index * 0.3,
											ease: "easeOut",
										}}
										whileHover={{ scale: 1.05 }}
										className="flex-shrink-0 w-80 snap-center"
									>
										<Card className="group bg-white/95 border-[#4A90E2]/20 shadow-lg hover:shadow-xl transition-all duration-500">
											<div className="relative overflow-hidden rounded-t-lg">
												<img
													src={property.images[0]}
													alt={property.title}
													className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
												/>
												<div className="absolute top-4 left-4">
													<Badge className="bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] text-white">
														FEATURED
													</Badge>
												</div>
												<div className="absolute top-4 right-4">
													<Button
														variant="ghost"
														size="sm"
														className="bg-white/80 hover:bg-white"
														aria-label="Save property"
													>
														<Heart className="h-4 w-4 text-[#4A90E2]" />
													</Button>
												</div>
												<div className="absolute bottom-4 left-4">
													<Badge className="bg-white/90 text-gray-800 font-bold text-lg">
														{property.price.toLocaleString()} ETB/month
													</Badge>
												</div>
											</div>
											<CardHeader className="pb-3">
												<CardTitle className="text-lg font-bold text-gray-900 group-hover:text-[#4A90E2]">
													{property.title}
												</CardTitle>
												<div className="flex items-center space-x-2">
													{getTypeIcon(property.type)}
													<Badge
														variant="outline"
														className="text-[#4A90E2] border-[#4A90E2]"
													>
														{property.type}
													</Badge>
												</div>
											</CardHeader>
											<CardContent>
												<div className="flex items-center space-x-1 mb-4">
													{renderStars(property.rating)}
													<span className="text-sm text-gray-600 ml-2">
														{property.rating} ({property.reviews})
													</span>
												</div>
												<div className="grid grid-cols-3 gap-4 text-center text-sm">
													{property.bedrooms > 0 && (
														<div className="flex flex-col items-center">
															<Bed className="h-4 w-4 text-gray-500" />
															<span>{property.bedrooms} Bed</span>
														</div>
													)}
													<div className="flex flex-col items-center">
														<Bath className="h-4 w-4 text-gray-500" />
														<span>{property.bathrooms} Bath</span>
													</div>
													<div className="flex flex-col items-center">
														<MapPin className="h-4 w-4 text-gray-500" />
														<span>{property.area}</span>
													</div>
												</div>
												<Button
													className="w-full mt-4 bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] hover:from-[#3A80D2] hover:to-[#E1B40F] text-white"
													onClick={() => setSelectedProperty(property)}
												>
													<Eye className="h-4 w-4 mr-2" />
													View Details
												</Button>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>
			)}

			{/* All Properties */}
			<section ref={allRefView} className="py-16 px-4">
				<div className="container mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: allInView ? 1 : 0, y: allInView ? 0 : 50 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<div className="text-center mb-12">
							<h2 className="text-4xl font-bold mb-4 text-gray-900">
								All Properties
							</h2>
							<p className="text-lg text-gray-600">
								Browse our full collection of rentals
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{regularProperties.map((property, index) => (
								<motion.div
									key={property.id}
									initial={{ opacity: 0, y: 50 }}
									animate={{
										opacity: allInView ? 1 : 0,
										y: allInView ? 0 : 50,
									}}
									transition={{
										duration: 0.6,
										delay: index * 0.2,
										ease: "easeOut",
									}}
									whileHover={{ scale: 1.05 }}
								>
									<Card className="group bg-white/95 border-[#4A90E2]/20 shadow-md hover:shadow-xl transition-all duration-300">
										<div className="relative overflow-hidden rounded-t-lg">
											<img
												src={property.images[0]}
												alt={property.title}
												className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
											/>
											<div className="absolute top-4 right-4">
												<Button
													variant="ghost"
													size="sm"
													className="bg-white/80 hover:bg-white"
													aria-label="Save property"
												>
													<Heart className="h-4 w-4 text-[#4A90E2]" />
												</Button>
											</div>
											<div className="absolute bottom-4 left-4">
												<Badge className="bg-white/90 text-gray-800 font-bold">
													{property.price.toLocaleString()} ETB/month
												</Badge>
											</div>
										</div>
										<CardHeader className="pb-3">
											<CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-[#4A90E2]">
												{property.title}
											</CardTitle>
											<div className="flex items-center space-x-2">
												{getTypeIcon(property.type)}
												<Badge
													variant="outline"
													className="text-[#4A90E2] border-[#4A90E2]"
												>
													{property.type}
												</Badge>
											</div>
										</CardHeader>
										<CardContent>
											<div className="flex items-center space-x-1 mb-3">
												{renderStars(property.rating)}
												<span className="text-sm text-gray-600 ml-2">
													{property.rating} ({property.reviews})
												</span>
											</div>
											<div className="grid grid-cols-3 gap-2 text-center text-sm">
												{property.bedrooms > 0 && (
													<div className="flex flex-col items-center">
														<Bed className="h-4 w-4 text-gray-500" />
														<span>{property.bedrooms} Bed</span>
													</div>
												)}
												<div className="flex flex-col items-center">
													<Bath className="h-4 w-4 text-gray-500" />
													<span>{property.bathrooms} Bath</span>
												</div>
												<div className="flex flex-col items-center">
													<MapPin className="h-4 w-4 text-gray-500" />
													<span>{property.area}</span>
												</div>
											</div>
											<Button
												variant="outline"
												className="w-full mt-3 border-[#4A90E2] hover:bg-[#F5F7FA] text-[#4A90E2]"
												onClick={() => setSelectedProperty(property)}
											>
												<Eye className="h-4 w-4 mr-2" />
												View Details
											</Button>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Testimonial Section - Higher z-index and margin */}
			<section className="py-16 px-4 bg-[#F5F7FA] relative overflow-hidden mt-20 z-50">
				<motion.div
					style={{ y: useTransform(scrollY, [0, 1200], [0, 250]) }}
					className="absolute inset-0 bg-cover bg-center opacity-10"
					style={{
						backgroundImage: `url('https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800')`,
					}}
				/>
				<div className="relative container mx-auto">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{
							opacity: ctaInView ? 1 : 0,
							scale: ctaInView ? 1 : 0.95,
						}}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
							What Our Users Say
						</h2>
						<div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: 100 }}
									animate={{
										opacity: ctaInView ? 1 : 0,
										x: ctaInView ? 0 : 100,
									}}
									transition={{
										duration: 0.7,
										delay: index * 0.3,
										ease: "easeOut",
									}}
									whileHover={{ scale: 1.03 }}
									className="flex-shrink-0 w-80 snap-center"
								>
									<Card className="bg-white/95 p-6 shadow-lg border-[#4A90E2]/20">
										<div className="flex items-center space-x-4 mb-4">
											<img
												src={testimonial.image}
												alt={testimonial.name}
												className="w-12 h-12 rounded-full object-cover"
											/>
											<div>
												<p className="font-semibold text-gray-900">
													{testimonial.name}
												</p>
												<p className="text-sm text-gray-600">
													{testimonial.role}
												</p>
											</div>
										</div>
										<p className="text-gray-700 italic">"{testimonial.text}"</p>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Stats CTA Section */}
			<section
				ref={ctaRefView}
				className="py-16 px-4 bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] text-white"
			>
				<div className="container mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: ctaInView ? 1 : 0, y: ctaInView ? 0 : 50 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<h2 className="text-4xl font-bold mb-6">
							Join the Akeray Community
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto">
							Connect with thousands of property owners and tenants across
							Ethiopia.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
							{[
								{ value: "1,000+", label: "Properties Listed" },
								{ value: "5,000+", label: "Happy Tenants" },
								{ value: "500+", label: "Verified Owners" },
							].map((stat, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{
										opacity: ctaInView ? 1 : 0,
										y: ctaInView ? 0 : 20,
									}}
									transition={{
										duration: 0.5,
										delay: index * 0.3,
										ease: "easeOut",
									}}
								>
									<p className="text-3xl font-bold">{stat.value}</p>
									<p className="text-lg">{stat.label}</p>
								</motion.div>
							))}
						</div>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Dialog>
								<DialogTrigger asChild>
									<Button
										size="lg"
										variant="outline"
										className="bg-white text-[#4A90E2] hover:bg-[#F5F7FA] border-white text-lg px-8 py-6"
									>
										List Your Property
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-md bg-white">
									<DialogHeader>
										<DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] bg-clip-text text-transparent">
											Become an Owner
										</DialogTitle>
										<DialogDescription className="text-center text-gray-600">
											Start earning from your properties
										</DialogDescription>
									</DialogHeader>
									<Button
										asChild
										className="w-full h-16 bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] hover:from-[#3A80D2] hover:to-[#E1B40F] text-white"
									>
										<Link href="/signup/owner" className="flex flex-col">
											<span className="font-semibold">
												Create Owner Account
											</span>
											<span className="text-sm opacity-90">
												List and manage properties
											</span>
										</Link>
									</Button>
								</DialogContent>
							</Dialog>
							<Dialog>
								<DialogTrigger asChild>
									<Button
										size="lg"
										className="bg-white text-[#4A90E2] hover:bg-[#F5F7FA] text-lg px-8 py-6"
									>
										Find a Home
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-md bg-white">
									<DialogHeader>
										<DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] bg-clip-text text-transparent">
											Find Your Home
										</DialogTitle>
										<DialogDescription className="text-center text-gray-600">
											Discover amazing rentals
										</DialogDescription>
									</DialogHeader>
									<Button
										asChild
										className="w-full h-16 bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] hover:from-[#3A80D2] hover:to-[#E1B40F] text-white"
									>
										<Link href="/signup/tenant" className="flex flex-col">
											<span className="font-semibold">
												Create Tenant Account
											</span>
											<span className="text-sm opacity-90">
												Start your home search
											</span>
										</Link>
									</Button>
								</DialogContent>
							</Dialog>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Property Details Modal */}
			{selectedProperty && (
				<Dialog
					open={!!selectedProperty}
					onOpenChange={() => setSelectedProperty(null)}
				>
					<DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-0">
						<div className="relative bg-gradient-to-r from-[#4A90E2]/10 to-[#F1C40F]/10 p-6">
							<DialogHeader className="flex items-center justify-between">
								<div>
									<DialogTitle className="text-3xl font-bold text-gray-900">
										{selectedProperty.title}
									</DialogTitle>
									<DialogDescription className="text-lg text-gray-600">
										{selectedProperty.type} • {selectedProperty.area} •{" "}
										{selectedProperty.price.toLocaleString()} ETB/month
									</DialogDescription>
								</div>
								<Button
									variant="ghost"
									className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
									onClick={() => setSelectedProperty(null)}
									aria-label="Close dialog"
								>
									<svg
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</Button>
							</DialogHeader>
						</div>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							className="p-6 space-y-6"
						>
							<Tabs defaultValue="overview" className="w-full">
								<TabsList className="grid w-full grid-cols-4 bg-[#F5F7FA] rounded-lg p-1">
									<TabsTrigger value="overview" className="rounded-md">
										Overview
									</TabsTrigger>
									{selectedProperty.units && (
										<TabsTrigger value="units" className="rounded-md">
											Units
										</TabsTrigger>
									)}
									<TabsTrigger value="gallery" className="rounded-md">
										Gallery
									</TabsTrigger>
									<TabsTrigger value="contact" className="rounded-md">
										Contact
									</TabsTrigger>
								</TabsList>
								<TabsContent value="overview" className="mt-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<h3 className="text-lg font-semibold mb-3 text-gray-900">
												Property Details
											</h3>
											<div className="space-y-3 bg-[#F5F7FA] p-4 rounded-lg">
												<div className="flex justify-between">
													<span className="text-gray-600">Type:</span>
													<span className="font-medium text-gray-900">
														{selectedProperty.type}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-600">Bedrooms:</span>
													<span className="font-medium text-gray-900">
														{selectedProperty.bedrooms || "N/A"}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-600">Bathrooms:</span>
													<span className="font-medium text-gray-900">
														{selectedProperty.bathrooms}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-600">Area:</span>
													<span className="font-medium text-gray-900">
														{selectedProperty.area}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-600">Year Built:</span>
													<span className="font-medium text-gray-900">
														{selectedProperty.yearBuilt}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-600">Lease Terms:</span>
													<span className="font-medium text-gray-900">
														{selectedProperty.leaseTerms}
													</span>
												</div>
												<div className="flex justify-between">
													<span className="text-gray-600">Rating:</span>
													<div className="flex items-center space-x-1">
														{renderStars(selectedProperty.rating)}
														<span className="text-sm text-gray-600">
															({selectedProperty.reviews} reviews)
														</span>
													</div>
												</div>
											</div>
										</div>
										<div>
											<h3 className="text-lg font-semibold mb-3 text-gray-900">
												Amenities
											</h3>
											<div className="grid grid-cols-2 gap-3 bg-[#F5F7FA] p-4 rounded-lg">
												{selectedProperty.amenities.map(
													(amenity: string, index: number) => (
														<motion.div
															key={index}
															initial={{ opacity: 0, x: -20 }}
															animate={{ opacity: 1, x: 0 }}
															transition={{ duration: 0.3, delay: index * 0.1 }}
															className="flex items-center space-x-2"
														>
															<div className="w-2 h-2 bg-[#4A90E2] rounded-full"></div>
															<span className="text-sm text-gray-900">
																{amenity}
															</span>
														</motion.div>
													)
												)}
											</div>
										</div>
									</div>
									<div className="mt-6">
										<h3 className="text-lg font-semibold mb-3 text-gray-900">
											Description
										</h3>
										<p className="text-gray-600 bg-[#F5F7FA] p-4 rounded-lg">
											{selectedProperty.description}
										</p>
									</div>
								</TabsContent>
								{selectedProperty.units && (
									<TabsContent value="units" className="mt-4">
										<h3 className="text-lg font-semibold mb-3 text-gray-900">
											Available Units
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{selectedProperty.units.map(
												(unit: any, index: number) => (
													<motion.div
														key={unit.unitId}
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.4, delay: index * 0.2 }}
													>
														<Card className="bg-white/95 border-[#4A90E2]/20 shadow-md">
															<CardHeader>
																<CardTitle className="text-lg font-semibold">
																	{unit.unitId}: {unit.type}
																</CardTitle>
																<Badge
																	variant={
																		unit.status === "Available"
																			? "default"
																			: "destructive"
																	}
																	className={
																		unit.status === "Available"
																			? "bg-green-500"
																			: "bg-red-500"
																	}
																>
																	{unit.status}
																</Badge>
															</CardHeader>
															<CardContent>
																<div className="space-y-2">
																	<div className="flex justify-between">
																		<span className="text-gray-600">
																			Class:
																		</span>
																		<span className="font-medium text-gray-900">
																			{unit.class}
																		</span>
																	</div>
																	<div className="flex justify-between">
																		<span className="text-gray-600">Age:</span>
																		<span className="font-medium text-gray-900">
																			{unit.age} years
																		</span>
																	</div>
																	<div className="flex justify-between">
																		<span className="text-gray-600">
																			Floor:
																		</span>
																		<span className="font-medium text-gray-900">
																			{unit.floor}
																		</span>
																	</div>
																	<div className="flex justify-between">
																		<span className="text-gray-600">
																			Price:
																		</span>
																		<span className="font-medium text-gray-900">
																			{unit.price.toLocaleString()} ETB/month
																		</span>
																	</div>
																	<div className="flex justify-between">
																		<span className="text-gray-600">
																			Bedrooms:
																		</span>
																		<span className="font-medium text-gray-900">
																			{unit.bedrooms}
																		</span>
																	</div>
																	<div className="flex justify-between">
																		<span className="text-gray-600">
																			Bathrooms:
																		</span>
																		<span className="font-medium text-gray-900">
																			{unit.bathrooms}
																		</span>
																	</div>
																	<div className="flex justify-between">
																		<span className="text-gray-600">Area:</span>
																		<span className="font-medium text-gray-900">
																			{unit.area}
																		</span>
																	</div>
																	<div>
																		<span className="text-gray-600">
																			Amenities:
																		</span>
																		<div className="flex flex-wrap gap-2 mt-1">
																			{unit.amenities.map(
																				(amenity: string, i: number) => (
																					<Badge
																						key={i}
																						variant="outline"
																						className="text-[#4A90E2] border-[#4A90E2]"
																					>
																						{amenity}
																					</Badge>
																				)
																			)}
																		</div>
																	</div>
																</div>
															</CardContent>
														</Card>
													</motion.div>
												)
											)}
										</div>
									</TabsContent>
								)}
								<TabsContent value="gallery" className="mt-4">
									<h3 className="text-lg font-semibold mb-3 text-gray-900">
										Gallery
									</h3>
									<div className="relative">
										<motion.img
											key={currentImageIndex}
											src={selectedProperty.images[currentImageIndex]}
											alt={`${selectedProperty.title} ${currentImageIndex + 1}`}
											className="w-full h-96 object-cover rounded-lg"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.3 }}
											whileHover={{ scale: 1.05 }}
										/>
										<Button
											variant="ghost"
											className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
											onClick={prevImage}
											aria-label="Previous image"
										>
											<ChevronLeft className="h-6 w-6 text-[#4A90E2]" />
										</Button>
										<Button
											variant="ghost"
											className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
											onClick={nextImage}
											aria-label="Next image"
										>
											<ChevronRight className="h-6 w-6 text-[#4A90E2]" />
										</Button>
										<div className="flex justify-center gap-2 mt-4">
											{selectedProperty.images.map((_: any, index: number) => (
												<motion.button
													key={index}
													className={`w-3 h-3 rounded-full ${
														index === currentImageIndex
															? "bg-[#4A90E2]"
															: "bg-gray-300"
													}`}
													onClick={() => setCurrentImageIndex(index)}
													whileHover={{ scale: 1.2 }}
													aria-label={`Go to image ${index + 1}`}
												/>
											))}
										</div>
									</div>
								</TabsContent>
								<TabsContent value="contact" className="mt-4">
									<h3 className="text-lg font-semibold mb-3 text-gray-900">
										Contact Representative
									</h3>
									<Card className="bg-[#F5F7FA] p-4">
										<div className="space-y-3">
											<div className="flex items-center space-x-2">
												<Users className="h-5 w-5 text-[#4A90E2]" />
												<span className="font-medium text-gray-900">
													{selectedProperty.representative.name}
												</span>
											</div>
											<div className="flex items-center space-x-2">
												<Phone className="h-5 w-5 text-[#4A90E2]" />
												<a
													href={`tel:${selectedProperty.representative.phone}`}
													className="text-gray-900 hover:text-[#4A90E2]"
												>
													{selectedProperty.representative.phone}
												</a>
											</div>
											<div className="flex items-center space-x-2">
												<Mail className="h-5 w-5 text-[#4A90E2]" />
												<a
													href={`mailto:${selectedProperty.representative.email}`}
													className="text-gray-900 hover:text-[#4A90E2]"
												>
													{selectedProperty.representative.email}
												</a>
											</div>
										</div>
									</Card>
								</TabsContent>
							</Tabs>

							{/* Placeholder for Google Maps */}
							<div className="bg-[#F5F7FA] p-4 rounded-lg">
								<p className="text-gray-600">
									Location details and Google Maps available after login/signup.
								</p>
								<Button
									variant="outline"
									className="mt-2 border-[#4A90E2] hover:bg-[#F5F7FA] text-[#4A90E2]"
									asChild
								>
									<Link href="/login">Login to View Location</Link>
								</Button>
							</div>

							{/* Sticky CTA Bar */}
							<motion.div
								className="sticky bottom-0 bg-white/95 p-4 border-t border-[#4A90E2]/20 shadow-lg"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
							>
								<div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
									<div>
										<h3 className="text-xl font-bold text-gray-900">
											Interested?
										</h3>
										<p className="text-gray-600">
											Sign up or login to contact the owner.
										</p>
									</div>
									<div className="flex gap-3">
										<Button
											className="bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] hover:from-[#3A80D2] hover:to-[#E1B40F] text-white"
											onClick={() => setCurrentImageIndex(0)} // Reset image index for gallery tab
										>
											<Eye className="h-4 w-4 mr-2" />
											View Gallery
										</Button>
										<Dialog>
											<DialogTrigger asChild>
												<Button className="bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] hover:from-[#3A80D2] hover:to-[#E1B40F] text-white">
													Sign Up to Contact
												</Button>
											</DialogTrigger>
											<DialogContent className="sm:max-w-md bg-white">
												<DialogHeader>
													<DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] bg-clip-text text-transparent">
														Join as Tenant
													</DialogTitle>
													<DialogDescription className="text-center text-gray-600">
														Create an account to contact owners
													</DialogDescription>
												</DialogHeader>
												<Button
													asChild
													className="w-full h-16 bg-gradient-to-r from-[#4A90E2] to-[#F1C40F] hover:from-[#3A80D2] hover:to-[#E1B40F] text-white"
												>
													<Link href="/signup/tenant" className="flex flex-col">
														<span className="font-semibold">
															Create Tenant Account
														</span>
														<span className="text-sm opacity-90">
															Find your home
														</span>
													</Link>
												</Button>
											</DialogContent>
										</Dialog>
										<Button
											variant="outline"
											className="border-[#4A90E2] hover:bg-[#F5F7FA] text-[#4A90E2]"
											asChild
										>
											<Link href="/login">Login</Link>
										</Button>
										<Button
											variant="ghost"
											className="text-[#4A90E2] hover:bg-[#F5F7FA]"
											aria-label="Save property"
										>
											<Heart className="h-5 w-5" />
										</Button>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</DialogContent>
				</Dialog>
			)}

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12 px-4 text-sm">
				<div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<div className="flex items-center space-x-3 mb-4">
							<div className="w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#F1C40F] rounded-xl flex items-center justify-center">
								<Building2 className="h-5 w-5 text-white" />
							</div>
							<span className="font-bold text-xl">Akeray</span>
						</div>
						<p className="text-gray-400">
							Ethiopia's premier property management platform.
						</p>
					</div>
					<div>
						<h3 className="font-semibold mb-4">For Tenants</h3>
						<ul className="space-y-2 text-gray-400">
							<li>
								<Link href="/signup/tenant" className="hover:text-white">
									Find Properties
								</Link>
							</li>
							<li>
								<Link href="/login" className="hover:text-white">
									Tenant Login
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4">For Owners</h3>
						<ul className="space-y-2 text-gray-400">
							<li>
								<Link href="/signup/owner" className="hover:text-white">
									List Property
								</Link>
							</li>
							<li>
								<Link href="/login" className="hover:text-white">
									Owner Login
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Contact</h3>
						<ul className="space-y-2 text-gray-400">
							<li>📞 +251-911-123456</li>
							<li>✉️ support@akeray.et</li>
							<li>📍 Addis Ababa, Ethiopia</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
					<p>© 2025 Akeray Property Management System. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
