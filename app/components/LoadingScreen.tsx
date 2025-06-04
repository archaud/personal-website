import { motion } from 'framer-motion';
import Image from 'next/image';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-100 dark:bg-gray-900 ${!isLoading ? 'pointer-events-none' : ''
        }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-600 dark:text-gray-400 mb-4">
          Go Bills
        </h1>
        <motion.div
          animate={{
            opacity: [1, 0.3, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex justify-center"
        >
          <Image
            src="/images/bills-logo.png"
            alt="Buffalo Bills Logo"
            width={60}
            height={60}
            priority
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 