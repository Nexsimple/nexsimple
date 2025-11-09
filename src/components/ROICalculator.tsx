import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const ROICalculator = () => {
  const { getSetting } = useSiteSettings();
  const [employees, setEmployees] = useState(10);
  const [hours, setHours] = useState(5);
  const [cost, setCost] = useState(25);
  const [monthlyLoss, setMonthlyLoss] = useState(0);

  useEffect(() => {
    const loss = employees * hours * cost * 4; // 4 weeks in a month
    setMonthlyLoss(loss);
  }, [employees, hours, cost]);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
              {getSetting('roi_calculator_title', 'Quanto Dinheiro Você Está Perdendo?')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {getSetting('roi_calculator_subtitle', 'Calcule em 30 segundos o prejuízo do trabalho manual e o potencial de economia com a automação.')}
            </p>
            <div className="space-y-8">
              <div>
                <label className="font-semibold text-secondary">Nº de Funcionários em Tarefas Repetitivas: <span className="text-primary font-bold">{employees}</span></label>
                <Slider defaultValue={[10]} max={100} step={1} onValueChange={(value) => setEmployees(value[0])} />
              </div>
              <div>
                <label className="font-semibold text-secondary">Horas Gastas por Semana (por funcionário): <span className="text-primary font-bold">{hours}h</span></label>
                <Slider defaultValue={[5]} max={40} step={1} onValueChange={(value) => setHours(value[0])} />
              </div>
              <div>
                <label className="font-semibold text-secondary">Custo Médio da Hora de Trabalho: <span className="text-primary font-bold">R$ {cost}</span></label>
                <Slider defaultValue={[25]} max={200} step={1} onValueChange={(value) => setCost(value[0])} />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-8 lg:p-12 rounded-2xl shadow-2xl border-2 border-primary text-center"
          >
            <p className="text-lg text-muted-foreground mb-2">Prejuízo Mensal Estimado</p>
            <h3 className="text-5xl lg:text-6xl font-bold text-destructive mb-4">
              R$ {monthlyLoss.toLocaleString('pt-BR')}
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Esse é o valor que sua empresa pode estar perdendo todos os meses com ineficiência.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-cta-orange text-white hover:bg-cta-orange/90 font-semibold px-8 py-6 text-lg shadow-2xl shadow-cta-orange/50 w-full group"
                asChild
              >
                <a href={getSetting('roi_cta_link', 'https://wa.me/556492698259')} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  {getSetting('roi_cta_text', 'Quero Reverter Esse Prejuízo!')}
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;