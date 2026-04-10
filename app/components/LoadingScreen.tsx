import { motion } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-neutral-100 dark:bg-neutral-950 ${!isLoading ? 'pointer-events-none' : ''}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center font-mono"
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-xl text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">
            Printing receipt...
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
