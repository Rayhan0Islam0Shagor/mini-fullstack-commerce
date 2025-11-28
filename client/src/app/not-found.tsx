'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import Container from '@/components/ui/Container';

const NotFound = () => {
  return (
    <main className="bg-[#03484D] py-16 text-white">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4"
        >
          <motion.span
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative flex h-36 w-36 items-center justify-center rounded-full bg-white/10 backdrop-blur"
          >
            <span className="text-6xl font-semibold text-white/90">404</span>
            <motion.span
              className="absolute inline-block h-3 w-3 rounded-full bg-[#FDDE3B]"
              animate={{
                top: ['15%', '10%', '20%', '15%'],
                left: ['15%', '70%', '50%', '15%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.span>

          <p className="text-lg uppercase tracking-[0.4em] text-white/80">
            Page Not Found
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-xl space-y-4"
        >
          <h1 className="text-3xl font-semibold md:text-4xl">
            Lost in the aisles of WinStore?
          </h1>
          <p className="text-base text-white/80 md:text-lg">
            The page you were looking for has moved or no longer exists. Let’s
            bring you back to the storefront so you can keep exploring deals and
            gadgets.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="rounded-full bg-white px-8 py-3 text-[#03484D] transition hover:bg-white/90"
          >
            Back to Home
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/40 px-8 py-3 text-white transition hover:border-white hover:bg-white/10"
          >
            Browse Latest Deals
          </Link>
        </motion.div>
      </Container>
    </main>
  );
};

export default NotFound;
