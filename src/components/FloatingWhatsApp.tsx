import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export const FloatingWhatsApp = () => {
  const settings = useSiteSettings();
  
  const whatsappNumber = settings.whatsapp_number || '5564926988259'; // Manter número padrão, ajustar no admin
  const whatsappMessage = settings.whatsapp_message || 'Olá! Gostaria de agendar uma análise gratuita para minha empresa.';
  
  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl flex items-center gap-2 group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.div>
      
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        whileHover={{ width: "auto", opacity: 1 }}
        className="overflow-hidden whitespace-nowrap font-semibold hidden md:block"
      >
        Fale Conosco
      </motion.span>

      <motion.div
        className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
    </motion.button>
  );
};