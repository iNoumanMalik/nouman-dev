import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, Mail, Moon, Sun, FileText } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface ActionButton {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    // color: string;
}

const FloatingActionButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    // Default to dark mode for now, since we need to toggle
    const [isDarkMode, setIsDarkMode] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Toggle Dark Mode (placeholder logic)
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("dark");
    };

    // Check for mobile viewport
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const actions: ActionButton[] = [
        {
            label: "WhatsApp",
            icon: <FaWhatsapp size={20} />,
            onClick: () => console.log("WhatsApp clicked"),
            // color: "bg-green-500",
        },
        {
            label: "Email",
            icon: <Mail size={20} />,
            onClick: () => console.log("Email clicked"),
            // color: "bg-blue-500",
        },
        {
            label: isDarkMode ? "Light Mode" : "Dark Mode",
            icon: isDarkMode ? <Sun size={20} /> : <Moon size={20} />,
            onClick: toggleTheme,
            // color: "bg-purple-500",
        },
        {
            label: "Resume",
            icon: <FileText size={20} />,
            onClick: () => console.log("Resume clicked"),
            // color: "bg-orange-500",
        },
    ];

    // Animation variants
    const getActionVariants = (index: number): Variants => {
        if (isMobile) {
            // Stack upwards for mobile
            return {
                initial: { opacity: 0, y: 0, scale: 0.5 },
                animate: {
                    opacity: 1,
                    y: -(index + 1) * 60, // 60px spacing upwards
                    scale: 1,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                },
                exit: { opacity: 0, y: 0, scale: 0.5 },
            };
        } else {
            // Fan out diagonally for desktop
            // Adjust angle and radius
            // Mapping index to x/y coordinates to create a quarter-circle fan

            const offsets = [
                { x: -5, y: -90 },   // almost straight up
                { x: -50, y: -80 },  // diagonal up-left
                { x: -80, y: -50 },  // diagonal left-up
                { x: -90, y: -5 },   // almost straight left
            ];

            const safeIndex = index < offsets.length ? index : index % offsets.length;

            return {
                initial: { opacity: 0, x: 0, y: 0, scale: 0.5 },
                animate: {
                    opacity: 1,
                    x: offsets[safeIndex].x,
                    y: offsets[safeIndex].y,
                    scale: 1,
                    transition: { type: "spring", stiffness: 400, damping: 25, delay: index * 0.05 }
                },
                exit: { opacity: 0, x: 0, y: 0, scale: 0.5 },
            };
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none"
        // pointer-events-none on container to let clicks pass through empty spaces, 
        // but we need pointer-events-auto on buttons
        >
            <div className="relative pointer-events-auto">
                <AnimatePresence>
                    {isOpen &&
                        actions.map((action, index) => (
                            <motion.div
                                key={action.label}
                                className="absolute bottom-0 right-0 flex items-center justify-center"
                                variants={getActionVariants(index)}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <div className="group relative flex items-center justify-center">
                                    {/* Tooltip */}
                                    <div className="absolute right-full mr-3 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                                        {action.label}
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={action.onClick}
                                        className={` text-white p-3 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-transform md:w-12 md:h-12 w-14 h-14 flex items-center justify-center`}
                                        aria-label={action.label}
                                    >
                                        {action.icon}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                </AnimatePresence>

                {/* Main Toggle Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative z-10 bg-blue-600 hover:bg-white-700 text-white p-0 rounded-full shadow-2xl flex items-center justify-center md:w-12 md:h-12 w-12 h-12"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                >
                    <Plus size={28} />
                </motion.button>
            </div>
        </div>
    );
};

export default FloatingActionButton;
